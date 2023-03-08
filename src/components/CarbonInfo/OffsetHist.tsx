import React, { useState, useContext } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";

function OffsetHist() {
    const { theaSDK } = useContext(TheaSDKContext);  
    const [output, setOutput] = useState({})    

    const queryOffsetHistory = async () => {
        const info = await theaSDK.carbonInfo.queryOffsetHistory()
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