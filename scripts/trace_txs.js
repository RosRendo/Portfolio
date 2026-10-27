const { createPublicClient, http } = require('viem');

const client = createPublicClient({
  transport: http('https://rpc.mainnet.chain.robinhood.com')
});

const SENDER = '0x9895757948734FB1B4559751ABd89497544386ab';
const ADDR_TOKEN = '0xad913541AA6993438AeFe1a59e29625Cdc7C3950';

async function findFirstTxBlock(address, maxBlock) {
  let low = 0n;
  let high = maxBlock;
  let firstBlock = null;

  while (low <= high) {
    const mid = (low + high) / 2n;
    const nonce = await client.getTransactionCount({ address, blockNumber: mid });
    if (nonce > 0) {
      firstBlock = mid;
      high = mid - 1n; // look earlier
    } else {
      low = mid + 1n; // look later
    }
  }
  return firstBlock;
}

async function findTxBlockForNonce(address, targetNonce, minB, maxB) {
  let low = minB;
  let high = maxB;
  let foundBlock = null;

  while (low <= high) {
    const mid = (low + high) / 2n;
    const nonce = await client.getTransactionCount({ address, blockNumber: mid });
    if (nonce >= targetNonce) {
      foundBlock = mid;
      high = mid - 1n;
    } else {
      low = mid + 1n;
    }
  }
  return foundBlock;
}

async function run() {
  const latestBlock = await client.getBlockNumber();
  console.log('Current block:', latestBlock);

  console.log('\n--- Tracing 0xad913541AA6993438AeFe1a59e29625Cdc7C3950 (Nonce: 5) ---');
  const firstBlockAd = await findFirstTxBlock(ADDR_TOKEN, latestBlock);
  console.log('First tx block for 0xad91...:', firstBlockAd);
  if (firstBlockAd) {
    const block = await client.getBlock({ blockNumber: firstBlockAd, includeTransactions: true });
    console.log('Block time:', new Date(Number(block.timestamp) * 1000).toISOString());
    for (const tx of block.transactions) {
      if (tx.from.toLowerCase() === ADDR_TOKEN.toLowerCase()) {
        console.log(`Found TX from 0xad91: hash=${tx.hash}, to=${tx.to}, value=${tx.value}, data=${tx.input.slice(0, 74)}`);
      }
    }
  }

  console.log('\n--- Tracing Sender 0x9895757948734FB1B4559751ABd89497544386ab (Nonce: 43) ---');
  const firstBlockSender = await findFirstTxBlock(SENDER, latestBlock);
  console.log('First tx block for Sender 0x9895...:', firstBlockSender);
  if (firstBlockSender) {
    const block = await client.getBlock({ blockNumber: firstBlockSender, includeTransactions: true });
    console.log('Block time:', new Date(Number(block.timestamp) * 1000).toISOString());
    for (const tx of block.transactions) {
      if (tx.from.toLowerCase() === SENDER.toLowerCase()) {
        console.log(`Found TX from Sender: hash=${tx.hash}, to=${tx.to}, value=${tx.value}, data=${tx.input.slice(0, 74)}`);
      }
    }
  }

  // Also trace latest tx for sender (nonce 43)
  const lastBlockSender = await findTxBlockForNonce(SENDER, 43, firstBlockSender || 0n, latestBlock);
  console.log('Latest tx block for Sender (nonce 43):', lastBlockSender);
  if (lastBlockSender) {
    const block = await client.getBlock({ blockNumber: lastBlockSender, includeTransactions: true });
    console.log('Latest Block time:', new Date(Number(block.timestamp) * 1000).toISOString());
    for (const tx of block.transactions) {
      if (tx.from.toLowerCase() === SENDER.toLowerCase()) {
        console.log(`Latest TX from Sender: hash=${tx.hash}, to=${tx.to}, value=${tx.value}, data=${tx.input.slice(0, 74)}`);
      }
    }
  }
}

run().catch(console.error);
