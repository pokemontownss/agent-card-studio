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
        Card memory c = cards[tokenId];
        string memory art = c.style == 0 ? "art-guardian.webp" : (c.style == 1 ? "art-builder.webp" : "art-explorer.webp");
        string memory json = string(abi.encodePacked(
            '{"name":"', c.agentName, ' - Agent Card #', _toString(tokenId), '",',
            '"description":"A premium metal Agent Card on BNB Chain. The metal card face (finish in the color stored on-chain, embossed agent name, persona artwork) is rendered by the official Agent Card Studio site from this on-chain data. A collectible card, not an official Binance Agent ID.",',
            '"image":"https://pokemontownss.github.io/agent-card-studio/assets/', art, '",',
            '"attributes":[',
            '{"trait_type":"Persona","value":"', _persona(c.style), '"},',
            '{"trait_type":"Agent Name","value":"', c.agentName, '"},',
            '{"trait_type":"Color","value":"', c.colorHex, '"},',
            '{"trait_type":"Edition","value":"', c.tier == 1 ? "Paid" : "Free", '"},',
            '{"trait_type":"Rarity","value":"', c.tier == 1 ? "Rare Holo" : "Common", '"},',
            '{"trait_type":"Power","value":', _toString(_power(c.style, c.tier)), '}',
            ']}'
        ));
        return string(abi.encodePacked("data:application/json;base64,", _base64(bytes(json))));
    }

    function _persona(uint8 style) internal pure returns (string memory) {
        if (style == 0) return "Guardian";
        if (style == 1) return "Builder";
        return "Explorer";
    }

    function _power(uint8 style, uint8 tier) internal pure returns (uint256) {
        uint256 p = style == 0 ? 120 : (style == 1 ? 110 : 100);
        return tier == 1 ? p + 30 : p;
    }

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
