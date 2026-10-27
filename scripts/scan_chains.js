const { createPublicClient, http } = require('viem');
const { mainnet, bsc, polygon, arbitrum, optimism, avalanche, base, linea, scroll, blast } = require('viem/chains');

const chains = [
  { chain: mainnet, rpc: 'https://eth.llamarpc.com' },
  { chain: bsc, rpc: 'https://binance.llamarpc.com' },
  { chain: polygon, rpc: 'https://polygon.llamarpc.com' },
  { chain: arbitrum, rpc: 'https://arb1.arbitrum.io/rpc' },
  { chain: optimism, rpc: 'https://mainnet.optimism.io' },
  { chain: avalanche, rpc: 'https://api.avax.network/ext/bc/C/rpc' },
  { chain: base, rpc: 'https://mainnet.base.org' },
  { chain: linea, rpc: 'https://rpc.linea.build' },
  { chain: scroll, rpc: 'https://rpc.scroll.io' },
  { chain: blast, rpc: 'https://rpc.blast.io' },
];

const ADDR = '0xad913541AA6993438AeFe1a59e29625Cdc7C3950';

async function scan() {
  console.log('Scanning address', ADDR, 'across major EVM chains:');
  for (const c of chains) {
    try {
      const client = createPublicClient({ transport: http(c.rpc) });
      const code = await client.getBytecode({ address: ADDR });
      const hasCode = code && code !== '0x' && code.length > 2;
      console.log(`[${c.chain.name}] Code: ${hasCode ? 'YES (Length ' + code.length + ')' : '0x (EOA)'}`);
    } catch (e) {
      console.log(`[${c.chain.name}] RPC Error: ${e.message.slice(0, 60)}`);
    }
  }
}

scan().catch(console.error);
