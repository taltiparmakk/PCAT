const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const ejs = require('ejs');
const app = express();
const Photo = require("./models/Photo");


//connect DB
mongoose.connect("mongodb://localhost/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//TEMPLATE ENGINE
app.set("view engine", "ejs");


//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //gönderilen verileri encoding ediyor
app.use(express.json())


//ROUTES
// fotoğrafların asenkron gitmeisin isitiyorum
//Anasayfaya fotoları göndermek için
app.get('/', async (req, res) => {
  const photos = await Photo.find({})
  res.render('index', {
    photos
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
//bodydeb gelen requestler
app.post('/photos', async (req, res) => {
  await Photo.create(req.body) 
  res.redirect("/");
});

//app listener yazıyoruz
const port = 3000;
app.listen(port, () => {
  console.log(`sunucu ${port} portunda başarıyla başlatıldı`)
});