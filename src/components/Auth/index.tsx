import React from 'react'
import { Heading, SimpleGrid } from '@chakra-ui/react'
import Login from './Login'
import Logout from './Logout'
import UserProfile from '../CarbonInfo/UserProfile'

function Trading() {
  return (<>
    <Heading py="4">
      Auth Module
    </Heading>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
        <Login />
        <Logout />
        <UserProfile />

    </SimpleGrid>
  </>
  )
}

export default Trading