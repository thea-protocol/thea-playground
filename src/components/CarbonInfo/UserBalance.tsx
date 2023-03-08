import React, { useState } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from '@chakra-ui/react'

function UserBalance({ sdk, address }) {
    const [output, setOutput] = useState({})    

    const getUsersBalance = async () => {
        console.log(address)
          const info = await sdk.carbonInfo.getUsersBalance(address)
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