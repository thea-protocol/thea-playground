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

function Bus({data, setData}) {
  const [footprint, setFootprint] = useState(0)  
  const [bus, setBus] = useState(100)
  const [coach, setCoach] = useState(100)
  const [commuter, setCommuter] = useState(100)
  const [train, setTrain] = useState(100)
  const [tram, setTram] = useState(100)
  const [subway, setSubway] = useState(100)
  const [taxi, setTaxi] = useState(100)
  const [isMiles, setIsMiles] = useState(true)

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
  


  return (
    <>
    <Text fontSize={'sm'}>Enter mileage for each type of public transport, and press the Calculate button</Text>

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
          <Td>Bus</Td>
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
            Coach
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
            Local or Commuter Train
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
            Long Distance Train
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
          Tram
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
          Subway
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
          Taxi
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

export default Bus