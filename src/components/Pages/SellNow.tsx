import React, { useState, useContext, useEffect } from 'react'
import { Grid, Spacer, Stack, Button, StackDivider, Flex, Box, Text, Image,  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";
import NBT from '../../assets/nbt.svg'
import USDC from '../../assets/usdc.svg'

import {
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
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

    const [amountIn, setAmountIn] = useState(0)
    const [nbtPrice, setNBTPrice] = useState(0)
    const [expiry, setExpiry] = useState("March 20")
    const [strike, setStrike] = useState(0)
    const [premium, setPremium] = useState(0.2)
    const [discountedPrice, setDiscountedrice] = useState(0)


    useEffect(() => {
      updatePrices()
    }, [])

    const updatePrices = async () => {
        const priceInWEI = await theaSDK.fungibleTrading.queryTokenPrice({
            tokenIn: 'CurrentNBT', tokenOut: 'Stable',
            amountIn: (1 * 1e4).toString()
          });  
          setNBTPrice(priceInWEI / 1e18)

          const contracts = await theaSDK.options.getCurrentStrikeAndPremium();

          const contract = contracts.find(item => item.optionType == 'Call')
          // TODO: Format date to String
          // setExpiry(contract.expiry)

          setStrike(contract.strike)

          setPremium(contract?.premiumPrice)

          setDiscountedrice((priceInWEI / 1e18) + premium)
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