import React, { useState, useContext } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button, useToast } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";

function UserBalance() {
    const { theaSDK, account } = useContext(TheaSDKContext);  
    const [output, setOutput] = useState({})    
    const toast = useToast()


    const getUsersBalance = async () => {
        console.log(account)
        try {
          const info = await theaSDK.carbonInfo.getUsersBalance(account)
          setOutput(info)  
        } catch(error) {
          toast({
              title: 'Error',
              description: error.toString(),
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
      }      }    

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