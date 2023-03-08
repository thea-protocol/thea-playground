import {
    FormControl,
    FormLabel,
    NumberInput,
    GridItem,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Card,
    CardBody,
    CardHeader, Heading, CardFooter, Button, Text, ButtonGroup } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ethers } from 'ethers'
import { erc1155ABI } from '../../constants'
import { parseUnits } from "ethers/lib/utils.js";

function TokenActions({sdk, address}) {
  const [output, setOutput] = useState({})   
  const [tokenId, setTokenId] = useState(2)
  const [amount, setAmount] = useState(1)

  const contract = new ethers.Contract("0x0d1543fa8057487f2fd36a643f1f211b2bc2b4b5", erc1155ABI, sdk.providerOrSigner);

  const getTokenBalance = async () => {
    const info = (await contract.balanceOf(address, tokenId)).toString()
    setOutput(info)
  }     

    const convert = async (withSig?: boolean) => {
        if (!address || !tokenId || !amount) return;
        if (withSig) {
            console.log("Implementing Signature...")
        } else {
        try {
            await sdk?.convert.convertNFT(tokenId, amount);
            alert("Transaction successful");
        } catch (error) {
            alert("Transaction failed");
            console.log(error);
        }
        }
    };    

    const recover = async (withSig?: boolean) => {
        if (!address || !tokenId || !amount) return;
        if (withSig) {
            console.log("Implementing Signature...")
        } else {
        try {
            await sdk?.recover.recoverNFT(tokenId, amount);
            alert("Transaction successful");
        } catch (error) {
            alert("Transaction failed");
            console.log(error);
        }
        }
    };     

    const retire = async () => {

        const transactionReceipt = await sdk.offset.offsetNFT(tokenId, amount);
        setOutput(transactionReceipt)

    }


  return (
    <Card>
      <CardHeader>
        <Heading size='md'> Token Actions</Heading>    
        <Text fontSize="xs">
        { address }  

        </Text>

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
          Amount
        </FormLabel>
        <NumberInput value={amount} min={1} onChange={setAmount}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>


                {JSON.stringify(output, null, 2)}
        </CardBody>
      <CardFooter>
        <ButtonGroup size="xs">
          <Button  onClick={getTokenBalance}>Balance</Button>
          <Button  onClick={() => convert()}>Convert</Button>
          <Button  onClick={() => recover()}>Recover</Button>
          <Button  onClick={retire}>Retire</Button>

        </ButtonGroup>
      </CardFooter>


    </Card>
  )
}

export default TokenActions