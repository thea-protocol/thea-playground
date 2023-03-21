import { Web3Provider } from "@ethersproject/providers";
import { TheaNetwork, TheaSDK, UserBalance } from "@thea-protocol/sdk";
import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { WalletInfo, Magic } from "magic-sdk";
import React from 'react'

type State = {
  theaSDK?: TheaSDK;
  provider?: Web3Provider;
  account?: `0x${string}`;
  connector?: WalletInfo;
  connect?: () => Promise<string[]>;
  disconnect?: () => Promise<boolean>;
  showUI?: () => Promise<boolean>;
  updateBalances?: () => Promise<void>;
  userBalance?: UserBalance;
};

type Props = {
  children: React.ReactNode;
};

export const TheaSDKContext = createContext<State>({});

function TheaSDKProvider({ children }: Props) {
  const data = useContext(TheaSDKContext);
  const magic = useMemo(
    () =>
      new Magic("pk_live_326101EA888E5CC4", {
        network: {
          rpcUrl: "https://rpc-mumbai.maticvigil.com/", //"https://matic-mumbai.chainstacklabs.com",
          chainId: 80001,
        },
      }),
    []
  );

  const provider = useMemo(
    () => new Web3Provider((magic as any).rpcProvider),
    [magic]
  );

  const connect = async () => {
    try {
      const accounts = await magic.wallet.connectWithUI();
      const account = accounts[0] as `0x${string}`;
      const walletInfo = await magic.wallet.getInfo();
      const theaSDK = await TheaSDK.init({
        network: TheaNetwork.MUMBAI,
        web3Provider: provider,
      });
      await theaSDK.auth.login();
      console.log(await theaSDK.carbonInfo.getUsersProfile());
      console.log(await theaSDK.offset.getNextOffsetEventDate());



      setState((prevState) => ({
        ...prevState,
        account,
        connector: walletInfo,
        theaSDK,
      }));
      return accounts;
    } catch (error) {
      await disconnect();
      console.log("Connect error: ", error);
      return [];
    }
  };

  const disconnect = async () => {
    try {
      await magic.wallet.disconnect();
      setState((prevState) => ({
        ...prevState,
        account: undefined,
        connector: undefined,
      }));
      return true;
    } catch (error) {
      console.log("Disconnect error: ", error);
      return false;
    }
  };

  const updateBalances = async () => {
    if (!state.theaSDK || !state.account) return;
    const balance = await state.theaSDK.carbonInfo.getUsersBalance(
      state.account.toLowerCase()
    );
    setState((prevState) => ({ ...prevState, userBalance: balance }));
  }

  const [state, setState] = useState<State>({
    provider,
    connect,
    disconnect,
    updateBalances,
    showUI: async () => await magic.wallet.showUI(),
  });

  const loadSDK = useCallback(async () => {
    const theaSDK = await TheaSDK.init({
      network: TheaNetwork.MUMBAI,
      provider,
    });

    console.log(theaSDK)

    setState((prevState) => ({
      ...prevState,
      theaSDK,
    }));
  }, [provider]);

  const loadBalance = useCallback(async () => {
    if (!state.theaSDK || !state.account) return;
    const balance = await state.theaSDK.carbonInfo.getUsersBalance(
      state.account.toLowerCase()
    );
    setState((prevState) => ({ ...prevState, userBalance: balance }));
  }, [state.theaSDK, state.account]);


  useEffect(() => {
    loadSDK();
  }, [loadSDK]);

  useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  return (
    <TheaSDKContext.Provider value={state}>{children}</TheaSDKContext.Provider>
  );
}

export default TheaSDKProvider
