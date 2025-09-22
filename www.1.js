const http = require("http")
const dateEt = require("./src/dateTimeET.js")
const vanasonad = require("./vanasonad.js")

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Marcus Haljasoks. veebiprogrammeerimine</title>\n</head><body>';
const pageBody = '<h1>Marcus Haljasoks. veebiprogrammeerimine</h1><p>Veebileht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a>...</p><p style="color: red;">See on veel üks tekstilõik ja see on punane...</p><hr>';
const pageFoot = '</body></html>';

async function printJama() {
    const listLen = await vanasonad.wisdomLen();
    console.log(listLen)
    console.log("see on pikkus pärast saatmist: " + listLen)
        for (i = 0; i < listLen; i ++)
            console.log("ee")
}

http.createServer(function(req, res) {
    res.writeHead(200, {"Content-type": "text/html"});
    res.write(pageHead);
    res.write(pageBody);
    res.write("<p>Täna on " + dateEt.fullDate() + "<p>");
    res.write("<ol>");

    printJama();

    res.write("</ol>");
    res.write(pageFoot);
    return res.end();
    //Minu port on 5122
}).listen(5122);

//ToDo tee vanasõnade loend kasutades <ol><li>Vanasõna1</li></ol> moodulina lisatuna