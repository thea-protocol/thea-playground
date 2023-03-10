import React, { useContext, useState, useEffect, useCallback } from 'react'
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
import { TheaSDKContext } from "../../components/TheaSDKProvider";

function Simple1({setFootprint}) {
  const { theaSDK } = useContext(TheaSDKContext);
  const [countries, setCountries] = useState([]);
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

    
  useEffect(() => {
      const res = theaSDK?.carbonInfo.countries()
      setCountries(res)
      }, []);    

    useEffect(() => {

        const birthYear = 2023 - age
        const res = theaSDK?.carbonInfo.estimateFootprint(birthYear, [
            {
              isoCode: country,
              year: null,
            },
          ]);
          if (res) {

            setFootprint(res?.footprint)
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
                { countries?.map(row => 
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