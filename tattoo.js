const BLACK = '#111'
const WHITE = '#FCFCFC'
const PURPLE = `rgb(165, 24, 201)`
const PINK = `#E62EA5`

const CANVAS_SIZE = 666
const RADIUS = 300
const OUTLINE_WIDTH = RADIUS / 32;

console.log(`
<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}" width="${CANVAS_SIZE}" height="${CANVAS_SIZE}">
  <style>
		.outline {
			fill: ${WHITE};
			stroke: ${BLACK};
		}

		.inner-circle {
			fill: none;
			stroke: ${BLACK};
			stroke-width: ${OUTLINE_WIDTH};
		}

		.bigs, .container {
			fill: none;
			stroke: ${BLACK};
			stroke-width: ${OUTLINE_WIDTH};
		}

		.smalls {
			fill: ${PURPLE};
			stroke: ${BLACK};
			stroke-width: ${OUTLINE_WIDTH};
		}

		.inner-shape,	.inner-blip {
			fill: ${PURPLE};
			stroke: ${BLACK};
			stroke-width: ${OUTLINE_WIDTH};
		}
  </style>
  <g transform="rotate(-90, ${CANVAS_SIZE/2}, ${CANVAS_SIZE/2}) translate(${CANVAS_SIZE/2}, ${CANVAS_SIZE/2})">
		<!-- TODO: Remove me -->
    <circle class="outline" r="${RADIUS}" />

    <!-- <path class="inner-shape" d="${anglesToPath([0, 180, 180 + 45, 180 + 90, 180 + 90 + 45], RADIUS / 2)} Z" stroke-linecap="round"/> -->

		<circle class="inner-blip" r="${RADIUS/8}" ${centerPoint(270, RADIUS / 8)} />
		<circle class="inner-blip" r="${RADIUS/8}" ${centerPoint(270, RADIUS - RADIUS / 4 - RADIUS / 8)} />
		<circle class="inner-blip" r="${RADIUS/8}" ${centerPoint(90, RADIUS / 2)} />
		<circle class="inner-blip" r="${RADIUS/16}" ${centerPoint(90, RADIUS / 2 + RADIUS / 8 + RADIUS / 16)} />

    <!-- ${makeDots(4, RADIUS - (RADIUS / 4), 0, RADIUS / 4, 'bigs')} -->
    <!--<circle class="inner-circle" r="${RADIUS - (RADIUS/4)}" />-->

    <path class="container" d="${anglesToPath([0, 90, 180, 270], RADIUS)} Z" stroke-linecap="round"/>

    ${makeDots(16, RADIUS - (RADIUS / 16), 45, RADIUS / 16, 'smalls')}
  </g>
</svg>
`)

function makeDots(n, scale, offset=0, r, className="") {
  return makeCorners(n, offset).map((theta) => {
    return `<circle class="${className}" r="${r}" ${centerPoint(theta, scale)} />`
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
  return `cx="${xAt(theta) * scale}" cy="${yAt(theta) * scale}"`

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
