import { ChakraProvider } from '@chakra-ui/react'
import TheaSDKProvider from "./components/TheaSDKProvider";

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
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "",
          element: <h1>Test</h1>
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