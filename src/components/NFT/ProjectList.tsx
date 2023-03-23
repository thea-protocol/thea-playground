import React, { useState, useContext, useEffect } from 'react'
import { Card, Flex, Box, CardBody, CardHeader, Heading, Image, Text, Spacer, Button, SimpleGrid, Spinner, Skeleton } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";
import axios from 'axios'



function ProjectCard({props}) {
    const [data, setData] = useState()
    const [prices, setPrices] = useState({})


    useEffect(()=> {
        axios.post('https://client.dev.thea.earth/cli/tokens/nbtrates').then(resp => {
            setPrices(resp.data?.result)
        }, [])



        const URI = props[0].tokenURI
        axios.get(`https://cloudflare-ipfs.com/ipfs/QmZQaskeasYPLmhEsrnTUL8RYxJvTHsWu9mTkwyRc8V6JT/${URI}`).then(resp => {

            console.log(resp.data)

            setData({
                name: resp.data.name?.match(/[^:]*$/)[0],
                description: resp.data.description,
                image: `https://cloudflare-ipfs.com/ipfs/${resp.data.image?.replace('ipfs://', '')}`,
                location: resp.data.attributes?.find(item => item.trait_type == 'country').value,
                
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
                                <Text>$10 | 14 NBT</Text>
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
           { Object.keys(tokens).map(item => <ProjectCard props={tokens[item]} /> )}
        </SimpleGrid>

        

        </CardBody>

        </Card>
  )
}

export default ProjectList