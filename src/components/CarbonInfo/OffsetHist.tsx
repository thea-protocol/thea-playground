import React, { useState } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from '@chakra-ui/react'

function OffsetHist({ sdk }) {
    const [output, setOutput] = useState({})    

    const queryOffsetHistory = async () => {
        const info = await sdk.carbonInfo.queryOffsetHistory()
        setOutput(info)  
    }   

  return (
    <Card>
        <CardHeader>
        <Heading size='md'> Offset History</Heading>
        </CardHeader>
        <CardBody className="text-xs overflow-auto">
                {JSON.stringify(output, null, 2)}
        </CardBody>
        <CardFooter>
            <Button onClick={queryOffsetHistory}>Get</Button>
        </CardFooter>
    </Card>
  )
}

export default OffsetHist