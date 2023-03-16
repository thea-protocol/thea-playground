import { ChakraProvider } from '@chakra-ui/react'
import TheaSDKProvider from "./components/TheaSDKProvider";

import Layout from './components/Layout'
import Fungibles from './components/Fungibles';
import NFT from './components/NFT';
import Calculators from './components/Calculators';
import CarbonInfo from './components/CarbonInfo';
import Marketplace from './components/Marketplace';
import Trading from './components/Trading';
import Auth from './components/Auth';
import BuyNow from './components/Pages/BuyNow';
import NaturaBasedTokens from './components/Pages/NaturaBasedTokens';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "auth",
          element: <Auth/>,
        },
        {
          path: "calculators",
          element: <Calculators/>,
        },
        {
          path: "/fungible",
          element: <Fungibles />,
        },
        {
          path: "/nft",
          element: <NFT />,
        },
        {
          path: "/info",
          element: <CarbonInfo />,
        },
        {
          path: "/marketplace",
          element: <Marketplace />,
        },
        {
          path: "/trading",
          element: <Trading />,
        },
        {
          path: "/trade_nbt",
          element: <NaturaBasedTokens />,
        },
  
      ]
    },
  ]);
  
  return (
    <ChakraProvider>
        <TheaSDKProvider>
          <RouterProvider router={router} />
      </TheaSDKProvider>
      </ChakraProvider>
  )
}

export default App