# Agent Card Studio

Mint your own Agent Card as a real NFT on BNB Chain.

- **Network:** BNB Smart Chain (mainnet, chainId 56)
- **Contract:** `AgentCard` (ERC-721, symbol ACARD) — address appears here once deployed
- **Card data:** agent name, persona (Guardian / Builder / Explorer) and color are stored on-chain; the card image is an SVG rendered by the contract itself (tokenURI is fully on-chain, no external image server)
- **Two mint editions:** Free Mint (anti-sybil fee, default 0.0001 BNB, max 1 per wallet, standard design) and Paid Mint (default 0.0005 BNB, premium gold holographic trading-card design, Power +30) — plus network gas, paid from your own wallet
- **Card art:** premium MINIMAL metal card (Binance Agent ID card style) — brushed-metal finish in the minter's chosen color (10 colors), engraved concentric circles, a randomly drawn serial number (#1-#10000 shared pool, drawn by the contract at mint), the agent name as the hero in the center, persona in small caps, edition + rarity (Common for Free, Rare Holo for Paid). The card SVG is rendered fully on-chain by the contract (tokenURI image is a data URI); the site preview and PNG download mirror the same design. The persona illustrations in `assets/` remain available as promo art
- **Supply:** max 10,000

Agent Card is a collectible digital card. It is **not** an official Binance Agent ID credential and is not affiliated with Binance.

## Files
- `index.html`, `styles.css`, `app.js` — the static site (GitHub Pages)
- `contracts/AgentCard.sol` — the ERC-721 contract source (solc 0.8.26, optimizer 200, viaIR)
