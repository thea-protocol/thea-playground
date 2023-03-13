import React, { useState, useEffect } from 'react'
import {
  Text, 
  Input,
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

function House({data, setData}) {
  const [footprint, setFootprint] = useState(0)  
  const [electricity, setElectricity] = useState(100)
  const [factor, setFactor] = useState(0.5703)
  const [gas, setGas] = useState(0)
  const [oil, setOil] = useState(0)
  const [coal, setCoal] = useState(0)
  const [lpg, setLpg] = useState(0)
  const [propane, setPropane] = useState(0)
  const [pellets, setPellets] = useState(0)

  const calculator = new AdvancedCalculator()

  // useEffect(() => { setData({...data, house: }) }, [country])

  useEffect(()=> {
    const consumption = {
      "Electricity": { amount: electricity, unit: "kWh" },
      "Natural Gas": { amount: gas, unit: "kWh" },
      "Heating Oil": { amount: oil, unit: "kWh" },
      "Coal": { amount: coal, unit: "kWh" },
      "LPG": { amount: lpg, unit: "kWh" },
      "Propane": { amount: propane, unit: "litres" },
      "Wooden pellets": { amount: pellets, unit: "metric tons" }
    }
    const newFootprint =  calculator.calculateHouseHold(consumption, factor)
    setFootprint(newFootprint)
  }, [
      electricity,
      gas,
      oil,
      coal,
      lpg,
      propane,
      pellets
  ])
  


  return (
    <>
    <Text fontSize={'sm'}>Enter your consumption of each type of energy, and press the Calculate button</Text>
    <Text fontSize={'sm'}>Your individual footprint is calculated by dividing the amount of energy by the number of people in your house.</Text>

    <Text>Footprint: {footprint}</Text>

    <Table  variant='simple'  size='xs' my='8'>
      <Tbody>
        <Tr>
          <Td>Electricity</Td>
          <Td>
            <NumberInput size='xs' w={20} min={1}  value={electricity} onChange={setElectricity}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>

          </Td>
          <Td  fontSize={'xs'}>KWh at a factor of</Td>
          <Td>
            <NumberInput size='xs' w={20} min={0} step={0.1} value={factor} onChange={setFactor}>
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
            <NumberInput size='xs' w={20} min={1}  value={gas} onChange={setGas}>
                  <NumberInputField />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>
          </Td>
          <Td colSpan={3}>bah</Td>
        </Tr>
        <Tr>
          <Td>
            Heating Oil
          </Td>
          <Td>
            <NumberInput size='xs' w={20} min={1}  value={oil} onChange={setOil}>
                  <NumberInputField />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>
          </Td>
        </Tr>
        <Tr>
          <Td>
            Coal
          </Td>
          <Td>
            <NumberInput size='xs' w={20} min={1}  value={coal} onChange={setCoal}>
                  <NumberInputField />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>
          </Td>
        </Tr>
        <Tr>
          <Td>
            LPG
          </Td>
          <Td>
            <NumberInput size='xs' w={20} min={1}  value={lpg} onChange={setLpg}>
                  <NumberInputField />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>
          </Td>
        </Tr>
        <Tr>
          <Td>
            Propane
          </Td>
          <Td>
            <NumberInput size='xs' w={20} min={1}  value={propane} onChange={setPropane}>
                  <NumberInputField />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>
          </Td>
        </Tr>
        <Tr>
          <Td>
            Wooden pellets
          </Td>
          <Td>
            <NumberInput size='xs' w={20} min={1}  value={pellets} onChange={setPellets}>
                  <NumberInputField />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>
          </Td>
        </Tr>
      </Tbody>

    </Table>




    </>
  )
}

export default House