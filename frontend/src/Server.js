const express = require("express")
const app = express()
const dummyProductDB = require("./DummyProductDB")
const suggestionDB = require("./Suggestions")
const cors = require("cors")
app.use(cors())
app.use(express.json())

console.log(suggestionDB)

const dummyData = dummyProductDB.userData.cart

app.get('/data', function(req,res){
    console.log("DATA REQUEST")
    res.send(dummyData)
})

app.post('/suggestions', function(req,res){
    console.log("SUGGESTIONS REQUEST")
    let phrase = req.body.searchTerm
    let regex
    try{
        regex = new RegExp(phrase, 'gi');
    }catch(e){
        console.error(e)
    }

    let searchSuggestions = suggestionDB.filter(item => {
        return item.match(regex)
    })
    res.send(searchSuggestions)
})

app.post('/productSearch', function(req,res){
    res.send("BLA")
})

function getProductFromProductDatabase(productName){
    return dummyData.filter(item => item.name.includes(productName))
}

console.log(getProductFromProductDatabase("Generic"))

app.listen(5000, console.log("Running on port 5000"))