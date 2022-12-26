

const fs = require('fs');

const transpose = (p, c) => {
    return c.map((e, i) => {
        return [...Array.isArray(p[i]) ? p[i] : [p[i]], e]
    })
}

//part 1
fs.promises.readFile('aoc4_sample.txt', 'utf-8').then(fileData => {

    //get instructions: [7,4,9,5,...,19,3,26,1]
    const instructions = fileData
                        .split('\r\n')
                        .filter((_, i) => i === 0)
                        .reduce((p, c) => p + c)
                        .split(',')
                        .filter(Boolean)
                        .map(Number)

    //get boards, each board is a two dimensional array
    const boards = fileData
                        .split('\r\n\r\n')
                        .filter((_, i) => i > 0)
                        .map(x => x.split('\r\n').map(y => y.split(/\s\s|\s/).filter(Boolean).map(Number)))

    const checkBingo = (board, instruction) => {
        if(board.some(row => row.every(num => instruction.includes(num)))) return true
        if(board.reduce(transpose).some(row => row.every(num => instruction.includes(num)))) return true
        else return false
    }

    let test = checkBingo([[1,2,3],[4,5,6],[7,8,9]], [1,2,6,5])
    test = checkBingo([[1,2,3],[4,5,6],[7,8,9]], [1,2,3,5,8])
    test = checkBingo([[1,2,3],[4,5,6],[7,8,9]], [1,2,6,5,8])
    test
                        
    

}).catch(err => console.log(err));