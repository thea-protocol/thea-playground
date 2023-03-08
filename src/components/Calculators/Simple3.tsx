import React, { useState, useEffect } from 'react'
import countryPower from './data/countryPower.json'
import {
    Select,
    Card,
    CardBody,
    SimpleGrid,
    Box,
    Text,
    Flex,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'
  import {
    Table,
    Tbody,
    Tr,
    Td,
  } from '@chakra-ui/react'

function Simple3({setFootprint}) {
    const [country, setCountry] = useState({Country: 'Belgium', Coal: 6.2, Gas: 27, Oil: 0.3, Hydro: 0.4, Nuclear: 47.2, Renewable: 16.6})
    const [power, setPower] = useState(100)

    const handleCountrySelect = (val) => {
        const countryData = countryPower.find(item => item.Country == val.target.value)
        setCountry(countryData)
    }

    useEffect(() => {
        const values = {
            "Coal": 820,
            "Gas": 490,
            "Oil": 778,
            "Hydro": 24,
            "Renewable": 41,
            "Nuclear": 12
        }
        
        const co2 =  Object.keys(values)
                        .map(key => country[key] * values[key])
                        .reduce((a,b) => a+b, 0) / 100000 * 24 * 365.2422 * power / 1000
        setFootprint(co2)
      }, [country, power]);    


  return (
    <Card>
        <CardBody>
            <SimpleGrid columns={[1, null, 2]} spacing='40px'>
                <Box>
                    <Box py="4">
                        <Text fontSize="sm" as='b'>Preload the elecTricity generation stats by the counTry:</Text>
                        <Select placeholder='Select a counTry' value={country.Country} onChange={handleCountrySelect}>
                            { countryPower.map(row => 
                                <option key={row.Country} value={row.Country}>{row.Country}</option>
                            )}
                        </Select>
                    </Box>
                    <Box py="4">
                        <Text fontSize="sm" as='b'>How much power do you use (continuously)?</Text>

                        <Flex>
                            <NumberInput value={power} onChange={(val) => setPower(val)} min={0}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <Text px="4">kW</Text>
                        </Flex>

                    </Box>

                </Box>


                <Box>

    <div className="w-full mt-10 md:mt-0 md:w-1/2">


        <Table className="table-auto w-full">
            <Tbody>

            <Tr>
                <Td>Coal</Td>
                <Td>{country?.Coal}%</Td>
                <Td className="text-sm">820 gCO2/kWh</Td>
            </Tr>
            <Tr>
                <Td>Natural gas</Td>
                <Td>{country?.Gas}%</Td>
                <Td className="text-sm">490 gCO2/kWh</Td>
            </Tr>
            <Tr>
                <Td>Oil</Td>
                <Td>{country?.Oil}%</Td>
                <Td className="text-sm">778 gCO2/kWh</Td>
            </Tr>
            <Tr>
                <Td>Hydropower*</Td>
                <Td>{country?.Hydro}%</Td>
                <Td className="text-sm">24 gCO2/kWh</Td>
            </Tr>
            <Tr>
                <Td>Renewable**</Td>
                <Td>{country?.Renewable}%</Td>
                <Td className="text-sm">41 gCO2/kWh</Td>
            </Tr>
            <Tr>
                <Td>Nuclear</Td>
                <Td>{country?.Nuclear}%</Td>
                <Td className="text-sm">12 gCO2/kWh</Td>
            </Tr>
            </Tbody>

        </Table>
        <p className="mt-2 text-xs">
                *gCO2 can vary widely, read Wiki page in Sources

            </p>
            <p className="text-xs">
                **using gCO2 values for Solar PV rooftop, read Wiki page in Sources for other values

            </p>





    </div>
                </Box>
                <Box>

        <Text fontSize="xs">

ElecTricity sources: The World Bank statistics (Data from 2015)
CO2/kWh values: Using median values from IPCC: Global warming potential of selected elecTricity sources (2014)
CO2/kWh values may differ a lot, especially when power plants use newest (better values), or older (worse values) technologies. Check the Wikipedia page for Min/Max values.
This calculations assume that you use elecTricity proportionally from all power plants of your counTry.
If you know better where your elecTricity comes from (for example, you use your own solar power), edit the settings accordingly
            </Text>
                </Box>




            </SimpleGrid>

        </CardBody>




</Card>

    )
}

export default Simple3