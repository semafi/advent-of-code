const fs = require('fs')

//part 1
fs.promises.readFile('aoc_07_sample.txt', 'utf-8').then(fileData => {

    const stein = (p, c) => {
        if(/\$ cd \.\./.test(c)) return {path: p.path.substring(0, p.path.lastIndexOf('/$')+1), command: [...p.command, p.path.substring(0, p.path.lastIndexOf('/$')+1)]}
        if(/\$ cd .+/.test(c)) return {path: p.path + c.match(/\$ cd .+/) + '/', command: [...p.command, p.path + c.match(/\$ cd .+/) + '/']}
        return {path: p.path, command: [...p.command, c]}
    }

    '$ cd root/$ cd a/$ cd e/'.substring(0, '$ cd root/$ cd a/$ cd e/'.lastIndexOf('/$')+1)
    
    const test = fileData
                        .split('\r\n')
                        .reduce(stein, {path: '', command: ['']})

    const commands = Array
                        .from(fileData.matchAll(/\$ cd (?<directory>.+)\r\n+\$ ls(?<info>(.|\r\n)+?)(?=\$)/gm))
                        .map(x => x.groups)

    const getFolderSize = (folder) => {

        const fileSizeInFolder = Array
                                    .from(folder.info.matchAll(/\d+/gm))
                                    .map(x => Number(x[0]))
                                    .reduce((p, c) => p + c, 0)

        const foldersInFolder = Array
                                    .from(folder.info.matchAll(/(?<=dir ).+/gm))
                                    .map(x => x[0])

        if(foldersInFolder.length === 0) return fileSizeInFolder

        return fileSizeInFolder + foldersInFolder.map(x => getFolderSize(commands.filter(y => y.directory === x)[0])).reduce((p, c) => p + c)
    }

    //TODO: Need to add command path

    const boom = commands
                        .map(x => getFolderSize(x))
                        .filter(x => x <= 100000)
                        .reduce((p, c) => p + c)


    })
    .catch(err => console.log(err))

//part 2
fs.promises.readFile('aoc_07_sample.txt', 'utf-8').then(fileData => {

    
    
	})
	.catch(err => console.log(err))
