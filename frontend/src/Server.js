const express = require("express")
const app = express()
const dummyProductDB = require("./DummyProductDB")
const cors = require("cors")
app.use(cors())

const dummyData = dummyProductDB.userData

app.get('/data', function(req,res){
    console.log("DATA REQUEST")
    res.send(dummyData)
})

app.listen(5000, console.log("Running on port 5000"))