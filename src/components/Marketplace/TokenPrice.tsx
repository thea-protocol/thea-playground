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
    const [nftPrice, setNftPrice] = useState(15)
    const [amount, setAmount] = useState(100)


    const queryTokenPrice = async () => {
      const res = await theaSDK.recover.queryRecoverFungibles(tokenId, 1000);
      setOutput(res)
      console.log(res)
      const info = await theaSDK.carbonInfo.queryTokenPrice(tokenId)
          
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
        <NumberInput value={tokenId} min={1} max={4} onChange={setTokenId}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3]} py="2">
        <FormLabel
          fontSize="sm"
          fontWeight="md">
          Price
        </FormLabel>
        <NumberInput value={nftPrice} min={1} onChange={setNftPrice}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>


      </FormControl>

      <Button onClick={queryTokenPrice}>Get</Button>


                {JSON.stringify(output, null, 2)}

        </CardBody>
    </Card>
  )
}

export default TokenPrice