window.onload = () => {
  let starElement = document.getElementById('stars')
  let canvases = []
  let speeds = [1, 0.5, 0.25, 0.1, 0]

  for (let i = 1; i <= 5; i++) {
    let canvas = createStarCanvas(speeds[i], (5 - i) * 100, starElement.offsetWidth, starElement.offsetHeight)

    canvases.push(canvas)
    starElement.appendChild(canvas)
  }

  window.addEventListener('scroll', function(event) {
    canvases.map((canvas) => canvas.updateScroll(window.scrollY))
  })

}

function createStarCanvas(scrollSpeed, numStars, width, height) {
  let canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.className = 'star-canvas'

  let context = canvas.getContext('2d')

  context.fillStyle = 'rgba(0, 0, 0, 0.25)'
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = 'white'

  for (let i = 0; i < numStars; i++) {
    let x = Math.random() * canvas.width
    let y = Math.random() * canvas.height

    context.beginPath()
    drawCircle(x, y, 1, context)
    context.closePath()
    context.fill()
  }

  canvas.updateScroll = (scrollDistance) => {
    canvas.style.top = scrollDistance * scrollSpeed + 'px'
  }

  return canvas
}

function drawCircle(x, y, radius, context) {
  context.arc(x, y, radius, 0, 2 * Math.PI, true)
}
