const express = require("express")
const app = express()
const dummyProductDB = require("./DummyProductDB")
const suggestionDB = require("./Suggestions")
const cors = require("cors")
const url = require('url')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

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

app.post('/addToCart', function(req,res){
    console.log(req.body)
    res.send("ok")
})

app.get('/s', function(req,res){
    let urlObject = url.parse(req.url)
    let rawQuery = urlObject.query.split("=")[1]
    let properQuery = rawQuery.split("+").join(" ")
    let searchResults = getProductFromProductDatabase(properQuery)
    res.send(searchResults)
})

app.get('/*', function(req, res){
    res.status(404)
    res.send("<h1>404 page not found</h1>")
})

function getProductFromProductDatabase(productName){
    let regex
    try{
        regex = new RegExp(productName, 'gi');
    }catch(e){
        console.error(e)
    }

    return dummyData.filter(item => {
        return item.name.match(regex)
    })
}

console.log(getProductFromProductDatabase("Generic"))

app.listen(5000, console.log("Running on port 5000"))