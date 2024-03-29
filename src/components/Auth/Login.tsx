import React, { useState, useContext } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";

function Login() {
  const { theaSDK, account } = useContext(TheaSDKContext);  
    const [output, setOutput] = useState({})

    const refresh = async () => {
        setOutput({})
        const res = await theaSDK.auth.login();
        setOutput(res)
    }

  return (
    <Card>
    <CardHeader>
      <Heading size='md'> Login</Heading>
    </CardHeader>
    <CardBody>
        { JSON.stringify(output, 2) }
    </CardBody>
    <CardFooter>
        <Button onClick={refresh}>Login</Button>
    </CardFooter>
  </Card>
  )
}

export default Login