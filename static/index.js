var app = new Vue({
    el: '#app',
    data: {
      stats: ''
      },
    methods:{
        getData:function(ival){
            this.stats = ival;

            for(index in ival){
                console.log(ival[index].history)

                var data = {
                    // A labels array that can contain any sort of values
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                    // Our series array that contains series objects or in this case series data arrays
                    series: [
                      ival[index].history
                    ]
                  };
                  
                  var options = {
                    width: '300px',
                    height: '200px'
                  };
                  // Create a new line chart object where as first parameter we pass in a selector
                  // that is resolving to our chart container element. The Second parameter
                  // is the actual data object.
                  new Chartist.Line('.'+ival[index].symbol, data,options);


            }
        }
    }
  });

function callData(){

    $.ajax({
        url:'/stats',
        method:'GET',
        success:function(ival){
            app.getData(ival);
        }
     });     
}



setInterval(callData,10000);

