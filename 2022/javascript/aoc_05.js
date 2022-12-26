const fs = require('fs')

const transpose = (p, c) => {
	return c.map((e, i) => {
		return [...(Array.isArray(p[i]) ? p[i] : [p[i]]), e]
	})
}

//part 1
fs.promises.readFile('aoc_05.txt', 'utf-8').then(fileData => {

    const stacks = fileData
                        .split('\r\n\r\n')
                        [0]
                        .split('\r\n')
                        .map(x => x.split(''))
                        .reduce(transpose)
                        .filter(x => x[x.length-1] != ' ')
                        .map(x => x.filter((_,i,a) => i < a.length - 1))
                        .map(x => x.filter(y => y != ' '))
                        .map(x => x.reverse())

    const moves = Array.from(
                            fileData
                                .split('\r\n\r\n')
                                [1]
                                .matchAll(/move\s(?<numberOfElements>\d+)\sfrom\s(?<fromStack>\d+)\sto\s(?<toStack>\d)+$/gm)
                        )
                        .map(x => x.groups) 

    const makeMove = (stack, i, stacks, move) => {
        if(i === move.toStack - 1) return [...stack, ...stacks[move.fromStack - 1].slice(stacks[move.fromStack - 1].length - move.numberOfElements).reverse()]
        if(i === move.fromStack - 1) return [...stack.slice(0, stack.length - move.numberOfElements)]
        return stack;
    }

    function doIt(stacks, moves, iteration = 0) {
        if(iteration === moves.length) return stacks
        newStack = stacks.map((x, i, a) => makeMove(x, i, a, moves[iteration]))
        return doIt(newStack, moves, ++iteration)
    }

    const result = doIt(stacks, moves)
                                    .map(x => x.filter((e, i, a) => i === a.length - 1))
                                    .map(x => x[0])
                                    .reduce((p, c) => p+c)
	})
	.catch(err => console.log(err))


//part 2
fs.promises.readFile('aoc_05.txt', 'utf-8').then(fileData => {
    
    const stacks = fileData
                        .split('\r\n\r\n')
                        [0]
                        .split('\r\n')
                        .map(x => x.split(''))
                        .reduce(transpose)
                        .filter(x => x[x.length-1] != ' ')
                        .map(x => x.filter((_,i,a) => i < a.length - 1))
                        .map(x => x.filter(y => y != ' '))
                        .map(x => x.reverse())

    const moves = Array.from(
                            fileData
                                .split('\r\n\r\n')
                                [1]
                                .matchAll(/move\s(?<numberOfElements>\d+)\sfrom\s(?<fromStack>\d+)\sto\s(?<toStack>\d)+$/gm)
                        )
                        .map(x => x.groups) 

    const makeMove = (stack, i, stacks, move) => {
        if(i === move.toStack - 1) return [...stack, ...stacks[move.fromStack - 1].slice(stacks[move.fromStack - 1].length - move.numberOfElements)]
        if(i === move.fromStack - 1) return [...stack.slice(0, stack.length - move.numberOfElements)]
        return stack;
    }

    function doIt(stacks, moves, iteration = 0) {
        if(iteration === moves.length) return stacks
        newStack = stacks.map((x, i, a) => makeMove(x, i, a, moves[iteration]))
        return doIt(newStack, moves, ++iteration)
    }

    const result = doIt(stacks, moves)
                                    .map(x => x.filter((e, i, a) => i === a.length - 1))
                                    .map(x => x[0])
                                    .reduce((p, c) => p+c)

	})
	.catch(err => console.log(err))
