
let input = document.querySelectorAll('input');
console.log(input);

let keywords = [];

for (let i = 0; i < input.length; i++) {
    keywords.push(input[i].name);
}

console.log(keywords);
