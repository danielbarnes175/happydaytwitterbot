const botSettings = require("./botSettings.json");
const twit = require("twit");
const fs = require("fs");

//text1 is the list of adjectives
//text2 is the list of nouns
//text3 is the list of abstract nouns
const text1 = fs.readFileSync("./words/adjectivelist.txt").toString('utf-8');
const text2 = fs.readFileSync("./words/nounlist.txt").toString('utf-8');
const text3 = fs.readFileSync("./words/abstractnounlist.txt").toString('utf-8');

let timeBetweenTweets = 1000 * 60 * 60;
//let timeBetweenTweets = 60000;

let Twitter = new twit(botSettings);
console.log("Bot online!");


let tweet_day = function() {
	//Find the adjective to use
	var adjByLine = text1.split("\n");
	var whichAdj = Math.floor(Math.random() * adjByLine.length);
	var adj = adjByLine[whichAdj];
	adj = (adj.charAt(0).toUpperCase() + adj.slice(1)).trim();

	//Find the noun to use
	var textByLine = text2.split("\n")
	var whichNoun = Math.floor(Math.random() * textByLine.length);
	var noun = textByLine[whichNoun];
	noun = (noun.charAt(0).toUpperCase() + noun.slice(1)).trim();

	//Find the abstract noun to use
	var abstractByLine = text3.split("\n");
	var whichAbs = Math.floor(Math.random() * abstractByLine.length);
	var abstract = abstractByLine[whichAbs];
	abstract = abstract.trim();
	abstract = (abstract.charAt(0).toUpperCase() + abstract.slice(1)).trim();

	let tweet = `Happy ${adj} ${noun} ${abstract} Day!`;

	Twitter.post('statuses/update', { status: tweet}, function(err, data, response) {
		if (err) {
			console.log(err);
		} else {
			//console.log(data);
			console.log("Successfully tweeted!");
		}
	});
}

tweetLoop();

function tweetLoop() {
	    (function loop() {
	        var now = new Date();
	        if (/*now.getDate() === 6 && */now.getHours() === 8 /*&& now.getMinutes() === 46*/) {
	            tweet_day();
			}
	        now = new Date();                  // allow for time passing
	        var delay = 60000 - (now % 60000); // exact ms to next minute interval
	        setTimeout(loop, delay);
	    })();
	}