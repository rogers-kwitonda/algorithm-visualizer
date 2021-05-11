import { Container, Grid } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Node from './components/Node/Node';

function App() {
	const [nodes, setNodes] = useState([])
	
	useEffect(() => {
		const n = []
		for (let row = 0; row < 30; row++) {
			const currentRow = []
			for (let column = 0; column < 50; column++) {
				let currentNode = {
					row,
					column,
					isStart: row === 10 && column === 25,
					isFinish: row === 5 && column === 25
				}
				currentRow.push(currentNode)
			}
			n.push(currentRow)		
		}
		setNodes(n)
	}, [])

	return (
		<div className="App">
			<Navbar />
			<Container maxW="container.xl" centerContent>
				<Grid
					templateRows="repeat(30, 1fr)"
					templateColumns="repeat(50, 1fr)"
				>
					{ nodes.map((row, rowIndex)=>{
						return row.map((node, nodeIndex)=>{
							return <Node 
								key={nodeIndex}
								row={node.row}
								column={node.column}
								isStart={node.isStart}
								isFinish={node.isFinish}
							/>
						})
					}) }
				</Grid>
			</Container>
		</div>
	);
}

export default App;
