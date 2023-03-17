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
        setContracts(res.result)
        console.log(res)
    }

  return (
    <Card>
    <CardHeader>
      <Heading size='md'> Get User Positions</Heading>
    </CardHeader>
    <CardBody>
    <TableContainer>
  <Table variant='simple' size="sm">
    <Thead>
      <Tr>
        <Th>Type</Th>
        <Th>Qtd</Th>
        <Th isNumeric>Prem.</Th>
        <Th>Expiry</Th>
      </Tr>
    </Thead>
    <Tbody>
      { contracts.map(item =>
      <Tr key={item.uuid}>
        <Td>
          {item.optionType}
        </Td>
        <Td  isNumeric>
          {item.quantity}
        </Td>
        <Td>
          {item.premium.toFixed(2)}
        </Td>
        <Td>
          {item.expiry}
        </Td>
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

export default GetOptionOrders