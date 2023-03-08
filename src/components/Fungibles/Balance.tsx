import React, { useState } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from '@chakra-ui/react'
import { Text, HStack, VStack, StackDivider, Box } from '@chakra-ui/react'

function Balance({sdk, address}) {
    const [balances, setBalances] = useState({"fungible":{"vintage":"0","rating":"0","sdg":"0","nbt":"0"},"nft":{}})

    const refresh = async () => {
        console.log(address)
        const res = await sdk.carbonInfo.getUsersBalance(address);
        setBalances(res)
        console.log(res)
    }

  return (
    <Card>
    <CardHeader>
      <Heading size='md'> Token Balances</Heading>
    </CardHeader>
    <CardBody>
      <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
        >
        {['nbt', 'vintage', 'sdg', 'rating'].map(key => 
            <Box h='20px' key={key}>
                <HStack>
                <Text>{key}</Text>
                <Text>{balances['fungible'][key]}</Text>
                </HStack>
            </Box>
        )}
        </VStack>
    </CardBody>
    <CardFooter>
        <Button onClick={refresh}>Get</Button>
    </CardFooter>
  </Card>
  )
}

export default Balance