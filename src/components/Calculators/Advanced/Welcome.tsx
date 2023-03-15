import React, {useState, useEffect } from 'react'
import { Box, FormControl, FormLabel, Select } from '@chakra-ui/react'
import { AdvancedCalculator } from './advanced'

function Welcome({data, setData}) {
  const [country, setCountry] = useState("Portugal")
  const [countries, setCountries] = useState([])
  const calculator = new AdvancedCalculator()

  useEffect(() => {
    setCountries(calculator.countries)
  }, [])

  useEffect(() => { setData({...data, country: country}) }, [country])

  return (
    <Box>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-name" fontWeight={'normal'}>
            Where do you live
          </FormLabel>
          <Select value={country} onChange={(val) => setCountry(val.target.value)}>
            { countries.map(row =>
            <option key={row} value={row}>{row}</option>
              )}
        </Select>
        </FormControl>
    </Box>
  )
}

export default Welcome