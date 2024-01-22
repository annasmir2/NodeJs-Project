const http=require("http");
const fs=require("fs");
const requests=require("requests");
   
const readhome=fs.readFileSync("Home.html","utf-8");
 const replaceval=(tempval,orgval)=>{
    let temp=tempval.replace("{%tempval%}",orgval.main.temp);
   temp=temp.replace("{%tempmin%}",orgval.main.temp_min);
  temp= temp.replace("{%tempmax%}",orgval.main.temp_max);
 temp= temp.replace("{%location%}",orgval.name);
  temp=  temp.replace("{%country%}",orgval.sys.country);
  temp=  temp.replace("{%tempstatus%}",orgval.weather[0].main);


return temp;


 }
const server=http.createServer((req,res)=>{
     if(req.url==="/"){
        requests('https://api.openweathermap.org/data/2.5/weather?q=Rawalpindi&appid=b000f6133ae90ea3305437023cbb3f1d')
        .on('data', (chunk)=> {
              const obj=JSON.parse(chunk);
              const arr=[obj];
          let final=arr.map((val)=>
                replaceval(readhome,val)).join("");
                res.end(final);
          })
        .on('end',  (err) =>{
          if (err) return console.log('connection closed due to errors', err);
         
          res.end();
        });
     }
});

server.listen(5000,"127.0.0.1",()=>{
    console.log("Listening to the port 5000");
})