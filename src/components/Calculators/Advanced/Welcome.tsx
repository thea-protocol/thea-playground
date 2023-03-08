import React from 'react'
import { Box, FormControl, FormLabel, Select } from '@chakra-ui/react'

function Welcome() {
  return (
    <Box>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-name" fontWeight={'normal'}>
          Where do you live
          </FormLabel>
          <Select>
            <option>Portugal</option>
        </Select>
        </FormControl>


        

    </Box>
  )
}

export default Welcome