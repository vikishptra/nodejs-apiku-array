import express from "express"
import morgan from "morgan"

//inisialisasi port 8000 for backend with express
const port = 8000
const app = express()


//dummy array js
let films = Array(
    {"id":1,"judul":"Avatar 1", "deskripsi":"balabalalalalal","kategori":"Action"},
    {"id":2,"judul":"Suramadu", "deskripsi":"serammmmm","kategori":"Horor"},
    {"id":3,"judul":"Joker", "deskripsi":"laylayalyalyakyaky","kategori":"Action"}
)

//membuat function untuk mengambil data dari semua films
function getAllFilms(_,res){
    res.status(200).json({ok: true, data: films, message : "Successfully"})
}

//membuat function untuk membuat data dari req
function postFilms(req,res){

    //mengambil data request user dari body 
    const {judul,deskripsi,kategori} = req.body
    const id = films.length + 1
    //inisialisasikan dulu ke variabel film dari req.body
    const film = {id,judul,deskripsi, kategori}
    //masukkan data yang dari film yang berisikan judul,deskripsi,kategori ke variabel films
    films.push(film)
    //responsenya harus ada jika user sudah memasukkan datanya
    res.status(201).json({ok:true, message:"Data successfully di tambahkan"})
}

//membuat function untuk menemukan data dari req param id
function getFilmsById(req,res) {
    //ambil data idnya
    const id = req.params.id
    //taro isi data dari films.find ke film periksa dari films.id == id
    const film = films.find(f => f.id == id) 
    // kalo hasil dari film undefined maka tidak di temukan
    if(typeof film == 'undefined')
    res.status(404).json({ok:false,message:"Data tidak di temukan"})
    //kalo datanya ada maka di tampikan sesuai idnya 
    else
    res.status(200).json({ok:true, data:film ,message:"Data berhasil di temukan"})

}

function putUpdateFilm(req,res){    
    //ambil data idnya
    const id = req.params.id

    //temukan data id nya lalu simpan ke variabel film
    const film = films.find(f => f.id == id)
    
    //kalo hasil dari film itu undifined maka munculkan pesan 404
    if(typeof film == 'undefined'){
        res.status(404).json({ok:false, message:"Data tidak di temukan"})
        return
    }
    else{
        //inisialisasi judul deskripsi kategori ke req body
        const {judul,deskripsi,kategori} = req.body
        //lalu baru kita taro di variabel updateFilm
        const updateFilm = {id,judul,deskripsi,kategori}
        //cari index dari idnya 
        const findIndexUpdateFilm = films.findIndex(f => f.id == id)
        
        if(findIndexUpdateFilm < 0){
            res.status(400).json({ok:false, message:"Data tidak di temukan"})
            return
        }
        else{
            films[findIndexUpdateFilm] = updateFilm
            res.status(200).json({ok:true, data:updateFilm, message:"Data berhasil di update"})
        }   
             
    }
}

function deleteFilmsById(req,res){
    //ambil data id
    const  id = req.params.id
     //periksa di films dengan menggunakan find
    const findIndex = films.findIndex(f => f.id == id)

    if(findIndex < 0){
        res.status(400).json({ok:false,message:"Data tidak di temukan"})
        return
    }else{
        films.splice(findIndex, 1)
        res.status(200).json({ok:true,message:"Data berhasil di hapus"})
    }

}

//use morgan for view http response in terminal
app.use(morgan('dev'))
//set yang di kirim format json
app.use(express.json())

//route api
app.get('/films', getAllFilms)
app.post('/films', postFilms)
app.get('/films/:id', getFilmsById)
app.put('/films/:id', putUpdateFilm)
app.delete('/films/:id', deleteFilmsById)


//menjalankan server menggunakan listen js
app.listen(port)
console.log('Server at running : ', port)
