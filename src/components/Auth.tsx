import React from 'react'
import { ButtonGroup, Button } from '@chakra-ui/react'
import { TheaSDK, TheaNetwork } from '@thea-protocol/sdk'
import { ethers } from 'ethers'


function Auth({magic, address, setAddress, setSDK}) {

    const login = async () => {
        const accounts = await magic.wallet.connectWithUI()
        setAddress(accounts[0])
        console.log(accounts)      

        const provider = new ethers.providers.Web3Provider(magic.rpcProvider, 80001)

    
        const theaSDK = await TheaSDK.init({
          network: TheaNetwork.MUMBAI,
          web3Provider: provider,
          currentNBTokenAddress: "0xb89b6A3A6DE8Ae535d26E7Ad94A7dD0Be88A6074"
        });
        setSDK(theaSDK)
    
      }
    
    const showUI = async () => {
        const { walletType } = await magic.wallet.getInfo();
        if (walletType === "magic") {
            await magic.wallet.showUI(); // shows wallet widget
        };
    }

    const userInfo = async () => {
        const userInfo = await magic.wallet.requestUserInfoWithUI({ scope: { email: "required" }})
        console.log(userInfo)
      }
    
    const disconnect = async () => {
        await magic.wallet.disconnect()
        setAddress(null)
      }
    
  return (
    <ButtonGroup spacing='6' py="2">
        { !address ? <Button onClick={login}>Connect</Button> : <Button onClick={disconnect}>Disconnect</Button>}
        
        {/* <Button onClick={showUI}>ShowUI</Button> */}
        
    </ButtonGroup>
    )
}

export default Auth