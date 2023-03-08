import React, { useState } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from '@chakra-ui/react'

function TokenStats({ sdk }) {
    const [output, setOutput] = useState({})    

    const queryTokenizationStats = async () => {
      const info = await sdk.carbonInfo.queryTokenizationStats("1")
      setOutput(info)  
  }    

  return (
    <Card>
        <CardHeader>
        <Heading size='md'> Token Stats</Heading>
        </CardHeader>
        <CardBody className="text-xs overflow-auto">
                {JSON.stringify(output, null, 2)}
        </CardBody>
        <CardFooter>
            <Button onClick={queryTokenizationStats}>Get</Button>
        </CardFooter>
    </Card>
  )
}

export default TokenStats