import React, { useState} from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Footprint from './Footprint'
import Simple1 from './Simple1'
import Simple2 from './Simple2'
import Simple3 from './Simple3'
import Intermediate from './Intermediate'
import Villages from './Villages'
import Advanced from './Advanced'
import Village from './SimpleVillage'

function Calculators() {
    const [footprint, setFootprint] = useState(770)
  return (<>
    <Footprint footprint={footprint}/>
    <Tabs variant='solid-rounded' colorScheme='blue'>
        <TabList overflowX="auto">
            <Tab>Simple1</Tab>
            <Tab>Simple2</Tab>
            <Tab>Simple3</Tab>
            {/* <Tab>Intermediate</Tab> */}
            <Tab>Simple Villages</Tab>
            <Tab>Villages</Tab>
            <Tab>Advanced</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <Simple1 setFootprint={setFootprint}/>
            </TabPanel>
            <TabPanel>
                <Simple2 setFootprint={setFootprint}/>
            </TabPanel>
            <TabPanel>
                <Simple3 setFootprint={setFootprint}/>
            </TabPanel>
            {/* <TabPanel>
                <Intermediate />
            </TabPanel> */}
            <TabPanel>
                <Village />
            </TabPanel>
            <TabPanel>
                <Villages />
            </TabPanel>
            <TabPanel>
                <Advanced setFootprint={setFootprint}/>
            </TabPanel>
        </TabPanels>
    </Tabs>
  </>
  )
}

export default Calculators