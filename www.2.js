const http = require("http");
const fs = require("fs");
//laeme mooduli päringu parssimiseks
const url = require("url");
//failitee haldamiseks moodul
const path = require("path");
const dateEt = require("./src/dateTimeET");
const textRef = "txt/vanasonad.txt";
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Marcus Haljasoks. veebiprogrammeerimine</title>\n</head><body>';
const pageBanner = '<img src="vp_banner_2025_TA.jpg" alt="kursuse bänner">'
const pageBody = '<h1>Marcus Haljasoks. veebiprogrammeerimine</h1><p>Veebileht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a>...</p><p style="color: red;">See on veel üks tekstilõik ja see on punane...</p><hr>';
const pageLink = '\n\t<p>Vaata <a href="/vanasonad/">vanasõnasid</a>.</p>'
const pageFoot = '</body></html>';

http.createServer(function(req, res){
	//parisn URL-i
	console.log("Päring: " + req.url)
	let currentUrl = url.parse(req.url, true);
	console.log("Parsituna: " + currentUrl.pathname)

	if(currentUrl.pathname === "/") {
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.fullDate());
		res.write(pageLink);
		res.write(pageFoot);
		return res.end();
	}
	else if(currentUrl.pathname === "/vanasonad/") {
		res.writeHead(200, {"Content-type": "text/html"});
		fs.readFile(textRef, "utf8", (err, data)=>{
			if(err){
				res.write(pageHead);
				res.write(pageBanner);
				res.write(pageBody);
				res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p><p>Vanasõnad ei tööta sorry!</p>");
				res.write(pageFoot);
				return res.end();
			} else {
				let folkWisdom = data.split(";");
				let folkWisdomOutput = "\n\t<ol>";
				for (let i = 0; i < folkWisdom.length; i ++){
					folkWisdomOutput += "\n\t\t<li>" + folkWisdom[i] + "</li>";
				}
				folkWisdomOutput += "\n\t</ol>";
				res.write(pageHead);
				res.write(pageBanner);
				res.write(pageBody);
				res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p>");
				res.write(folkWisdomOutput);
				res.write(pageFoot);
				return res.end();
			}
		});
	}
	else if (currentUrl.pathname === "vp_banner_2025_TA.jpg") {
		//liidame muidu kättesaamatu piltide kausta meie veebi failiteega
		let bannerPath = path.join(__dirname, "images");
		fs.readFile(bannerPath + currentUrl.pathname, (err, data)=>{
			if(err) {
				throw(err)
			}
			else {
				res.writeHead(200, {"Content-type": "image/jpeg"});
				res.end(data);
			}
		});
	}
	else {
		res.end("Viga 404, ei leia sellist lehte!")
	}

    //minu port on 5122
}).listen(5122);

//...TODO...
//pane kogu asi giti ulesse
//git add .
//git commit -m "Lisatud node serveri marsruudid"
//git push regu token

//Lisa alamleht