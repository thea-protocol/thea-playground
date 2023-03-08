import React, { useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator
} from '@chakra-ui/react'

import { ChevronRightIcon }  from '@chakra-ui/icons'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react';
import Welcome from './Welcome'
import House from './House';
import Flights from './Flights';
import Motorbike from './Motorbike';



export default function multistep() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  return (
    <>
      <Box
      backgroundColor={'white'}
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form">
        <Heading fontSize={'2xl'} pb="6">Thea Carbon Footprint Calculator</Heading>
        <Tabs size='sm' variant='line'>
        <TabList>
            <Tab>Welcome</Tab>
            <Tab>House</Tab>
            <Tab>Flights</Tab>
            <Tab>Car</Tab>
            <Tab>Motorbike</Tab>
            <Tab>Bus&Rail</Tab>
            <Tab>Secondary</Tab>
            <Tab>Results</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <Welcome />
            </TabPanel>
            <TabPanel>
                <House />
            </TabPanel>
            <TabPanel>
                <Flights />
            </TabPanel>
            <TabPanel>
                Car
            </TabPanel>
            <TabPanel>
                <Motorbike />
            </TabPanel>
        </TabPanels>
        </Tabs>

      </Box>
    </>
  );
}