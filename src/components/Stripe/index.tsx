import React, { useState} from 'react'
import { SimpleGrid, Heading } from '@chakra-ui/react'
import ListProjects from './ListProjects'
import Wallet from '../Wallet'

function Stripe() {
  return (
    <>
    <Heading py="4">
      Stripe
    </Heading>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
        <ListProjects />
        <Wallet />


    </SimpleGrid>

    </>
    )
}

export default Stripe