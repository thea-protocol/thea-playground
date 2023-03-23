import React, { useState, useContext } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";

function GetStrikePremium() {
  const { theaSDK, account } = useContext(TheaSDKContext);  
  const [contracts, setContracts] = useState([])


    const refresh = async () => {
        const res = await theaSDK.options.getCurrentStrikeAndPremium();
        setContracts(res)
        console.log("Options", res)
    }

  return (
    <Card>
    <CardHeader>
      <Heading size='md'> Option Contracts</Heading>
    </CardHeader>
    <CardBody>
    <TableContainer>
  <Table variant='simple' size="sm">
    <Thead>
      <Tr>
        <Th>Type</Th>
        <Th>K</Th>
        <Th isNumeric>Prem.</Th>
        <Th isNumeric>Expiry</Th>
      </Tr>
    </Thead>
    <Tbody>
        { contracts.map(contract => 
        <Tr key={contract.uuid}>
            <Td>{ contract.optionType}</Td>
            <Td>{ contract.strike}</Td>
            <Td isNumeric>{ contract.premiumPrice?.toFixed(4)  }</Td>
            <Td isNumeric>{ contract.expiry }</Td>
        </Tr>
            )}
    </Tbody>
  </Table>
</TableContainer>
    </CardBody>
    <CardFooter>
        <Button onClick={refresh}>Get</Button>
    </CardFooter>
  </Card>
  )
}

export default GetStrikePremium