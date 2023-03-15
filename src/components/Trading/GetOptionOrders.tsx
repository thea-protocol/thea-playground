import React, { useState, useContext } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Text, HStack, VStack, StackDivider, Box } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";

function GetOptionOrders() {
  const { theaSDK, account } = useContext(TheaSDKContext);  
  const [contracts, setContracts] = useState([])


    const refresh = async () => {
        const res = await theaSDK.options.getOrders();
        setContracts(res)
        console.log(res)
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
        <Th isNumeric></Th>
      </Tr>
    </Thead>
    <Tbody>
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

export default GetOptionOrders