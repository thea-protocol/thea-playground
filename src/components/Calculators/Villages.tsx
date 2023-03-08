import React, { useState } from 'react'
import { Card, CardBody, Select, Flex, Box } from '@chakra-ui/react'
import villages from './data/villages.json'

function Villages() {
    const [village, setVillage] = useState()

    const getVillageInfo = (name) => {
        return villages.find(item => item.Name == name)
    }



  return (
    <Card>
        <CardBody>
        <div>Villages</div>
        <Flex>
            <Box w='50%' p="6">
        <Select placeholder='Select option' value={village} onChange={(val) => setVillage(val.target.value)}>
            { villages.slice(1,10).map(row => 
            <option key={row.Name} value={row.Name}>{row.Name}</option>
                )}
        </Select>

            </Box>
            <Box w='50%' p="6">
            { JSON.stringify(getVillageInfo(village), 2) }

        </Box>

        </Flex>

        </CardBody>

    </Card>
  )
}

export default Villages