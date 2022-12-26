const fs = require('fs')

const transpose = (p, c) => {
	return c.map((e, i) => {
		return [...(Array.isArray(p[i]) ? p[i] : [p[i]]), e]
	})
}

//part 1
fs.promises.readFile('aoc_08.txt', 'utf-8').then(fileData => {
    
    const checkHighestTree = (e, i, a) => {
        if (typeof e !== 'number') return e
        if(i === 0) return true
        if(i === (a.length -1)) return true
        if(a.slice(0, i).every(x => x < e)) return true
        if(a.slice(i + 1).every(x => x < e)) return true
        return e
    }

    const trees = fileData
                        .split('\r\n')
                        .map(x => x.split('').map(Number))

    const treeRows = trees.map(x => x.map(checkHighestTree))
    
    const treeColumns = trees
                            .reduce(transpose)
                            .map(x => x.map(checkHighestTree))
                            .reduce(transpose)

    const highestTrees = treeRows
                                .map((x, i) => x.map((y, j) => (typeof y === 'number' && typeof treeColumns[i][j] === 'number') ? false : true))
                                .map(x => x.filter(Boolean).length)
                                .reduce((p, c) => p + c)

    })
    .catch(err => console.log(err))

//part 2
fs.promises.readFile('aoc_08.txt', 'utf-8').then(fileData => {

    const getPoints = (e, a, points = 0, i = 0) => {
        if(i === a.length) return points
        if(i > a.findIndex(x => x >= e) && a.findIndex(x => x >= e) > -1) return points
        return getPoints(e, a, ++points, ++i)
    }

    const calcPoints = (e, i, a) => {
        if(i === 0) return 0
        if(i === a.length - 1) return 0
        
        const pointsRight = getPoints(e, a.slice(i + 1))
        const pointsLeft = getPoints(e, a.slice(0, i).reverse())

        return pointsRight * pointsLeft
    }

    const trees = fileData
                        .split('\r\n')
                        .map(x => x.split('').map(Number))

    const treeRows = trees.map(x => x.map(calcPoints))

    const treeColumns = trees
                            .reduce(transpose)
                            .map(x => x.map(calcPoints))
                            .reduce(transpose)

    const totalPoints = treeRows
                            .map((x, i) => x.map((y, j) => y * treeColumns[i][j]))
                            .map(x => x.reduce((p, c) => c > p ? c : p))
                            .reduce((p, c) => c > p ? c : p)
    
	})
	.catch(err => console.log(err))
