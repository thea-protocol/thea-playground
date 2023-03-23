import React, { useState, useContext, useEffect } from 'react'
import { Card, Flex, Box, CardBody, CardHeader, Heading, Image, Text, Spacer, Button, SimpleGrid, Spinner, Skeleton } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";
import axios from 'axios'

function ProjectCard({props}) {
    const { theaSDK } = useContext(TheaSDKContext);  

    const [data, setData] = useState()
    const [nbtPrices, setNbtPrices] = useState({})
    const [prices, setPrices] = useState({})

    useEffect(()=> {

        axios.post('https://client.dev.thea.earth/cli/tokens/list', {}).then(resp => {
            const newPrices = {}
            priceResult.data?.result.forEach(item => {
                newPrices[item.id] = item.price
            })
            setPrices(newPrices)


        })
    
        
        
        

        axios.post('https://client.dev.thea.earth/cli/tokens/nbtrates').then(resp => {
            setNbtPrices(resp.data?.result)
        }, [])


        const URI = props[0].tokenURI
        axios.get(`https://cloudflare-ipfs.com/ipfs/QmZQaskeasYPLmhEsrnTUL8RYxJvTHsWu9mTkwyRc8V6JT/${URI}`).then(resp => {



            setData({
                name: resp.data.name?.match(/[^:]*$/)[0],
                description: resp.data.description,
                image: `https://cloudflare-ipfs.com/ipfs/${resp.data.image?.replace('ipfs://', '')}`,
                location: resp.data.attributes?.find(item => item.trait_type == 'country').value,
                price: prices[props[0].id] * 1000,
                nbtPrice: nbtPrices[props[0].id] * 1000  
            })
        })
    }, [])

    return (<>
        { data ? 
            <Card background={"gray.100"}>
            <CardBody>
                <Flex>
                    <Image w="52" h="52" src={data.image} />
                    <Box px="8">
                        <Text fontWeight={"600"} mb="4">{data.name}</Text>
                        <Text fontSize={"sm"}>{data.description}
                        </Text>
                        <SimpleGrid mt="4" columns={8} spacing={4}>
                            <Box fontSize={"sm"}>
                                <Text color={"gray.400"}>Project Location</Text>
                                <Text>{data?.location}</Text>
                            </Box>
                            <Box fontSize={"sm"}>
                                <Text color={"gray.400"}>Vintage</Text>
                                <Text>{props[0].vintage}</Text>
                            </Box>
                            <Box fontSize={"sm"}>
                                <Text color={"gray.400"}>Available quantity:</Text>
                                <Text>{props[0].activeAmount} tonnes</Text>
                            </Box>

                        </SimpleGrid>
                        <Flex mt="4">
                            <Box  fontSize={"sm"}>
                                <Text  color={"gray.400"}>Price per tonne:</Text>
                                <Text>${data?.price} | {data?.nbtPrice.toFixed(2)} NBT</Text>
                            </Box>
                            <Spacer />
                            <SimpleGrid columns={2} spacing="2">
                                <Button colorScheme={"blue"}>Offset Stripe</Button>
                                <Button colorScheme={"blue"}>Offset NBT</Button>
                            </SimpleGrid>
                        </Flex>
                    </Box>
                </Flex>
            </CardBody>
            </Card>
            :
            <Flex w="100%">
                <Skeleton height='50px' width="500px" />
            </Flex>
        }
</>   )
}

function ProjectList() {
    const { theaSDK } = useContext(TheaSDKContext);  
    const [tokens, setTokens] = useState({})   

    const offsetFungible = async () => {
        await theaSDK.offset.offsetFungible(2017, "2000");
    }


    const getTokenList = async () => {
        const info = await theaSDK.nftTokenList.getTokenList()
        setTokens(info)
    }      
  
  return (
    <Card
      mt="6"
      direction="column"
      justifyContent="center"
      m="0 auto"
    >
        <CardHeader>
            <Flex>
                <Heading fontSize={"lg"}>Projects</Heading>
                <Spacer />
                <Button onClick={getTokenList}>Get Projects</Button>
            </Flex>
        </CardHeader>
        <CardBody>
            <SimpleGrid
            justifyContent="center"
            spacing={4} 
            >      
            { Object.keys(tokens).map(item => <ProjectCard key={item} props={tokens[item]} /> )}
            </SimpleGrid>
        </CardBody>
        </Card>
  )
}

export default ProjectList