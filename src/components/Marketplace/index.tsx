import React, { useContext, useState } from 'react'
import { TheaSDKContext } from "../../components/TheaSDKProvider";
import { Heading, SimpleGrid, Box, Button } from '@chakra-ui/react'
import ProjectCard from './ProjectCard'


function Marketplace() {
    const { theaSDK } = useContext(TheaSDKContext);  

    const [projects, setProjects] = useState({})   

    const getTokenList = async () => {
      const info = await theaSDK.nftTokenList.getTokenList()
      setProjects(info)
  }     
  

  return (
    <>
    <Heading py="4">
      VCM Marketplace
      <Button onClick={getTokenList}>Refresh Projects</Button>
    </Heading>
    <SimpleGrid columns={[1, 2, 4]} spacing='40px'>
        {
            Object.keys(projects).map(project =>
                    <ProjectCard project={projects[project]}/>
                )

        }
                <Box bg='tomato' height='80px'></Box>
</SimpleGrid>

    </>
  )
}

export default Marketplace