import React, { useState, useContext, useEffect } from 'react'
import { Grid, Spacer, Stack, Button, StackDivider, Flex, Box, Text, Image,  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";
import NBT from '../../assets/nbt.svg'
import USDC from '../../assets/usdc.svg'
import moment from 'moment'
import { useToast } from '@chakra-ui/react'

import {
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'


const RowItem = ({label, scenario, valUSDC, valNBT}) => {
  return (
          <Box shadow={'lg'} backgroundColor='white' rounded='lg' my="2">
            <Flex backgroundColor='blue.200' roundedTop={'lg'}>
              <Text fontSize={'xs'} px='4' py='1' fontWeight={'600'}>
                {label}
              </Text>
              <Spacer />
              <Text fontSize={'xs'} px='4' py='1' fontWeight={'600'}>
                {scenario}
              </Text>
            </Flex>
            <Flex>
              <Flex direction='column' alignItems={'center'} w="50%" h="24" borderRight={'1px'} borderRightColor='gray.200'>
                <Flex>
                  <Image src={USDC} />
                  <Text px="2" py="2" fontSize={'sm'}>USDC</Text>
                </Flex>
                <Text fontSize={{base: 'xl', md: '3xl'}}>{valUSDC}</Text>
              </Flex>
              <Flex direction='column' alignItems={'center'} w="50%" h="24" borderRight={'1px'} borderRightColor='gray.200'>
              <Flex>
                  <Image src={NBT} />
                  <Text px="2" py="2" fontSize={'sm'}>NBT</Text>
                </Flex>
                <Text fontSize={{base: 'xl', md: '3xl'}}>{valNBT}</Text>
              </Flex>

            </Flex>
          </Box>

  )
}

function SellNow() {
    const { theaSDK } = useContext(TheaSDKContext);
    const toast = useToast()

    const [amountIn, setAmountIn] = useState(0)
    const [nbtPrice, setNBTPrice] = useState(0)
    const [expiry, setExpiry] = useState("March 20")
    const [strike, setStrike] = useState(0)
    const [premium, setPremium] = useState(0.2)
    const [discountedPrice, setDiscountedrice] = useState(0)
    const [contractID, setContractID] = useState('')    


    const checkAmount = () => {
      if (amountIn < 1) {
        toast({
          title: 'Invalid Amount',
          description: "Amount must be positive",
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })     
        return 
      }
    }


    const sellNow = async () => {
      checkAmount()      

      const transactionReceipt = await theaSDK.fungibleTrading.swapTokens({
        tokenIn: 'CurrentNBT',
        tokenOut: 'Stable',
        amountIn: (amountIn * 1e4).toString()
      });
      if(transactionReceipt) {
        toast({
          title: 'Transaction Successful',
          description: "Your pending transaction have been completed. <a href='#'>View it here</a>",
          status: 'success',
          variant: 'subtle',
          duration: 9000,
          position: 'top-right',
          isClosable: true,
          render: () => (
            <Alert status='success'>
            <AlertIcon />
            <Box>
              <AlertTitle>Transaction Successful</AlertTitle>
              <AlertDescription>
                Your pending transaction have been completed.<br /> 
                <u><a 
                target="_blank" 
                href={`https://mumbai.polygonscan.com/tx/${transactionReceipt.transactionHash}`}
                >View it here</a></u>
              </AlertDescription>
            </Box>
          </Alert>
          ),          
        })        

      }


    }

    const sellLater = async () => {
      checkAmount()      
      const order = await theaSDK.options.createOrder(contractID, amountIn);
      if(order) {
        toast({
          title: 'Transaction Successful',
          description: `Your have commited to sell ${order.result.quantity} NBT @ ${strike} on ${expiry}.`,
          status: 'success',
          variant: 'subtle',
          duration: 9000,
          position: 'top-right',
          isClosable: true,
        })        

      }

    }


    useEffect(() => {
      updatePrices()
    }, [])

    const updatePrices = async () => {
        const priceInWEI = await theaSDK.fungibleTrading.queryTokenPrice({
            tokenIn: 'CurrentNBT', tokenOut: 'Stable',
            amountIn: (1 * 1e4).toString()
          });  
          setNBTPrice(priceInWEI / 1e6)

          const contracts = await theaSDK.options.getCurrentStrikeAndPremium();

          const contract = contracts.find(item => item.optionType == 'Call')
          setContractID(contract?.uuid)

          // TODO: Format date to String
          setExpiry(moment(contract.expiry).format('LL'))

          setStrike(contract.strike)

          setPremium(contract?.premiumPrice)

          setDiscountedrice((priceInWEI / 1e6) + premium)
          console.log(contract)
      

    }
  return (
    <>

    <Flex 
      w="100%"
      p="4"
      direction={{ base: 'column', md: 'row' }}
      backgroundColor={'gray.300'} rounded='lg'
    >

        <Flex w={{ base: "100%", md: "50%" }}  alignItems={'center'} py={{base:10, md:3}}>
            <Box fontSize={'3xl'} fontWeight={'600'} px="4">Sell</Box>
            <Box backgroundColor={'white'} rounded='xl'>
            <NumberInput w="24" value={amountIn} min={0} onChange={setAmountIn}>
          <NumberInputField fontSize={'3xl'}/>
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
            </Box>
            <Box fontSize={'3xl'} fontWeight={'600'} px="4">NBT</Box>

        </Flex>
        <Flex  w={{ base: "100%", md: "50%" }}>
            <Box backgroundColor={'white'} p="4" rounded="xl" w="full">
            <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={'gray.100'}
              />
            }>
                <Flex>
                    <Text fontWeight={600} px="6">Rec.</Text>
                    <Text border={'1px'} w="16" align={'center'} rounded='md'>{ nbtPrice.toFixed(2) }</Text>
                    <Text fontWeight={600} px="6">Now</Text>
                </Flex>
                <Flex>
                    <Text fontWeight={600} px="6">Rec.</Text>
                    <Text border={'1px'} w="16" align={'center'}  rounded='md'>{ discountedPrice.toFixed(2) }</Text>
                    <Text fontWeight={600} px="6">{expiry}</Text>
                </Flex>
            </Stack>
            <Text fontSize="xs">
            *commit {nbtPrice.toFixed(2)}$ today and EITHER receive NBT ( if NBT<sub>{expiry}</sub> &#60; {strike}$ ) OR get back your {nbtPrice.toFixed(2)}$+{(100*premium).toFixed(2)}c ( if NBT<sub>{expiry}</sub> &ge; {strike}$ )
              </Text>


            </Box>
            
            </Flex>
            <Flex alignItems={'center'}>

            <Button my={{base:4, md:3}} w={{base: 'full', md: '100%'}} size="sm" mx="2" onClick={updatePrices}>Update <br></br>Prices</Button>
            </Flex>

    </Flex>

    <Flex mt="6"
          w="100%"
          direction={{ base: 'column', md: 'row' }}
    >
      <Box w={{ base: "100%", md: "50%" }}>
        <Flex px="2">
          <Text fontSize={'xl'} py="1">
              Now @ 
              </Text>
              <Text fontSize={'xl'} py="1" px="2" fontWeight={'600'}>
                {nbtPrice.toFixed(2)} 

              </Text>
                <Image src={USDC} />


        </Flex>
        <Flex direction="column" backgroundColor={'gray.200'} rounded='lg' p="4">
          <RowItem 
            label="March 15, 2023 (Now)"
            scenario=""
            valUSDC={`(+${(nbtPrice * amountIn).toFixed(2)})`}
            valNBT={`1 (-${amountIn})`}
            />
          <RowItem
            label="March 20"
            scenario={`NBT(${expiry}) > ${strike}`}
            valUSDC={`${(nbtPrice * amountIn).toFixed(2)}`}
            valNBT={0}/>
          <RowItem
            label="March 20"
            scenario={`NBT(${expiry}) <= ${strike}`}
            valUSDC={`${(nbtPrice * amountIn).toFixed(2)}`}
            valNBT={0}/>
          <Button mt="4" colorScheme='blue' onClick={sellNow}>Sell Now</Button>

        </Flex>
        
      </Box>
      <Box w={{ base: "100%", md: "50%" }}>
        <Flex px="2">
          <Text fontSize={'xl'} py="1">
              { expiry } @ 
              </Text>
              <Text fontSize={'xl'} py="1" px="2" fontWeight={'600'}>
                {discountedPrice.toFixed(2)} 

              </Text>
              <Image src={USDC} />


        </Flex>
        <Flex direction="column" backgroundColor={'gray.200'} rounded='lg' p="4">

          <RowItem
            label="March 15, 2023 (Now)"
            scenario=""
            valUSDC={0}
            valNBT={`1 (-${amountIn})`}
            />

          <RowItem 
            label="March 20" 
            scenario={`NBT(${expiry}) > ${strike}`} 
            valUSDC={`(+${(discountedPrice * amountIn).toFixed(2)})`}  
            valNBT={0}/>

          <RowItem
            label="March 20"
            scenario={`NBT(${expiry}) <= ${strike}`} 
            valUSDC={`(+${(premium * amountIn).toFixed(2)})`}  
            valNBT={`(+${amountIn})`}/>

          <Button mt="4" colorScheme='blue' onClick={sellLater}>Sell Later</Button>

        </Flex>
        
      </Box>

    </Flex>

    <Flex mt="10">
    <TableContainer>
  <Table variant='simple' size="sm">
    <Tbody>
      <Tr>
        <Th>NBT Price</Th>
        <Td isNumeric>{ nbtPrice}</Td>
      </Tr>
      <Tr>
        <Th>Option Premium</Th>
        <Td isNumeric>{ premium}</Td>
      </Tr>
      <Tr>
        <Th>Adjusted Price</Th>
        <Td isNumeric>{ nbtPrice + premium}</Td>
      </Tr>
      <Tr>
        <Th>Expiry</Th>
        <Td isNumeric>{ expiry }</Td>
      </Tr>
      <Tr>
        <Th>Strike</Th>
        <Td isNumeric>{ strike }</Td>
      </Tr>
      <Tr>
        <Th>Option Type</Th>
        <Td isNumeric>Call</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>
    </Flex>

    </>
  )
}

export default SellNow