import React, { useState, useContext, useEffect } from 'react'
import { formatUnits } from "ethers/lib/utils.js";

import { Card, CardHeader, Heading, CardBody, CardFooter, Button, FormControl, FormLabel, GridItem, Select, FormHelperText  } from '@chakra-ui/react'
import {
    Flex,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
  } from '@chakra-ui/react'
  import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useToast
  } from '@chakra-ui/react'
  
import { TheaSDKContext } from "../../components/TheaSDKProvider";

function CreateOrder() {
  const { theaSDK, account, userBalance, updateBalances } = useContext(TheaSDKContext);  
  const [contracts, setContracts] = useState([])
  const [contract, setContract] = useState("")
  const [amountIn, setAmountIn] = useState(1)
  const toast = useToast()


  const createOrder = async () => {
    try {
        console.log(contract, amountIn)
        const order = await theaSDK.options.createOrder(contract, amountIn);
        if (order) {
          updateBalances()
        } 
        console.log(order)
    } catch(error) {
        toast({
            title: 'Error',
            description: error.toString(),
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
    }
  }

    const getContracts = async () => {
        const res = await theaSDK.options.getCurrentStrikeAndPremium();
        setContracts(res)
        console.log(res)
    }

  return (
    <Card>
    <CardHeader>
      <Heading size='md'> Create Order</Heading>
    </CardHeader>
        <CardBody>
        <FormControl as={GridItem} colSpan={[6, 3]} py="6">
            <FormLabel
              htmlFor="country"
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: 'gray.50',
              }}>
              Contract
            </FormLabel>
            <Flex>
            <Select
              value={contract}
              onChange={(val) => setContract(val.target.value)}
              focusBorderColor="brand.400"
              shadow="sm"
              size="sm"
              w="full"
              rounded="md">
                <option>Please select a contract</option>
              { contracts.map(item =>
              <option key={item.uuid} value={item.uuid}>{ item.optionType } @ { item.strike } for { item.premiumPrice?.toFixed(3) }</option>
                
                )}
            </Select>
            <Button size="sm" onClick={getContracts}>Fetch</Button>

            </Flex>
          </FormControl>
          <FormControl as={GridItem} colSpan={[6, 3]} py="2">
            <FormLabel
              htmlFor="country"
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: 'gray.50',
              }}>
              NBT Amount
            </FormLabel>
            <Flex>
          <NumberInput maxW='100px' mr='2rem' value={amountIn} onChange={setAmountIn}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Slider
            flex='1'
            focusThumbOnChange={false}
            value={amountIn}
            onChange={setAmountIn}
            max={500} 
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb fontSize='sm' boxSize='32px'  />
          </Slider>
        </Flex> 
            <FormHelperText fontSize={'xs'} alignContent='end'>Balance: {userBalance ? formatUnits(userBalance.fungible['nbt'], 4) : 0} NBT</FormHelperText>
          </FormControl>     
    
        </CardBody>
    <CardFooter>
        <Button onClick={createOrder}>Create</Button>
    </CardFooter>
  </Card>
  )
}

export default CreateOrder