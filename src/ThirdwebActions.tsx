import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import axios from 'axios';
import queryString from 'query-string';
import settings from "./config/settings";

import {
  useAddress,
  useSigner,
  useBalance,
} from "@thirdweb-dev/react";


const ThirdwebActions = () => {

  // const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [loggedIn] = useState(false);
  const [code, setCode] = useState('');

  const signer = useSigner();
  const walletAddress = useAddress();
  const balance = useBalance();

  // useEffect(() => {
  //   if (web3auth?.connected) {
  //     setLoggedIn(true);
  //   }
  // }, [web3auth?.connected]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const codeParam = query.get('code');
    console.log(codeParam);
    if (codeParam) {
      setCode(codeParam);
      console.log('set code!');
    }
  }, []);

  const mintSampleNft = async () => {
    if (!signer) {
      uiConsole("provider or signer not initialized yet");
      return;
    }
    try {
    const account = signer?.getAddress();
      const addresses =
        process.env.REACT_APP_NODE_ENV === 'development'
          ? settings.addresses.polygonMumbai
          : settings.addresses.polygon;
      console.log(addresses);

      const SampleNftMinter = new ethers.Contract(
        addresses.SampleNftMinter,
        settings.abis.SampleNftMinter,
        signer
      );
      console.log(SampleNftMinter);
      console.log(account);
      const tx = await SampleNftMinter.mint(account);
      console.log(tx);
      const receipt = await tx.wait();
      console.log(receipt);
      uiConsole(receipt);
    } catch (error) {
      console.log(error);
      uiConsole(error);
      return error as string;
    }
  };

  const getConnectedStatus = async () => {
    if (!walletAddress) {
      uiConsole("Please connect wallet first");
      return;
    }
    const params = {
      walletAddress
    };
    console.log(params);
    const header = {
      "Content-Type": "application/json",
    }
    const baseUrl = process.env.REACT_APP_API_BASE;
    const ret = await axios.post(`${baseUrl}/discord/status`, params, { headers: header });
    console.log(ret);
    uiConsole(ret);
  };

  const onLoginDiscord = async () => {
    const params = {
      client_id: process.env.REACT_APP_DISCORD_CLIENT_ID,
      redirect_uri: window.location.origin,
      response_type: 'code',
      scope: 'identify guilds guilds.members.read guilds.join',
    };
    const redirect_uri = 'https://discord.com/api/oauth2/authorize?' + queryString.stringify(params);
    console.log(redirect_uri);
    window.location.href = redirect_uri;
  };

  const onConnectWalletAndDiscord = async () => {
    if (!walletAddress) {
      uiConsole("Please connect wallet first");
      return;
    }
    const params = {
      code,
      walletAddress
    };
    console.log(params);
    const header = {
      "Content-Type": "application/json",
    }
    const baseUrl = process.env.REACT_APP_API_BASE;
    const ret = await axios.post(`${baseUrl}/discord/connect`, params, { headers: header });
    console.log(ret);
    uiConsole(ret);

  };

  // const login = async () => {
  //   if (!web3auth) {
  //     uiConsole("web3auth not initialized yet");
  //     return;
  //   }
  //   const web3authProvider = await web3auth.connect();
  //   setProvider(web3authProvider);
  // };

  // const logout = async () => {
  //   if (!web3auth) {
  //     uiConsole("web3auth not initialized yet");
  //     return;
  //   }
  //   await web3auth.logout();
  //   setProvider(null);
  //   setLoggedIn(false);
  // };

  const getAccounts = async () => {
    if (!walletAddress) {
      uiConsole("Please connect wallet first");
      return;
    }
    uiConsole(walletAddress);
  };

  const getBalance = async () => {
    if (!balance) {
      uiConsole("Please connect wallet first");
      return;
    }
    uiConsole(balance);
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={mintSampleNft} className="card">
            Mint Sample NFT
          </button>
        </div>
        <div>
          <button onClick={getConnectedStatus} className="card">
            isConnected
          </button>
        </div>
        <div>
          <button onClick={onLoginDiscord} className="card">
            Login to Discord
          </button>
        </div>
        <div>
          <button onClick={onConnectWalletAndDiscord} className="card">
            Join Discord and connect wallet
          </button>
        </div>
        {/* <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div> */}
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  // const unloggedInView = (
  //   <button onClick={login} className="card">
  //     Login
  //   </button>
  // );

  return (
      <div className="grid">{loggedIn ? loggedInView : loggedInView}</div>
  );
}

export default ThirdwebActions;
