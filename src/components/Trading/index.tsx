import React from 'react'
import { Heading, SimpleGrid } from '@chakra-ui/react'
import GetStrikePremium from './GetStrikePremium'
import GetOptionOrders from './GetOptionOrders'
import CreateOrder from './CreateOrder'

function Trading() {
  return (<>
    <Heading py="4">
      Trading
    </Heading>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
      <GetStrikePremium />
      <CreateOrder />
      <GetOptionOrders />

    </SimpleGrid>
  </>
  )
}

export default Trading