import { Card, CardBody, CardHeader, Heading, CardFooter, Button, Text, ButtonGroup } from '@chakra-ui/react'
import React, { useState } from 'react'

function OrderbookQuery({sdk, address}) {
  const [output, setOutput] = useState({})   
  const [tokenId, setTokenId] = useState(2)  

  const queryOrdersInfo = async () => {
    const owner = address
    const transactionReceipt = await sdk.nftOrderbook.queryOrdersInfo(tokenId, owner)
    console.log(transactionReceipt)
    setOutput(transactionReceipt)  
}  

  const queryPriceListing = async () => {
    const side = "sell"
    const transactionReceipt = await sdk.nftOrderbook.queryPriceListing(tokenId, side)
    console.log(transactionReceipt)
    setOutput(transactionReceipt)  
  }    

  const queryOrderByNonce = async () => {
    const nonce = 1
    const transactionReceipt = await sdk.nftOrderbook.queryOrderByNonce(nonce)
    console.log(transactionReceipt)
    setOutput(transactionReceipt)  
  }    

  return (
    <Card>
      <CardHeader>
        <Heading size='md'> Query Orderbook</Heading>    
        <Text fontSize="xs">
        { address }  

        </Text>
      </CardHeader>
      <CardBody>
        <Text fontSize={"xs"}>
                {JSON.stringify(output, null, 2)}

        </Text>
        </CardBody>
      <CardFooter>
        <ButtonGroup size="sm">
          <Button  onClick={queryOrderByNonce}>Order</Button>
          <Button  onClick={queryOrdersInfo}>Orders</Button>
          <Button  onClick={queryPriceListing}>PriceList</Button>

        </ButtonGroup>
      </CardFooter>


    </Card>
  )
}

export default OrderbookQuery