let axios = require('axios'); // HTTP client
let cheerio = require('cheerio'); // HTML parsing package
//let jsonframe = require('jsonframe-cheerio'); // a cheerio plugin I designed
let fs = require('fs'); // is included in node.js - you don't need to install it


let first_url = 'http://heimaslod.is/index.php/';
let ending = 'Austurvegur_18';
let url = first_url + ending;

axios.get(url)
	.then((response) => {
		if(response.status === 200) {
			var html = response.data;
      let $ = cheerio.load(html); 
      var hus = [];
      //.mw-content-ltr
      $('.mw-content-ltr').each(function(i, elem) {

        hus[i] = {
          houseName: ending.replace("_", " "),
          description: $(this).children('p').text().replace(/(\r\n|\n|\r|Heimildir)/gm,"")  
        }
      });
      fs.appendFile('hahaha.json', 
        JSON.stringify(hus, null, 4), (err)=>{
        console.log('File successfully written!');
      })
		}
}, (error) => console.log(error));
