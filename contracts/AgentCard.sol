// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

/// @title Agent Card — collectible card NFTs on BNB Chain.
/// @notice Each card's agent name, persona (style), color and mint tier are
/// stored on-chain, and tokenURI renders a fully on-chain SVG card, so a
/// card needs no external server or image hosting. Free-mint cards use the
/// standard design; paid-mint cards use a premium gold-frame design.
/// This is a collectible card collection — it is NOT an official Binance
/// Agent ID credential.
contract AgentCard {
    // ---------- ERC-721 metadata ----------
    string public name = "Agent Card";
    string public symbol = "ACARD";

    // ---------- Ownership (owner deploys and controls the collection) ----------
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // ---------- Collection state ----------
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public totalMinted;
    uint256 public freeMintPrice = 0.0001 ether; // anti-sybil fee
    uint256 public paidMintPrice = 0.0005 ether;
    bool public mintOpen = true;

    uint8 public constant TIER_FREE = 0;
    uint8 public constant TIER_PAID = 1;

    struct Card {
        string agentName;
        uint8 style; // 0 = Guardian, 1 = Builder, 2 = Explorer
        string colorHex; // "#RRGGBB"
        uint8 tier; // 0 = Free, 1 = Paid
    }
    mapping(uint256 => Card) public cards;
    mapping(address => bool) public freeMintUsed;

    // ---------- ERC-721 storage ----------
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed tokenOwner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed tokenOwner, address indexed operator, bool approved);
    event CardMinted(address indexed to, uint256 indexed tokenId, string agentName, uint8 style, uint8 tier);

    constructor() {
        owner = msg.sender;
    }

    // ---------- Minting ----------
    /// @notice Free mint: one per wallet, small anti-sybil fee, standard design.
    function freeMint(string calldata agentName, uint8 style, string calldata colorHex) external payable returns (uint256) {
        require(!freeMintUsed[msg.sender], "Free mint already used");
        require(msg.value >= freeMintPrice, "Insufficient BNB");
        freeMintUsed[msg.sender] = true;
        return _issue(agentName, style, colorHex, TIER_FREE);
    }

    /// @notice Paid mint: unlimited, premium gold design.
    function paidMint(string calldata agentName, uint8 style, string calldata colorHex) external payable returns (uint256) {
        require(msg.value >= paidMintPrice, "Insufficient BNB");
        return _issue(agentName, style, colorHex, TIER_PAID);
    }

    function _issue(string calldata agentName, uint8 style, string calldata colorHex, uint8 tier) internal returns (uint256 tokenId) {
        require(mintOpen, "Mint is closed");
        require(totalMinted < MAX_SUPPLY, "Sold out");
        uint256 nameLength = bytes(agentName).length;
        require(nameLength >= 1 && nameLength <= 32, "Name must be 1-32 chars");
        require(style <= 2, "Unknown style");
        require(bytes(colorHex).length == 7, "Color must be #RRGGBB");

        tokenId = ++totalMinted;
        cards[tokenId] = Card(agentName, style, colorHex, tier);
        _owners[tokenId] = msg.sender;
        _balances[msg.sender] += 1;
        emit Transfer(address(0), msg.sender, tokenId);
        emit CardMinted(msg.sender, tokenId, agentName, style, tier);
    }

    // ---------- Owner controls ----------
    function setFreeMintPrice(uint256 newPrice) external onlyOwner {
        freeMintPrice = newPrice;
    }

    function setPaidMintPrice(uint256 newPrice) external onlyOwner {
        paidMintPrice = newPrice;
    }

    function setMintOpen(bool open) external onlyOwner {
        mintOpen = open;
    }

    function withdraw() external onlyOwner {
        (bool ok, ) = payable(owner).call{value: address(this).balance}("");
        require(ok, "Withdraw failed");
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        owner = newOwner;
    }

    // ---------- ERC-721 ----------
    function balanceOf(address account) external view returns (uint256) {
        require(account != address(0), "Zero address");
        return _balances[account];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address tokenOwner = _owners[tokenId];
        require(tokenOwner != address(0), "Nonexistent token");
        return tokenOwner;
    }

    function approve(address approved, uint256 tokenId) external {
        address tokenOwner = ownerOf(tokenId);
        require(msg.sender == tokenOwner || _operatorApprovals[tokenOwner][msg.sender], "Not authorized");
        _tokenApprovals[tokenId] = approved;
        emit Approval(tokenOwner, approved, tokenId);
    }

    function getApproved(uint256 tokenId) external view returns (address) {
        require(_owners[tokenId] != address(0), "Nonexistent token");
        return _tokenApprovals[tokenId];
    }

    function setApprovalForAll(address operator, bool approved) external {
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function isApprovedForAll(address account, address operator) external view returns (bool) {
        return _operatorApprovals[account][operator];
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not authorized");
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) external {
        transferFrom(from, to, tokenId);
        require(_checkReceived(from, to, tokenId, ""), "Unsafe recipient");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external {
        transferFrom(from, to, tokenId);
        require(_checkReceived(from, to, tokenId, data), "Unsafe recipient");
    }

    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return interfaceId == 0x80ac58cd || interfaceId == 0x5b5e139f || interfaceId == 0x01ffc9a7;
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address tokenOwner = ownerOf(tokenId);
        return spender == tokenOwner || spender == _tokenApprovals[tokenId] || _operatorApprovals[tokenOwner][spender];
    }

    function _transfer(address from, address to, uint256 tokenId) internal {
        require(ownerOf(tokenId) == from, "Wrong owner");
        require(to != address(0), "Zero address");
        _tokenApprovals[tokenId] = address(0);
        emit Approval(from, address(0), tokenId);
        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;
        emit Transfer(from, to, tokenId);
    }

    function _checkReceived(address from, address to, uint256 tokenId, bytes memory data) internal returns (bool) {
        if (to.code.length == 0) return true;
        try IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, data) returns (bytes4 retval) {
            return retval == IERC721Receiver.onERC721Received.selector;
        } catch {
            return false;
        }
    }

    // ---------- On-chain metadata ----------
    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(_owners[tokenId] != address(0), "Nonexistent token");
        Card storage card = cards[tokenId];
        string memory styleLabel = card.style == 0 ? "Guardian" : card.style == 1 ? "Builder" : "Explorer";
        string memory editionLabel = card.tier == TIER_PAID ? "Paid Edition" : "Free Edition";
        string memory rarityLabel = card.tier == TIER_PAID ? "Rare Holo" : "Common";
        string memory svg = _buildSvg(tokenId, card, styleLabel);
        string memory json = string(
            abi.encodePacked(
                '{"name":"Agent Card #',
                _toString(tokenId),
                '","description":"A collectible Agent Card minted on BNB Chain. Persona: ',
                styleLabel,
                '. Agent name: ',
                card.agentName,
                '. Edition: ',
                editionLabel,
                '. This is a collectible card - not an official Binance Agent ID credential.",',
                '"image":"data:image/svg+xml;base64,',
                _base64(bytes(svg)),
                '","attributes":[',
                '{"trait_type":"Persona","value":"',
                styleLabel,
                '"},{"trait_type":"Agent Name","value":"',
                card.agentName,
                '"},{"trait_type":"Color","value":"',
                card.colorHex,
                '"},{"trait_type":"Edition","value":"',
                editionLabel,
                '"},{"trait_type":"Rarity","value":"',
                rarityLabel,
                '"},{"trait_type":"Power","value":"',
                _toString(_power(card.style, card.tier)),
                '"}]}'
            )
        );
        return string(abi.encodePacked("data:application/json;base64,", _base64(bytes(json))));
    }

    function _power(uint8 style, uint8 tier) internal pure returns (uint256) {
        uint256 base = style == 0 ? 120 : style == 1 ? 110 : 100;
        return tier == 1 ? base + 30 : base;
    }

    function _ability(uint8 style) internal pure returns (string memory abilityName, string memory line1, string memory line2) {
        if (style == 0) return ("Shield Protocol", "Once active, its guard covers the", "whole party. Resolve absorbs the blow.");
        if (style == 1) return ("Rapid Construct", "Builds faster than anyone alive.", "Every block lands exactly in place.");
        return ("Star Pathfinding", "Always finds a brand-new path.", "No map is ever too strange for it.");
    }

    function _moves(uint8 style) internal pure returns (string memory m1, string memory d1, string memory m2, string memory d2) {
        if (style == 0) return ("Aegis Slam", "60", "Moon Guard", "90");
        if (style == 1) return ("Pixel Forge", "50", "Chain Build", "100");
        return ("Comet Dash", "40", "Nova Trail", "110");
    }

    function _nameSize(uint256 len) internal pure returns (string memory) {
        if (len <= 14) return "30";
        if (len <= 20) return "25";
        if (len <= 26) return "21";
        return "18";
    }

    function _emblem(uint8 style, string memory colorHex) internal pure returns (string memory) {
        if (style == 0) {
            return
                string(
                    abi.encodePacked(
                        '<path d="M210 128 L282 156 V232 C282 292 248 322 210 340 C172 322 138 292 138 232 V156 Z" fill="#ffffff" fill-opacity="0.92"/>',
                        '<path d="M210 147 L263 168 V229 C263 277 240 301 210 315 C180 301 157 277 157 229 V168 Z" fill="',
                        colorHex,
                        '" fill-opacity="0.6"/>'
                    )
                );
        }
        if (style == 1) {
            return
                '<path d="M210 132 L288 174 L210 216 L132 174 Z" fill="#ffffff" fill-opacity="0.95"/><path d="M132 174 L210 216 V300 L132 258 Z" fill="#ffffff" fill-opacity="0.5"/><path d="M288 174 L210 216 V300 L288 258 Z" fill="#ffffff" fill-opacity="0.72"/>';
        }
        return '<path d="M210 122 L230 188 L296 208 L230 228 L210 294 L190 228 L124 208 L190 188 Z" fill="#ffffff" fill-opacity="0.93"/>';
    }

    function _buildSvg(uint256 tokenId, Card storage card, string memory styleLabel) internal view returns (string memory) {
        bool paid = card.tier == TIER_PAID;
        (string memory abilityName, string memory line1, string memory line2) = _ability(card.style);
        (string memory m1, string memory d1, string memory m2, string memory d2) = _moves(card.style);
        return
            string(
                abi.encodePacked(
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 594">',
                    "<defs>",
                    '<linearGradient id="fr" x1="0" y1="0" x2="0" y2="1">',
                    paid
                        ? '<stop offset="0" stop-color="#f9e08a"/><stop offset="0.5" stop-color="#caa12f"/><stop offset="1" stop-color="#f9e08a"/>'
                        : '<stop offset="0" stop-color="#e8ecf1"/><stop offset="1" stop-color="#9aa3ad"/>',
                    "</linearGradient>",
                    '<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">',
                    '<stop offset="0" stop-color="',
                    card.colorHex,
                    paid ? '"/><stop offset="1" stop-color="#05070a"/></linearGradient>' : '"/><stop offset="1" stop-color="#0d1117"/></linearGradient>',
                    '<linearGradient id="art" x1="0" y1="0" x2="1" y2="1">',
                    '<stop offset="0" stop-color="',
                    card.colorHex,
                    '"/><stop offset="1" stop-color="#05070a"/></linearGradient>',
                    '<linearGradient id="holo" x1="0" y1="0" x2="1" y2="1">',
                    '<stop offset="0" stop-color="#ff8a8a"/><stop offset="0.25" stop-color="#ffd98a"/><stop offset="0.5" stop-color="#a8ffb0"/><stop offset="0.75" stop-color="#8ac6ff"/><stop offset="1" stop-color="#d38aff"/></linearGradient>',
                    "</defs>",
                    '<rect width="420" height="594" rx="18" fill="url(#fr)"/>',
                    '<rect x="10" y="10" width="400" height="574" rx="12" fill="url(#bg)"/>',
                    '<text x="26" y="42" font-family="monospace" font-size="11" letter-spacing="3" fill="#ffffff" fill-opacity="0.75">AGENT CARD &#183; BASIC</text>',
                    '<text x="26" y="82" font-family="sans-serif" font-weight="bold" font-size="',
                    _nameSize(bytes(card.agentName).length),
                    '" fill="#ffffff">',
                    card.agentName,
                    "</text>",
                    '<text x="334" y="82" text-anchor="end" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.8">PWR</text>',
                    '<text x="394" y="82" text-anchor="end" font-family="sans-serif" font-size="26" font-weight="bold" fill="#ffffff">',
                    _toString(_power(card.style, card.tier)),
                    "</text>",
                    '<rect x="24" y="98" width="372" height="238" rx="10" fill="url(#art)"/>',
                    paid
                        ? '<rect x="24" y="98" width="372" height="238" rx="10" fill="url(#holo)" fill-opacity="0.38"/>'
                        : '<path d="M24 336 L240 98 L330 98 L114 336 Z" fill="#ffffff" fill-opacity="0.08"/>',
                    '<rect x="24" y="98" width="372" height="238" rx="10" fill="none" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.5"/>',
                    '<g transform="translate(0,-10)">',
                    _emblem(card.style, card.colorHex),
                    "</g>",
                    paid
                        ? '<path d="M352 118 l4.5 11.5 11.5 4.5 -11.5 4.5 -4.5 11.5 -4.5 -11.5 -11.5 -4.5 11.5 -4.5 z" fill="#ffffff" fill-opacity="0.95"/><circle cx="66" cy="300" r="3" fill="#ffffff" fill-opacity="0.85"/><circle cx="330" cy="290" r="2.4" fill="#ffffff" fill-opacity="0.7"/>'
                        : "",
                    '<rect x="24" y="352" width="372" height="66" rx="8" fill="#ffffff" fill-opacity="0.08"/>',
                    '<text x="38" y="380" font-family="monospace" font-size="10.5" letter-spacing="2" fill="#f5d67a">ABILITY</text>',
                    '<text x="112" y="381" font-family="sans-serif" font-weight="bold" font-size="16.5" fill="#ffffff">',
                    abilityName,
                    "</text>",
                    '<text x="38" y="402" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.82">',
                    line1,
                    "</text>",
                    '<text x="38" y="418" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.82">',
                    line2,
                    "</text>",
                    '<circle cx="40" cy="452" r="7" fill="',
                    card.colorHex,
                    '"/><circle cx="60" cy="452" r="7" fill="',
                    card.colorHex,
                    '"/>',
                    '<text x="82" y="459" font-family="sans-serif" font-weight="bold" font-size="17" fill="#ffffff">',
                    m1,
                    "</text>",
                    '<text x="394" y="460" text-anchor="end" font-family="sans-serif" font-weight="bold" font-size="20" fill="#ffffff">',
                    d1,
                    "</text>",
                    '<line x1="24" y1="476" x2="396" y2="476" stroke="#ffffff" stroke-opacity="0.15"/>',
                    '<circle cx="40" cy="500" r="7" fill="',
                    card.colorHex,
                    '"/><circle cx="60" cy="500" r="7" fill="',
                    card.colorHex,
                    '"/><circle cx="80" cy="500" r="7" fill="',
                    card.colorHex,
                    '"/>',
                    '<text x="102" y="507" font-family="sans-serif" font-weight="bold" font-size="17" fill="#ffffff">',
                    m2,
                    "</text>",
                    '<text x="394" y="508" text-anchor="end" font-family="sans-serif" font-weight="bold" font-size="20" fill="#ffffff">',
                    d2,
                    "</text>",
                    '<line x1="24" y1="524" x2="396" y2="524" stroke="#ffffff" stroke-opacity="0.15"/>',
                    '<text x="24" y="544" font-family="sans-serif" font-size="10.5" fill="#ffffff" fill-opacity="0.6">Weakness: Glitch &#183; Resistance: None &#183; Retreat: 1</text>',
                    '<text x="24" y="566" font-family="monospace" font-size="12" fill="#ffffff" fill-opacity="0.85">No. ',
                    _pad4(tokenId),
                    " / 10000</text>",
                    paid
                        ? '<text x="252" y="566" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#f5d67a">PAID EDITION &#9733;</text><text x="396" y="566" text-anchor="end" font-family="monospace" font-size="11.5" fill="#f5d67a">&#9733; RARE HOLO</text>'
                        : '<text x="252" y="566" text-anchor="middle" font-family="monospace" font-size="12" fill="#cfd4dc">FREE EDITION</text><text x="396" y="566" text-anchor="end" font-family="monospace" font-size="11.5" fill="#cfd4dc">&#9679; COMMON</text>',
                    '<text x="24" y="581" font-family="monospace" font-size="8" fill="#ffffff" fill-opacity="0.45">BNB CHAIN COLLECTIBLE - NOT AN OFFICIAL BINANCE AGENT ID</text>',
                    "</svg>"
                )
            );
    }

    // ---------- Helpers ----------
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function _pad4(uint256 value) internal pure returns (string memory) {
        string memory raw = _toString(value);
        bytes memory rawBytes = bytes(raw);
        if (rawBytes.length >= 4) return raw;
        bytes memory padded = new bytes(4);
        uint256 offset = 4 - rawBytes.length;
        for (uint256 i = 0; i < 4; i++) {
            padded[i] = i < offset ? bytes1("0") : rawBytes[i - offset];
        }
        return string(padded);
    }

    function _base64(bytes memory data) internal pure returns (string memory) {
        bytes memory table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        if (data.length == 0) return "";
        uint256 encodedLength = 4 * ((data.length + 2) / 3);
        bytes memory result = new bytes(encodedLength + 32);
        uint256 i;
        uint256 j;
        for (i = 0; i < data.length; i += 3) {
            uint256 a = uint8(data[i]);
            uint256 b = i + 1 < data.length ? uint8(data[i + 1]) : 0;
            uint256 c = i + 2 < data.length ? uint8(data[i + 2]) : 0;
            result[j++] = table[(a >> 2) & 63];
            result[j++] = table[((a << 4) | (b >> 4)) & 63];
            result[j++] = table[((b << 2) | (c >> 6)) & 63];
            result[j++] = table[c & 63];
        }
        if (data.length % 3 == 1) {
            result[j - 2] = "=";
            result[j - 1] = "=";
        } else if (data.length % 3 == 2) {
            result[j - 1] = "=";
        }
        bytes memory trimmed = new bytes(j);
        for (i = 0; i < j; i++) {
            trimmed[i] = result[i];
        }
        return string(trimmed);
    }
}

interface IERC721Receiver {
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external returns (bytes4);
}
