  import {
    Heading,
    Box,
    Center,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  function Footprint({footprint}) {
    return (
        <Box py={4}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        py={6}
        textAlign={'center'}>

        <Text fontWeight={600} color={'gray.400'} mb={4}>
          Your Carbon Footprint
        </Text>
        <Heading fontSize={'2xl'} fontFamily={'body'}>
        {footprint.toFixed(2)} <span className="text-base">tCO<sub>2</sub>e</span>
        </Heading>
        <Text
          textAlign={'center'}
          fontSize={'xs'}
          color={'gray.400'}
          px={3}>
          tonnes of carbon dioxide equivalent
        </Text>


      </Box>
        </Box>        
    );
  }
  
  export default Footprint;