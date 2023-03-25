import React, { useState, useContext, useEffect, useMemo } from 'react'
import { Card, Flex, Box, CardBody, CardHeader, Heading, Image, Text, Spacer, Button, SimpleGrid, Spinner, Skeleton } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'
  import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

function ProjectCard({data}) {
    const { theaSDK } = useContext(TheaSDKContext);
    const [amount, setAmount] = useState(0)
    const [displayData, setDisplayData] = useState<any>(null);    
    const toast = useToast()

    const checkAmount = () => {
        if (amount < 1) {
          toast({
            title: 'Invalid Amount',
            description: "Amount must be positive",
            status: 'error',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          })     
          return 
        }
      }
  

    const offsetFungible = async () => {
        checkAmount()
        const transactionReceipt = await theaSDK.offset.offsetFungible(2017, amount * 1000, data[0]);
        if(transactionReceipt) {
            toast({
              title: 'Transaction Successful',
              status: 'success',
              variant: 'subtle',
              duration: 9000,
              position: 'top-right',
              isClosable: true,
              render: () => (
                <Alert status='success'>
                <AlertIcon />
                <Box>
                  <AlertTitle>Transaction Successful</AlertTitle>
                  <AlertDescription>
                    Your pending transaction have been completed.<br /> 
                    <u><a 
                    target="_blank" 
                    href={`https://mumbai.polygonscan.com/tx/${transactionReceipt.transactionHash}`}
                    >View it here</a></u>
                  </AlertDescription>
                </Box>
              </Alert>
              ),          
            })        
    
          }
    
    }    

    React.useEffect(() => {
        if (data[1]) {
          axios
            .get(
              `https://cloudflare-ipfs.com/ipfs/QmZQaskeasYPLmhEsrnTUL8RYxJvTHsWu9mTkwyRc8V6JT/${data[1][0].tokenURI}`
            )
            .then((item: any) => {
              let finalData = data[1][0];
              finalData["extras"] = item.data["attributes"];
              finalData["description"] = item.data["description"];
              finalData["image"] = `https://cloudflare-ipfs.com/ipfs/${item.data[
                "image"
              ]?.replace("ipfs://", "")}`;
              setDisplayData(finalData);
            });
        }
      }, []);    

    return (<>
        { data ? 
            <Card background={"gray.100"}>
            <CardBody>
                <Flex>
                    <Image w="52" h="52" src={displayData?.image} />
                    <Box px="8">
                        <Text fontWeight={"600"} mb="4" casing="capitalize">
                            
                        { displayData?.extras.map((item: any) => {
                            if (item.trait_type === "project_name") {
                            return (
                                <span>{item.value}</span>
                            );
                            }
                        })}                            
                            </Text>
                        <Text fontSize={"sm"}>{displayData?.description}
                        </Text>
                        <SimpleGrid mt="4" columns={8} spacing={4}>
                            <Box fontSize={"sm"}>
                                <Text color={"gray.400"}>Project Location</Text>
                                <Text>{data?.location}</Text>
                            </Box>
                            <Box fontSize={"sm"}>
                                <Text color={"gray.400"}>Vintage</Text>
                                <Text>{displayData?.vintage}</Text>
                            </Box>
                            <Box fontSize={"sm"}>
                                <Text color={"gray.400"}>Available quantity:</Text>
                                <Text>{displayData?.activeAmount / 1000} tonnes</Text>
                            </Box>

                        </SimpleGrid>
                        <Flex mt="4">
                            <Box  fontSize={"sm"}>
                                <Text  color={"gray.400"}>Price per tonne:</Text>
                                <Text>${displayData?.price} | {displayData?.nbtPrice?.toFixed(2)} NBT</Text>
                            </Box>
                            <Spacer />
                            <Box backgroundColor={"white"} w="40">
                            <NumberInput min={0} step={1} value={amount} onChange={setAmount}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>

                            </Box>
<Spacer />

                            <SimpleGrid columns={2} spacing="2">
                                <Button colorScheme={"blue"}>Offset Stripe<br></br>${(amount * displayData?.price).toFixed(2)}</Button>
                                <Button colorScheme={"blue"} onClick={offsetFungible}>Offset NBT<br></br>{(amount * displayData?.nbtPrice).toFixed(2)} </Button>
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
    const [projects, setProjects] = useState<any>([]);


    const getProjects = async () => {
        //@ts-ignore
        const data = await theaSDK.nftTokenList.getTokenList();
        const prices = await (
          await axios.post("https://client.dev.thea.earth/cli/tokens/list", {})
        ).data.result;
        const nbtRates = await (
          await axios.post("https://client.dev.thea.earth/cli/tokens/nbtrates")
        ).data.result;
    
        const newData = Object.entries(data).map((row) => {
          row[1] = row[1].map((item) => {
            item.nbtPrice = nbtRates[item.id] * 1000;
            item.price = prices.find((el: any) => el.id == item.id).price * 1000;
            return item;
          });
          return row;
        });
        setProjects(newData);
      };

      useEffect(() => {
        if (theaSDK) {
          getProjects();
        }
      }, [theaSDK]);


  
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
                <Button onClick={getProjects}>Get Projects</Button>
            </Flex>
        </CardHeader>
        <CardBody>
            <SimpleGrid
            justifyContent="center"
            spacing={4} 
            >      
            { projects.map((item: any) => <ProjectCard key={item[0]} data={item} /> )}
            </SimpleGrid>
        </CardBody>
        </Card>
  )
}

export default ProjectList