import React, { useState, useContext } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";

function UserBalance() {
    const { theaSDK, account } = useContext(TheaSDKContext);  
    const [output, setOutput] = useState({})    

    const getUsersBalance = async () => {
        console.log(account)
          const info = await theaSDK.carbonInfo.getUsersBalance(account)
          setOutput(info)  
      }    

  return (
    <Card>
        <CardHeader>
        <Heading size='md'> User Balance</Heading>
        </CardHeader>
        <CardBody className="text-xs overflow-auto">
                {JSON.stringify(output, null, 2)}
        </CardBody>
        <CardFooter>
            <Button onClick={getUsersBalance}>Get</Button>
        </CardFooter>
    </Card>
  )
}

export default UserBalance