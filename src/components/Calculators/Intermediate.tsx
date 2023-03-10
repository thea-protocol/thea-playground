import React, { useState } from 'react'
import { Card, CardBody, Select, Text, Box } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup, VStack } from '@chakra-ui/react'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { Form } from 'react-router-dom'

function Intermediate() {
    const [recycle, setRecycle] = useState(true)
    const [transports, setTransports] = useState([])

  return (
    <Card>
        <CardBody>
        <Tabs>
  <TabList>
    <Tab>Household</Tab>
    <Tab>Transport</Tab>
    <Tab>Travel</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
        <Text fontSize={"lg"} as="b">
            Tell us about your household
        </Text>

        <FormControl display='flex' alignItems='center' py="2">
            <FormLabel w="96">Number of residents including myself:</FormLabel>
                <Select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6+</option>
                </Select>
        </FormControl>

        <FormControl  display='flex' alignItems='center' py="2">
            <FormLabel w="96">I live in a:</FormLabel>
            <Select>
                <option value="1">Detached single family home</option>
                <option value="2">Attached single family home </option>
                <option value="3">Apartment Building (2 to 4 units) </option>
                <option value="4">Apartment Building (5+ units) </option>
                <option value="5">Mobile Home </option>
            </Select>
        </FormControl>
        <FormControl  display='flex' alignItems='center' py="2">
            <FormLabel w="96">Size of housing</FormLabel>
            <Select>
                <option value="1">Under 500 sq ft </option>
                <option value="2">500-999</option>
                <option value="3">1,000-1,499</option>
                <option value="4">1,500-1,999</option>
                <option value="5">2,000-2,499</option>
                <option value="6">2,500-2,999</option>
                <option value="7">3,000-3,999</option>
                <option value="8">Over 4,000</option>
            </Select>
        </FormControl>

        <FormControl  display='flex' alignItems='center' py="2">
            <FormLabel w="96">Do you purchase clean energy such as wind or solar?</FormLabel>
                <Select>
                    <option value="1">Yes, some</option>
                    <option value="2">Yes, most</option>
                    <option value="3">Yes, all</option>
                    <option value="4">No (US Average)</option>
                    <option value="5">Don't know</option>
                </Select>
        </FormControl>

        <FormControl  display='flex' alignItems='center' py="2">
            <FormLabel w="96">Do you recycle items such as metal, plastic, glass, or paper?</FormLabel>
            <RadioGroup onChange={setRecycle} value={recycle}>
            <Stack direction='row'>
                <Radio value='1'>Yes</Radio>
                <Radio value='2'>No</Radio>
            </Stack>
            </RadioGroup>
        </FormControl>

        <FormControl display='flex' alignItems='center'>
            <FormLabel w="96">My diet is mostly:</FormLabel>
                <Select>
                    <option value="1">Meat Lover</option>
                    <option value="2">Average omnivore (US Average)</option>
                    <option value="3">No beef</option>
                    <option value="4">Vegetarian</option>
                    <option value="5">Vegan </option>
                </Select>
        </FormControl>

        <FormControl  display='flex' alignItems='center' py="2">
            <FormLabel w="96">Do you make a conscious effort to save energy? Check all that apply.</FormLabel>
            <Box>
            <CheckboxGroup defaultValue={[]}>
            <VStack spacing={[1, 5]} direction={['column', 'row']} align="left">
                <Checkbox value='naruto'>Programmable Thermostat</Checkbox>
                <Checkbox value='sasuke'>ENERGY STAR appliances</Checkbox>
                <Checkbox value='kakashi'>Energy efficient lightbulbs</Checkbox>
                <Checkbox value='laundry'>I line dry my laundry</Checkbox>
            </VStack>
        </CheckboxGroup>

            </Box>
        </FormControl>

    </TabPanel>
    <TabPanel>

        <div>
            <div className='text-blue-800 font-bold text-xl text-left pb-6'>
                How do you typically get around?
            </div>

            <div className='flex flex-wrap mb-6'>
                <div className='font-bold text-left w-full md:w-60 text-sm px-2'>Select all of the ways you travel</div>
                <div  className='w-full md:w-72'>
                <CheckboxGroup value={transports} onChange={setTransports}>
                <VStack spacing={[1, 5]} direction={['column', 'row']} align="left">
                    <Checkbox colorScheme='red' value='rail'>Intercity/Commuter Rail</Checkbox>
                    <Checkbox colorScheme='green'  value='metro'>Bus/Subway/Metro</Checkbox>
                    <Checkbox value='car'>Car</Checkbox>
                    {/* <Checkbox value='laundry'>Bike/Walk</Checkbox> */}
                </VStack>
            </CheckboxGroup>
                </div>
            </div>

            { transports.includes('rail') ? 
            <div className='flex flex-wrap mb-6 bg-red-50'>
            <div className='font-bold text-left w-full md:w-60 text-sm px-2'>Average total weekly travel via intercity or commuter rail...</div>
            <div  className='w-full md:w-72'>
                <Select>
                    <option value="1">0 miles (US Average)</option>
                    <option value="2">Under 5 miles</option>
                    <option value="3">5 to 9.9 miles</option>
                    <option value="4">10 to 14.9 miles</option>
                    <option value="5">15 to 19.9 miles</option>
                    <option value="5">20 to 29.9 miles</option>
                    <option value="6">30+ miles </option>
                </Select>
            </div>
        </div> : <></>}

    { transports.includes('metro') ? 

        <div className='flex flex-wrap mb-6 bg-green-50'>
            <div className='font-bold text-left w-full md:w-60 text-sm px-2'>Average total weekly travel via bus, subway, or metro...</div>
            <div  className='w-full md:w-72'>
                <Select>
                    <option value="1">0 miles (US Average)</option>
                    <option value="2">Under 5 miles</option>
                    <option value="3">5 to 9.9 miles</option>
                    <option value="4">10 to 14.9 miles</option>
                    <option value="5">15 to 19.9 miles</option>
                    <option value="5">20 to 29.9 miles</option>
                    <option value="6">30+ miles </option>
                </Select>
            </div>
        </div> : <></>}

        { transports.includes('car') ? <div>

        <div className='flex flex-wrap mb-6 bg-blue-50'>
            <div className='font-bold text-left w-full md:w-60 text-sm px-2'>My car is an electric vehicle</div>
            <div  className='w-full md:w-72 flex justify-start'>

            <Checkbox >Yes</Checkbox>
            </div>
        </div>


        <div className='flex flex-wrap mb-6 bg-blue-50'>
            <div className='font-bold text-left w-full md:w-60 text-sm px-2'>My annual mileage is...</div>
            <div  className='w-full md:w-72'>
                <Select>
                    <option value="1">Under 1,000 miles</option>
                    <option value="2">1,000 to 2,499 miles</option>
                    <option value="3">2,500 to 4,999 miles</option>
                    <option value="4">5,000 to 9,999 miles</option>
                    <option value="5">10,000 to 14,999 miles (US Average)</option>
                    <option value="5">15,000 to 19,999 miles</option>
                    <option value="6">20,000 to 29,999 miles</option>
                    <option value="7">30,000+ miles</option>
                </Select>
            </div>
        </div>

        <div className='flex flex-wrap mb-6 bg-blue-50'>
            <div className='font-bold text-left w-full md:w-60 text-sm px-2'>My vehicle’s combined fuel economy is...</div>
            <div  className='w-full md:w-72'>
                <Select>
                    <option value="1">0 to 14 MPG</option>
                    <option value="2">15-19 MPG </option>
                    <option value="3">20-24 MPG (US Average)</option>
                    <option value="4">25-29 MPG </option>
                    <option value="5">30-34 MPG </option>
                    <option value="5">35-39 MPG </option>
                    <option value="6">40-49 MPG </option>
                    <option value="6">50-59 MPG  </option>
                    <option value="6">60-79 MPG </option>
                    <option value="6">80-99 MPG </option>
                </Select>
            </div>
        </div></div>
         : <></>}




        </div>

    </TabPanel>
    <TabPanel>
        <div>
        <div className='text-blue-800 font-bold text-xl text-left pb-6'>
            Calculate the impact of your travel
            </div>



        <div className='flex flex-wrap mb-6 '>
            <div className='font-bold text-left w-full md:w-60 text-sm px-2'>Number of long round-trip flights (2500+ miles) I make in a year</div>
            <div  className='w-full md:w-72'>
                <Select>
                    <option value="0">0 (US Average)</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5 to 9</option>
                    <option value="6">10 to 14</option>
                    <option value="7">15 to 19</option>
                    <option value="8">20+</option>
                </Select>
            </div>
        </div>

        <div className='flex flex-wrap mb-6 '>
            <div className='font-bold text-left w-full md:w-60 text-sm px-2'>Number of medium round-trip flights (300-2500 miles one way) I make in a year</div>
            <div  className='w-full md:w-72'>
                <Select>
                <option value="0">0</option>
                    <option value="1">1 (US Average)</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5 to 9</option>
                    <option value="6">10 to 14</option>
                    <option value="7">15 to 19</option>
                    <option value="8">20+</option>
                </Select>
            </div>
        </div>

        <div className='flex flex-wrap mb-6 '>
            <div className='font-bold text-left w-full md:w-60 text-sm px-2'>Number of short round-trip flights (less than 300 miles one way) I make in a year</div>
            <div  className='w-full md:w-72'>
                <Select>
                <option value="0">0</option>
                    <option value="1">1 (US Average)</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5 to 9</option>
                    <option value="6">10 to 14</option>
                    <option value="7">15 to 19</option>
                    <option value="8">20+</option>
                </Select>
            </div>
        </div>


        <div className='flex flex-wrap mb-6 '>
            <div className='font-bold text-left w-full md:w-60 text-sm px-2'>Average number of nights spent in a hotel per year</div>
            <div  className='w-full md:w-72'>
                <Select>
                <option value="0">0</option>
                    <option value="1">1 to 2 nights</option>
                    <option value="2">3 to 4 nights</option>
                    <option value="3">5 to 6 nights (US Average)</option>
                    <option value="4">1-2 weeks</option>
                    <option value="5">3-4 weeks</option>
                    <option value="6">1-2 months</option>
                </Select>
            </div>
        </div>




        </div>



    </TabPanel>
  </TabPanels>
</Tabs>

        </CardBody>

    </Card>


  )
}

export default Intermediate