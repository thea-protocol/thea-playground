import React, { useState, useContext } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button, useToast } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";

function UserProfile() {
    const { theaSDK, account } = useContext(TheaSDKContext);  
    const [output, setOutput] = useState({})   
    const toast = useToast()

    const getUsersProfile = async () => {
        console.log(account)
        console.log(theaSDK?.carbonInfo)
        try {
            const info = await theaSDK.carbonInfo.getUsersProfile()
            setOutput(info)  
        } catch(error) {
            toast({
                title: 'Error',
                description: error.toString(),
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
      }    

  return (
    <Card>
        <CardHeader>
        <Heading size='md'> User Profile</Heading>
        </CardHeader>
        <CardBody className="text-xs overflow-auto">
                {JSON.stringify(output, null, 2)}

                    
        </CardBody>
        <CardFooter>
            <Button onClick={getUsersProfile}>Get</Button>
        </CardFooter>
    </Card>
  )
}

export default UserProfile