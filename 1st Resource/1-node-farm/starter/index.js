const fs = require("fs");
const http = require("http");
const { it } = require("node:test");
const path = require("path");
const url = require("url");

//---------------FILES----------------
// //Blocking-Reading
// const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log("Reading File!")
// console.log(textInput);
// // const hello = "Hello World!";
// // console.log(hello);
// //Blocking-Writing
// const textOutput = `This is what we know about the avacado: ${textInput}. \nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt",textOutput);
// console.log("File Added Successfully!")
// const readOutput = fs.readFileSync("./txt/output.txt", "utf-8");
// console.log("Reading File!")
// console.log(readOutput);


// console.log("\n\nASYNC Functions\n\n");


// //Non-Blocking-Reading
// const AsyncRead = fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//     console.log("Reading File!")
//     console.log(data);
// });
// //Nested-Async-Reading
// const NesterAsyncRead = fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err,data2) => {
//         console.log("Reading File!");
//         console.log(data2);
//         const Append = fs.readFile("./txt/append.txt", "utf-8", (err,data3) => {
//             console.log("Reading File!");
//             console.log(data3);
//             console.log("Writing File!");
//             // const outputData = data2 + "\n" + data3;
//             fs.writeFile("./txt/AsyncOutput.txt",`${data2}\n${data3}`, "utf-8", (err,data) => {
//                 console.log("File Added Successfully!")
//                 fs.readFile("./txt/AsyncOutput.txt", "utf-8",(err,data4) => {
//                     console.log("Reading File!")
//                     console.log(data4);
//                 });
//             });
//         })
//     })
// });
//---------------FILES----------------



//---------------SERVER----------------
const TempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8"); 
const TempCards = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8"); 
const TempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8"); 

const Data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"); 
const DataObj = JSON.parse(Data);

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output = output.replace(/{%IMAGE%}/g,product.image);
    output = output.replace(/{%FORM%}/g,product.from);
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
    output = output.replace(/{%QUANTITY%}/g,product.quantity);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%ORGANIC%}/g,product.organic);
    output = output.replace(/{%DESCRIPTION%}/g,product.description);
}


const server = http.createServer((req, resp) => {
    const pathName = req.url;

    //Overview Page
    if(pathName=='/' || pathName == "/overview") {
        // resp.end("This is the overview page!");
        resp.writeHead(200, {
            "content-type" : "text/html",
        })

        const cardsHtml = DataObj.map((item) => replaceTemplate(TempCards, item));

        resp.end(TempOverview);

    //Product Page
    }else if (pathName == "/product") {
        resp.end("This is product page!");
    } else if (pathName == "/api") {
        resp.writeHead(200, {
            "content-type" : "application/json",
        })
        resp.end(Data);


    //Not Found Page
    } else {
        resp.writeHead(404, {
            "content-type" : "text/html",
        })
        resp.end("<h1>404 - Page Not Found</h1>");
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Server has been started!");
    console.log("Listening to Port 8000.");
})
//---------------SERVER----------------