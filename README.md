# Agent Card Studio

Mint your own Agent Card as a real NFT on BNB Chain.

- **Network:** BNB Smart Chain (mainnet, chainId 56)
- **Contract:** `AgentCard` (ERC-721, symbol ACARD) — address appears here once deployed
- **Card data:** agent name, persona (Whale / Shark / Sniper) and color are stored on-chain; the card image is an SVG rendered by the contract itself (tokenURI is fully on-chain, no external image server)
- **Two mint editions:** Free Mint (anti-sybil fee, default 0.0002 BNB, max 1 free mint per wallet, standard design) and Paid Mint (default 0.002 BNB, premium gold holographic trading-card design, Power +30). Every wallet can mint at most 2 cards in total across both editions, and all mint payments accumulate in the contract for the owner to withdraw — plus network gas, paid from your own wallet
- **Card art:** premium MINIMAL metal card (Binance Agent ID card style) — brushed-metal finish in the minter's chosen color (10 colors), engraved concentric circles, a randomly drawn serial number (#1-#4444 shared pool, drawn by the contract at mint), the agent name as the hero in the center, persona in small caps, edition + rarity (Common for Free, Rare Holo for Paid). The card SVG is rendered fully on-chain by the contract (tokenURI image is a data URI); the site preview and PNG download mirror the same design. The persona illustrations in `assets/` remain available as promo art
- **Supply:** max 4,444

Agent Card is a collectible digital card. It is **not** an official Binance Agent ID credential and is not affiliated with Binance.

## Files
- `index.html`, `styles.css`, `app.js` — the static site (GitHub Pages)
- `contracts/AgentCard.sol` — the ERC-721 contract source (solc 0.8.26, optimizer 200, viaIR)
- `contracts/ACARD.sol` — the $ACARD reward token (ERC-20, fixed supply 1,000,000,000)
- `contracts/CardBurn.sol` — burn an Agent Card (sent to the dead address forever) for 50,000 $ACARD, paid from a funded pool of 222,200,000 $ACARD
- `contracts/CardStake.sol` — stake an Agent Card to earn 500 $ACARD per day from a funded pool of 200,000,000 $ACARD; unstake anytime to get the card back

## Minting via AI agent
The Mint section also offers copy-ready agent prompts (free / paid, quantity 1–2) plus read-only "Check your mints" by wallet address — no wallet connection needed for those. The studio's direct wallet mint remains available.
