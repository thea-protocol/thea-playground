import React, { useState, useContext } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button, FormControl, FormLabel, Select, GridItem, ButtonGroup } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

function OffsetFungible() {
  const { theaSDK } = useContext(TheaSDKContext);  
  const [amountIn, setAmountIn] = useState(1)

  const offset = async () => {
    const transactionReceipt = await theaSDK.offset.offsetFungible(2017, "2000");
    console.log(transactionReceipt)
  }

  return (
  <Card>
    <CardHeader>
      <Heading size='md'> Offset Fungible</Heading>
    </CardHeader>
    <CardBody>

      <FormControl as={GridItem} colSpan={[6, 3]} py="2">
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
          Amount
        </FormLabel>
        <NumberInput value={amountIn} min={1} onChange={setAmountIn}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

    </CardBody>
    <CardFooter>
        <Button onClick={offset}>Offset</Button>
    </CardFooter>
  </Card>
    )
}

export default OffsetFungible