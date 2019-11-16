const http = require("https");

class HttpRequest{
  constructor(){}
  
  async perform(options){
    const oThis = this;
    
    return new Promise(function(onResolve, onReject){
      let req = http.request(options, function (res) {
        let chunks = [];
    
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
    
        res.on("end", function () {
          let body = Buffer.concat(chunks);
          console.log(body.toString());
          onResolve({
            success: true,
            responseData: body.toString(),
            response: {
              headers: res.headers,
              status: res.statusCode
            }
          });
        });
      });
  
      req.on('error', function(err) {
        onReject({
          success: false,
          error: err
        });
      });
  
      req.end();
    })
  }
}

module.exports = new HttpRequest();