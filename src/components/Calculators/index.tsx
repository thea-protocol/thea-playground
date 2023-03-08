import React, { useState} from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Footprint from './Footprint'
import Simple1 from './Simple1'
import Simple2 from './Simple2'
import Simple3 from './Simple3'
import Intermediate from './Intermediate'
import Villages from './Villages'

function Calculators({ sdk, address }) {
    const [footprint, setFootprint] = useState(770)
  return (<>
    <Footprint footprint={footprint}/>
    <Tabs variant='solid-rounded' colorScheme='blue'>
        <TabList>
            <Tab>Simple1</Tab>
            <Tab>Simple2</Tab>
            <Tab>Simple3</Tab>
            <Tab>Intermediate</Tab>
            <Tab>Villages</Tab>
            <Tab>Advanced</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <Simple1 sdk={sdk} setFootprint={setFootprint}/>
            </TabPanel>
            <TabPanel>
                <Simple2 sdk={sdk} setFootprint={setFootprint}/>
            </TabPanel>
            <TabPanel>
                <Simple3 setFootprint={setFootprint}/>
            </TabPanel>
            <TabPanel>
                <Intermediate />
            </TabPanel>
            <TabPanel>
                <Villages />
            </TabPanel>
        </TabPanels>
    </Tabs>
  </>
  )
}

export default Calculators