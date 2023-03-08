import React from 'react'
import { Heading, SimpleGrid } from '@chakra-ui/react'
import OrderbookQuery from './OrderbookQuery'
import TokenList from './TokenList'
import NFTActions from './NFTActions'
import TokenTrading from './TokenTrading'

function NFT({sdk, address}) {
  return (
    <>
    <Heading py="4">
      NFTs
    </Heading>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
      <TokenList sdk={sdk} />
      <TokenTrading sdk={sdk} address={address} />
      <OrderbookQuery sdk={sdk} address={address} />
      <NFTActions sdk={sdk} address={address} />
    </SimpleGrid>

    </>
  )
}

export default NFT