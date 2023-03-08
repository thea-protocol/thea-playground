import React, { useState, useContext } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";

function TokenHist() {
  const { theaSDK } = useContext(TheaSDKContext);  
    const [output, setOutput] = useState({})    

    const queryTokenizationHistory = async () => {
        const info = await theaSDK.carbonInfo.queryTokenizationHistory()
        setOutput(info)  
    }    

  return (
    <Card>
        <CardHeader>
        <Heading size='md'> Token History</Heading>
        </CardHeader>
        <CardBody className="text-xs overflow-auto">
                {JSON.stringify(output, null, 2)}
        </CardBody>
        <CardFooter>
            <Button onClick={queryTokenizationHistory}>Get</Button>
        </CardFooter>
    </Card>
  )
}

export default TokenHist