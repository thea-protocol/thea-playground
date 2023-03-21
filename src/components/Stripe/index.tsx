import React, { useState} from 'react'
import { SimpleGrid, Heading } from '@chakra-ui/react'
import ListProjects from './ListProjects'

function Stripe() {
  return (
    <>
    <Heading py="4">
      Stripe
    </Heading>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
        <ListProjects />


    </SimpleGrid>

    </>
    )
}

export default Stripe