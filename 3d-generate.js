const BLACK = '#111'
const WHITE = '#FCFCFC'
const PURPLE = `rgb(165,24,201)`
const PINK = `#E62EA5`

const OUTLINE_WIDTH = 10
const OUTLINE_COLOR = BLACK

const RADIUS = 300
const ACTUAL_RADIUS = 4
const BOTTOM_POINT = yAt(30)

const SQUARE_SIZE = yAt(54) * RADIUS - OUTLINE_WIDTH * 2
const IRIS_SIZE = SQUARE_SIZE / 2 - OUTLINE_WIDTH /2
const PUPIL_SIZE = SQUARE_SIZE / 2 / 5 * 3  - OUTLINE_WIDTH / 2

console.log(`
<!DOCTYPE html>
<title>3D RangerMauve Logo</title>
<script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
<script src="//cdn.rawgit.com/donmccurdy/aframe-extras/v6.0.0/dist/aframe-extras.min.js"></script>
<a-scene>
  <a-camera position="0 0 4"></a-camera>
  <a-entity
    scale="${ACTUAL_RADIUS/RADIUS} ${ACTUAL_RADIUS/RADIUS} ${ACTUAL_RADIUS/RADIUS}"
    position="0 ${-ACTUAL_RADIUS/2} 0"
  >
    <a-circle radius="${RADIUS}"></a-circle>

    <a-entity position="${xAt(180) * RADIUS * BOTTOM_POINT + OUTLINE_WIDTH / 2 } ${yAt(180) * RADIUS * BOTTOM_POINT - (SQUARE_SIZE / 2)} 0">
      <a-entity position="${SQUARE_SIZE / 2} ${SQUARE_SIZE / 2} 0">
        <a-sphere
          color=${PURPLE}
          class="iris"
          radius="${IRIS_SIZE}"
          material="side: back"
          position="${IRIS_SIZE/2} ${IRIS_SIZE/2} 0"
        />
        <circle class="pupil" r="${PUPIL_SIZE}" />

        <circle class="reflection" r="${SQUARE_SIZE / 12}" ${centerPoint(-30, PUPIL_SIZE)} />
        <circle class="reflection" r="${SQUARE_SIZE / 12}" ${centerPoint(-30 + 180, PUPIL_SIZE)} />
      </a-entity>
      <rect class="outline" width="${SQUARE_SIZE}" height="${SQUARE_SIZE}" />
    </a-entity>

    ${makeDots(3, RADIUS / 4 * 3, 60)}
  </a-entity>
  <a-sky color="${PINK}"></a-sky>
</a-scene>
`)


function makeDots(n, scale, offset=0) {
  return makeCorners(n, offset).map((theta) => {
    return `<a-sphere color="${BLACK}" radius="${SQUARE_SIZE / 12}" ${centerPoint(theta, scale)} />`
  }).join('\n')
}

function makeCorners(n, offset=0) {
  const increment = 360 / n
  const corners = []
  for(let i = 0; i < n; i++) {
    corners.push(i*increment + offset)
  }

  return corners
}

function anglesToPath(angles, scale) {
  return angles.map((theta, index) => {
    const command = (index === 0) ? 'M' : 'L'
    return `${command} ${(xAt(theta) * scale).toFixed(2)} ${(yAt(theta) * scale).toFixed(2)}`
  }).join(' ')
}

function lineBetween(theta1, theta2, scale, className="outline") {
  return `<line class="${className}" ${linePoint(theta1, scale, 1)} ${linePoint(theta2, scale, 2)} />`
}

function linePoint(theta, scale=0, index="") {
  return `x${index}="${xAt(theta) * scale}" y${index}="${yAt(theta) * scale}"`
}

function centerPoint(theta, scale=0) {
  return `position="${xAt(theta) * scale} ${yAt(theta) * scale} 0"`
}

function xAt(theta) {
  return Math.cos(toRad(theta))
}

function yAt(theta) {
  return Math.sin(toRad(theta))
}

function toRad(theta) {
  return Math.PI / 180 * theta
}

function pointDistance(theta1, theta2, scale) {
  const x1 = xAt(theta1) * scale
  const y1 = yAt(theta1) * scale

  const x2 = xAt(theta2) * scale
  const y2 = yAt(theta2) * scale

  return distance(x1, y1, x2, y2)
}

function distance(x1, y1, x2, y2) {
  const x = Math.abs(x1 - x2)
  const y = Math.abs(y1 - y2)
  return Math.sqrt(x**2 + y**2)
}
