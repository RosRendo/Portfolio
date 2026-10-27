const { createPublicClient, http } = require('viem');

const client = createPublicClient({
  transport: http('https://rpc.mainnet.chain.robinhood.com')
});

async function checkBlocks() {
  const latestBlock = await client.getBlock({ blockTag: 'latest' });
  console.log('Latest Block Number:', latestBlock.number);
  console.log('Latest Block Timestamp:', new Date(Number(latestBlock.timestamp) * 1000).toISOString());
  console.log('Transactions in latest block:', latestBlock.transactions.length);

  const prevBlock = await client.getBlock({ blockNumber: latestBlock.number - 1000n });
  console.log('Block -1000 Timestamp:', new Date(Number(prevBlock.timestamp) * 1000).toISOString());
  const diffSec = Number(latestBlock.timestamp - prevBlock.timestamp);
  console.log('Time for 1000 blocks:', diffSec, 'seconds (~' + (diffSec/1000).toFixed(2) + 's/block)');
}

checkBlocks().catch(console.error);
