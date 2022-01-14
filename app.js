const $startBtn = document.querySelector('#start')
const $sreens = document.querySelectorAll('.screen')

const $timeList = document.querySelector('#time-list')

const $timeEl = document.querySelector('#time')

const $board = document.querySelector('#board')
const colors = [
  'linear-gradient(90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%)',
  'linear-gradient(90deg, #165ee3 0%, #307bec 47%, #5246f7 100%)',
  'linear-gradient(90deg, #16e316 0%, #30ec49 47%, #46f7e8 100%)',
  'linear-gradient(90deg, #e38316 0%, #ecd030 47%, #f77846 100%)',
  'linear-gradient(90deg, #dc16e3 0%, #d630ec 47%, #f746b3 100%)'
]

let time = 0
let score = 0

$startBtn.addEventListener('click', event => {
  event.preventDefault()
  $sreens[0].classList.add('up')
})

$timeList.addEventListener('click', event => {
  // Делегирование событий
  if (event.target.classList.contains('time-btn')) {
    // получаем время
    time = +event.target.getAttribute('data-time')
    // Меняем экран
    $sreens[1].classList.add('up')
    // Начинаем игру
    startGame()
  }
})

$board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  // Вызываем функцию decreaseTime каждые 1000 ms
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  // $sreens[1].classList.add('up')
  // $timeEl.innerHTML = `00:${time}`
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let currentTime = --time
    if (currentTime < 10) {
      currentTime = `0${currentTime}`
    }
    //$timeEl.innerHTML = `00:${currentTime}`
    setTime(currentTime)
  }
}

function setTime(value) {
  $timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  $timeEl.parentNode.classList.add('hide')
  $board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  circle.classList.add('circle')
  circle.style.background = randomColorCircle()
  const { height, width } = $board.getBoundingClientRect()
  const size = getRandomNumber(10, 60)
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.style.width = circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`

  $board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

// рандомный цвет кружка

function randomColorCircle() {
  return colors[Math.floor(Math.random() * colors.length)]
}
