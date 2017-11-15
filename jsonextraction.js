let cheerio = require('cheerio');
let fs = require("fs");
let $ = cheerio.load(fs.readFileSync("./scrape.html", "utf8"));

var companiesList = [];

// For each .item, we add all the structure of a company to the companiesList array
// Don't try to understand what follows because we will do it differently.
//$('.list.items .item').each(function(index, element){


	/*companiesList[index] = {};
	var header = $(element).find('.header');
	companiesList[index]['name'] = $(header).find('[itemprop=name]').text();
	companiesList[index]['description'] = $(header).find('[rel=description]').text();
	companiesList[index]['url'] = $(header).find('.header [itemprop=name] a').getAttribute('href');
	var contact = $(element).find('.contact');
	companiesList[index]['contact'] = {};
	companiesList[index]['contact']['telephone'] = $(contact).find('[itemprop=telephone]').text();
	companiesList[index]['contact']['employee'] = {};
	companiesList[index]['contact']['employee']['name'] = $(contact).find('[itemprop=employeeName]').text();
	companiesList[index]['contact']['employee']['jobTitle'] = $(contact).find('[itemprop=employeeJobTitle]').text();
	companiesList[index]['contact']['employee']['email'] = $(contact).find('[itemprop=email]').text();*/

//});


$('.list.items .item a').each(function(index, element){
	companiesList.push( {href: $(element).getAttribute('href') } );
});

console.log(companiesList); // Output the data in the terminal

console.log(fs.readFileSync("./scrape.html", "utf8"));