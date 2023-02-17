import { ethers } from 'ethers';

const SWTH_CONTRACT_ADDRESS = '0xc0ecb8499d8da2771abcbf4091db7f65158f1468';
const SWTH_HOLDERS = [
  '0xb5d4f343412dc8efb6ff599d790074d0f1e8d430',
  '0x0020c5222a24e4a96b720c06b803fb8d34adc0af',
  '0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392',
];

// Binance Smart Chain provider
const provider = new ethers.providers.JsonRpcProvider(
  'https://bsc-dataseed.binance.org/'
);

// SWTH contract interface
const swthInterface = new ethers.utils.Interface([
  // balanceOf function (address => uint256)
  'function balanceOf(address) view returns (uint256)',
]);

// SWTH contract instance
const swthContract = new ethers.Contract(
  SWTH_CONTRACT_ADDRESS,
  swthInterface,
  provider
);

async function getHolders() {
  // Get the decimals of the SWTH token
  const decimals = await swthContract.decimals();

  // Loop through all the holders and get their balance
  for (const holder of SWTH_HOLDERS) {
    const balance = await swthContract.balanceOf(holder);
    console.log(
      `${holder} ${ethers.utils.formatUnits(balance, decimals).toString()}`
    );
  }
}

getHolders();