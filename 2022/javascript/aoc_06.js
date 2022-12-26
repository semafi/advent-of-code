const fs = require('fs')

//part 1
fs.promises.readFile('aoc_06.txt', 'utf-8').then(fileData => {

    const bufferData = fileData.split('')

    const findFirstMarker = (buffer, index = 0, found = false) => {
        if(found) return index
        
        const findFourDistinct = (buffer, index) => {
            if(index < 3) return false
            const window = buffer.slice(index-3, index + 1)
            return !window.some((e, i, a) => a.some((x, y) => e === x && i !== y))
        }
        
        const  foundFourdiffChars = findFourDistinct(buffer, index)
        
        return findFirstMarker(buffer, ++index, foundFourdiffChars)
    }

    const result = findFirstMarker(bufferData)
    

    })
    .catch(err => console.log(err))

//part 2
fs.promises.readFile('aoc_06_sample.txt', 'utf-8').then(fileData => {

    const bufferData = fileData.split('')

    const findFirstMarker = (buffer, index = 0, found = false) => {
        if(found) return index
        
        const findFourDistinct = (buffer, index) => {
            if(index < 13) return false
            const window = buffer.slice(index-13, index + 1)
            return !window.some((e, i, a) => a.some((x, y) => e === x && i !== y))
        }
        
        const  foundFourdiffChars = findFourDistinct(buffer, index)
        
        return findFirstMarker(buffer, ++index, foundFourdiffChars)
    }

    const result = findFirstMarker(bufferData)
    
	})
	.catch(err => console.log(err))
