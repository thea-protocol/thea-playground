import React, { useState, useContext } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";

function Logout() {
  const { theaSDK } = useContext(TheaSDKContext);  
    const [output, setOutput] = useState({})

    const refresh = async () => {
        setOutput({})
        const res = await theaSDK.auth.logout();
        setOutput(res)
    }

  return (
    <Card>
    <CardHeader>
      <Heading size='md'> Logout</Heading>
    </CardHeader>
    <CardBody>
        { JSON.stringify(output, 2) }
    </CardBody>
    <CardFooter>
        <Button onClick={refresh}>Get</Button>
    </CardFooter>
  </Card>
  )
}

export default Logout