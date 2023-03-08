import { useState, useEffect } from 'react'
import { Magic } from 'magic-sdk';
import { ethers } from 'ethers'
import { WagmiConfig, createClient } from 'wagmi'
import { ChakraProvider } from '@chakra-ui/react'
import { TheaSDK, TheaNetwork } from '@thea-protocol/sdk'

import Layout from './components/Layout'
import Fungibles from './components/Fungibles';
import NFT from './components/NFT';
import Calculators from './components/Calculators';
import CarbonInfo from './components/CarbonInfo';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App() {

  const [sdk, setSDK] = useState({})
  const [address, setAddress] = useState(null)

  const magic = new Magic('pk_live_EDCF9E6B392E92F3', { 
    network: {
      rpcUrl: "https://rpc-mumbai.maticvigil.com",
      chainId: 80001
    },
  });

  
  const provider = new ethers.providers.Web3Provider(magic.rpcProvider, 80001)

  let client = createClient({
    autoConnect: false,
    provider,
  })

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
      path: "/fungible",
      element: <Fungibles sdk={sdk} address={address}/>,
    },
    {
      path: "/nft",
      element: <NFT sdk={sdk} address={address}/>,
    },
    {
      path: "/calculators",
      element: <Calculators sdk={sdk} address={address}/>,
    },
    {
      path: "/info",
      element: <CarbonInfo sdk={sdk} address={address}/>,
    },
  
  ]);
  
  return (
    <WagmiConfig client={client}>
      <ChakraProvider>
      <Layout magic={magic} setSDK={setSDK} address={address} setAddress={setAddress}>
        <RouterProvider router={router} />
      </Layout>
      </ChakraProvider>
    </WagmiConfig>
  )
}

export default App