'use strict';

window.onload = function () {
  var starElement = document.getElementById('stars');
  var canvases = [];
  var speeds = [1.5, 2, 1, 0.5, 0.25, 0.1];
  var layers = 3;

  createStars();

  var scrollUpdating = false;

  window.addEventListener('scroll', function (event) {
    if (!scrollUpdating) {
      window.requestAnimationFrame(updateScroll);
    }

    scrollUpdating = false;
  });

  function updateScroll() {
    scrollUpdating = true;
    canvases.map(function (canvas) {
      return canvas.updateScroll(window.scrollY);
    });
  }

  window.addEventListener('resize', function (event) {
    starElement.innerHTML = '';
    createStars();
  });

  function createStars() {
    var size = starElement.offsetWidth * starElement.offsetHeight;
    for (var i = 1; i <= layers; i++) {
      // higher the layer, farther back
      var numStars = (i + 1) * (size / 7500);
      var minOpacity = 0.5;
      var opacity = (1 - i / layers) * (1 - minOpacity) + minOpacity;
      var canvas = createStarCanvas(speeds[i - 1], numStars, opacity, starElement.offsetWidth, starElement.offsetHeight * speeds[i - 1]);

      canvases.push(canvas);
      starElement.appendChild(canvas);
    }
  }
};

function clamp(value, low, high) {
  if (value < low) {
    return low;
  } else if (value > high) {
    return high;
  } else {
    return value;
  }
}

function createStarCanvas(scrollSpeed, numStars, opacity, width, height) {
  // console.log(arguments)

  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.className = 'star-canvas';
  canvas.setAttribute('data-scroll', scrollSpeed);

  var context = canvas.getContext('2d');
  // context.scale(2, 2)

  context.fillStyle = 'rgba(255, 255, 255, ' + opacity + ')';

  for (var i = 0; i < numStars; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;

    context.beginPath();
    drawCircle(x, y, Math.random() + 0.5, context);
    context.closePath();
    context.fill();
  }

  canvas.updateScroll = function (scrollDistance) {
    canvas.style.transform = 'translate3d(0px, ' + -scrollDistance * scrollSpeed + 'px, 0px)';
    canvas.style['-webkit-transform'] = 'translate3d(0px, ' + -scrollDistance * scrollSpeed + 'px, 0px)';
    canvas.style['-moz-transform'] = 'translate3d(0px, ' + -scrollDistance * scrollSpeed + 'px, 0px)';
  };

  return canvas;
}

function drawCircle(x, y, radius, context) {
  context.arc(x, y, radius, 0, 2 * Math.PI, true);
}
