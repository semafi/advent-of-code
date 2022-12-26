const fs = require('fs')

//part 1
fs.promises.readFile('aoc_03.txt', 'utf-8').then(fileData => {

    const compartments = fileData.split('\r\n');

    const commonItem = compartment => {
        const firstRucksack = compartment.split('').slice(0, compartment.length / 2);
        const secondRucksack = compartment.split('').slice(compartment.length / 2, compartment.length);
        return firstRucksack.find(x => secondRucksack.includes(x))
    }

    const itemScore = item => {
        if(/[a-z]/.test(item)) return item.charCodeAt() - 96;
        if(/[A-Z]/.test(item)) return item.charCodeAt() - 38;
    }

    const totalScore = compartments
                                .map(commonItem)
                                .map(itemScore)
                                .reduce((p, c) => p + c)
	})
	.catch(err => console.log(err))


//part 2
fs.promises.readFile('aoc_03.txt', 'utf-8').then(fileData => {
    
    const compartments = fileData.split('\r\n');

    const group = (_, index, compartments) => {
        if((index + 1) % 3 === 0) return compartments.slice(index - 2, index + 1);
    }

    const commonItem = group => {
        const [firstRucksack, secondRucksack, thirdRucksack] = group
        const commonInFirstTwoRucksacks = firstRucksack.split('').filter(x => secondRucksack.split('').includes(x))
        return thirdRucksack.split('').find(x => commonInFirstTwoRucksacks.includes(x))
    }

    const itemScore = item => {
        if(/[a-z]/.test(item)) return item.charCodeAt() - 96;
        if(/[A-Z]/.test(item)) return item.charCodeAt() - 38;
    }

    const totalScore = compartments
                                .map(group)
                                .filter(Boolean)
                                .map(commonItem)
                                .map(itemScore)
                                .reduce((p, c) => p +c)
	})


	.catch(err => console.log(err))
