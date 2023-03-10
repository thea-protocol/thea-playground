import React, { useState, useEffect } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Select,
    Button
  } from '@chakra-ui/react'
  import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Switch,
    FormControl,
    FormLabel,
  } from '@chakra-ui/react'
  import { AdvancedCalculator } from './advanced'

function Motorbike() {
    const [type, setType] = useState("1")
    const [amount, setAmount] = useState(50000)
    const [isMiles, setIsMiles] = useState(false)
    const [footprint, setFootprint] = useState(0)
    const [rows, setRows] = useState([])

    const calculator = new AdvancedCalculator()

    const addRow = () => {
        let uuid = self.crypto.randomUUID();
        const types = ["<= 125cc", "> 125cc and <= 500cc", "> 500cc"]
        const row = {
            uuid,
            type: types[parseInt(type)-1],
            amount,
            unit: (isMiles ? "miles": "kms"),
            footprint
        }
        const newRows = [...rows, row]
        setRows(newRows)
    }

    const deleteRow = (uuid) => {
        const newRows = rows.filter(item => item.uuid != uuid)
        setRows(newRows)
    }

    useEffect(()=> {
        const newFootprint =  calculator.calculateMotorbike(type, amount, isMiles)
        setFootprint(newFootprint)
    }, [amount, type, isMiles])

  return (
    <>
    <TableContainer mt="10">
    <Table variant='simple'  size='xs'>
        <Thead fontSize={'xs'}>
        <Tr>
            <Th>Type</Th>
            <Th>Amount</Th>
            <Th>Unit</Th>
            <Th isNumeric>TCO2e</Th>
            <Th></Th>
        </Tr>
        </Thead>
        <Tbody>
        { rows.map(item => 
            <Tr key={item.uuid}>
                <Td  fontSize={'xs'}>{item.type}</Td>
                <Td  fontSize={'xs'}>{item.amount}</Td>
                <Td  fontSize={'xs'}>{item.unit}</Td>
                <Td isNumeric fontSize={'xs'}>{item.footprint.toFixed(2)}</Td>
                <Td isNumeric><Button variant="ghost" size='xs' onClick={() => deleteRow(item.uuid)}>X</Button></Td>
            </Tr>
                )}
        <Tr>
            <Td>
            <Select size='xs' value={type} onChange={(val) => setType(val.target.value)}>
                <option value='1'>&#60;= 125cc</option>
                <option value='2'>&#62; 125cc and &#60;= 500cc</option>
                <option value='3'>&#62; 500cc</option>
            </Select>
            </Td>
            <Td>
                <NumberInput size='xs' min={1}  value={amount} onChange={setAmount}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Td>
            <Td>
                <FormControl display='flex' alignItems='center'>
                    <FormLabel mb='0' fontSize={'xs'}>
                        Kms
                    </FormLabel>
                    <Switch id='units' value={isMiles} onChange={() => setIsMiles(!isMiles)}/>
                    <FormLabel mb='0' fontSize={'xs'} px='2'>
                        Miles
                    </FormLabel>
                </FormControl>
            </Td>

            <Td isNumeric>{footprint.toFixed(2)}</Td>

            <Td isNumeric>
                <Button size="xs" onClick={addRow}>New</Button>
            </Td>
        </Tr>
        </Tbody>
    </Table>
    </TableContainer>
    </>
  )
}

export default Motorbike