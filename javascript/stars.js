'use strict'

window.onload = () => {
  let starElement = document.getElementById('stars')
  let canvases = []
  let speeds = [2, 1.5, 1, 0.5, 0.25, 0.1]
  let layers = 3;

  createStars()

  let scrollUpdating = false

  window.addEventListener('scroll', (event) => {
    if (!scrollUpdating) {
      window.requestAnimationFrame(updateScroll)
    }

    scrollUpdating = false
  })

  function updateScroll() {
    scrollUpdating = true
    canvases.map((canvas) => canvas.updateScroll(window.scrollY))
  }

  window.addEventListener('resize', (event) => {
    starElement.innerHTML = ''
    createStars()
  })

  function createStars() {
    let size = starElement.offsetWidth * starElement.offsetHeight
    for (let i = 1; i <= layers; i++) { // higher the layer, farther back
      let numStars = (i + 1) * (size / 10000)
      let minOpacity = 0.25
      let opacity = ((1 - (i / layers)) * (1 - minOpacity) + minOpacity)
      let canvas = createStarCanvas(speeds[i - 1], numStars, opacity, starElement.offsetWidth, starElement.offsetHeight * clamp(speeds[i - 1], 1, 2))

      canvases.push(canvas)
      starElement.appendChild(canvas)
    }
  }
}

function clamp(value, low, high) {
  if (value < low) {
    return low
  }
  else if (value > high) {
    return high
  }
  else {
    return value
  }
}

function createStarCanvas(scrollSpeed, numStars, opacity, width, height) {
  console.log(arguments)

  let canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.className = 'star-canvas'
  canvas.setAttribute('data-scroll', scrollSpeed)

  let context = canvas.getContext('2d')
  // context.scale(2, 2)

  context.fillStyle = 'rgba(255, 255, 255, ' + opacity + ')'

  for (let i = 0; i < numStars; i++) {
    let x = Math.random() * canvas.width
    let y = Math.random() * canvas.height

    context.beginPath()
    drawCircle(x, y, Math.random() + 1, context)
    context.closePath()
    context.fill()
  }

  canvas.updateScroll = (scrollDistance) => {
    canvas.style.transform = 'translate3d(0px, ' + -scrollDistance * scrollSpeed + 'px, 0px)'
  }

  return canvas
}

function drawCircle(x, y, radius, context) {
  context.arc(x, y, radius, 0, 2 * Math.PI, true)
}
