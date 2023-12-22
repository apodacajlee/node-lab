const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "../chirps.json");

let chirps = [
    {
        author: "John",
        content: "I'm Dad!"
    },
    {
        author: "Michelle",
        content: "I'm Mom!"
    },
    {
        author: "Joshua",
        content: "I'm the oldest sibling!"
    },
    {
        author: "McKenna",
        content: "I'm the middle child..."
    },
    {
        author: "Jacob",
        content: "I'm the youngest!"
    }
];

fs.writeFile(filePath, JSON.stringify(chirps), err => {
    if (err) console.log(err);

    console.log("Wrote chirps");
});

fs.readFile(filePath, 'utf8', () => {
    chirps.forEach(post => {
        console.log(`${post.content} \n -${post.author} \n`);
    });
});