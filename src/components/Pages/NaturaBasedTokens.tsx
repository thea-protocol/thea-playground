import React from 'react'
import { Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import BuyNow from './BuyNow'
import SellNow from './SellNow'

function NaturaBasedTokens() {
  return (<>
    <Heading py="4">
      Nature Base Tokens
    </Heading>
    <Tabs>
        <TabList>
            <Tab>Buy</Tab>
            <Tab>Sell</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <BuyNow />
            </TabPanel>
            <TabPanel>
                <SellNow />
            </TabPanel>
        </TabPanels>
    </Tabs>
  </>
)}

export default NaturaBasedTokens