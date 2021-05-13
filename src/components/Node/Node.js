import { Box } from '@chakra-ui/layout'
import React from 'react'

export default function Node({row, column, isStart, isFinish, isWall, handleClick, mouseUp, mouseDown, isPath}){
    return(
        <Box 
            rowSpan={1} 
            colSpan={1} 
            w="20px" 
            h="20px" 
            borderWidth={1}  
            bg={isStart ? 'red.700' : (isFinish ? 'green.700': (isWall ? 'black': (isPath ? 'orange.200' : null)))}
            onMouseEnter={()=>{handleClick()}}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
        >

        </Box>
    )
}