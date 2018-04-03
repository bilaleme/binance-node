

const Binance = require('binance-api-node').default

const client = Binance();

const client2 = Binance({
  apiKey: '',
  apiSecret: '',
});

tmp = 'bilal';

// client.time().then(time => console.log(time));


// async function test1(){

	// console.log(await client2.cancelOrder({
  // symbol: 'WPRBTC',
  // orderId: 653112,
// }));
// };


async function getPrices(){

	console.log(await client2.allOrders({
  symbol: 'ETHBTC',
}))
	
};

getPrices();

// setInterval(getPrices,1000);
// test();

// var express = require('express');
// var app = express();

// app.get('/data',function(req,res){
	// promise = getPrices();
	// console.log(tmp);
	
	// promise.then(function(result) {
        // // use the result...
        // res.send(result);
    // });
// });

// app.listen(80);