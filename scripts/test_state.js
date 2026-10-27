const { createPublicClient, http } = require('viem');

const client = createPublicClient({
  transport: http('https://rpc.mainnet.chain.robinhood.com')
});

const ADDR = '0xad913541AA6993438AeFe1a59e29625Cdc7C3950';

async function testStateDepth() {
  const current = await client.getBlockNumber();
  console.log('Current block:', current);

  const testOffsets = [10n, 50n, 100n, 500n, 1000n, 5000n, 10000n, 50000n, 100000n];
  for (const offset of testOffsets) {
    const target = current - offset;
    try {
      const nonce = await client.getTransactionCount({ address: ADDR, blockNumber: target });
      console.log(`State available at -${offset} blocks (${target}): Nonce=${nonce}`);
    } catch (e) {
      console.log(`State NOT available at -${offset} blocks (${target}): ${e.details || e.message}`);
      break;
    }
  }
}

testStateDepth().catch(console.error);
