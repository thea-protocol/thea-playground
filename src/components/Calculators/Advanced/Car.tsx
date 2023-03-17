import React, { useState, useEffect } from 'react'
import {
  FormControl,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
} from '@chakra-ui/react'
import { AdvancedCalculator } from './advanced'


function Car({data, setData}) {
  const [footprint, setFootprint] = useState(0)  

  const [carType, setCarType] = useState('Car')
  const [subType, setSubType] = useState('Diesel Car')
  const [model, setModel] = useState('Average diesel car')
  const [isMiles, setIsMiles] = useState(false)
  const [amount, setAmount] = useState(1)
  const [rows, setRows] = useState([])
  

  const calculator = new AdvancedCalculator()
  const carDatabase = calculator.carDatabase

    useEffect(() => { setData({
      ...data,
      car: rows.map(item => item.footprint).reduce((a,b) => a + b,  0)
    }) }, [rows])


  const addRow = () => {
    let uuid = self.crypto.randomUUID();
    const row = {
        uuid,
        carType,
        subType,
        model,
        amount,
        isMiles,
        footprint,
    }
    const newRows = [...rows, row]
    setRows(newRows)
}


useEffect(() => {
    setSubType(Object.keys(carDatabase[carType])[0])

}, [carType])


useEffect(() => {
    setModel(Object.keys(carDatabase[carType][subType])[0])

}, [subType])




const deleteRow = (uuid) => {
  const newRows = rows.filter(item => item.uuid != uuid)
  setRows(newRows)
}

useEffect(()=> {
  const newFootprint =  calculator.calculateCar(
    carType,
    subType,
    model,
    amount,
    isMiles,
)
  setFootprint(newFootprint)
}, [
    carType,
    subType,
    model,
    amount,
    isMiles,
])



  return (
    <>

<TableContainer mt="10">
    <Table variant='simple'  size='xs'>
        <Thead fontSize={'xs'}>
            <Th>Type</Th>
            <Th>Subtype</Th>
            <Th>Model</Th>
            <Th>Amount</Th>
            <Th>Miles</Th>
            <Th>CO2</Th>
            <Th></Th>
        </Thead>
        <Tbody>
            {
                rows.map(item => 
                    <Tr>
                        <Td>{item.carType}</Td>
                        <Td>{item.subType}</Td>
                        <Td>{item.model}</Td>
                        <Td>{item.amount}</Td>
                        <Td>{item.isMiles ? 'Miles' : 'Kms'}</Td>
                        <Td>{item.footprint.toFixed(2)}</Td>
                        <Td isNumeric><Button variant="ghost" size='xs' onClick={() => deleteRow(item.uuid)}>X</Button></Td>

                    </Tr>
                    )
            }
            <Tr>
                <Td>
                    <Select size="xs" value={carType} onChange={(val) => setCarType(val.target.value)}>
                        { Object.keys(carDatabase).map(key =>
                        <option key={key} value={key}>{key}</option>
                            )}
                    </Select>
                </Td>
                <Td>
                    <Select size="xs" value={subType} onChange={(val) => setSubType(val.target.value)}>
                        { Object.keys(carDatabase[carType]).map(key =>
                        <option key={key} value={key}>{key}</option>
                            )}
                    </Select>
                </Td>
                <Td>
                    <Select size="xs" value={model} onChange={(val) => setModel(val.target.value)}>
                        { carDatabase[carType][subType] ? Object.keys(carDatabase[carType][subType]).map(key =>
                        <option key={key} value={key}>{key}</option> 
                            ) : <></>}
                    </Select>
                </Td>
                <Td>
                <NumberInput w="20" size='xs' min={1}  value={amount} onChange={setAmount}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Td>
            <Td>
                <FormControl display='flex' alignItems='center'>
                    <Switch id='units' value={isMiles} onChange={() => setIsMiles(!isMiles)}/>
                </FormControl>
            </Td>
            <Td>{footprint.toFixed(2)}</Td>
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

export default Car