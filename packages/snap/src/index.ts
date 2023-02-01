import { OnRpcRequestHandler } from '@metamask/snap-types';

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
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {


  let data = await wallet.request({
    method: 'snap_manageState',
    params: ['get'],
  });

  if (!data) {
    data = {book:""}; 
    // initialize state if empty and set default data
    await wallet.request({
      method: 'snap_manageState',
      params: ['update', data],
    });
    console.log(data);
  }
  console.log("yo");
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
      console.log("getDetai;s");
      const persistedData = await wallet.request({
        method: 'snap_manageState',
        params: ['get'],
      });
      console.log(persistedData);
      return persistedData;
    
    
    case 'setDetails':
      console.log("s");
      console.log(request.params[0].s)

      data.book = request.params[0].s;
      
      console.log("data");
      console.log(data);
      return wallet.request({
        method: 'snap_manageState',
        params: ['update', data],
      });
      return wallet.request({
        method: 'snap_confirm',
      });
    default:
      throw new Error('Method not found.');
  }
};
