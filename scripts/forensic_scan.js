const { createPublicClient, http, getContractAddress, parseAbiItem } = require('viem');

const client = createPublicClient({
  transport: http('https://rpc.mainnet.chain.robinhood.com')
});

const SENDER = '0x9895757948734FB1B4559751ABd89497544386ab';
const TOKEN = '0xad913541AA6993438AeFe1a59e29625Cdc7C3950';

async function main() {
  console.log('--- 1. Deriving Contract Addresses ---');
  for (let n = 0; n < 45; n++) {
    const addr = getContractAddress({ from: SENDER, nonce: BigInt(n) });
    const code = await client.getBytecode({ address: addr });
    if (code && code !== '0x') {
      console.log(`[FOUND CONTRACT] Deployer ${SENDER} at nonce ${n} created: ${addr}`);
    }
  }

  for (let n = 0; n < 10; n++) {
    const addr = getContractAddress({ from: TOKEN, nonce: BigInt(n) });
    const code = await client.getBytecode({ address: addr });
    if (code && code !== '0x') {
      console.log(`[FOUND CONTRACT] Address ${TOKEN} at nonce ${n} created: ${addr}`);
    }
  }

  console.log('\n--- 2. Checking Block Height ---');
  const blockNumber = await client.getBlockNumber();
  console.log('Current Block Number:', blockNumber);

  console.log('\n--- 3. Querying Transfer Logs Sent by 0x9895... ---');
  let foundLogs = [];
  const chunkSize = 2000n;
  for (let b = blockNumber; b > blockNumber - 30000n && b > 0n; b -= chunkSize) {
    const fromBlock = b - chunkSize > 0n ? b - chunkSize : 0n;
    const toBlock = b;
    try {
      const logs = await client.getLogs({
        event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
        args: {
          from: SENDER
        },
        fromBlock,
        toBlock
      });
      if (logs && logs.length > 0) {
        console.log(`Found ${logs.length} transfers between ${fromBlock} and ${toBlock}!`);
        foundLogs = foundLogs.concat(logs);
      }
    } catch (e) {
      // ignore
    }
    if (foundLogs.length >= 10) break;
  }

  console.log(`Total transfer logs found for sender: ${foundLogs.length}`);
  if (foundLogs.length > 0) {
    for (const log of foundLogs.slice(0, 5)) {
      console.log(`\nContract: ${log.address}`);
      console.log(`To: ${log.args.to}`);
      console.log(`Value: ${log.args.value}`);
      console.log(`TxHash: ${log.transactionHash}`);
      console.log(`BlockNumber: ${log.blockNumber}`);
    }
  }
}

main().catch(console.error);
