import React, { useState, useEffect } from 'react'
import { Heading, Stack, Flex, Text, StackDivider, useColorModeValue, Icon, Box, Spacer } from '@chakra-ui/react';
import { FaRegCheckCircle } from 'react-icons/fa'

const Feature = ({ label, value }) => {
    return (
        <Flex align={'center'} w="50">
            <Box px="2" ><FaRegCheckCircle /></Box>
        <Text fontSize="sm" fontWeight={400}>{label}</Text>
        <Flex w="40" justify={'end'}>
            <Text>{value.toFixed(2)}</Text>
        </Flex>
    </Flex>
    );
  };

  function Summary({data}) {
      const [ footprint, setFootprint] = useState(0)
      useEffect(() => {
        const sumValues = obj => Object.values(obj).reduce((a, b) => a + (!isNaN(b) ? b : 0), 0);
        setFootprint(sumValues(data))
    
      }, [data])
  return (
    <Box w="52" mx="10">
          <Text color={'gray.900'} fontSize={'md'} pb="2">
            Your Carbon Footprint
          </Text>
          <Heading>{footprint.toFixed(2)} tCO2e</Heading>
          <Text color={'gray.900'} fontSize={'xs'}>
          tonnes of carbon dioxide equivalent.
          </Text>
          <Stack
          mt="6"
            spacing={1}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }>
                <Feature label="House" value={data.house} />
                <Feature label="Flights" value={data.flights} />
                <Feature label="Car" value={data.car} />
                <Feature label="Motorbike" value={data.motorbike} />
                <Feature label="Bus" value={data.bus} />
                <Feature label="Secondary" value={data.secondary} />




          </Stack>    

    </Box>
  )
}

export default Summary