import React, { useState} from 'react'
import { SimpleGrid, Heading } from '@chakra-ui/react'
import QuoteTrade from './QuoteTrade'
import Balance from './Balance'
import OffsetFungible from './OffsetFungible'

function Fungible() {
  return (
    <>
    <Heading py="4">
      Fungibles
    </Heading>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
        <QuoteTrade />
        <Balance  />
        <OffsetFungible />
    </SimpleGrid>

    </>
    )
}

export default Fungible