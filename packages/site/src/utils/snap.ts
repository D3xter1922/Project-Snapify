import { ethers } from 'ethers';
import { defaultSnapOrigin } from '../config';
import { GetSnapsResponse, Snap } from '../types';
import ERC721ABI from '../../../snap/src/contracts/ERC721ABI.json';

// CONTRACT ADDRESS HERE!!!
const CONTRACT_ADDRESS = "0xB967F2C084617c83C0618F35Be9970e0d571137f";

/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (): Promise<GetSnapsResponse> => {
  return (await window.ethereum.request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
};

/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  await window.ethereum.request({
    method: 'wallet_enable',
    params: [
      {
        wallet_snap: {
          [snapId]: {
            ...params,
          },
        },
      },
    ],
  });
};

/**
 * Get the snap from MetaMask.
 *
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (version?: string): Promise<Snap | undefined> => {
  try {
    const snaps = await getSnaps();

    return Object.values(snaps).find(
      (snap) =>
        snap.id === defaultSnapOrigin && (!version || snap.version === version),
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

/**
 * Invoke the "hello" method from the example snap.
 */

export const setAccountDetails = async (data: any) => {
  console.log('setaccDetails');
  // await window.ethereum.request({
  //   method: 'wallet_invokeSnap',
  //   params: [
  //     defaultSnapOrigin,
  //     {
  //       method: 'helllo',
  //     },
  //   ],
  // });

  try {
    await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: [
        defaultSnapOrigin,
        {
          method: 'setDetails',
          params: [
            {
              s: data,
            },
          ],
        },
      ],
      // method: 'wallet_invokeSnap',
      // params: [
      //   defaultSnapOrigin,
      //   request: {
      //     method: 'setDetails',
      //     params: [
      //       {
      //         s: data,
      //       }
      //     ]
      //   },
      // ],
    });
  } catch (err) {
    console.error(err);
    alert('Problem happened: ' + err.message || err);
  }
};
export const getAccountDetails = async () => {
  console.log('this worsk!');
  try {
    let response = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: [
        defaultSnapOrigin,
        {
          method: 'getDetails',
        },
      ],
    });
    return response;
  } catch (err) {
    console.error(err);
    alert('Problem happened: ' + err.message || err);
    return undefined;
  }
};

export const mintNFT = async (tokenURI: string) => {
  const simpleNFTInterface = new ethers.utils.Interface([
    'constructor(string memory name_, string memory symbol_)',
    'function mint(string memory tokenURI) public returns (uint256)',
    'function transferFrom(address from, address to, uint256 tokenId)',
  ]);
  const functionData = simpleNFTInterface.encodeFunctionData('mint', [
    tokenURI,
  ]);
  try {
    const [from] = (await window.ethereum.request({
      method: 'eth_requestAccounts',
    })) as string[];
    // Send a transaction to MetaMask.
    const data = await window.ethereum.request({
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

export const transferNFT = async (
  fromAddress: string,
  toAddress: string,
  tokenID: number,
) => {
  const simpleNFTInterface = new ethers.utils.Interface([
    'constructor(string memory name_, string memory symbol_)',
    'function mint(string memory tokenURI) public returns (uint256)',
    'function transferFrom(address from, address to, uint256 tokenId)',
  ]);
  const functionData = simpleNFTInterface.encodeFunctionData('transferFrom', [
    fromAddress,
    toAddress,
    tokenID,
  ]);
  try {
    const [from] = (await window.ethereum.request({
      method: 'eth_requestAccounts',
    })) as string[];
    // Send a transaction to MetaMask.
    const data = await window.ethereum.request({
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

export const getNFTs = async (address: string) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ERC721ABI,
    provider,
  );
  const gameContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ['function tokenURI(uint256 tokenId) public view returns (string memory)'],
    provider,
  );

  const resp = await contract.queryFilter(
    contract.filters.Transfer(null, address, null),
  );
  const resp1 = await contract.queryFilter(
    contract.filters.Transfer(address, null, null),
  );
  const sentTokens = resp1.map(event => {
    if (event === undefined) return;
    const log = contract.interface.parseLog(event);
    return log.args.tokenId.toNumber();
  });
  const ret = await Promise.all(
    resp.map(async (event) => {
      if (event === undefined) return;
      const log = contract.interface.parseLog(event);
      if (log.args.tokenId.toNumber() in sentTokens) return;
      const tokenURI = await gameContract.tokenURI(log.args.tokenId);
      return {
        from: log.args.from,
        to: log.args.to,
        tokenId: log.args.tokenId.toNumber(),
        tokenURI,
      };
    }),
  );
  return ret;
};

export const sendHello = async (tokenURI: string) => {
  const simpleNFTContractAddress = '0xB967F2C084617c83C0618F35Be9970e0d571137f';
  const simpleNFTInterface = new ethers.utils.Interface([
    'constructor(string memory name_, string memory symbol_)',
    'function mint(string memory tokenURI) public returns (uint256)',
  ]);
  const functionData = simpleNFTInterface.encodeFunctionData('mint', [
    tokenURI,
  ]);
  try {
    const [from] = (await window.ethereum.request({
      method: 'eth_requestAccounts',
    })) as string[];
    // Send a transaction to MetaMask.
    const data = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: from,
          to: simpleNFTContractAddress,
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

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
