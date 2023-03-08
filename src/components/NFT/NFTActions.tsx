import {
    Switch,
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
import React, { useState, useContext } from 'react'
import { ethers } from 'ethers'
import { erc1155ABI } from '../../constants'
import { parseUnits } from "ethers/lib/utils.js";
import { convertWithSig, recoverWithSig, retireWithSig } from "../../utils/utils";
import { TheaSDKContext } from "../../components/TheaSDKProvider";

function TokenActions() {
  const { theaSDK, account } = useContext(TheaSDKContext);  
  const [output, setOutput] = useState({})   
  const [tokenId, setTokenId] = useState(2)
  const [amount, setAmount] = useState(1)
  const [withSig, setWithSig] = useState(false)

  const contract = new ethers.Contract("0x0d1543fa8057487f2fd36a643f1f211b2bc2b4b5", erc1155ABI, theaSDK.providerOrSigner);

  const getTokenBalance = async () => {
    const info = (await contract.balanceOf(account, tokenId)).toString()
    setOutput(info)
  }     

    const convert = async () => {
        if (!account || !tokenId || !amount) return;
        if (withSig) {
            console.log("Implementing Signature...")
            await convertWithSig(tokenId, amount, account);

        } else {
        try {
            await theaSDK?.convert.convertNFT(tokenId, amount);
            alert("Transaction successful");
        } catch (error) {
            alert("Transaction failed");
            console.log(error);
        }
        }
    };    

    const recover = async () => {
        if (!account || !tokenId || !amount) return;
        if (withSig) {
            console.log("Implementing Signature...")
            const tokensRequired = await theaSDK.recover.queryRecoverFungibles(
              tokenId,
              amount
            );
            await recoverWithSig(
              tokenId,
              amount,
              tokensRequired.cbt,
              tokensRequired.vintage,
              tokensRequired.sdg,
              tokensRequired.rating,
              account
            );            
        } else {
        try {
            await theaSDK?.recover.recoverNFT(tokenId, amount);
            alert("Transaction successful");
        } catch (error) {
            alert("Transaction failed");
            console.log(error);
        }
        }
    };     

    const retire = async () => {

      if (!account || !tokenId || !amount || !theaSDK) return;
      try {
        if (withSig) {
          await retireWithSig(tokenId, amount, account);
        } else {
          await theaSDK.offset.offsetNFT(tokenId, amount);
        }
      } catch (error) {
          alert("Transaction failed");
        console.log(error);
      }
    }


  return (
    <Card>
      <CardHeader>
        <Heading size='md'> Token Actions</Heading>    
        <Text fontSize="xs">
        { account }  

        </Text>

      </CardHeader>
      <CardBody className="text-xs overflow-auto">
      <FormControl display='flex' alignItems='center' py="2">
      <FormLabel htmlFor='withSig' mb='0'>
        Use Relayer?
      </FormLabel>
      <Switch id='withSig' isChecked={withSig} onChange={() => setWithSig(!withSig)}/>
    </FormControl>        

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