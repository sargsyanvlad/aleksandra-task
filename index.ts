import {iGraph} from './types'

const findShortest = (distances, visited) => {
	let shortest = null;

	for (let node in distances) {
		let isShortest =
			shortest === null || distances[node] < distances[shortest];
		if (isShortest && !visited.includes(node)) {
			shortest = node;
		}
	}
	return shortest;
};

// base and quote are nodes in tree
const findExchangePath = (graph: iGraph, base: string, quote: string) => {

	let exchangePaths = {};
	exchangePaths[quote] = Infinity;
	exchangePaths = Object.assign(exchangePaths, graph[base]);

	console.log("exchangePaths=>", exchangePaths)

	// store outgoing edges from base in parents array
	let parents = { endNode: null };
	for (let child in graph[base]) {
		parents[child] = base;
	}

	console.log("Parents =>", parents)

	// Store already visited nodes in visited
	let visited = [];

	// start find shortest outgoing way from StartNode
	let node = findShortest(exchangePaths, visited);

	while (node) {
		// find its distance from the start node & its child nodes
		let distance = exchangePaths[node];
		let children = graph[node];

		// for each of those child nodes
		for (let child in children) {
			// make sure each child node is not the start node
			if (String(child) === String(base)) {
				continue;
			} else {
				// because of all edges have same weight, max distance will be max edges that we passed
				// save the distance from the start node to the child node
				let newDistance = distance + children[child];

				// if there's no recorded distance from the start node to the child node in the distances object
				// or if the recorded distance is shorter than the previously stored distance from the start node to the child node
				// save the distance to the object
				// record the path
				if (!exchangePaths[child] || exchangePaths[child] > newDistance) {
					exchangePaths[child] = newDistance;
					parents[child] = node;
				}
			}
		}
		// move the node to the visited set
		visited.push(node);
		// when we find the nearest node then move it to the nearest neighbor node
		node = findShortest(exchangePaths, visited);
	}


	let shortestPath = [quote];
	let parent = parents[quote];

	while (parent) {
		shortestPath.push(parent);
		parent = parents[parent];
	}
	shortestPath.reverse();

	// return the shortest path from start node to end node & its distance
	return  {
		distance: exchangePaths[quote],
		path: shortestPath,
	};
};

module.exports = findExchangePath;
