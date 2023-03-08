import { Card, CardBody, CardHeader, Heading, CardFooter, Button, Text, ButtonGroup } from '@chakra-ui/react'
import React, { useState } from 'react'

function TokenList({sdk}) {
  const [output, setOutput] = useState({})   

  const getTokenList = async () => {
    const info = await sdk.nftTokenList.getTokenList()
    setOutput(info)
}     

  return (
    <Card>
      <CardHeader>
        <Heading size='md'> Token List</Heading>    
      </CardHeader>
      <CardBody className="text-xs overflow-auto">
                {JSON.stringify(output, null, 2)}
        </CardBody>
      <CardFooter>
        <ButtonGroup size="sm">
          <Button  onClick={getTokenList}>Order</Button>

        </ButtonGroup>
      </CardFooter>


    </Card>
  )
}

export default TokenList