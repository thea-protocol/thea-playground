import React, { useState, useContext } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button,
  FormControl,
  FormLabel,
  NumberInput,
  GridItem,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex
} from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";

function TokenPrice() {
    const { theaSDK } = useContext(TheaSDKContext);  
    const [output, setOutput] = useState({})    
    const [tokenId, setTokenId] = useState(2)


    const queryTokenPrice = async () => {
        const info = await theaSDK.offset.queryTokenPrice(tokenId)
        setOutput(info)  
    }    

  return (
    <Card>
        <CardHeader>
        <Heading size='md'> Token Price</Heading>
        </CardHeader>
        <CardBody className="text-xs overflow-auto">
        <FormControl as={GridItem} colSpan={[6, 3]} py="2">
        <FormLabel
          fontSize="sm"
          fontWeight="md">
          TokenId
        </FormLabel>
        <Flex>
        <NumberInput value={tokenId} min={1} max={4} onChange={setTokenId}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
            <Button onClick={queryTokenPrice}>Get</Button>

        </Flex>

      </FormControl>
                {JSON.stringify(output, null, 2)}

        </CardBody>
    </Card>
  )
}

export default TokenPrice