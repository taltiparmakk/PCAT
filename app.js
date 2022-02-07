const express = require('express');
const path = require("path");
const app = express();
//MIDDLEWARES
app.use(express.static("public"));
//static veriler için yaptık
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "temp/index.html"));
});

//app listener yazıyoruz
const port = 3000;
app.listen(port, () => {
    console.log(`sunucu ${port} portunda başarıyla başlatıldı`)
});