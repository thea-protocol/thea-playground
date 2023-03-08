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
    CloseButton
  } from '@chakra-ui/react'

function Motorbike() {
    const [type, setType] = useState("1")
    const [amount, setAmount] = useState(50000)
    const [isMiles, setIsMiles] = useState(false)
    const [footprint, setFootprint] = useState(0)
    const [rows, setRows] = useState([])

    const calculateMotorbike = () => {
        const bikeTypes = {
            //g/km
            "1": 83.06, // "small motorbike/moped/scooter up to 125cc"
            "2": 100.9, // "medium motorbike over 125cc and up to 500cc"
            "3": 132.45 // "large motorbike over 500cc"
        }

        const emmissionFactors = {
            "g/km":1e-6,
            "L/100km":21.6185e-6,
            "mpg(UK)":61.0701e-4,
            "mpg(US)":50.8510e-4
        }

        const milage = isMiles ? amount*1.609344 : amount
        const efficiency = bikeTypes[type]
        const unit = "g/km"

        const emissions = milage*emmissionFactors[unit]*efficiency
        setFootprint(emissions)
    }

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
        calculateMotorbike()
    }, [amount, type, isMiles])

  return (
    <>
    <TableContainer mt="10">
    <Table variant='simple'  size='xs'>
        <Thead>
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
                <Button size="xs" onClick={addRow}>Add</Button>
            </Td>
        </Tr>
        </Tbody>
    </Table>
    </TableContainer>
    </>
  )
}

export default Motorbike