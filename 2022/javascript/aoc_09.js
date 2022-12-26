const fs = require('fs')

//part 1
fs.promises.readFile('aoc_09.txt', 'utf-8').then(fileData => {
    const commands = fileData.split('\r\n').map(x => x.split(' ').map((v,i) => i === 1 ? parseInt(v) : v))

    const head = {x: 0, y: 0}
    const tail = {x: 0, y: 0}
    const visited = (new Set()).add(JSON.stringify(tail))

    const doCommandStep = (state, command) => {
        const direction = command[0]

        //RIGHT HANDLER
        if(direction === 'R'){
            const newHeadState = {
                x: state.head.x+1,
                y: state.head.y
            }

            if(state.head.x > state.tail.x) {
                const newTailXState = state.tail.x+1

                if(state.head.y > state.tail.y) {
                    return ({
                        head: newHeadState, 
                        tail: {
                            x: newTailXState,
                            y: state.tail.y+1
                        },
                        visited: state.visited.add(JSON.stringify(tail))
                    })
                }

                if(state.head.y === state.tail.y) {
                    return ({
                        head: newHeadState, 
                        tail: {
                            x: newTailXState,
                            y: state.tail.y
                        },
                        visited: state.visited.add(JSON.stringify(tail))
                    })
                }

                if(state.head.y < state.tail.y) {
                    return ({
                        head: newHeadState, 
                        tail: {
                            x: newTailXState,
                            y: state.tail.y-1
                        },
                        visited: state.visited.add(JSON.stringify(tail))
                    })
                }
            }

            return ({
                head: newHeadState, 
                tail: {...state.tail},
                visited: state.visited.add(JSON.stringify(tail))
            })
        }

        //LEFT HANDLER
        if(direction === 'L'){
            const newHeadState = {
                x: state.head.x-1,
                y: state.head.y
            }

            if(state.head.x < state.tail.x) {
                const newTailXState = state.tail.x-1

                if(state.head.y > state.tail.y) {
                    return ({
                        head: newHeadState, 
                        tail: {
                            x: newTailXState,
                            y: state.tail.y+1
                        },
                        visited: state.visited.add(JSON.stringify(tail))
                    })
                }

                if(state.head.y === state.tail.y) {
                    return ({
                        head: newHeadState, 
                        tail: {
                            x: newTailXState,
                            y: state.tail.y
                        },
                        visited: state.visited.add(JSON.stringify(tail))
                    })
                }

                if(state.head.y < state.tail.y) {
                    return ({
                        head: newHeadState, 
                        tail: {
                            x: newTailXState,
                            y: state.tail.y-1
                        },
                        visited: state.visited.add(JSON.stringify(tail))
                    })
                }
            }

            return ({
                head: newHeadState, 
                tail: {...state.tail},
                visited: state.visited.add(JSON.stringify(tail))
            })
        }

        //UP HANDLER
        if(direction === 'U'){
            const newHeadState = {
                x: state.head.x,
                y: state.head.y+1
            }

            if(state.head.y > state.tail.y) {
                const newTailYState = state.tail.y+1

                if(state.head.x > state.tail.x) {
                    return ({
                        head: newHeadState, 
                        tail: {
                            x: state.tail.x+1,
                            y: newTailYState
                        },
                        visited: state.visited.add(JSON.stringify(tail))
                    })
                }

                if(state.head.x === state.tail.x) {
                    return ({
                        head: newHeadState, 
                        tail: {
                            x: state.tail.x,
                            y: newTailYState
                        },
                        visited: state.visited.add(JSON.stringify(tail))
                    })
                }

                if(state.head.x < state.tail.x) {
                    return ({
                        head: newHeadState, 
                        tail: {
                            x: state.tail.x-1,
                            y: newTailYState
                        },
                        visited: state.visited.add(JSON.stringify(tail))
                    })
                }
            }

            return ({
                head: newHeadState, 
                tail: {...state.tail},
                visited: state.visited.add(JSON.stringify(tail))
            })
        }

        //DOWN HANDLER
        if(direction === 'D'){
            const newHeadState = {
                x: state.head.x,
                y: state.head.y-1
            }

            if(state.head.y < state.tail.y) {
                const newTailYState = state.tail.y-1

                if(state.head.x > state.tail.x) {
                    return ({
                        head: newHeadState, 
                        tail: {
                            x: state.tail.x+1,
                            y: newTailYState
                        },
                        visited: state.visited.add(JSON.stringify(tail))
                    })
                }

                if(state.head.x === state.tail.x) {
                    return ({
                        head: newHeadState, 
                        tail: {
                            x: state.tail.x,
                            y: newTailYState
                        },
                        visited: state.visited.add(JSON.stringify(tail))
                    })
                }

                if(state.head.x < state.tail.x) {
                    return ({
                        head: newHeadState, 
                        tail: {
                            x: state.tail.x-1,
                            y: newTailYState
                        },
                        visited: state.visited.add(JSON.stringify(tail))
                    })
                }
            }

            return ({
                head: newHeadState, 
                tail: {...state.tail},
                visited: state.visited.add(JSON.stringify(tail))
            })
        }
    }

    const getNewState = (state, command, step = Infinity) => {
        if(step === 0) return state
        const newState = doCommandStep(state, command)
        newState.visited.add(JSON.stringify(newState.tail))
        return getNewState(newState, command, --command[1])
    }

    const doCommand = (state, command) => {
        const newState = getNewState(state, command)
        return newState
    }

    commands.reduce(doCommand, {head, tail, visited})
                                                    .visited
                                                    .size

    })
    .catch(err => console.log(err))

//part 2
fs.promises.readFile('aoc_09_sample.txt', 'utf-8').then(fileData => {
    
    
	})
	.catch(err => console.log(err))