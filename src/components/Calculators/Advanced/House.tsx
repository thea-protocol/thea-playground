import React, { useState, useEffect } from 'react'
import {
  Select,
  Text, 
  Flex,
  Table,
  Tbody,
  Tr,
  Td,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { AdvancedCalculator } from './advanced'

function InputRow({mydata, options, setFn}) {
  return (
  <Flex>
    <NumberInput
      size='xs'
      w={20}
      min={0} 
      value={mydata.amount}
      onChange={(val) => setFn(mydata.amount = val)}>
        <NumberInputField />
        <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Select size="xs" w="20">
        { options.map(item =>
          <option key={item} value={item}>{item}</option>
          )}
      </Select>
  </Flex>
  )  
}


function House({data, setData}) {
  const [footprint, setFootprint] = useState(0)  

  const [houseData, setHouseData] = useState({
    "Electricity": { amount: 0, unit: "kWh", factor: 0.5703 },
    "Natural Gas": { amount: 0, unit: "kWh" },
    "Heating Oil": { amount: 0, unit: "kWh" },
    "Coal": { amount: 0, unit: "kWh" },
    "LPG": { amount: 0, unit: "kWh" },
    "Propane": { amount: 0, unit: "litres" },
    "Wooden pellets": { amount: 0, unit: "metric tons" }
  })

  const handleHouseChange = (val, label, fld) => {
    const newData = JSON.parse(JSON.stringify(houseData))    
    newData[label][fld] =  (fld == 'amount' || fld == 'factor') ? Number(val) : val
    setHouseData(newData)
  }

  const calculator = new AdvancedCalculator()


  useEffect(() => { setData({...data, house: footprint }) }, [footprint])
  useEffect(() => {
    const newFactor = calculator.houseKWhFactors[data.country]
    handleHouseChange(newFactor, "Electricity", "factor")
  },[data.country])

  useEffect(()=> {
    const newFootprint =  calculator.calculateHouseHold(houseData)
    setFootprint(newFootprint)
  }, [houseData])
  


  return (
    <>
    <Text fontSize={'sm'}>Enter your consumption of each type of energy, and press the Calculate button</Text>
    <Text fontSize={'sm'}>Your individual footprint is calculated by dividing the amount of energy by the number of people in your house.</Text>

    <Table  variant='simple'  size='xs' my='8'>
      <Tbody>
        <Tr>
          <Td>Electricity</Td>
          <Td>
          <NumberInput size='xs' w={20} min={0}
                value={houseData['Electricity'].amount}
                onChange={(val) => handleHouseChange(val, 'Electricity', 'amount')}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>

          </Td>
          <Td  fontSize={'xs'}>KWh at a factor of</Td>
          <Td>
          <NumberInput size='xs' w={20} min={0} step={0.1}
                value={houseData['Electricity'].factor}
                onChange={(val) => handleHouseChange(val, 'Electricity', 'factor')}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>
          </Td>
          <Td fontSize={'xs'}>kgCO2e/KWh</Td>
        </Tr>
        <Tr>
          <Td>
            Natural Gas
          </Td>
          <Td>
            <Flex>
              <NumberInput size='xs' w={20} min={0}
                value={houseData['Natural Gas'].amount}
                onChange={(val) => handleHouseChange(val, 'Natural Gas', 'amount')}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>
              <Select
                size="xs"
                w="20"
                value={houseData['Natural Gas'].unit}
                onChange={(val) => handleHouseChange(val.target.value, 'Natural Gas', 'unit')}
                >
  
            <option value='kWs'>kWs</option>
            <option value='therms'>therms</option>
          </Select>
          </Flex>
          </Td>
        </Tr>
        <Tr>
          <Td>
            Heating Oil
          </Td>
          <Td>
          <Flex>
              <NumberInput size='xs' w={20} min={0}
              value={houseData['Heating Oil'].amount}
              onChange={(val) => handleHouseChange(val, 'Heating Oil', 'amount')}
              >
                  <NumberInputField />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>
              <Select
                size="xs"
                w="20"
                value={houseData['Heating Oil'].unit}
                onChange={(val) => handleHouseChange(val.target.value, 'Heating Oil', 'unit')}
                >
            <option value='kWs'>kWs</option>
            <option value='litres'>litres</option>
            <option value='metric tonnes'>metric tons</option>
            <option value='US gallons'>gallons</option>
          </Select>
          </Flex>
          </Td>
        </Tr>
        <Tr>
          <Td>
            Coal
          </Td>
          <Td>
          <Flex>
              <NumberInput size='xs' w={20} min={0}
              value={houseData['Coal'].amount}
              onChange={(val) => handleHouseChange(val, 'Coal', 'amount')}
              >
                  <NumberInputField />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>
              <Select
                size="xs"
                w="20"
                value={houseData['Coal'].unit}
                onChange={(val) => handleHouseChange(val.target.value, 'Coal', 'unit')}
                >
            <option value='kWs'>kWs</option>
            <option value='metric tonnes'>metric tons</option>
          </Select>
          </Flex>
          </Td>
        </Tr>
        <Tr>
          <Td>
            LPG
          </Td>
          <Td>
          <Flex>
              <NumberInput size='xs' w={20} min={0}
              value={houseData['LPG'].amount}
              onChange={(val) => handleHouseChange(val, 'LPG', 'amount')}
              >
                  <NumberInputField />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>
              <Select
                size="xs"
                w="20"
                value={houseData['LPG'].unit}
                onChange={(val) => handleHouseChange(val.target.value, 'LPG', 'unit')}
                >
            <option value='kWs'>kWs</option>
            <option value='litres'>litres</option>
            <option value='therms'>therms</option>
          </Select>
          </Flex>
          </Td>
        </Tr>
        <Tr>
          <Td>
            Propane
          </Td>
          <Td>
          <Flex>
              <NumberInput size='xs' w={20} min={0}
              value={houseData['Propane'].amount}
              onChange={(val) => handleHouseChange(val, 'Propane', 'amount')}
              >
                  <NumberInputField />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>
              <Select
                size="xs"
                w="20"
                value={houseData['Propane'].unit}
                onChange={(val) => handleHouseChange(val.target.value, 'Propane', 'unit')}
                >
            <option value='litres'>litres</option>
            <option value='US gallons'>US gallons</option>
          </Select>
          </Flex>
          </Td>
        </Tr>
        <Tr>
          <Td>
            Wooden pellets
          </Td>
          <Td colSpan={3}>
          <Flex>
              <NumberInput size='xs' w={20} min={0}
              value={houseData['Wooden pellets'].amount}
              onChange={(val) => handleHouseChange(val, 'Wooden pellets', 'amount')}
              >
                  <NumberInputField />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>
              <Select
                size="xs"
                w="20"
                value={houseData['Wooden pellets'].unit}
                onChange={(val) => handleHouseChange(val.target.value, 'Wooden pellets', 'unit')}
                >
            <option value='metric tons'>metric tons</option>
          </Select>
          </Flex>
          </Td>
        </Tr>
      </Tbody>

    </Table>




    </>
  )
}

export default House