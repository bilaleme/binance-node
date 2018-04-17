

const Binance = require('binance-api-node').default

const client = Binance();

const client2 = Binance({
  apiKey: '',
  apiSecret: '',
});

var BigArray = ['kajsldfhaflsadkajsldfhaflsadkajsldfhaflsadkajsldfhaflsadkajsldfhaflsadkajsldfhaflsadkajsldfhaflsadkajsldfhaflsadkajsldfhaflsadkajsldfhaflsadkajsldfhaflsadkajsldfhaflsad'];

tmp = 'bilal';

// client.time().then(time => console.log(time));


// async function test1(){

	// console.log(await client2.cancelOrder({
  // symbol: 'WPRBTC',
  // orderId: 653112,
// }));
// };

function sum(array) {
  var num = 0;
  for (var i = 0, l = array.length; i < l; i++) num += array[i];
  return num;
}

function imean(array) {
  return sum(array) / array.length;
}

function variance(array) {
  var mean = imean(array);
  return imean(array.map(function(num) {
    return Math.pow(num - mean, 2);
  }));
}

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
      if(largeArr[coin].lowDiff < item.lowDiff){
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
      BigArray[item.symbol].history.push(parseFloat(item.priceChangePercent));
      // BigArray[item.symbol].gradient = 0;
      // BigArray[item.symbol].trend = 0;
      BigArray[item.symbol].symbol = item.symbol;
    } else {

      if(BigArray[item.symbol].history.length == 10){
        BigArray[item.symbol].history.splice(0,1);
        // BigArray[item.symbol].gradient = computeFiveGradient(BigArray[item.symbol]);
        // BigArray[item.symbol].gradient = precisionRound((BigArray[item.symbol].gradient + (parseFloat(item.lastPrice) - BigArray[item.symbol].history[BigArray[item.symbol].history.length - 1]))/2,8);
        BigArray[item.symbol].history.push(parseFloat(item.priceChangePercent));
        //BigArray[item.symbol].trend = BigArray[item.symbol].history[BigArray[item.symbol].history.length - 1] - BigArray[item.symbol].history[0];
        //BigArray[item.symbol].lowDiff = variance(BigArray[item.symbol].history)  * (item.lastPrice - item.lowPrice);
      } else {
        // BigArray[item.symbol].gradient = precisionRound((BigArray[item.symbol].gradient + (parseFloat(item.lastPrice) - BigArray[item.symbol].history[BigArray[item.symbol].history.length - 1]))/2,8);
        BigArray[item.symbol].history.push(parseFloat(item.priceChangePercent));
      }
    }
  }
  }
  // var pitem = getLargestGradItem(BigArray);
  // pitem = pitem.gradient;
  // console.log(BigArray);
  return BigArray;
};

async function getBGR(){
   return await BigArray
};

async function getAccountInfo(){
  var assets = [];
  var coins = await client2.accountInfo();
  for(coin in coins.balances){
    if(parseFloat(coins.balances[coin].free) != 0)
      assets.push(coins.balances[coin]);
  }
}

getAccountInfo();
var express = require('express');
  var app = express();

  app.get('/data',function(req,res){
    getPrices().then(function(result){
      console.log(result);
      res.send(typeof result);
    });
  });

  // setInterval(getPrices,10000);
  app.listen(80);
//test();

