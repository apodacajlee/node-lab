const fetch = require("isomorphic-fetch");
const fs = require("fs");
const path = require("path");

let filePath = path.join(__dirname, "popular-articles.json");

fetch("https://reddit.com/r/programmingHumor.json")
.then(res => res.json())
.then(({ data: { children } }) => {
    let articles = [];

    for (let article of children) {
        articles.push({
            url: article.data.url,
            title: article.data.title,
            author: article.data.author
        });
    }
    
    fs.writeFile(filePath, JSON.stringify(articles), (err) => {
        if (err) return console.error(err);

        console.log("Extracted articles");
    })
})
.catch(err => console.error(err));