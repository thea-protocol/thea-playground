import React, { useState } from 'react';
import {
  css,
  Box,
  Heading,
  Flex,
} from '@chakra-ui/react';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Welcome from './Welcome'
import House from './House';
import Flights from './Flights';
import Motorbike from './Motorbike';
import Bus from './Bus'
import Donut from './Donut/Donut'
import Secondary from './Secondary';
import Summary from './Summary';
import Car from './Car';


export default function Advanced({setFootprint}) {
  const [data, setData] = useState({
    country: "Portugal",
    house: 0,
    flights: 0,
    car: 0,
    motorbike: 0,
    bus: 0,
    secondary: 0
   })
  const [values, setValues] = useState([
    {
      label: "Household",
      value: 10
    },
    {
      label: "Flights",
      value: 20
    },
    {
      label: "Car",
      value: 20
    },
    {
      label: "Motorbike",
      value: 20
    },
    {
      label: "Bus",
      value: 20
    },
    {
      label: "Secondary",
      value: 20
    }
  ])

  return (
    <>
      <Box
      backgroundColor={'white'}
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={1000}
        p={6}
        as="form">
        <Heading fontSize={'2xl'} pb="6">Thea Carbon Footprint Calculator</Heading>
        <Flex>
        <Tabs size='sm' variant='line'>
        <TabList overflowX="auto" 
        css={css({
          scrollbarWidth: 'none',
          '::-webkit-scrollbar': {display: 'none'},
          '-webkit-overflow-scrolling': 'touch',
          boxShadow: 'inset 0 -2px 0 rgba(0, 0, 0, 0.1)',
          border: '0 none',
        })}        
        >
            <Tab mb={null}>Welcome</Tab>
            <Tab mb={null}>House</Tab>
            <Tab mb={null}>Flights</Tab>
            <Tab mb={null}>Car</Tab>
            <Tab mb={null}>Motorbike</Tab>
            <Tab mb={null}>Bus&Rail</Tab>
            <Tab mb={null}>Secondary</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <Welcome data={data} setData={setData}/>
            </TabPanel>
            <TabPanel>
                <House data={data} setData={setData}/>
            </TabPanel>
            <TabPanel>
                <Flights data={data} setData={setData}/>
            </TabPanel>
            <TabPanel>
              <Car data={data} setData={setData} />
            </TabPanel>
            <TabPanel>
                <Motorbike data={data} setData={setData}/>
            </TabPanel>
            <TabPanel>
              <Bus data={data} setData={setData}/>
            </TabPanel>
            <TabPanel>
              <Secondary  data={data} setData={setData}/>
            </TabPanel>
        </TabPanels>
        </Tabs>
          <Summary data={data} />

        </Flex>

      </Box>
    </>
  );
}