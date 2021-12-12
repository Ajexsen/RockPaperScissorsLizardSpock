// const game_options = ['rock', 'paper', 'scissors']
// const win_possiblities = {'rock': ['scissors'], 'paper': ['rock'], 'scissors': ['paper']}

const gameOptions = ['rock', 'paper', 'scissors', 'lizard', 'spock']
const winPossiblities = {'rock': ['scissors', 'lizard'], 'paper': ['rock', 'spock'], 'scissors': ['paper', 'lizard'], 'lizard': ['paper', 'spock'], 'spock': ['rock', 'scissors']}

const opt2symbol = {'rock': '🗿', 'paper': '📃', 'scissors': '✂️', 'lizard': '🦎', 'spock': '🖖'}
const result2Text = {'-1': 'lose', '0': 'tie', '1': 'win'}
const resultMsgs = {'-1': 'Nice try, loser!', '0': 'I guess we\'re square!', '1': 'Fine! You beat me!'}

const divResult = document.querySelector('#result-container')
const divResultMsg = document.querySelector('#result-msg')
const divPlayer = document.querySelector('#player-choice')
const divOpponent = document.querySelector('#opponent-choice')
const divScore = document.querySelector('#score')

let curScore = 0

const getRandomChoice = () => {
    const opt_len = gameOptions.length - 1 
    const choice = Math.round(Math.random() * opt_len)
    return gameOptions[choice];
}

const submitChoice = (playerChoice) => {
    if(!gameOptions.includes(playerChoice)){
        console.log("ERROR: illegal choice! (%s)", playerChoice)
        return;
    } else {
        const opponentChoice = getRandomChoice()
        displayResult(playerChoice, opponentChoice)
    }
}

const getResult = (playerChoice, opponentChoice) => {
    let result
    if(playerChoice == opponentChoice){
        result = 0
    } else if(winPossiblities[playerChoice].includes(opponentChoice)){
        result = 1
    } else{
        result = -1
    }
    updateScore(result)
    return result
}

const displayResult = (playerChoice, opponentChoice) => {
    const result = getResult(playerChoice, opponentChoice)
    divPlayer.innerHTML = opt2symbol[playerChoice]
    divOpponent.innerHTML = opt2symbol[opponentChoice]

    divResult.style.display = 'block'; 
    divPlayer.removeAttribute("class")
    divOpponent.removeAttribute("class")

    if(result2Text[result] == 'win'){
        divPlayer.classList.add('winner')
        divOpponent.classList.add('loser')
    } else if(result2Text[result] == 'lose'){
        divOpponent.classList.add('winner')
        divPlayer.classList.add('loser')
    } else {
        divOpponent.classList.add('tie')
        divPlayer.classList.add('tie')        
    }
    updateMsg(result)
}

const updateScore = (score) => {
    curScore += score
    divScore.innerHTML = curScore
}

const updateMsg = (result) => {
    divResultMsg.removeAttribute("class")
    divResultMsg.classList.add(result2Text[result] + '-msg')
    divResultMsg.innerHTML = resultMsgs[result]
}

const resetScore = () => {
    curScore = 0
    divScore.innerHTML = curScore
    divResult.style.display = 'none'
}

document.querySelector('#btn-rock').addEventListener('click', () => submitChoice('rock'))
document.querySelector('#btn-paper').addEventListener('click', () => submitChoice('paper'))
document.querySelector('#btn-scissors').addEventListener('click', () => submitChoice('scissors'))
document.querySelector('#btn-lizard').addEventListener('click', () => submitChoice('lizard'))
document.querySelector('#btn-spock').addEventListener('click', () => submitChoice('spock'))
document.querySelector('#btn-random').addEventListener('click', () => submitChoice(getRandomChoice()))
