import React from 'react'
import { SimpleGrid, Heading } from '@chakra-ui/react'
import TokenHist from './TokenHist'
import TokenStats from './TokenStats'
import OffsetStats from './OffsetStats'
import OffsetHist from './OffsetHist'
import UserBalance from './UserBalance'
import UserProfile from './UserProfile'
import NextOffset from './NextOffsetEvent'
import UserOffsetHistory from './UserOffsetHistory'

function CarbonInfo() {
  return (
    <>
    <Heading py="4">
      Carbon Info
    </Heading>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
        <TokenHist />
        <TokenStats />
        <OffsetStats />
        <OffsetHist />
        <UserBalance />
        <UserProfile />
        <NextOffset />
        <UserOffsetHistory />
    </SimpleGrid>

    </>
  )
}

export default CarbonInfo