import ThirdwebActions from "./ThirdwebActions";

import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  walletConnect,
  embeddedWallet,
} from "@thirdweb-dev/react";


export default function App() {

  return (
    <div className="container">
      <h1 className="title">
        Thirdweb & ReactJS Ethereum Example
      </h1>
      <ThirdwebProvider
        activeChain="mumbai"
        clientId="88d52484669b42c5066e9de94dc1149e"
        supportedWallets={[
          metamaskWallet(),
          walletConnect(),
          embeddedWallet(),
        ]}
      >
        <ConnectWallet
          theme={"dark"}
          modalSize={"compact"}
        />
        <ThirdwebActions />
      </ThirdwebProvider>
    </div>
  );
}

