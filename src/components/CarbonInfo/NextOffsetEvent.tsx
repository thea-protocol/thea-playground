import React, { useState, useContext } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";

function NextOffset() {
    const { theaSDK, account } = useContext(TheaSDKContext);  
    const [output, setOutput] = useState({})    

    const getNextOffsetEventDate = async () => {
        console.log(account)
        console.log(theaSDK?.carbonInfo)
        
          const info = await theaSDK.offset.getNextOffsetEventDate()
          setOutput(info)  
      }    

  return (
    <Card>
        <CardHeader>
        <Heading size='md'> Next Offset</Heading>
        </CardHeader>
        <CardBody className="text-xs overflow-auto">
                {JSON.stringify(output, null, 2)}
        </CardBody>
        <CardFooter>
            <Button onClick={getNextOffsetEventDate}>Get</Button>
        </CardFooter>
    </Card>
  )
}

export default NextOffset