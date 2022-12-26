const fs = require('fs')

//part 1
fs.promises.readFile('aoc_01.txt', 'utf-8').then(fileData => {
	
	const elfs = fileData.split('\r\n\r\n')
							.map(x => x.split('\r\n')
										.filter(Boolean)
										.map(Number)
										.reduce((p, c) => p + c))
							.reduce((p, c) => (c > p ? c : p))

	})
	.catch(err => console.log(err))

//part 2
fs.promises.readFile('aoc_01.txt', 'utf-8').then(fileData => {
	
	const elfs = fileData.split('\r\n\r\n')
							.map(x => x.split('\r\n')
										.filter(Boolean)
										.map(Number)
										.reduce((p, c) => p + c))
							.sort((p, c) => c - p)
							.slice(0, 3)
							.reduce((p, c) => p + c)

	})
	.catch(err => console.log(err))
