import React, { useState, useEffect } from 'react'
import { Card, CardBody, Select, Flex, Box, FormControl, FormLabel, Heading, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import {
    SimpleGrid,
    Image,
    Stack,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';  


function Village() {
    const RURAL_FOOTPRINT = 0.56 // https://medwinpublishers.com/JENR/household-carbon-footprint-rural-and-urban-community.pdf
    const [years, setYears] = useState(1)

    // https://www.easemytrip.com/blog/most-beautiful-villages-in-world
    const villages = [
        {
            id: 1, 
            name: 'Giethoorn, Netherlands',
            population: 2805,
            description: 'Giethoorn is a gorgeous and calm village of the Netherlands. It is one of greenest places of the country, which is surrounded by extensive De Weerribben-Wieden National park and dotted with massive number of trees. Being a car free village, it features many beautiful canals instead of roads. The lands of Giethoorn are connected together with about 150 bridges. This village has so much similarity with Venice that it has been also called as The Venice of Netherlands.',
            image: 'https://media.easemytrip.com/media/Blog/International/637686037179491526/637686037179491526tO7AlB.jpg'
        },
        {
            id: 2, 
            name: 'Marsaxlokk, Malta',
            population: 3660,
            description: 'Situated in the Southeastern part of Malta, Marsaxlokk is a beautiful traditional fishing village that is famous for its fishing market. Colorful boats jogging on its harbor give it a more beautiful appearance and make it one of most stunning villages of the world. These boats are called as ‘Luzzus’, which play a significant role in the routine life of the villager. This village has a long history that you may come across on your visit to this gorgeous place.',
            image: 'https://media.easemytrip.com/media/Blog/International/637686037179491526/637686037179491526skR2LE.jpg'
        },
        {
            id: 3, 
            name: 'Gasadalur, Faroe Islands, Denmark',
            population: 11,
            description: 'Gasadalur is a stunning small village located in the Mykines Island of the Faroe archipelago. Placed at the edge of a tall cliff and encircled by top peaks of Mykines islands, it is certainly one of the most beautiful villages on Earth. Owing to its isolated location, this village only has a population of 18. The setting of this village is unique as it breathtakingly overlooks the sea.',
            image: 'https://media.easemytrip.com/media/Blog/International/637686037179491526/637686037179491526CtE3K0.jpg'
        },
        {
            id: 4, 
            name: 'Bibury, England, UK',
            population: 627,
            description: 'Bibury is a beautiful charming village situated on the bank of the river Coln in Gloucestershire County of England. The famous English designer named William Morris described it as “The most beautiful village in England”. Comprised of the 17th century stone cottages and beautiful Coln river flowing through the village are the main attractions of Bibury. It is also among the most photographed villages of England.',
            image: 'https://media.easemytrip.com/media/Blog/International/637686037179491526/637686037179491526Gk8sSW.jpg'
        },
        {
            id: 5, 
            name: 'Savoca, Italy',
            population: 1707,
            description: 'Located close to the eastern tip of Sicily, Savoca is quite close to the famous tourist destination of Taormina. It is not as stunning as its neighborhood but still is an alluring place in diverse ways. The village has a certain timeless and deep Sicilian charm about it, which make it the perfect place for Coppola’s acclaimed The Godfather II movie. There are plenty of things to see here, including churches, houses, and other old buildings.',
            image: 'https://media.easemytrip.com/media/Blog/International/637686037179491526/6376860371794915261mzCp9.jpg'
        }
    ]
    const [villageID, setVillageID] = useState()
    const [village, setVillage] = useState()
    const [price, setPrice] = useState()
    const [footprint, setFootprint] = useState(0)
  
    useEffect(() =>{
        const newVillage = villages.find(item => item.id == villageID)
        setVillage(newVillage)
        setFootprint(newVillage?.population * RURAL_FOOTPRINT * years)
        setPrice(footprint * 12)

    },[villageID, years])
    

  return (
    <Card>
        <CardBody>
            <Heading fontSize={'md'}>
                Offset a Village
            </Heading>
            <SimpleGrid columns={[1, null, 2]} spacing='40px'>
                <Box p="6">
                    <FormControl>
                        <FormLabel>Village</FormLabel>
                        <Select
                            placeholder='Select Village'
                            value={villageID}
                            onChange={(val) => setVillageID(val.target.value)}>
                            { villages.map(row => 
                            <option key={row.id} value={row.id}>{row.name} (pop: {row.population})</option>
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


          { village ? 

            <Box
            maxW={'270px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}>
            <Image
            h={'220px'}
            w={'full'}
            src={ village?.image }
            objectFit={'cover'}
            />

            <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
                <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                { village?.name}
                </Heading>
            </Stack>

            <Stack direction={'row'} justify={'center'} spacing={6}>
                <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{village.population}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                    Population
                </Text>
                </Stack>
                <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{ footprint.toFixed(0)}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                    Footprint
                </Text>
                </Stack>
                {/* <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{ price.toFixed(0)}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                    Value
                </Text>
                </Stack> */}
            </Stack>

            <Button
                w={'full'}
                mt={8}
                bg={useColorModeValue('#151f21', 'gray.900')}
                color={'white'}
                rounded={'md'}
                _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
                }}>
                Offset
            </Button>
            </Box>
            </Box>                


            : <></>
            }
            </SimpleGrid>
        </CardBody>
    </Card>
  )
}
export default Village