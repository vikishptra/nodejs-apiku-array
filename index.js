import express from 'express'
import morgan from 'morgan'


const serverPort = 8000
const app = express()

//data dummy with array
let films = Array(
    {"id":1,"judul":"Ironman","deskripsi":"Hello Ironman","kategori":"Action"},
    {"id":2,"judul":"Wakanda","deskripsi":"Hello Wakanda","kategori":"Action"},
    {"id":3,"judul":"Avatar","deskripsi":"Hello Avatar","kategori":"Horror"}

)



const getAllFilms = (_, res) => {
    res.status(200).json({ok:true,data:films,message:"ok success"})
}

const getFilmsById = (req,res) => {
    const id = req.params.id  

    const getFilmByFind = films.find(f => f.id == id)

    if(typeof getFilmByFind == 'undefined')
        res.status(404).json({ok:false, message:"data not found"})
    else
        res.status(200).json({ok:true, data:getFilmByFind ,message:"ok success"})
    
}

const createFilms = (req,res) => {
    const {judul,deskripsi,kategori} = req.body

    const id = films.length + 1

    const createFilm = {id,judul,deskripsi,kategori}

    films.push(createFilm)

    res.status(201).json({ok:true, data:createFilm,message:"ok success"})
} 

const updateFilmById = (req,res) =>{
    const id = req.params.id

    const getFilmByFind = films.find(f => f.id == id)

    if(typeof getFilmByFind == 'undefined'){
        res.status(404).json({ok:false, message:"data not found"})
        return
    }else{
        const {judul,deskripsi,kategori} = req.body

        const getFilmByFindIndex = films.findIndex(f => f.id == id)

        const updateFilm = {judul,deskripsi,kategori}

        films[getFilmByFindIndex] = updateFilm

        res.status(200).json({ok:true,data:updateFilm, message:"ok success"})

    }
}

const deleteFilmById = (req,res) => {
    const id = req.params.id

    const getFilmByFind = films.find(f => f.id == id)

    if(typeof getFilmByFind == 'undefined'){
        res.status(404).json({ok:false, message:"data not found"})
        return
    }else{
        const getFilmByFindIndex = films.findIndex(f => f.id == id)
        films.splice(getFilmByFindIndex, 1)
        res.status(200).json({ok:true, message:"ok success"})
    }

}


app.use(morgan('dev'))

app.use(express.json())

//list route
app.get('/', (req, res) => res.json('Api Running!'))
app.get('/films', getAllFilms)
app.get('/films/:id', getFilmsById)
app.post('/films', createFilms)
app.put('/films/:id', updateFilmById)
app.delete('/films/:id', deleteFilmById)

app.listen(serverPort)


console.log(films)