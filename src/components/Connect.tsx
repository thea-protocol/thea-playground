import React, {useContext} from 'react'
import { TheaSDKContext } from "./TheaSDKProvider";
import { Button} from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

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
    <>

      {account
      ?     <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
      {account.slice(0, 6)}...{account.slice(-4)}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={disconnect}>Disconnect</MenuItem>
      </MenuList>
    </Menu>
  
      : <Button onClick={connectWallet}>Connect Wallet</Button>}
  </>)
}

export default Connect