

const fs = require('fs');

const transpose = (p, c) => {
    return c.map((e, i) => {
        return [...Array.isArray(p[i]) ? p[i] : [p[i]], e]
    })
}


//part 1
fs.promises.readFile('aoc3.txt', 'utf-8').then(fileData => {

    //get most significant bit of array og bits
    const mostSignificantBits = row => {
        return Number(row.filter(Boolean).length > (row.length / 2));
    }
    
    //get data in a two dimensional array of 0's and 1's
    const dataSet = fileData
                        .split('\r\n')
                        .filter(Boolean)
                        .map(x => x.split('').map(Number))
                                
    const msb = dataSet
                    .reduce(transpose)
                    .map(mostSignificantBits)
                    .map(String)
                    .reduce((s, c) => s+c)

    const lsb = [...msb]
                    .map(Number)
                    .map(x => !Boolean(x))
                    .map(Number)
                    .map(String)
                    .reduce((s, c) => s+c)

    const mbs10Base = parseInt(msb, 2)
    const lbs10Base = parseInt(lsb, 2)

    mbs10Base*lbs10Base


}).catch(err => console.log(err));


//part 2
fs.promises.readFile('aoc3.txt', 'utf-8').then(fileData => {
    
    //get data in a two dimensional array of 0's and 1's
    const dataSet = fileData
                        .split('\r\n')
                        .filter(Boolean)
                        .map(x => x.split('').map(Number))

    const iterate = (bit, arr, i = 0) => {
        if(arr.length === 1 || i >= arr[0].length) return arr
        return iterate(bit, arr.filter(x => x[i] === getSignificantBit(bit, arr, i)), ++i)
    }

    const getSignificantBit = (bit, arr, i) => {
        const a = arr.map(x => x[i])
        if(bit === 'most') return Number(a.filter(Boolean).length >= (a.length/2))
        if(bit === 'least') return Number(a.filter(x => !Boolean(x)).length > (a.length/2))
    }

    const oxygen = iterate('most', dataSet)[0]
                    .map(String)
                    .reduce((s, c) => s+c)

    const co2 = iterate('least', dataSet)[0]
                    .map(String)
                    .reduce((s, c) => s+c)

    parseInt(oxygen, 2)*parseInt(co2, 2)
    

}).catch(err => console.log(err));