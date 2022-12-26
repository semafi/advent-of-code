const fs = require('fs')

//part 1
fs.promises.readFile('aoc_04.txt', 'utf-8').then(fileData => {

    const pairs = fileData
                        .split('\r\n')
                        .map(x => x.split(','));

    const coverEachOther = pair => {
        const [elf1, elf2] = pair;
        const [elf1Start, elf1End] = elf1.split('-').map(Number);
        const [elf2Start, elf2End] = elf2.split('-').map(Number);

        const firstInSecond = elf1Start >= elf2Start && elf1End <= elf2End
        const secondInFirst = elf2Start >= elf1Start && elf2End <= elf1End

        return firstInSecond || secondInFirst
    }

    const total = pairs
                    .map(x => x)
                    .filter(coverEachOther)
                    .length

	})
	.catch(err => console.log(err))


//part 2
fs.promises.readFile('aoc_04.txt', 'utf-8').then(fileData => {

    const pairs = fileData
                        .split('\r\n')
                        .map(x => x.split(','));

    const coverEachOther = pair => {
        const [elf1, elf2] = pair;
        const [elf1Start, elf1End] = elf1.split('-').map(Number);
        const [elf2Start, elf2End] = elf2.split('-').map(Number);

        const firstInSecond = elf1Start <= elf2Start && elf2Start <= elf1End
        const secondInFirst = elf2Start <= elf1Start && elf1Start <= elf2End

        return firstInSecond || secondInFirst
    }

    const total = pairs
                    .map(x => x)
                    .filter(coverEachOther)
                    .length

	})


	.catch(err => console.log(err))
