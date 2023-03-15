import React, { useContext }  from 'react'
import { TheaSDKContext } from "./TheaSDKProvider";
import { formatUnits } from "ethers/lib/utils.js";
import { Spinner, Box, Heading, Text, Flex, SimpleGrid,
    Stat,
    StatLabel,
    StatNumber, } from '@chakra-ui/react'

    import {
      Table,
      Thead,
      Tbody,
      Tfoot,
      Tr,
      Th,
      Td,
      TableCaption,
      TableContainer,
    } from '@chakra-ui/react'

interface StatsCardProps {
    title: string;
    stat: string;
}

function StatsCard(props: StatsCardProps) {
    const { title, stat } = props;
    return (
        <Stat
        px={'14'}
        py={'1'}
        border={'1px solid'}
        borderColor={'gray.200'}
        rounded={'lg'}>
        <StatLabel fontWeight={'medium'} fontSize='xs' isTruncated>
            {title}
        </StatLabel>
        <StatNumber fontSize={'xs'} fontWeight={'medium'}>
            {stat}
        </StatNumber>
        </Stat>
    );
    }

function Balances() {
  const { account, userBalance } = useContext(TheaSDKContext);
  const tokens = ['nbt', 'vintage', 'sdg', 'rating']

  return (
    <Box p="8">
      {account && (
        <Box>
            <Heading fontSize={'lg'} pb="2">
              Tokens
            </Heading>

          { userBalance ? 
          <TableContainer>
            <Table size='sm'>
              <Tbody>
                      { tokens.map(key => 
                      <Tr key={key}>
                        <Td>{key}</Td>
                        <Td isNumeric>{formatUnits(userBalance.fungible[key], 4)}</Td>
                      </Tr>
                      )}

              </Tbody>
            </Table>
          </TableContainer>
            : <Spinner />
          }



            { userBalance ? 
            <SimpleGrid columns={1} spacingX='40px' spacingY='20px'>
                {Object.keys(userBalance.nft).map((tokenId) => {
                    return (
                        userBalance.nft[tokenId] !== "0" && (
                            <StatsCard key={tokenId} title={'NFT' + tokenId} stat={userBalance.nft[tokenId]} />
                        )
                    );
                    })}
            </SimpleGrid>


            : <Spinner />
            
          }
        </Box>
      )}        
    </Box>
  )
}

export default Balances