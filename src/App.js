import { Container, Grid } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Node from './components/Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from './algorithms/dijkstra'
import { Button } from '@chakra-ui/button';


const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 5;
const FINISH_NODE_COL = 45;

function App() {
	const [nodes, setNodes] = useState([])
	const [mode, setMode] = useState('wall')
	const [mousePressed, setMousePressed] = useState(false)
	
	useEffect(() => {
		const n = []
		for (let row = 0; row < 30; row++) {
			const currentRow = []
			for (let column = 0; column < 50; column++) {
				let currentNode = {
					row,
					column,
					isStart: row === 10 && column === 5,
					isFinish: row === 5 && column === 45,
					isWall: false,
					isVisited: false,
					distance: Infinity,
					isPath: false
				}
				currentRow.push(currentNode)
			}
			n.push(currentRow)		
		}
		setNodes(n)
	}, [])

	let visualizeDijkstra = ()=>{
		const grid = nodes
		const startNode = grid[START_NODE_ROW][START_NODE_COL];
		const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
		const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
		const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
		drawSolution(nodesInShortestPathOrder)
		// this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
	}

	let drawSolution = (path)=>{
		for (let row = 0; row < nodes.length; row++) {
			for (let node = 0; node < nodes[0].length; node++) {
				for (let index = 0; index < path.length; index++) {
					if(path[index].row === row && path[index].column === node){
						setTimeout(() => {
							nodes[row][node].isPath = true
							setNodes([...nodes])
						}, 50 * index);
					}
				}
			}			
		}
	}

	let resetGrid = ()=>{
		const n = []
		for (let row = 0; row < 30; row++) {
			const currentRow = []
			for (let column = 0; column < 50; column++) {
				let currentNode = {
					row,
					column,
					isStart: row === 10 && column === 5,
					isFinish: row === 5 && column === 45,
					isWall: false,
					isVisited: false,
					distance: Infinity,
					isPath: false
				}
				currentRow.push(currentNode)
			}
			n.push(currentRow)		
		}
		setNodes([...n])
	}

	let changeMode = (mode)=>{
		setMode(mode)
	}

	let handleMouseDown = ()=>{
		setMousePressed(true)
	}

	let handleMouseUp = ()=>{
		setMousePressed(false)
	}

	let handleClick = (r, c)=>{
		if(!mousePressed){
			return
		}
		console.log('clicked')
		for (let row = 0; row < nodes.length; row++) {
			for (let col = 0; col < nodes[row].length; col++) {
				if(row === r && col === c){
					switch (mode) {
						case 'wall':
							nodes[row][col].isWall = !nodes[row][col].isWall
							setNodes([...nodes])
							break;
						case 'start':
							nodes[row][col].isStart = !nodes[row][col].isStart
							setNodes([...nodes])
							break;
						case 'finish':
							nodes[row][col].isFinish = !nodes[row][col].isFinish
							setNodes([...nodes])
							break;
						default:
							break;
					}
				}
			}			
		}
	}

	return (
		<div className="App">
			<Navbar mode={mode} setMode={changeMode} solve={visualizeDijkstra} reset={resetGrid}/>
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
								isWall={node.isWall}
								handleClick={()=>handleClick(rowIndex, nodeIndex)}
								mouseDown={handleMouseDown}
								mouseUp={handleMouseUp}
								isPath={node.isPath}
							/>
						})
					}) }
				</Grid>
			</Container>
		</div>
	);
}

export default App;
