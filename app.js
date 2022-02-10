const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const app = express();
const photoController = require("./controllers/photoController")
const pageController = require("./controllers/pageController")

//connect DB
mongoose.connect("mongodb://localhost/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});


//TEMPLATE ENGINE
app.set("view engine", "ejs");


//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //gönderilen verileri encoding ediyor
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
  methods: ["POST", "GET"]
}));


//PHOTO CONTROLLERS
//ROUTES
// fotoğrafların asenkron gitmeisin isitiyorum
//Anasayfaya fotoları göndermek için
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete("/photos/:id", photoController.deletePhoto);

//PAGE CONTROLLERS
app.get('/about', pageController.getAboutPage );
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

//app listener yazıyoruz
const port = 3000;
app.listen(port, () => {
  console.log(`sunucu ${port} portunda başarıyla başlatıldı`)
});