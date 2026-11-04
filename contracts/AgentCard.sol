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
    uint256 public constant MAX_SUPPLY = 4444;
    uint256 public totalMinted;
    uint256 public freeMintPrice = 0.0002 ether; // anti-sybil fee
    uint256 public paidMintPrice = 0.002 ether;
    bool public mintOpen = true;

    uint8 public constant TIER_FREE = 0;
    uint8 public constant TIER_PAID = 1;

    struct Card {
        string agentName;
        uint8 style; // 0 = Guardian, 1 = Builder, 2 = Explorer
        string colorHex; // "#RRGGBB"
        uint8 tier; // 0 = Free, 1 = Paid
        string signature; // optional, max 24 chars, drawn on the card
    }
    mapping(uint256 => Card) public cards;
    mapping(address => bool) public freeMintUsed;
    uint256 public constant MAX_PER_WALLET = 2;
    mapping(address => uint256) public mintCount;

    // ---------- ERC-721 storage ----------
    mapping(uint256 => address) private _owners;
    uint256[18] private _takenBits; // 4,444 bits: serial numbers already drawn
    uint256[] private _mintOrder; // token IDs in mint order, for the live mint feed
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
    function freeMint(string calldata agentName, uint8 style, string calldata colorHex, string calldata signature) external payable returns (uint256) {
        require(!freeMintUsed[msg.sender], "Free mint used");
        require(msg.value >= freeMintPrice, "Insufficient BNB");
        freeMintUsed[msg.sender] = true;
        return _issue(agentName, style, colorHex, signature, TIER_FREE);
    }

    /// @notice Paid mint: premium gold design. Each wallet can mint at most MAX_PER_WALLET cards in total.
    function paidMint(string calldata agentName, uint8 style, string calldata colorHex, string calldata signature) external payable returns (uint256) {
        require(msg.value >= paidMintPrice, "Insufficient BNB");
        return _issue(agentName, style, colorHex, signature, TIER_PAID);
    }

    function _isTaken(uint256 id) internal view returns (bool) {
        uint256 bit = id - 1;
        return (_takenBits[bit / 256] >> (bit % 256)) & 1 == 1;
    }

    function _markTaken(uint256 id) internal {
        uint256 bit = id - 1;
        _takenBits[bit / 256] |= (uint256(1) << (bit % 256));
    }

    /// @notice Draws a random unused serial from the shared #1-#4444 pool.
    function _drawId(address minter) internal view returns (uint256) {
        uint256 probe = uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp, minter, totalMinted))) % MAX_SUPPLY;
        while (_isTaken(probe + 1)) {
            probe = (probe + 1) % MAX_SUPPLY;
        }
        return probe + 1;
    }

    function _issue(string calldata agentName, uint8 style, string calldata colorHex, string calldata signature, uint8 tier) internal returns (uint256 tokenId) {
        require(mintOpen, "Mint is closed");
        require(mintCount[msg.sender] < MAX_PER_WALLET, "Mint limit");
        require(totalMinted < MAX_SUPPLY, "Sold out");
        uint256 nameLength = bytes(agentName).length;
        require(nameLength >= 1 && nameLength <= 32, "Name must be 1-32");
        require(style <= 2);
        require(bytes(colorHex).length == 7);
        require(bytes(signature).length <= 24);

        tokenId = _drawId(msg.sender);
        _markTaken(tokenId);
        _mintOrder.push(tokenId);
        totalMinted += 1;
        cards[tokenId] = Card(agentName, style, colorHex, tier, signature);
        _owners[tokenId] = msg.sender;
        _balances[msg.sender] += 1;
        mintCount[msg.sender] += 1;
        emit Transfer(address(0), msg.sender, tokenId);
        emit CardMinted(msg.sender, tokenId, agentName, style, tier);
    }

    /// @notice The most recent minted token IDs, newest first (for live feeds).
    function recentMintIds(uint256 limit) external view returns (uint256[] memory ids) {
        uint256 n = totalMinted < limit ? totalMinted : limit;
        ids = new uint256[](n);
        for (uint256 i = 0; i < n; i++) {
            ids[i] = _mintOrder[totalMinted - 1 - i];
        }
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
        string memory svg = _buildSvg(tokenId, c);
        uint8 sCls = _serialClass(tokenId);
        string memory classAttr = string(abi.encodePacked(',{"trait_type":"Serial Class","value":"', sCls == 1 ? 'Founder' : (sCls == 2 ? 'Rare' : 'Standard'), '"}'));
        string memory aiAttr = _endsWithAi(c.agentName)
            ? string(abi.encodePacked(',{"trait_type":"Agent ID","value":"', c.agentName, '"}'))
            : "";
        string memory sigAttr = bytes(c.signature).length > 0
            ? string(abi.encodePacked(',{"trait_type":"Signature","value":"', c.signature, '"}'))
            : "";
        string memory json = string(abi.encodePacked(
            '{"name":"', c.agentName, ' - Agent Card #', _toString(tokenId), '",',
            '"description":"A premium metal Agent Card on BNB Chain. Random serial from the shared pool, rendered fully on-chain as SVG. Not an official Binance Agent ID.",',
            '"image":"data:image/svg+xml;base64,', _base64(bytes(svg)), '",',
            '"attributes":[',
            '{"trait_type":"Persona","value":"', _persona(c.style), '"},',
            '{"trait_type":"Agent Name","value":"', c.agentName, '"},',
            '{"trait_type":"Color","value":"', c.colorHex, '"},',
            '{"trait_type":"Edition","value":"', c.tier == 1 ? "Paid" : "Free", '"},',
            '{"trait_type":"Rarity","value":"', c.tier == 1 ? "Rare Holo" : "Common", '"},',
            '{"trait_type":"Power","value":', _toString(_power(c.style, c.tier)), '}',
            classAttr, aiAttr, sigAttr,
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

    /// @notice 0 = Standard, 1 = Founder (serial #1-#100), 2 = Rare pattern.
    function _serialClass(uint256 id) internal pure returns (uint8) {
        if (id <= 100) return 1;
        if (id == MAX_SUPPLY) return 2;
        uint256 n = id;
        uint256 rev = 0;
        while (n > 0) { rev = rev * 10 + (n % 10); n /= 10; }
        if (rev == id) return 2;
        uint256 d = id % 10;
        n = id / 10;
        bool same = id >= 10;
        while (n > 0) { if (n % 10 != d) { same = false; break; } n /= 10; }
        return same ? 2 : 0;
    }

    function _endsWithAi(string memory str) internal pure returns (bool) {
        bytes memory b = bytes(str);
        if (b.length < 3) return false;
        return b[b.length - 3] == "." && b[b.length - 2] == "a" && b[b.length - 1] == "i";
    }

    function _firstChar(string memory str) internal pure returns (string memory) {
        bytes memory b = bytes(str);
        if (b.length == 0) return "";
        bytes memory out = new bytes(1);
        out[0] = b[0];
        return string(out);
    }

    function _buildSvg(uint256 tokenId, Card memory c) internal pure returns (string memory) {
        string memory L1 = _mixStr(c.colorHex, true, 55);
        string memory L2 = _mixStr(c.colorHex, true, 22);
        string memory D1 = _mixStr(c.colorHex, false, 38);
        string memory D2 = _mixStr(c.colorHex, false, 55);
        bool paid = c.tier == 1;
        string memory sparkles = paid
            ? '<g fill="#ffffff"><use href="#st" transform="translate(56 128)" opacity="0.85"/><use href="#st" transform="translate(356 140) scale(0.7)" opacity="0.7"/><use href="#st" transform="translate(84 448) scale(0.6)" opacity="0.55"/><use href="#st" transform="translate(322 458) scale(0.85)" opacity="0.75"/></g><g fill="#FFE9A8"><use href="#st" transform="translate(210 118) scale(0.55)" opacity="0.95"/><use href="#st" transform="translate(38 302) scale(0.5)" opacity="0.75"/></g>'
            : '<g fill="#ffffff"><use href="#st" transform="translate(56 128)" opacity="0.6"/><use href="#st" transform="translate(356 140) scale(0.7)" opacity="0.5"/><use href="#st" transform="translate(84 448) scale(0.6)" opacity="0.4"/><use href="#st" transform="translate(322 458) scale(0.85)" opacity="0.55"/></g>';
        uint8 sClass = _serialClass(tokenId);
        string memory classSvg = sClass == 0 ? "" : string(abi.encodePacked('<text x="210" y="364" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="700" letter-spacing="3.5" fill="#17130E" fill-opacity="0.78">&#9670; ', sClass == 1 ? 'FOUNDER SERIAL' : 'RARE SERIAL', ' &#9670;</text>'));
        string memory frameSvg = paid ? '<use href="#fr" fill="none" stroke="#8a6a1f" stroke-opacity="0.5"/><use href="#fd" opacity="0.85"/>' : "";
        string memory sigSvg = bytes(c.signature).length > 0
            ? string(abi.encodePacked('<text x="390" y="480" text-anchor="end" transform="rotate(-3 390 480)" font-family="\'Brush Script MT\',\'Segoe Script\',\'Snell Roundhand\',cursive" font-size="21" fill="#17130E" fill-opacity="0.85">', _esc(c.signature), '</text><path d="M302 489 Q345 495 388 487" stroke="#17130E" stroke-opacity="0.35" stroke-width="1.3" fill="none" stroke-linecap="round"/>'))
            : "";
        string memory overlay = paid
            ? '<rect x="6" y="6" width="408" height="582" rx="26" fill="url(#holo)" opacity="0.16"/><rect x="6" y="6" width="408" height="582" rx="26" fill="url(#sheen)" opacity="0.5"/>'
            : '<rect x="6" y="6" width="408" height="582" rx="26" fill="url(#sheen)" opacity="0.28"/>';
        return string(abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" width="420" height="594" viewBox="0 0 420 594"><defs>',
            '<linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="', L1, '"/><stop offset="0.2" stop-color="', c.colorHex, '"/><stop offset="0.42" stop-color="', D1, '"/><stop offset="0.62" stop-color="', L2, '"/><stop offset="0.82" stop-color="', D2, '"/><stop offset="1" stop-color="', L1, '"/></linearGradient>',
            '<linearGradient id="sheen" x1="0" y1="0" x2="0.7" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.55"/><stop offset="0.45" stop-color="#ffffff" stop-opacity="0.05"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>',
            '<linearGradient id="holo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5f6d"/><stop offset="0.25" stop-color="#ffc371"/><stop offset="0.5" stop-color="#8aff80"/><stop offset="0.75" stop-color="#4dc9ff"/><stop offset="1" stop-color="#b18cff"/></linearGradient>',
            '<linearGradient id="goldText" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6a1f"/><stop offset="0.5" stop-color="#f7e08b"/><stop offset="1" stop-color="#b8860b"/></linearGradient><g id="geo"><circle cx="210" cy="282" r="120"/><circle cx="210" cy="282" r="76"/><line x1="86" y1="96" x2="86" y2="468"/><line x1="334" y1="96" x2="334" y2="468"/><path d="M86 152 A56 56 0 0 0 142 96"/><path d="M334 152 A56 56 0 0 1 278 96"/><path d="M86 412 A56 56 0 0 1 142 468"/><path d="M334 412 A56 56 0 0 0 278 468"/><rect x="22" y="22" width="376" height="550" rx="16"/></g><path id="st" d="M0 -12 L3 -3 L12 0 L3 3 L0 12 L-3 3 L-12 0 L-3 -3 Z"/><g id="fr"><rect x="30" y="30" width="360" height="534" rx="12"/><path d="M22 22 l7 -7 M398 22 l-7 -7 M22 572 l7 7 M398 572 l-7 7" stroke-linecap="round"/></g><g id="fd" fill="#8a6a1f"><rect x="-4" y="-4" width="8" height="8" transform="translate(22 22) rotate(45)"/><rect x="-4" y="-4" width="8" height="8" transform="translate(398 22) rotate(45)"/><rect x="-4" y="-4" width="8" height="8" transform="translate(22 572) rotate(45)"/><rect x="-4" y="-4" width="8" height="8" transform="translate(398 572) rotate(45)"/></g></defs>',
            '<rect x="6" y="6" width="408" height="582" rx="26" fill="url(#metal)"/>', overlay,
            sparkles,
            '<use href="#geo" fill="none" stroke="#17130E" stroke-opacity="0.12"/><use href="#geo" transform="translate(0 1.3)" fill="none" stroke="#ffffff" stroke-opacity="0.13"/>', frameSvg,
            '<rect x="14" y="14" width="392" height="566" rx="20" fill="none" stroke="#ffffff" stroke-opacity="0.38" stroke-width="1.5"/>',
            '<rect x="6" y="6" width="408" height="582" rx="26" fill="none" stroke="#000000" stroke-opacity="0.45" stroke-width="2"/>',
            '<path d="M6 34 L158 34 L146 60 L6 60 Z" fill="#ffffff" fill-opacity="0.16" stroke="#17130E" stroke-opacity="0.18"/>',
            '<text x="30" y="54" font-family="Arial, sans-serif" font-size="12.5" font-weight="700" letter-spacing="3.5" fill="#17130E" fill-opacity="0.88">AGENT CARD</text>',
            '<text x="390" y="54" text-anchor="end" font-family="Arial, sans-serif" font-size="11.5" font-weight="700" letter-spacing="2" fill="#17130E" fill-opacity="0.88">', 'ONE AND ONLY', '</text>',
            '<rect x="30" y="66" width="360" height="1.4" fill="#000000" fill-opacity="0.28"/><rect x="30" y="67.6" width="360" height="1" fill="#ffffff" fill-opacity="0.35"/>',
            '<text x="210" y="356" text-anchor="middle" font-family="Arial, sans-serif" font-size="205" font-weight="800" fill="#17130E" fill-opacity="0.055">', _esc(_firstChar(c.agentName)), '</text>',
            '<text x="211.5" y="291" text-anchor="middle" font-family="Arial, sans-serif" font-size="', _nameSize(bytes(c.agentName).length), '" font-weight="800" letter-spacing="0.5" fill="#ffffff" fill-opacity="0.35">', _esc(c.agentName), '</text>',
            '<text x="210" y="289.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="', _nameSize(bytes(c.agentName).length), '" font-weight="800" letter-spacing="0.5" fill="', paid ? 'url(#goldText)' : '#17130E', '">', _esc(c.agentName), '</text>',
            '<text x="210" y="330" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="4.5" fill="#17130E" fill-opacity="0.72">', c.style == 0 ? 'GUARDIAN' : (c.style == 1 ? 'BUILDER' : 'EXPLORER'), '</text>',
            classSvg,
            sigSvg,
            '<rect x="30" y="502" width="360" height="1.2" fill="#000000" fill-opacity="0.22"/><rect x="30" y="503.4" width="360" height="1" fill="#ffffff" fill-opacity="0.3"/>',
            '<text x="30" y="540" font-family="Arial, sans-serif" font-size="13.5" font-weight="700" letter-spacing="1.6" fill="#17130E" fill-opacity="0.88">No. ', _pad4(tokenId), ' / 4444</text>',
            '<g transform="translate(291 533) rotate(45)" fill="#17130E" fill-opacity="0.8"><rect x="-4.5" y="-4.5" width="9" height="9"/></g>',
            '<text x="390" y="540" text-anchor="end" font-family="Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="2.2" fill="#17130E" fill-opacity="0.8">BNB CHAIN</text>',
            '<text x="210" y="570" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.5" letter-spacing="1.4" fill="#17130E" fill-opacity="0.55">COLLECTIBLE CARD &#183; NOT AN OFFICIAL BINANCE AGENT ID</text>',
            '</svg>'
        ));
    }

    function _nameSize(uint256 len) internal pure returns (string memory) {
        if (len <= 10) return "44";
        if (len <= 14) return "37";
        if (len <= 20) return "30";
        if (len <= 26) return "25";
        return "21";
    }

    function _hexVal(bytes1 ch) internal pure returns (uint256) {
        if (ch >= "0" && ch <= "9") return uint8(ch) - 48;
        if (ch >= "a" && ch <= "f") return uint8(ch) - 87;
        if (ch >= "A" && ch <= "F") return uint8(ch) - 55;
        return 0;
    }

    function _byteHex(uint256 v) internal pure returns (string memory) {
        bytes memory digits = "0123456789abcdef";
        bytes memory out = new bytes(2);
        out[0] = digits[v >> 4];
        out[1] = digits[v & 15];
        return string(out);
    }

    function _mixStr(string memory h, bool toWhite, uint256 pct) internal pure returns (string memory) {
        bytes memory b = bytes(h);
        if (b.length != 7) return h;
        string memory out = "#";
        for (uint256 i = 0; i < 3; i++) {
            uint256 v = _hexVal(b[1 + i * 2]) * 16 + _hexVal(b[2 + i * 2]);
            v = toWhite ? v + (255 - v) * pct / 100 : v - v * pct / 100;
            out = string(abi.encodePacked(out, _byteHex(v)));
        }
        return out;
    }

    function _esc(string memory s) internal pure returns (string memory) {
        bytes memory b = bytes(s);
        uint256 extra = 0;
        for (uint256 i = 0; i < b.length; i++) {
            if (b[i] == "&") extra += 4;
            else if (b[i] == "<" || b[i] == ">") extra += 3;
            else if (b[i] == '"') extra += 5;
            else if (b[i] == "'") extra += 4;
        }
        if (extra == 0) return s;
        bytes memory out = new bytes(b.length + extra);
        uint256 j = 0;
        for (uint256 i = 0; i < b.length; i++) {
            bytes1 ch = b[i];
            if (ch == "&") { out[j++] = "&"; out[j++] = "a"; out[j++] = "m"; out[j++] = "p"; out[j++] = ";"; }
            else if (ch == "<") { out[j++] = "&"; out[j++] = "l"; out[j++] = "t"; out[j++] = ";"; }
            else if (ch == ">") { out[j++] = "&"; out[j++] = "g"; out[j++] = "t"; out[j++] = ";"; }
            else if (ch == '"') { out[j++] = "&"; out[j++] = "q"; out[j++] = "u"; out[j++] = "o"; out[j++] = "t"; out[j++] = ";"; }
            else if (ch == "'") { out[j++] = "&"; out[j++] = "a"; out[j++] = "p"; out[j++] = "o"; out[j++] = "s"; out[j++] = ";"; }
            else { out[j++] = ch; }
        }
        return string(out);
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
