// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface ICardNFT2 {
    function ownerOf(uint256 tokenId) external view returns (address);
    function transferFrom(address from, address to, uint256 tokenId) external;
}

interface IACARD2 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
}

/// @title CardStake - stake an Agent Card NFT, earn ACARD daily
/// @notice Staking escrows the NFT in this contract. Rewards accrue at
///         ratePerDay per staked card and are paid from the funded pool.
///         Unstaking always returns the NFT, even if the pool runs dry
///         (the reward is then capped at what the pool still holds).
///         The holder must approve this contract on the NFT first.
contract CardStake {
    address public owner;
    ICardNFT2 public nft;
    IACARD2 public token;
    uint256 public ratePerDay = 500 * 10 ** 18;
    uint256 public actionFee = 0.0001 ether;

    struct StakeInfo {
        address owner;
        uint64 since;
    }

    mapping(uint256 => StakeInfo) public stakes;

    event Staked(address indexed user, uint256 indexed tokenId);
    event Claimed(address indexed user, uint256 indexed tokenId, uint256 amount);
    event Unstaked(address indexed user, uint256 indexed tokenId, uint256 amount);

    constructor(address token_) {
        owner = msg.sender;
        token = IACARD2(token_);
    }

    function setNft(address nft_) external {
        require(msg.sender == owner, "Not owner");
        nft = ICardNFT2(nft_);
    }

    function setRate(uint256 rate_) external {
        require(msg.sender == owner, "Not owner");
        ratePerDay = rate_;
    }

    function setActionFee(uint256 fee_) external {
        require(msg.sender == owner, "Not owner");
        actionFee = fee_;
    }

    function withdraw() external {
        require(msg.sender == owner, "Not owner");
        (bool ok, ) = payable(owner).call{value: address(this).balance}("");
        require(ok, "Withdraw failed");
    }

    function poolBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function pendingReward(uint256 tokenId) public view returns (uint256) {
        StakeInfo memory info = stakes[tokenId];
        if (info.owner == address(0)) return 0;
        return (block.timestamp - info.since) * ratePerDay / 86400;
    }

    function stake(uint256 tokenId) external payable {
        require(msg.value >= actionFee, "Fee too low");
        require(address(nft) != address(0), "NFT not set");
        require(stakes[tokenId].owner == address(0), "Already staked");
        nft.transferFrom(msg.sender, address(this), tokenId);
        stakes[tokenId] = StakeInfo(msg.sender, uint64(block.timestamp));
        emit Staked(msg.sender, tokenId);
    }

    function claim(uint256 tokenId) public {
        StakeInfo storage info = stakes[tokenId];
        require(info.owner == msg.sender, "Not your stake");
        uint256 amount = pendingReward(tokenId);
        require(token.balanceOf(address(this)) >= amount, "Pool empty");
        info.since = uint64(block.timestamp);
        if (amount > 0) {
            require(token.transfer(msg.sender, amount), "Pay failed");
        }
        emit Claimed(msg.sender, tokenId, amount);
    }

    function unstake(uint256 tokenId) external {
        StakeInfo memory info = stakes[tokenId];
        require(info.owner == msg.sender, "Not your stake");
        uint256 amount = (block.timestamp - info.since) * ratePerDay / 86400;
        delete stakes[tokenId];
        uint256 pool = token.balanceOf(address(this));
        if (amount > pool) amount = pool;
        if (amount > 0) {
            require(token.transfer(msg.sender, amount), "Pay failed");
        }
        nft.transferFrom(address(this), msg.sender, tokenId);
        emit Unstaked(msg.sender, tokenId, amount);
    }

    function withdrawToken(uint256 amount) external {
        require(msg.sender == owner, "Not owner");
        require(token.transfer(owner, amount), "Pay failed");
    }

    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
        return 0x150b7a02;
    }
}
