import React, { useState} from 'react'
import { SimpleGrid, Card, CardHeader, CardBody, CardFooter, Heading, Text, Button, FormControl, FormLabel, Select, GridItem, ButtonGroup } from '@chakra-ui/react'

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

function QuoteTrade({sdk}) {
  const [tokenIn, setTokenIn] = useState("Stable")
  const [tokenOut, setTokenOut] = useState("CurrentNBT")
  const [amountIn, setAmountIn] = useState(1)
  const [quote, setQuote] = useState(0)

  const getQuote = async () => {
    console.log(tokenIn, tokenOut, amountIn)
    const priceInWEI = await sdk.fungibleTrading.queryTokenPrice({
      tokenIn,
      tokenOut,
      amountIn: (amountIn * 1e18).toString()
    });  
    setQuote(priceInWEI)
  }

  const buy = async () => {
    const transactionReceipt = await sdk.fungibleTrading.swapTokens({
      tokenIn,
      tokenOut,
      amountIn: (amountIn * 1e18).toString()
    });

  }


  return (
  <Card>
    <CardHeader>
      <Heading size='md'> Fungibles</Heading>
    </CardHeader>
    <CardBody>
    <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
          TokenIn
        </FormLabel>
        <Select
          value={tokenIn}
          onChange={(val) => setTokenIn(val.target.value)}
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md">
          <option value="Stable">Stable</option>
          <option value="CurrentNBT">CurrentNBT</option>
          <option value="Vintage">Vintage</option>
          <option value="Rating">Rating</option>
        </Select>
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3]} py="6">
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
          TokenOut
        </FormLabel>
        <Select
          value={tokenOut}
          onChange={(val) => setTokenOut(val.target.value)}
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md">
          <option>Stable</option>
          <option>CurrentNBT</option>
          <option>Vintage</option>
          <option>Rating</option>
        </Select>
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
          Amount
        </FormLabel>
        <NumberInput value={amountIn} min={0} max={20} onChange={setAmountIn}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <Text>
        Quote: {quote}

      </Text>

    </CardBody>
    <CardFooter>
      <ButtonGroup>
        <Button onClick={getQuote}>Quote</Button>
        <Button onClick={buy}>Buy</Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
    )
}

export default QuoteTrade