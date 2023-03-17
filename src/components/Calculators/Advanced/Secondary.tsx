import React, { useState, useEffect } from 'react'
import {
  Box,
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
  FormControl,
  FormLabel,
  Switch,
  Select
} from '@chakra-ui/react'
import { AdvancedCalculator } from './advanced'

function Secondary({data, setData}) {
  const [footprint, setFootprint] = useState(0)  
  const [currency, setCurrency] = useState("USD")
  const [duration, setDuration] = useState("per year")
  const [food, setFood] = useState("for a heavy meat eater")

  const [consumption, setConsumption] = useState({
    'food': 0,
    'pharma': 0,
    'clothes': 0,
    'paperBased': 0,
    'IT': 0,
    'TV': 0,
    'motorVehicles': 0,
    'furniture': 0,
    'hotels': 0,
    'phone': 0,
    'finance': 0,
    'insurance': 0,
    'education': 0,
    'recreational': 0
  })

  const calculator = new AdvancedCalculator()

  useEffect(() => { setData({...data, secondary: footprint }) }, [footprint])

  useEffect(()=> {
    const newFootprint =  calculator.calculateSecondary(consumption, currency, duration, food)
    setFootprint(newFootprint)
  }, [consumption, currency, duration, food])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConsumption((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  
  
  return (
    <>

    <Text>Footprint: {footprint}</Text>

    <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-name" fontWeight={'normal'}>
            Currency
          </FormLabel>
          <Select value={currency} onChange={(val) => setCurrency(val.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
        </Select>
        </FormControl>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-name" fontWeight={'normal'}>
            Duration
          </FormLabel>
          <Select value={duration} onChange={(val) => setDuration(val.target.value)}>
            <option value="per year">per year</option>
            <option value="per month">per month</option>
            <option value="per week">per week</option>
        </Select>
        </FormControl>
    </Flex>



    <Table  variant='simple'  size='xs' my="4">
      <Tbody>
        
    {
        Object.keys(consumption).map(key =>
          <Tr key={key}>
            <Td>{key}</Td>
            <Td>
              <NumberInput size='xs' w={20} min={0}  value={consumption[key]} onChange={(value) => handleChange({ target: { name: key, value }})}>
                  <NumberInputField name={key} />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>
            </Td>
            { (key == 'food') ?
            <Td>
            <Select w="32" size={"sm"} value={food} onChange={(val) => setFood(val.target.value)}>
              <option value='for a heavy meat eater'>Heavy meat eater</option>
              <option value='for a medium meat eater'>Medium meat eater</option>
              <option value='for a low meat eater'>Low meat eater</option>
              <option value='for a pescatarian'>Pescatarian</option>
              <option value='for a vegetarian'>Vegetarian</option>
              <option value='for a vegan'>Vegan</option>
            </Select>
            </Td>
            : <></> }
          </Tr>            
            )
    }
      </Tbody>
    </Table>
    </>
  )
}

export default Secondary