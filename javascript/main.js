window.onload = () => {

  let starElement = document.getElementById('stars')

  for (let i = 0; i < 4; i++) {
    starElement.appendChild(createStarCanvas())
  }

}

function createStarCanvas(scrollSpeed) {
  let canvas = document.createElement('canvas')
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight
  canvas.className = 'stars'

  let context = canvas.getContext('2d')

  context.fillStyle = 'rgba(0, 0, 0, 0.4)'
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = 'white'

  for (let i = 0; i < 100; i++) {
    let x = Math.random() * canvas.width
    let y = Math.random() * canvas.height

    context.beginPath()
    drawCircle(x, y, 1, context)
    context.closePath()
    context.fill()
  }

  return canvas
}

function drawCircle(x, y, radius, context) {
  context.arc(x, y, radius, 0, 2 * Math.PI, true)
}
