const start = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeElement = document.querySelector('#time')
const board = document.querySelector('#board')

const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399']

let time = 0
let score = 0

const beforeStart = (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
}

const chooseTime = (event) => {
    const element = event.target

    if (element.classList.contains('time-btn')) {
        time = parseInt(element.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
}

const startGame = () => {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

const decreaseTime = () => {
    if (time === 0) {
        finishGame()
    } else {
        let currentTime = --time

        if (currentTime < 10) {
            currentTime = `0${currentTime}`
        }

        setTime(currentTime)
    }
}

const setTime = (timeValue) => {
    timeElement.innerHTML = `00:${timeValue}`
}

const finishGame = () => {
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`
    time.parentNode.classList.add('hide')
}

const createRandomCircle = () => {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const { width, height } = board.getBoundingClientRect()

    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.background = getRandomColor()
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`

    board.append(circle)
}

const getRandomColor = () => {
    const index = Math.floor(Math.random() * colors.length)

    return colors[index]
}

const getRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const circleClick = (event) => {
    const element = event.target

    if (element.classList.contains('circle')) {
        score++
        element.remove()
        createRandomCircle()
    }
}

start.addEventListener('click', beforeStart)
timeList.addEventListener('click', chooseTime)
board.addEventListener('click', circleClick)
