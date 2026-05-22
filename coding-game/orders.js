/**
 * Order Algo
 * @param {Array} orders 
 * @param {String} type 
 */
function groupByProperty(orders, type) {
  if (orders.length === 0) return {};
  const output = {};
  if (Object.prototype.hasOwnProperty.call(orders[0], type) && !Object.prototype.hasOwnProperty.call(orders[0], "constructor")) {
    for (let i = 0; i < orders.length; i++) {
      if (output[type]) {
        output[type].push(orders[i]);
      } else {
        output[type] = [orders[i]];
      }
    }
    return output;
  } else {
    return {};
  }
}
const orders = [
  { id: 1, type: 'Buy', asset: 'XAUUSD' },
  { id: 2, type: 'Sell', asset: 'BTCUSD' },
  { id: 3, type: 'Buy', asset: 'BTCUSD' },
  { id: 3, type: 'Buy Limit', asset: 'EURUSD' }
];

console.log(groupByProperty(orders, 'type'));
// Expected: { Buy: [{id:1, type:'Buy', asset:'XAUUSD'}, {id:3, type:'Buy', asset:'BTCUSD'}], Sell: [{id:2, type:'Sell', asset:'BTCUSD'}] }

console.log(groupByProperty(orders, 'asset'));
// Expected: { XAUUSD: [{id:1, ...}], BTCUSD: [{id:2, ...}, {id:3, ...}] }

console.log(groupByProperty(orders, 'nonExistent'));
// Expected: {}

console.log(groupByProperty([], 'type'));
// Expected: {}


/*

if (!Object.prototype.hasOwnProperty.call(obj[0], t)) {
        return {};
    }
*/