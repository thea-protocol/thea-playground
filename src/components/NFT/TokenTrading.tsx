import { Card, CardBody, CardHeader, Heading, CardFooter, Button, Text, ButtonGroup } from '@chakra-ui/react'
import React, { useState } from 'react'

function TokenTrading({sdk, address}) {
  const [output, setOutput] = useState({})   
  const [tokenId, setTokenId] = useState(2)
  const [quantity, setQuantity] = useState(1)  
  const [price, setPrice] = useState(10)
  const [side, setSide] = useState("sell")  

  const enterOrder = async () => {

    const priceInWEI = await sdk.nftTrading.enterNFTLimit(
      tokenId, // token id of the NFT
      side, // buy or sell
      price, // price of the NFT in Stablecoins
      quantity, // quantity of the NFT
    );    

  }



  return (
    <Card>
      <CardHeader>
        <Heading size='md'> NFT Trading</Heading>    
        <Text fontSize="xs">
        { address }  

        </Text>
      </CardHeader>
      <CardBody className="text-xs overflow-auto">
                {JSON.stringify(output, null, 2)}
        </CardBody>
      <CardFooter>
        <ButtonGroup size="sm">
          <Button onClick={enterOrder}>Enter</Button>

        </ButtonGroup>
      </CardFooter>


    </Card>
  )
}

export default TokenTrading