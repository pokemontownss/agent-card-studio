// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface ICardNFT {
    function ownerOf(uint256 tokenId) external view returns (address);
    function transferFrom(address from, address to, uint256 tokenId) external;
}

interface IACARD {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
}

/// @title CardBurn - burn an Agent Card NFT, receive ACARD
/// @notice Burning sends the NFT to the dead address forever (the AgentCard
///         contract has no burn function, so this is the permanent sink) and
///         pays the reward from this contract's funded ACARD pool.
///         The holder must approve this contract on the NFT first.
contract CardBurn {
    address public constant DEAD = 0x000000000000000000000000000000000000dEaD;

    address public owner;
    ICardNFT public nft;
    IACARD public token;
    uint256 public reward = 50_000 * 10 ** 18;
    uint256 public totalBurned;

    event Burned(address indexed user, uint256 indexed tokenId, uint256 rewardPaid);

    constructor(address token_) {
        owner = msg.sender;
        token = IACARD(token_);
    }

    function setNft(address nft_) external {
        require(msg.sender == owner, "Not owner");
        nft = ICardNFT(nft_);
    }

    function setReward(uint256 reward_) external {
        require(msg.sender == owner, "Not owner");
        reward = reward_;
    }

    function poolBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function burn(uint256 tokenId) external {
        require(address(nft) != address(0), "NFT not set");
        require(nft.ownerOf(tokenId) == msg.sender, "Not your card");
        require(token.balanceOf(address(this)) >= reward, "Pool empty");
        nft.transferFrom(msg.sender, DEAD, tokenId);
        require(token.transfer(msg.sender, reward), "Pay failed");
        totalBurned += 1;
        emit Burned(msg.sender, tokenId, reward);
    }

    function withdrawToken(uint256 amount) external {
        require(msg.sender == owner, "Not owner");
        require(token.transfer(owner, amount), "Pay failed");
    }
}
