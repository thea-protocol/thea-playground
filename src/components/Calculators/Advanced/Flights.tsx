import React, { useState, useEffect } from 'react'
import { FormControl, FormLabel, Select, GridItem, Input } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button
} from '@chakra-ui/react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
} from '@chakra-ui/react'
import { AdvancedCalculator } from './advanced'

import airports from '../data/airports.json'

const classEmissionFactors = {
  "Economy class":7.438461987823514e-05,
  "Premium economy":0.001292692579585472,
  "Business class":0.002342989027933467,
  "First class":0.0032317965392244853,
  "Average (unknown class)":0.0010549178568651433
}

function Flights() {
  const [footprint, setFootprint] = useState(0)  
  const [isReturn, setIsReturn] = useState(true)
  const [from, setFrom] = useState("LIS")
  const [to, setTo] = useState("RAI")
  const [travelClass, setTravelClass] = useState("Economy class")
  const [trips, setTrips] = useState(1)
  const [includeRadiativeForcing, setIncludeRadiativeForcing] = useState(false)
  const [rows, setRows] = useState([])

  const calculator = new AdvancedCalculator()


  const addRow = () => {
    let uuid = self.crypto.randomUUID();
    const types = ["<= 125cc", "> 125cc and <= 500cc", "> 500cc"]
    const row = {
        uuid,
        isReturn,
        from,
        to,
        travelClass,
        trips,
        includeRadiativeForcing,
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
  const newFootprint =  calculator.calculateFlight(isReturn, from, to, travelClass, trips, includeRadiativeForcing)
  setFootprint(newFootprint)
}, [isReturn, from, to, travelClass, trips, includeRadiativeForcing])



  return (
    <>


<TableContainer mt="10">
    <Table variant='simple'  size='xs'>
        <Thead fontSize={'xs'}>
        <Tr>
            <Th>Return</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Class</Th>
            <Th>Trips</Th>
            <Th>RadFor</Th>
            <Th isNumeric>CO2</Th>
            <Th></Th>
        </Tr>
        </Thead>
        <Tbody>
        { rows.map(item => 
            <Tr key={item.uuid}>
                <Td  fontSize={'xs'}>{item.isReturn}</Td>
                <Td  fontSize={'xs'}>{item.from}</Td>
                <Td  fontSize={'xs'}>{item.to}</Td>
                <Td  fontSize={'xs'}>{item.travelClass}</Td>
                <Td  fontSize={'xs'}>{item.trips}</Td>
                <Td  fontSize={'xs'}>{item.includeRadiativeForcing}</Td>
                <Td isNumeric fontSize={'xs'}>{item.footprint.toFixed(2)}</Td>
                <Td isNumeric><Button variant="ghost" size='xs' onClick={() => deleteRow(item.uuid)}>X</Button></Td>
            </Tr>
                )}

        <Tr>
          <Td>
          <FormControl display='flex' alignItems='center'>
                    <Switch id='units' value={isReturn} onChange={() => setIsReturn(!isReturn)}/>
                </FormControl>

          </Td>
          <Td>
            <Input size='xs' value={from} onChange={(val) => setFrom(val.target.value)} />

          </Td>
          <Td>
          <Input size='xs' value={to} onChange={(val) => setTo(val.target.value)} />


          </Td>
            <Td>
            <Select size='xs' value={travelClass} onChange={(val) => setTravelClass(val.target.value)}>
              {
                Object.keys(classEmissionFactors).map(key => 
                  <option key={key} value={classEmissionFactors[key]}>{key}</option>)
              }
            </Select>
            </Td>
            <Td>
                <NumberInput size='xs' min={1}  value={trips} onChange={setTrips}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Td>
            <Td>
                <FormControl display='flex' alignItems='center'>
                    <Switch id='units' value={includeRadiativeForcing} onChange={() => setIncludeRadiativeForcing(!includeRadiativeForcing)}/>
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

export default Flights