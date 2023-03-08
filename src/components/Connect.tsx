import React, {useContext} from 'react'
import { TheaSDKContext } from "./TheaSDKProvider";
import { Button, Icon } from '@chakra-ui/react';
import {
    VscDebugDisconnect
  } from 'react-icons/vsc';

function Connect() {
    const { connect, account, disconnect, connector, showUI } = useContext(TheaSDKContext);

    const connectWallet = async () => {
        try {
          connector?.walletType === "magic" ? await showUI?.() : await connect?.();
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className="flex w-full items-center justify-end gap-2 py-4">
      <Button onClick={connectWallet}>
        {account
          ? `${account.slice(0, 6)}...${account.slice(-4)}`
          : "Connect Wallet"}
      </Button>
      {account && (
        <Button onClick={disconnect}>
                      <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={VscDebugDisconnect}
          />
        </Button>
      )}
    </div>
  )
}

export default Connect