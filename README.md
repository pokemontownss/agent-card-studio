# Agent Card Studio

Mint your own Agent Card as a real NFT on BNB Chain.

- **Network:** BNB Smart Chain (mainnet, chainId 56)
- **Contract:** `AgentCard` (ERC-721, symbol ACARD) — address appears here once deployed
- **Card data:** agent name, persona (Guardian / Builder / Explorer) and color are stored on-chain; the card image is an SVG rendered by the contract itself (tokenURI is fully on-chain, no external image server)
- **Two mint editions:** Free Mint (anti-sybil fee, default 0.0001 BNB, max 1 per wallet, standard design) and Paid Mint (default 0.0005 BNB, premium gold holographic trading-card design, Power +30) — plus network gas, paid from your own wallet
- **Card art:** premium METAL card (Binance Agent ID card style) — brushed-metal finish in the minter's chosen color, rich persona artwork (Guardian / Builder / Explorer illustrations in `assets/`), embossed agent name, card chip, edition + rarity (Common for Free, Rare Holo for Paid). The NFT image is the persona artwork hosted in this repo; the full metal card face is rendered by this site from the on-chain card data (name, persona, color, edition)
- **Supply:** max 10,000

Agent Card is a collectible digital card. It is **not** an official Binance Agent ID credential and is not affiliated with Binance.

## Files
- `index.html`, `styles.css`, `app.js` — the static site (GitHub Pages)
- `contracts/AgentCard.sol` — the ERC-721 contract source (solc 0.8.26, optimizer 200, viaIR)
