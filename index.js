



const Binance = require('binance-api-node').default

const client = Binance();

const client2 = Binance({
  apiKey: 'phSZA1mF1O8SlefXWx43TzTG8MEyIUK3SPrxrSPyxttlXwxlpJNLlsm0sWsz9C4d',
  apiSecret: 'bDkiOZdq97LfbPdJnoUvTqmKNnnergR2gKZGD7JCxnGtIKPqh056iUSS8nU99jYS',
});

var BigArray = {};

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

async function getPrices(responseObject){
  var stats = await client2.dailyStats();
  
  for(var x=0;x<stats.length;x++){
    item = stats[x];
    if(item.symbol.includes('BTC') && !item.symbol.includes('USDT')){
      
    if(BigArray[item.symbol] == undefined){
      BigArray[item.symbol] = {};
      BigArray[item.symbol].history = [];
      BigArray[item.symbol].history.push(parseFloat(item.priceChangePercent));
      BigArray[item.symbol].symbol = item.symbol;
    } else {

      if(BigArray[item.symbol].history.length == 100){
        BigArray[item.symbol].history.splice(0,1);
        BigArray[item.symbol].history.push(parseFloat(item.priceChangePercent));
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
  //return BigArray;

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



  app.use("/static", express.static(__dirname + '/static'));

  app.get('/data',function(req,res){
    
    
    res.sendFile(__dirname + '/static/index.html');
    
  });

  app.get('/stats',function(req,res){
    res.send(BigArray);
  });



  setInterval(getPrices,10000);
  app.listen(80);
//test();

