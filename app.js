const http = require("http");
const server = http.createServer((req, res) => {
    const products = [
        { name: "Minh", price: 200 },
        { name: "Duy", price: 300 },
        { name: "Văn", price: 100 },
    ];
    products.push({ name: "Nam", price: 1000 });
    if (req.url == "/products") {
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(products));
    }
    if (req.url == "/") {
        res.setHeader("Content-Type", "text/html");
        res.end("<html><body><h1>Home Page</h1></body></html>")
    }
});
server.listen(8080, () => {
    console.log("Server is running 8080");
});