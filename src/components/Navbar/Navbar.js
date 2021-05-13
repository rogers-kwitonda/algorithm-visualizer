import React from 'react'
import { Flex, Box, useColorMode, Button, Heading } from '@chakra-ui/react';

export default function Navbar({mode, setMode, solve, reset}){
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Flex
            mb={8}
            p={8}
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            >
            <Box>
                <Heading as='h1' size='lg'>
                    Pathfinding Algorithm Visualizer
                </Heading>
            </Box>
            <Box
                w="40%"
            >
                <Flex
                    mb={8}
                    p={8}
                    justifyContent="space-around"
                >
                    <Button onClick={()=>{solve()}}>Solve</Button>
                    <Button onClick={()=>{reset()}}>Reset Grid</Button>
                    <Button onClick={()=>{setMode('wall')}}>Add Walls</Button>
                </Flex>
            </Box>
            <Box>
                <Button onClick={toggleColorMode}>
                    Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>
            </Box>
        </Flex>
    )
}