import { FunctionComponent, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { Footer, Header } from './components';

import { GlobalStyle } from './config/theme';
import { ToggleThemeContext } from './Root';
import Unity, { UnityContext } from "react-unity-webgl";
import React, { useState, useEffect } from "react";

import {
  connectSnap,
  getSnap,
  sendHello,
  shouldDisplayReconnectButton,
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
  loaderUrl: "Build/newBuild.loader.js",
  dataUrl: "Build/newBuild.data",
  frameworkUrl: "Build/newBuild.framework.js",
  codeUrl: "Build/newBuild.wasm",
});
// function App() {
//   return <Unity unityContext={unityContext} />;
// }


export const App: FunctionComponent<AppProps> = ({ children }) => {
  const toggleTheme = useContext(ToggleThemeContext);

  useEffect(function () {
    unityContext.on("ConnectToMetamask", function () {
      console.log("hi");
      connectSnap();
    });
  }, []);
  return <Unity unityContext={unityContext} style={{
    width: "100%",
    height: "100%",
  }} />;
  // return (
  //   <>
  //     <GlobalStyle />
  //     <Wrapper>
  //       <Header handleToggleClick={toggleTheme} />
  //       {children}
  //       <Footer />
  //     </Wrapper>
  //   </>
  // );
};
