const fs = require('fs');
const data = fs.promises.readFile('aoc2.txt', {encoding: 'utf-8'});

data.then(data => {
    const input = data.split('\r\n')
                        .filter(n => new Boolean(n))
                        .map(n => n.split(' '))
                        .map(n => Object.fromEntries([n]));

    const xMovement = input
                        .filter(x => Object.keys(x).includes('forward'))
                        .map(x => +x.forward)
                        .reduce((sum, n) => sum+n);
                        
    const yMovement = input
                        .filter(x => Object.keys(x).some(x => x == 'up' || x == 'down'))
                        .map(x => -x.up || +x.down)
                        .reduce((sum, n) => sum+n);
             
    console.log(xMovement * yMovement);      
    //console.log(input);

    const doInstruction = (x, y) => {
        if(y.down !== undefined)    return {aim: x.aim + (+y.down), depth: x.depth}
        if(y.up !== undefined)      return {aim: x.aim - (+y.up), depth: x.depth}
        if(y.forward !== undefined) return {aim: x.aim, depth: x.depth + x.aim * (+y.forward)}
    }
    
    const yMovement2 = input.reduce(doInstruction, {aim: 0, depth: 0});

    yMovement
    
    //console.log(yMovement2);
    console.log(xMovement * yMovement2.depth);

}).catch(err => console.error(err));
