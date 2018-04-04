

const Binance = require('binance-api-node').default

const client = Binance();

const client2 = Binance({
  apiKey: '',
  apiSecret: '',
});

var BigArray = [];

tmp = 'bilal';

// client.time().then(time => console.log(time));


// async function test1(){

	// console.log(await client2.cancelOrder({
  // symbol: 'WPRBTC',
  // orderId: 653112,
// }));
// };

function precisionRound(number, precision){
  var factor = Math.pow(10,precision);
  return Math.round(number * factor) / factor;
}

function getLargestGradItem(largeArr){
  var count = 0;
  var item = null;
  for(var coin in largeArr){
    if(count == 0){
      item = largeArr[coin];
    } else {
      if(largeArr[coin].gradient > item.gradient){
        item = largeArr[coin];
      }
    }
    count = count + 1;
  }
  console.log(item);
  return item;
}

function computeFiveGradient(item){
  var grad = 0;
  for(var x=1;x<item.history.length;x++){
    grad = (grad + (item.history[x] - item.history[x-1]))/2;
  }
  return grad;
}

async function getPrices(){
  var stats = await client2.dailyStats();
  
  for(var x=0;x<stats.length;x++){
    item = stats[x];
    if(item.symbol.includes('BTC') && !item.symbol.includes('USDT')){
      
    if(BigArray[item.symbol] == undefined){
      BigArray[item.symbol] = {};
      BigArray[item.symbol].history = [];
      BigArray[item.symbol].history.push(parseFloat(item.lastPrice));
      BigArray[item.symbol].gradient = 0;
      BigArray[item.symbol].symbol = item.symbol;
    } else {

      if(BigArray[item.symbol].history.length == 5){
        BigArray[item.symbol].history.splice(0,1);
        BigArray[item.symbol].gradient = computeFiveGradient(BigArray[item.symbol]);
        // BigArray[item.symbol].gradient = precisionRound((BigArray[item.symbol].gradient + (parseFloat(item.lastPrice) - BigArray[item.symbol].history[BigArray[item.symbol].history.length - 1]))/2,8);
        BigArray[item.symbol].history.push(parseFloat(item.lastPrice));
      } else {
        BigArray[item.symbol].gradient = precisionRound((BigArray[item.symbol].gradient + (parseFloat(item.lastPrice) - BigArray[item.symbol].history[BigArray[item.symbol].history.length - 1]))/2,8);
        BigArray[item.symbol].history.push(parseFloat(item.lastPrice));
      }
    }
  }
  }
  var pitem = getLargestGradItem(BigArray);
  pitem = pitem.gradient;
  // console.log(pitem);
};

getPrices();

setInterval(getPrices,10000);
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