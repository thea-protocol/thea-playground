import React, { useState, useEffect } from 'react'
import {
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
  Switch
} from '@chakra-ui/react'
import { AdvancedCalculator } from './advanced'

function Secondary({data, setData}) {
  const [footprint, setFootprint] = useState(0)  
  const [bus, setBus] = useState(100)
  const [coach, setCoach] = useState(100)
  const [commuter, setCommuter] = useState(100)
  const [train, setTrain] = useState(100)
  const [tram, setTram] = useState(100)
  const [subway, setSubway] = useState(100)
  const [taxi, setTaxi] = useState(100)
  const [isMiles, setIsMiles] = useState(true)

  const [formData, setFormData] = useState({
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

  useEffect(() => { setData({...data, bus: footprint }) }, [footprint])

  useEffect(()=> {
    const consumption = {
      "Bus": bus,
      "Coach": coach,
      "Local or Commuter Train": commuter,
      "Long Distance Train": train,
      "Tram": tram,
      "Subway": subway,
      "Taxi": taxi
    }
    const newFootprint =  calculator.calculateBus(consumption, isMiles)
    setFootprint(newFootprint)
  }, [
      bus,
      coach,
      commuter,
      train,
      tram,
      subway,
      taxi
  ])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  
  
  return (
    <>
    <Text fontSize={'sm'}>Enter mileage for each type of public transport, and press the Calculate button</Text>

    <Text>Footprint: {footprint}</Text>

    <div>{JSON.stringify(formData, 2)}</div>


    {
        Object.keys(formData).map(key =>
            <FormControl key={key} display='flex' alignItems='center' mt="10">
            <FormLabel mb='0' fontSize={'xs'}>
                {key}
            </FormLabel>
            <NumberInput size='xs' w={20} min={1}  value={formData[key]} onChange={(value) => handleChange({ target: { name: key, value }})}>
                  <NumberInputField name={key} />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>
        </FormControl>
            
            )
    
    }




    <hr></hr>

    <FormControl display='flex' alignItems='center' mt="10">
        <FormLabel mb='0' fontSize={'xs'}>
            Kms
        </FormLabel>
        <Switch id='units' value={isMiles} onChange={() => setIsMiles(!isMiles)}/>
        <FormLabel mb='0' fontSize={'xs'} px='2'>
            Miles
        </FormLabel>
    </FormControl>


    <Table  variant='simple'  size='xs' my="4">
      <Tbody>
        <Tr>
          <Td>Food and drink products</Td>
          <Td>
            <Flex>
            <NumberInput size='xs' w={20} min={1}  value={bus} onChange={setBus}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Text mx="6" w="20" color={'gray.300'} fontSize={'xs'}>{ isMiles ? 'miles' : 'kms'}</Text>
            </Flex>
          </Td>
          <Td fontSize={'xs'}>
            </Td>

        </Tr>
        <Tr>
          <Td>
          Pharmaceuticals
          </Td>
          <Td>
            <NumberInput size='xs' w={20} min={1}  value={coach} onChange={setCoach}>
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
          Clothes, textiles and shoes
          </Td>
          <Td>
            <NumberInput size='xs' w={20} min={1}  value={commuter} onChange={setCommuter}>
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
          Paper based products (e.g. books, magazines, newspapers)
          </Td>
          <Td>
            <NumberInput size='xs' w={20} min={1}  value={train} onChange={setTrain}>
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
          Computers and IT equipment
          </Td>
          <Td>
            <NumberInput size='xs' w={20} min={1}  value={tram} onChange={setTram}>
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
          Television, radio and phone (equipment)
          </Td>
          <Td>
            <NumberInput size='xs' w={20} min={1}  value={subway} onChange={setSubway}>
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
          Motor vehicles (not including fuel costs)
          </Td>
          <Td>
            <NumberInput size='xs' w={20} min={1}  value={taxi} onChange={setTaxi}>
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

export default Secondary