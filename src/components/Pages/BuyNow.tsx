import React, { useState, useContext } from 'react'
import { Spacer, Stack, Button, StackDivider, Heading, Flex, Box, Text, Image,  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, GridItem } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";
import NBT from '../../assets/nbt.svg'

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
                <Text py="2" fontSize={'sm'}>USDC</Text>
                <Text fontSize={'3xl'}>{valUSDC}</Text>
              </Flex>
              <Flex direction='column' alignItems={'center'} w="50%" h="24" borderRight={'1px'} borderRightColor='gray.200'>
                <Text py="2" fontSize={'sm'}>NBT</Text>
                <Text fontSize={'3xl'}>{valNBT}</Text>
              </Flex>

            </Flex>
          </Box>

  )
}

function BuyNow() {
    const { theaSDK } = useContext(TheaSDKContext);

    const [amountIn, setAmountIn] = useState(0)
    const [nbtPrice, setNBTPrice] = useState(0)
    const [expiry, setExpiry] = useState("March 20")
    const [strike, setStrike] = useState(0)
    const [premium, setPremium] = useState(0.2)
    const [discountedPrice, setDiscountedrice] = useState(0)

    const updatePrices = async () => {
        const priceInWEI = await theaSDK.fungibleTrading.queryTokenPrice({
            tokenIn: 'CurrentNBT', tokenOut: 'Stable',
            amountIn: (100 * 1e4).toString()
          });  
          setNBTPrice(priceInWEI / 1e18)

          const contracts = await theaSDK.options.getCurrentStrikeAndPremium();

          const contract = contracts.find(item => item.optionType == 'Call')
          // TODO: Format date to String
          // setExpiry(contract.expiry)

          setStrike(contract.strike)

          //setPremium(contract?.premiumPrice)

          setDiscountedrice((priceInWEI / 1e18) - premium)
          console.log(contract)
      

    }
  return (
    <>
    <Heading py="4">
      Buy Nature Base Tokens<Button onClick={updatePrices}>Update Prices</Button>
    </Heading>
    <Flex backgroundColor={'gray.300'} rounded='lg' p="4">
        <Flex w="50%" alignItems={'center'}>
            <Box fontSize={'3xl'} fontWeight={'600'} px="4">Buy</Box>
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
        <Flex w="50%">
            <Box backgroundColor={'white'} p="4" rounded="xl" w="full">
            <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={'gray.100'}
              />
            }>
                <Flex>
                    <Text fontWeight={600} px="6">Pay</Text>
                    <Text border={'1px'} w="14" align={'center'} rounded='md'>{ nbtPrice.toFixed(2) }</Text>
                    <Text fontWeight={600} px="6">Now</Text>
                </Flex>
                <Flex>
                    <Text fontWeight={600} px="6">Pay</Text>
                    <Text border={'1px'} w="14" align={'center'}  rounded='md'>{ nbtPrice.toFixed(2) }</Text>
                    <Text fontWeight={600} px="6">on {expiry}</Text>
                </Flex>
            </Stack>

            </Box>
            
            </Flex>
    </Flex>

    <Flex mt="6">
      <Box w="50%">
        <Flex px="2">
          <Text fontSize={'xl'} py="1">
              Now @ 
              </Text>
              <Text fontSize={'xl'} py="1" px="2" fontWeight={'600'}>
                {nbtPrice.toFixed(2)} 

              </Text>
                <Image src={NBT} alt='Dan Abramov' />


        </Flex>
        <Flex direction="column" backgroundColor={'gray.200'} rounded='lg' p="4">

          <RowItem label="March 15, 2023 (Now)" scenario="" valUSDC={-(nbtPrice * amountIn).toFixed(2)} valNBT={amountIn}/>

          <RowItem label="March 20" scenario={`NBT(${expiry}) > ${strike}`} valUSDC={0}  valNBT={amountIn}/>

          <RowItem label="March 20" scenario={`NBT(${expiry}) <= ${strike}`} valUSDC={0}  valNBT={amountIn}/>
        </Flex>
        
      </Box>
      <Box w="50%">
        <Flex px="2">
          <Text fontSize={'xl'} py="1">
              { expiry } @ 
              </Text>
              <Text fontSize={'xl'} py="1" px="2" fontWeight={'600'}>
                {discountedPrice.toFixed(2)} 

              </Text>
                <Image src={NBT} alt='Dan Abramov' />


        </Flex>
        <Flex direction="column" backgroundColor={'gray.200'} rounded='lg' p="4">

          <RowItem label="March 15, 2023 (Now)" scenario="" valUSDC={-(discountedPrice * amountIn).toFixed(2)} valNBT={0}/>

          <RowItem 
            label="March 20" 
            scenario={`NBT(${expiry}) > ${strike}`} 
            valUSDC={`${(discountedPrice * amountIn).toFixed(2)} (+${(premium * amountIn).toFixed(2)})`}  
            valNBT={0}/>

          <RowItem
            label="March 20"
            scenario={`NBT(${expiry}) <= ${strike}`} 
            valUSDC={`(+${(premium * amountIn).toFixed(2)})`}  
            valNBT={amountIn}/>
        </Flex>
        
      </Box>

    </Flex>

    </>
  )
}

export default BuyNow