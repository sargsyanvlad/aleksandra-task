const findShortestPath = require('../shortestPath');

const graph = {
	BTC: { RUB: 1 },
	RUB: { USD: 1, BTC: 1, ETH: 1 },
	ETH: { USD: 1 },
	USD: { RUB: 1, ETH: 1, DOGE: 1 },
	DOGE: { RUB: 1, USD: 1 },
};


test(`shortest path from 'ETH' to 'BTC' should be 8 ['start', 'A', 'D', 'end']`, () => {
  const shortestPath = findShortestPath(graph, 'ETH', 'BTC');
  console.log("shortestPath", shortestPath)
  expect(shortestPath).toEqual({
    distance: 3,
    path: [ 'ETH', 'USD', 'RUB', 'BTC' ],
  });
});
