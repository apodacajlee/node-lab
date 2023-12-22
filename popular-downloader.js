const fetch = require("isomorphic-fetch");
const fs = require("fs");
const path = require("path");

let filePath = path.join(__dirname, "popular-articles.json");

fetch("https://reddit.com/r/programmingHumor.json")
.then(res => res.json())
.then(({ data: { children } }) => {
    let imageExts = [".png", ".jpeg", ".jpg", ".gif"];

    for (let article of children) {
        if (imageExts.includes(path.extname(article.data.url))) {
            fetch(article.data.url)
            .then(res => res.arrayBuffer())
            .then(data => {
                if (!fs.existsSync("./downloads")) {
                    fs.mkdirSync("./downloads");
                }

                fs.writeFile(path.join(__dirname, "downloads", article.data.id + path.extname(article.data.url)), Buffer.from(data), (err) => {
                    if (err) return console.error(err);

                    console.log("Downloaded image from " + article.data.title);
                });
            })
            .catch(err => console.error(err));
        }
    }
    

})
.catch(err => console.error(err));