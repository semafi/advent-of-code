const fs = require('fs')

//part 1
fs.promises.readFile('aoc_02.txt', 'utf-8').then(fileData => {

	const playRound = play => {
		const [p1, p2] = play;

		if (p1 === 'A') {
			if(p2 === 'X') return 0
			if(p2 === 'Y') return 1
			if(p2 === 'Z') return -1
		}

		if (p1 === 'B') {
			if(p2 === 'X') return -1
			if(p2 === 'Y') return 0
			if(p2 === 'Z') return 1
		}

		if (p1 === 'C') {
			if(p2 === 'X') return 1
			if(p2 === 'Y') return -1
			if(p2 === 'Z') return 0
		}
	}

	const getScore = play => {
		const [p1, p2] = play;
		const playScore = playRound(play)

		if(playScore === 0) {
			if(p2 === 'X') return 3 + 1
			if(p2 === 'Y') return 3 + 2
			if(p2 === 'Z') return 3 + 3
		}

		if(playScore === 1) {
			if(p2 === 'X') return 6 + 1
			if(p2 === 'Y') return 6 + 2
			if(p2 === 'Z') return 6 + 3
		}

		if(playScore === -1) {
			if(p2 === 'X') return 0 + 1
			if(p2 === 'Y') return 0 + 2
			if(p2 === 'Z') return 0 + 3
		}
	}


	
	const plays = fileData.split('\r\n').map(x => x.split(' '));

	plays.map(x => getScore(x)).reduce((p, c) => p + c)

	})
	.catch(err => console.log(err))


//part 2
fs.promises.readFile('aoc_02.txt', 'utf-8').then(fileData => {

	const shapeScore =  {A: 1, B: 2, C: 3}

	const resultScore = {X: 0, Y: 3, Z: 6}

	const playMap = {	
						X: {A: 'C', B: 'A', C: 'B'}, 
						Y: {A: 'A', B: 'B', C: 'C'},
						Z: {A: 'B', B: 'C', C: 'A'}
					}

	const playRound = game => {
		const [shape, result] = game;
		return resultScore[result] + shapeScore[playMap[result][shape]];
	}

	const plays = fileData
					.split('\r\n')
					.map(x => x.split(' '))
					.map(playRound)
					.reduce((p, c) => p+c)
	})


	.catch(err => console.log(err))
