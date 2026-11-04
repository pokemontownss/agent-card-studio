# Agent Card Studio

**Free mint is LIVE.** 4,444 Agent ID cards on BNB Chain — every card's artwork is
rendered 100% on-chain as SVG by the contract itself (no IPFS, no external image server).
Each mint draws a random serial from the shared pool #1–#4444.

- **Site:** https://agentcard.cloud
- **X:** [@AgentCard_Bnb](https://x.com/AgentCard_Bnb)
- **For AI agents:** machine-readable mint instructions at https://agentcard.cloud/llms.txt

## Mint with an AI agent (copy-paste)

> Mint 1 Agent Card NFT on BSC. CA: 0x0716bD547494e7B8E45C15266F03a43915982C6e. Check mintOpen=true, freeMintUsed=false, mintCount<2 for my wallet - else stop and tell me. Call freeMint(my Agent ID + ".ai", 0, "#7C4DFF", "") with exactly 0.0002 BNB (anti-sybil fee). Reply tx link.

Direct wallet mint is also available on the site under "Advanced" on the confirmation screen.

## Contracts (BNB Smart Chain, chainId 56)

| Contract | Address |
|---|---|
| AgentCard (ERC-721) | `0x0716bD547494e7B8E45C15266F03a43915982C6e` |
| $ACARD (ERC-20) | `0x3A56270f7A8c78E9cC4A8A9f18e375cd184F1133` |
| CardBurn | `0x83EE9bB4c76019fAf5dd1451CB8f41bC78d68323` |
| CardStake | `0xFB9139F2c6996141dAc67fF98C965A4BEF43a250` |

## The collection

- **Personas (style):** 0 = Whale (Power 120), 1 = Shark (110), 2 = Sniper (100). Paid Edition adds +30 Power and a gold name.
- **Free Mint:** 0.0002 BNB anti-sybil fee, max 1 free mint per wallet.
- **Paid Mint:** 0.002 BNB.
- **Limit:** max 2 cards per wallet across both editions.
- **Names:** 1–32 chars; names ending in `.ai` automatically receive an "Agent ID" trait. Optional signature text (max 24 chars) is engraved on the card.
- **Colors:** 18 card colors.

## $ACARD

Fixed supply 1,000,000,000. Burn pool 222,200,000 / stake pool 200,000,000 / project reserve 577,800,000.

- **Burn** a card forever (sent to the dead address): **50,000 $ACARD** (0.0001 BNB action fee).
- **Stake** a card: **500 $ACARD/day** (0.0001 BNB action fee; claim and unstake are free, unstake always returns the card).

## Files

- `index.html`, `styles.css`, `app.js` — the static site (GitHub Pages)
- `llms.txt` — machine-readable instructions for AI agents
- `deploy.html` — owner deployment tool (direct URL only)
- `contracts/` — Solidity sources (solc 0.8.26, viaIR, optimizer 200)

Agent Card Studio is an unofficial collectible project. It is **not** an official Binance
Agent ID credential and is not affiliated with Binance.
