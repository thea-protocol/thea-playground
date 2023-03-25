import React, { useContext, useState, useEffect } from 'react'
import { Box, Flex, Text, Spacer, Image, SimpleGrid, Button} from '@chakra-ui/react'
import NBT from '../assets/nbt.svg'
import USDC from '../assets/usdc.svg'
import SDG from '../assets/sdg_icon.svg'
import Vintage from '../assets/vintage_icon.svg'
import Quality from '../assets/quality_icon.svg'
import { TheaSDKContext } from "./TheaSDKProvider";
import { ethers} from 'ethers'

function Wallet() {
    const { userBalance, provider, account, updateBalances, showUI } = useContext(TheaSDKContext);
    const [usdcBalance, setUsdcBalance] = useState(0)


    const getUSDCBalance = async () => {
        const abi = [{
          "inputs": [{ "internalType": "address", "name": "account", "type": "address"}],
          "name": "balanceOf",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
          }]
          console.log(account)
  
        const tokenContractAddress = '0x1D6DBfb520ee332bc14e800A832389F731820787';
        console.log(provider)
        const contract = new ethers.Contract(tokenContractAddress, abi, provider);
        const balance = (await contract.balanceOf(account) / 1e6).toFixed(2);
        setUsdcBalance(balance)
      }
  
      useEffect(() => {
        getUSDCBalance()
      }, [])
  
  


  return (
    <Box shadow={'lg'} backgroundColor='white' rounded='lg' my="2">
    <Flex backgroundColor='green.700' roundedTop={'lg'} py="1">
      <Text fontSize={'sm'} px='4' py='1' fontWeight={'600'} color="white">
        Wallet
      </Text>
      <Spacer />
      <Button size="xs" mx="4" onClick={showUI}>Refresh</Button>
    </Flex>
    <Flex backgroundColor='green.100' py="1">
        <Text fontSize="xs" px="4" >March 20, 2023 14:30pm</Text>
    </Flex>
    <Flex>
      <Flex direction='column' alignItems={'center'} w="50%" h="24" borderRight={'1px'} borderRightColor='gray.200'>
        <Flex>
          <Image src={USDC} />
          <Text px="2" py="2" fontSize={'sm'}>USDC</Text>
        </Flex>
        <Text fontSize={'xl'}>{ usdcBalance }</Text>
      </Flex>
      <Flex direction='column' alignItems={'center'} w="50%" h="24" borderRight={'1px'} borderRightColor='gray.200'>
      <Flex>
          <Image src={NBT} />
          <Text px="2" py="2" fontSize={'sm'}>NBT</Text>
        </Flex>
        <Text fontSize={'xl'}>{(userBalance?.fungible['nbt'] / 1e4).toFixed(2)}</Text>
      </Flex>

    </Flex>
    <Flex>
    <Flex direction='column' alignItems={'center'} w="50%" h="24" borderRight={'1px'} borderTop="1px" borderColor='gray.200' py="6">
        <Text fontSize={'xs'}>View all transactions</Text>
      </Flex>
      <Flex  direction='column' alignItems={'center'} w="50%" h="24" borderRight={'1px'} borderRightColor='gray.200'>
        <Text fontSize={'sm'} fontWeight="600">Feature Tokens</Text>
        <SimpleGrid fontSize={'xs'} columns={3} spacing={6} mt="2">
            <Flex direction={"column"} align="center">
                <Text>V</Text>
                <Image src={Vintage} w="6"/>

                <Text>{(userBalance?.fungible['vintage'] / 1e4).toFixed(0)}</Text>
            </Flex>
            <Flex direction={"column"} align="center">
                <Text>S</Text>
                <Image src={SDG} w="6"/>

                <Text>{(userBalance?.fungible['sdg'] / 1e4).toFixed(0)}</Text>
            </Flex>
            <Flex direction={"column"} align="center">
                <Text>Q</Text>
                <Image src={Quality} w="6"/>
                <Text>{(userBalance?.fungible['rating'] / 1e4).toFixed(0)}</Text>
            </Flex>
        </SimpleGrid>
      </Flex>
    </Flex>
    <Spacer />
    <Flex backgroundColor='green.50' py="2">
        <Flex justify="center" alignItems={'center'} w="50%">
        <Text fontSize={"xs"}>Total locked:</Text>
        <Text px="1" fontSize={"sm"} color="yellow.400">
            {userBalance?.optionsDeposit['USDC'] / 1e4}

        </Text>
        <Image src={USDC} />

        </Flex>
        <Flex justify="center" alignItems={'center'} w="50%">
          <Text fontSize={"xs"}>Total locked:</Text>
          <Text px="1" fontSize={"sm"} color="yellow.400">
        {userBalance?.optionsDeposit['BT_2017'] / 1e4}

        </Text>
        <Image src={NBT} />
            </Flex>
    </Flex>

  </Box>
    )
}

export default Wallet