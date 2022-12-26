
const fs = require('fs');
const data = fs.promises.readFile('aoc1.txt', {encoding: 'utf-8'});

data.then(data => {
    const numbers = data.split('\r\n')
                        .filter(n => new Boolean(n))
                        .map(n => parseInt(n));
    
    const resultPart1 = numbers
                    .filter((x, i, a) => x > a[i-1])
                    .length

    console.log(resultPart1);
    
    const resultPart2 = numbers
                    .reduce((a, _, c, d) => [...a, d.slice(c-3, c)], [])
                    .map(x => x.reduce((x, y) => x+y, 0))
                    .filter((x, i, a) => x > a[i-1])
                    .length;

    console.log(resultPart2);


}).catch(err => console.error(err));

