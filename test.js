const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect DB
mongoose.connect("mongodb://localhost/pcat-test-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});





//create a Photo
Photo.create({
    title: "Photo 2 ",
    description: "Photo Description 2"

});
// read a Photo
// Photo.find({}, (err, data) => {
//     console.log(data);
// });

//update a Photo
// const id = "620251035921837b5a71ecf8"
// Photo.findByIdAndUpdate(
//     id, {
//     title: "Photo Title 1 updated",
//     description: "Photo description 3 updated"
// },
// {
//     new:true
// },
//     (err, data) => {
//         console.log(data)
//     }
// )

//delete a photo
const id = "62025550bd3a5b803eec0074"
 Photo.findByIdAndDelete(id, (err, data)=>{
     console.log("Photo is removed");
 });