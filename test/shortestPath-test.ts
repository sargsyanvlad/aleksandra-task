import findShortestPath from '../index'

import { expect } from "chai";

describe(`Shortest path from 'ETH' to 'BTC'`, function() {
  const graph = {
    BTC: { RUB: 1 },
    RUB: { USD: 1, BTC: 1, ETH: 1 },
    ETH: { USD: 1 },
    USD: { RUB: 1, ETH: 1, DOGE: 1 },
    DOGE: { RUB: 1, USD: 1 },
  };

  it("It Should Success, should be 3 ['start', 'A', 'D', 'end']", function() {
    const shortestPath = findShortestPath(graph, 'ETH', 'BTC');
    expect(shortestPath).to.deep.equal({
      distance: 3,
      path: [ 'ETH', 'USD', 'RUB', 'BTC' ],
    });
  });
})
