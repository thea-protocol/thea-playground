import React from 'react'
import { Heading, SimpleGrid } from '@chakra-ui/react'
import OrderbookQuery from './OrderbookQuery'
import TokenList from './TokenList'
import NFTActions from './NFTActions'
import TokenTrading from './TokenTrading'
import ProjectList from './ProjectList'

function NFT() {
  return (
    <>
    <Heading py="4">
      NFTs
    </Heading>
    <ProjectList/>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))' mt="4">
      <TokenList />
      <TokenTrading  />
      <OrderbookQuery  />
      <NFTActions  />
    </SimpleGrid>

    </>
  )
}

export default NFT