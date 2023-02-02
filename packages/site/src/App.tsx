import { FunctionComponent, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { Footer, Header } from './components';

import { GlobalStyle } from './config/theme';
import { ToggleThemeContext } from './Root';
import Unity, { UnityContext } from 'react-unity-webgl';
import React, { useState, useEffect } from 'react';

import {
  connectSnap,
  getAccountDetails,
  setAccountDetails,
  getSnap,
  sendHello,
  shouldDisplayReconnectButton,
  transferNFT,
  mintNFT,
  getNFTs,
} from './utils';

import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  SendHelloButton,
  Card,
} from './components';

import { MetamaskActions, MetaMaskContext } from './hooks';

// const [state, dispatch] = useContext(MetaMaskContext);

// const handleConnectClick = async () => {
//     try {
//       await connectSnap();
//       const installedSnap = await getSnap();

//       dispatch({
//         type: MetamaskActions.SetInstalled,
//         payload: installedSnap,
//       });
//     } catch (e) {
//       console.error(e);
//       dispatch({ type: MetamaskActions.SetError, payload: e });
//     }
//   };

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
`;

export type AppProps = {
  children: ReactNode;
};

const unityContext = new UnityContext({
  loaderUrl: 'Build/newBuild.loader.js',
  dataUrl: 'Build/newBuild.data',
  frameworkUrl: 'Build/newBuild.framework.js',
  codeUrl: 'Build/newBuild.wasm',
});
// function App() {
//   return <Unity unityContext={unityContext} />;
// }
var nftDetails = {
  AssetItem: [{}],
};
var AssetItem: never[] = [];
export const App: FunctionComponent<AppProps> = ({ children }) => {
  const toggleTheme = useContext(ToggleThemeContext);
  const [data, setdata] = useState('');

  useEffect(function () {
    unityContext.on('debug', function (message) {
      console.log(message);
    });
  }, []);

  useEffect(function () {
    unityContext.on('ConnectToMetamask', async function () {
      console.log('hi');
      connectSnap();
    });
  }, []);
  useEffect(function () {
    unityContext.on('PushAccountDetails', async function (s) {
      console.log('pushing details');
      console.log(s);
      // setdata(s);
      setAccountDetails(s);
    });
  }, []);
  useEffect(function () {
    unityContext.on('AskForAccountDetails', async function () {
      console.log('unity asked for account details');

      let response: any = await getAccountDetails();
      console.log('response');
      console.log(response);

      unityContext.send('ItemContainer', 'GetAccountDetails', response.book);
    });
  }, []);

  useEffect(function () {
    unityContext.on('AskForAssetNFTs', async function () {
      console.log('nuity asked for asset NFT details');
      // await mintNFT('0');
      // await mintNFT('1');
      // await mintNFT('2');
      let response = getNFTs('0x9C3fC7483B8D1d996FA9C1da6cAB4215253Ca2c7');
      nftDetails.AssetItem = AssetItem;
      nftDetails.AssetItem = [];
      response.then((result) => {
        console.log(result);
        result.forEach((element: any) =>
          nftDetails.AssetItem.push({
            key: element.tokenURI,
            tokenID: element.tokenId,
          }),
        );
        // let details = JSON.stringify(nftDetails);
        console.log('PP');
        console.log(JSON.stringify(nftDetails));
        unityContext.send(
          'assetListContainer',
          'ReceiveAssetNFTs',
          JSON.stringify(nftDetails),
        );
      });

      // let response = await getAssetDetails();
    });
  }, []);
  // \"{\"AssetItem\":[{\"key\":\"abcdedffsdgdfsguhdefiuyg\",\"tokenID\":1},{\"key\":\"s\",\"tokenID\":5},{\"key\":\"sed lol\",\"tokenID\":6},{\"key\":\"0\",\"tokenID\":7},{\"key\":\"1\",\"tokenID\":8},{\"key\":\"2\",\"tokenID\":9},{\"key\":\"0\",\"tokenID\":10},{\"key\":\"1\",\"tokenID\":11},{\"key\":\"2\",\"tokenID\":12}]}
  useEffect(function () {
    unityContext.on('SendTxn', async function (r, s) {
      console.log('nuity asked to snd nft');
      console.log(r);
      console.log(s);
      transferNFT(
        '0x9C3fC7483B8D1d996FA9C1da6cAB4215253Ca2c7',
        '0xFa372aA180664647A579B940a6760Bd13ecd8aDb',
        s,
      );
      // s can be id of asset or URI
      // let response = await getAssetDetails();
      // unityContext.send(\"assetListContainer", "ReceiveAssetNFTs", response);
    });
  }, []);

  return (
    <Unity
      unityContext={unityContext}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header handleToggleClick={toggleTheme} />
        {children}
        <Footer />
      </Wrapper>
    </>
  );
};
