# Agent Card Studio

Mint your own Agent Card as a real NFT on BNB Chain.

- **Network:** BNB Smart Chain (mainnet, chainId 56)
- **Contract:** `AgentCard` (ERC-721, symbol ACARD) — address appears here once deployed
- **Card data:** agent name, persona (Guardian / Builder / Explorer) and color are stored on-chain; the card image is an SVG rendered by the contract itself (tokenURI is fully on-chain, no external image server)
- **Mint price:** set by the contract (default 0.0005 BNB), plus network gas, paid from your own wallet
- **Supply:** max 10,000

Agent Card is a collectible digital card. It is **not** an official Binance Agent ID credential and is not affiliated with Binance.

## Files
- `index.html`, `styles.css`, `app.js` — the static site (GitHub Pages)
- `contracts/AgentCard.sol` — the ERC-721 contract source (solc 0.8.26, optimizer 200, viaIR)
