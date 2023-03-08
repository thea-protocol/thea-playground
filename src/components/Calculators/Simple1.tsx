import React, { useContext, useState, useEffect } from 'react'
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Select,
    Card,
    CardBody,
    Flex,
    Text
  } from '@chakra-ui/react'
import { Chart } from './Simple1Chart'


function Simple1({sdk, setFootprint}) {
    const [countries, setCountries] = useState([
        {country: 'Guyana', isoCode: 'GUY'},
        {country: 'Haiti', isoCode: 'HTI'},
        {country: 'Honduras', isoCode: 'HND'},
        {country: 'Hong Kong', isoCode: 'HKG'},
        {country: 'Hungary', isoCode: 'HUN'},
        {country: 'Iceland', isoCode: 'ISL'},
        {country: 'India', isoCode: 'IND'},
        {country: 'Indonesia', isoCode: 'IDN'}
    ])
    const [age, setAge] = useState(35)
    const [country, setCountry] = useState('HUN')
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

      const makeChartData = (res) => {
        setChartData({
            labels: res.details?.map(item => item.year),
            datasets: [{
                label: 'footprint',
                data: res.details?.map(item => item.co2Emission),
                backgroundColor: 'rgba(53, 162, 235)',
            }
            ]
        })
      }

    
    // useEffect(() => {
    //     if(theaSDK) {
    //         const res = theaSDK.carbonInfo.countries()
    //         setCountries(res)
    //     }
    //   }, [countries]);    

    useEffect(() => {

        const birthYear = 2023 - age
        if (sdk) {
            const res = sdk?.carbonInfo.estimateFootprint(birthYear, [
                {
                  isoCode: country,
                  year: null,
                },
              ]);
              setFootprint(res.footprint)
              makeChartData(res)
              

        }
      }, [country, age, setFootprint]);


  return (
    <Card maxW='sm'>
        <CardBody>
        <Flex>
            <Text px="4">Age</Text>
            <Slider value={age} onChange={(val) => setAge(val)}>
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
            <Text px="4">{age}</Text>
        </Flex>        
        <Flex py="2" align="items-center">
            <Text px="4">Country</Text>
            <Select placeholder='Select a country' value={country} onChange={(val) => setCountry(val.target.value)}>
                { countries.map(row => 
                    <option key={row.isoCode} value={row.isoCode}>{row.country}</option>
                )}
            </Select>
        </Flex>
        <Chart chartData={chartData} />        
        </CardBody>
    </Card>
  )
}

export default Simple1