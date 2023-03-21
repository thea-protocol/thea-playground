import React, { useState, useEffect, useContext } from 'react'
import { Card, CardBody, Select, Flex, Box, FormControl, FormLabel, Heading, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import villageData from './data/villages.json'
import { TheaSDKContext } from "../../components/TheaSDKProvider";
import { Chart } from './Simple1Chart'

import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    SimpleGrid
  } from '@chakra-ui/react'


function Villages() {
    const { theaSDK } = useContext(TheaSDKContext);
    const [years, setYears] = useState(1)
    const [village, setVillage] = useState()
    const [villageInfo, setVillageInfo] = useState({})
    const [villages, setVillages] = useState([])
    const [country, setCountry] = useState()
    const [countries, setCountries] = useState([])
    const [footprint, setFootprint] = useState(0)
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
          {
            label: 'Dataset 2',
            data: [],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      })
  
    useEffect(() => {
        const newCountries = [...new Set(villageData.map(item => item['Country name EN']))]
        setCountries(newCountries)
    }, [])

    useEffect(() => {
        const newVillages = villageData.filter(item => item['Country name EN'] == country)
        setVillages(newVillages)
    }, [country])


    const makeChartData = (res) => {
        setChartData({
            labels: res.details?.map(item => item.year),
            datasets: [{
                label: 'footprint',
                data: res.details?.map(item => item.co2Emission),
                backgroundColor: [...Array(100-years).fill('rgb(197,205,211)'), ...Array(years).fill('rgb(17,88,87)')],
            },

            ]
        })
      }
    
    useEffect(() => {
        if (!country || villages.length < 1 ) return
        const isoCode = villages?.find(item => item['Country name EN'] == country)['Country Code']

        setVillageInfo(villages.find(item => item.Name == village))
        
        const birthYear = 1923
        const res = theaSDK?.carbonInfo.estimateFootprint(birthYear, [
            {
                isoCode: isoCode,
                year: null,
            },
        ]);
          if (res) {
            makeChartData(res)
            const newFootprint = res.details.slice(-years).reduce((a,b) => a + b.co2Emission, 0) * villageInfo?.Population
            setFootprint(newFootprint)

          }
      }, [village, years]);


  return (
    <Card>
        <CardBody>
            <Heading fontSize={'md'}>
                Offset a Village
            </Heading>
            <SimpleGrid columns={[1, null, 2]} spacing='40px'>

            <Box p="6">
            <FormControl py="6">
                <FormLabel>Country</FormLabel>
                <Select placeholder='Select Country' value={country} onChange={(val) => setCountry(val.target.value)}>
                    { countries.map(row => 
                    <option key={row} value={row}>{row}</option>
                        )}
                </Select>
            </FormControl>


            <FormControl>
                <FormLabel>Village</FormLabel>
                <Select
                    placeholder='Select Village'
                    value={village}
                    isDisabled={!country}
                    onChange={(val) => setVillage(val.target.value)}>
                    { villages.slice(1,10).map(row => 
                    <option key={row.Name} value={row.Name}>{row.Name} (pop: {row.Population})</option>
                        )}
                </Select>
            </FormControl>


            <Flex py="6">
            <FormLabel>Years</FormLabel>
            <Slider value={years} onChange={(val) => setYears(val)} min={1} max={100}>
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
            <Text px="4">{years}</Text>
        </Flex>        


            </Box>
            <Box p="6">
                <Flex>
            <Stat>
                <StatLabel>{country} | {village}</StatLabel>
                <StatNumber>{villageInfo?.Population}</StatNumber>
                <StatHelpText>polulation</StatHelpText>
            </Stat>
            <Stat>
                <StatLabel>Footprint</StatLabel>
                <StatNumber>{footprint.toFixed(2)}</StatNumber>
                <StatHelpText>tCO2e</StatHelpText>
            </Stat>

                </Flex>
                <Chart chartData={chartData} />
            </Box>


            </SimpleGrid>
        <Flex>


        </Flex>
        </CardBody>
    </Card>
  )
}

export default Villages