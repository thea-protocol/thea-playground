import React, { useState, useContext } from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from '@chakra-ui/react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";
import getStripe from '../../lib/getStripe';

import {
    Flex,
    Box,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
  } from '@chakra-ui/react'
import axios from 'axios'

function ListProjects() {
  const { theaSDK, account } = useContext(TheaSDKContext);  
  const [output, setOutput] = useState([])

  async function handleCheckout() {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1Mie43LnB2P76WokLrs26CJP',
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: `http://localhost:5173/stripe`,
      cancelUrl: `http://localhost:5173/stripe`,
      //customerEmail: 'customer@thea.earth',
    });
    console.warn(error.message);
  }  

    const refresh = async () => {

        //const res = await axios.get('https://cloudflare-ipfs.com/ipfs/QmZQaskeasYPLmhEsrnTUL8RYxJvTHsWu9mTkwyRc8V6JT/2.json')
        //console.log(res)

        //const res = await axios.get('https://cloudflare-ipfs.com/ipfs/QmZQaskeasYPLmhEsrnTUL8RYxJvTHsWu9mTkwyRc8V6JT/2.json')

        const API_KEY = "2NKWQ4LQyuOsYpFUaKJuoatgpod"
        const API_KEY_SECRET = "c82e07f4fe76d8d190346f2670117622"

        const response = await axios.post(
            'https://ipfs.infura.io:5001/api/v0/cat',
            '',
            {
              params: {
                'arg': 'QmZQaskeasYPLmhEsrnTUL8RYxJvTHsWu9mTkwyRc8V6JT/2.json'
              },
              auth: {
                username: API_KEY,
                password: API_KEY_SECRET
              }
            }
          );
          console.log(response)




        const client = axios.create({
            baseURL: 'https://client.dev.thea.earth/cli',
            headers: { "Content-Type": "application/json" },
            withCredentials: true

        })
        const res1 = await client.post('/tokens/list', {})
        setOutput(res1.data.result)
        console.log(res1)
    }

  return (
    <Card>
    <CardHeader>
      <Heading size='md'> List Projects</Heading>
      <a target="_blank" href="https://stripe.com/docs/testing">Test cards</a>
    </CardHeader>
    <CardBody>

    <List spacing={3}>
        { output.map(item =>
        <ListItem key={item.id} borderBottom={"1px"} borderColor={'gray.200'}>
            <Flex alignItems={'center'}>
                <Box px="4">
            {JSON.parse(item.spec).project_name}

                </Box>
                <Button onClick={handleCheckout}>Checkout</Button>

            </Flex>
        </ListItem>
            
            )}
</List>

    </CardBody>
    <CardFooter>
        <Button onClick={refresh}>Get</Button>
    </CardFooter>
  </Card>
  )
}

export default ListProjects