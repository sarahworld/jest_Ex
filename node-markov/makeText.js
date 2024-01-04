/** Command-line tool to generate Markov text. */

const fs = require('fs')
const markov = require('./markov')
const axios = require('axios')
const process = require('process')



// generate text from text 
function generateFromText(text){
    let markovObject = new markov.MarkovMachine(text)
    console.log(markovObject.makeText())
}

// generate text from text file
function generatefromFile(path){
    fs.readFile(path, 'utf8', function(err,data){
        if(err){
            console.error(`Cannot open file at ${path}:${err}`)
            process.exit(1)
        }else{
            generateFromText(data)
        }
    });
}

async function generateWithURL(url){
    let resp;
    try {
        resp = await(axios.get(url))
    }
    catch{
        console.error(`Cannot open file ${url}:${err}`)
        process.exit(1)
    }
    generateFromText(resp.data)

}

let [method, path] = process.argv.slice(2)

if(method === 'file'){
    generatefromFile(path)
}
else if(method === 'url'){
    generateWithURL(path)
}
else {
    console.error(`unknown method: ${method}`)
    process.exit(1)
}

module.exports = {
    generateFromText:generateFromText,
    generatefromFile: generatefromFile,
    generateWithURL: generateWithURL
}