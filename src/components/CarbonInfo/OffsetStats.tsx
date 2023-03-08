import React, { useState } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from '@chakra-ui/react'

function OffsetStats({ sdk }) {
    const [output, setOutput] = useState({})    

    const queryOffsetStats = async () => {
        const info = await sdk.carbonInfo.queryOffsetStats("1")
        setOutput(info)  
    }    

  return (
    <Card>
        <CardHeader>
        <Heading size='md'> Offset Stats</Heading>
        </CardHeader>
        <CardBody className="text-xs overflow-auto">
                {JSON.stringify(output, null, 2)}
        </CardBody>
        <CardFooter>
            <Button onClick={queryOffsetStats}>Get</Button>
        </CardFooter>
    </Card>
  )
}

export default OffsetStats