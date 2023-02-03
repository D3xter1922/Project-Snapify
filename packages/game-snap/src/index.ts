import { OnRpcRequestHandler } from '@metamask/snap-types';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0xB967F2C084617c83C0618F35Be9970e0d571137f';

const mintNFT = async (tokenURI: string) => {
  let simpleNFTInterface = new ethers.utils.Interface([
    'constructor(string memory name_, string memory symbol_)',
    'function mint(string memory tokenURI) public returns (uint256)',
    'function transferFrom(address from, address to, uint256 tokenId)',
  ]);
  let functionData = simpleNFTInterface.encodeFunctionData('mint', [tokenURI]);
  try {
    const [from] = (await wallet.request({
      method: 'eth_requestAccounts',
    })) as string[];
    // Send a transaction to MetaMask.
    const data = await wallet.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from,
          to: CONTRACT_ADDRESS,
          value: '0x0',
          data: functionData,
        },
      ],
    });
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
  }
  return false;
};

const transferNFT = async (toAddress: string, tokenID: number) => {
  const simpleNFTInterface = new ethers.utils.Interface([
    'constructor(string memory name_, string memory symbol_)',
    'function mint(string memory tokenURI) public returns (uint256)',
    'function transferFrom(address from, address to, uint256 tokenId)',
  ]);
  try {
    const [from] = (await wallet.request({
      method: 'eth_requestAccounts',
    })) as string[];
    const functionData = simpleNFTInterface.encodeFunctionData('transferFrom', [
      from,
      toAddress,
      tokenID,
    ]);
    const confirmResult = await wallet.request({
      method: 'snap_confirm',
      params: [
        {
          prompt: 'Would you like to transfer the NFT?',
          description: `You will be transfering this NFT (${tokenID}) to ${toAddress}`,
        },
      ],
    });
    if (!confirmResult) return false;
    // Send a transaction to MetaMask.
    const data = await wallet.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from,
          to: CONTRACT_ADDRESS,
          value: '0x0',
          data: functionData,
        },
      ],
    });
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Get a message from the origin. For demonstration purposes only.
 *
 * @param originString - The origin string.
 * @returns A message based on the origin.
 */
export const getMessage = (originString: string): string =>
  `Hello, ${originString}!`;

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns `null` if the request succeeded.
 * @throws If the request method is not valid for this snap.
 * @throws If the `snap_confirm` call failed.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  let data = await wallet.request({
    method: 'snap_manageState',
    params: ['get'],
  });

  if (!data) {
    data = { book: '' };
    // initialize state if empty and set default data
    await wallet.request({
      method: 'snap_manageState',
      params: ['update', data],
    });
    console.log(data);
  }
  console.log('yo');
  console.log(data);
  switch (request.method) {
    case 'helllo':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: getMessage(origin),
            description:
              'This custom confirmation is just for display purposes.',
            textAreaContent:
              'But you can edit the snap source code to make it do something, if you want to!',
          },
        ],
      });
    case 'getDetails':
      console.log('getDetails');
      const persistedData = await wallet.request({
        method: 'snap_manageState',
        params: ['get'],
      });
      console.log(persistedData);
      return persistedData;

    case 'setDetails':
      console.log('s');
      console.log((request.params as any)[0].s);

      data.book = (request.params as any)[0].s;

      console.log('data');
      console.log(data);
      return wallet.request({
        method: 'snap_manageState',
        params: ['update', data],
      });
    case 'mintNFT':
      if (!request.params) return false;
      return await mintNFT((request.params as any[])[0]);
    case 'transferNFT':
      if (!request.params) return false;
      return await transferNFT(
        (request.params as any[])[0],
        (request.params as any[])[1],
      );
    default:
      throw new Error('Method not found.');
  }
};
