const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const path = require("path");
const ejs = require('ejs');
const app = express();
const fs = require("fs");
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
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'));



//ROUTES
// fotoğrafların asenkron gitmeisin isitiyorum
//Anasayfaya fotoları göndermek için
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort("-dateCreated");
  res.render('index', {
    photos
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
///fotolara gelen unique idleri yakalayıp tıklayınca açmak için
app.get('/photos/:id', async (req, res) => {
  // res.render('about');
  const photo = await Photo.findById(req.params.id)
  res.render("photo", {
    photo
  })
});

app.get('/add', (req, res) => {
  res.render('add');
});
//bodydeb gelen requestler
app.post('/photos', async (req, res) => {
  // await Photo.create(req.body)
  // res.redirect("/");

  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
  }

  let uploadedImage = req.files.image
  let uploadPath = __dirname + "/public/uploads/" + uploadedImage.name

  uploadedImage.mv(uploadPath,
    async () => {
      await Photo.create({
        ...req.body,
        image: "/uploads/" + uploadedImage.name
      });
      res.redirect("/");
    });

});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id })

  res.render('edit', {
    photo
  });
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title
  photo.description = req.body.description
  photo.save()
  res.redirect(`/photos/${req.params.id}`)

});
//app listener yazıyoruz
const port = 3000;
app.listen(port, () => {
  console.log(`sunucu ${port} portunda başarıyla başlatıldı`)
});