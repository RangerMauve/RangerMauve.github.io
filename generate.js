const BLACK = '#111'
const WHITE = '#FCFCFC'
const PURPLE = `rgb(165, 24, 201)`
const PINK = `#E62EA5`

const OUTLINE_WIDTH = 10
const OUTLINE_COLOR = BLACK

const RADIUS = 300
const BOTTOM_POINT = yAt(30)

const SQUARE_SIZE = yAt(54) * RADIUS - OUTLINE_WIDTH * 2
const IRIS_SIZE = SQUARE_SIZE / 2 - OUTLINE_WIDTH /2
const PUPIL_SIZE = SQUARE_SIZE / 2 / 5 * 3  - OUTLINE_WIDTH / 2

console.log(`
<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 666 666" width="666" height="666">
	<style>
    .outline {
      stroke: ${OUTLINE_COLOR};
      stroke-width: ${OUTLINE_WIDTH};
      fill: none;
    }

    .border {
      fill: ${WHITE};
    }

    .sclera {
      fill: ${WHITE};
      stroke: ${BLACK};
      stroke-width: ${OUTLINE_WIDTH};
    }

    .aperture {
      fill: ${PURPLE};
    }

    .iris {
      fill: ${PURPLE};
      stroke: ${BLACK};
      stroke-width: ${OUTLINE_WIDTH};
    }

    .reflection {
      fill: ${WHITE};
    }

    .pupil {
      fill: ${BLACK};
    }

    .slash {
      stroke: ${OUTLINE_COLOR};
      stroke-width: ${OUTLINE_WIDTH};
    }
	</style>
  <g transform="rotate(-90, 333 333) translate(333, 333)">
    <g transform="translate(${xAt(180) * RADIUS * BOTTOM_POINT + OUTLINE_WIDTH / 2 } ${yAt(180) * RADIUS * BOTTOM_POINT - (SQUARE_SIZE / 2)})">
      <g transform="translate(${SQUARE_SIZE / 2} ${SQUARE_SIZE / 2})">
        <circle class="iris" r="${IRIS_SIZE}"/>
        <circle class="pupil" r="${PUPIL_SIZE}" />

        <circle class="reflection" r="${SQUARE_SIZE / 12}" ${centerPoint(-30, PUPIL_SIZE)} />
        <circle class="reflection" r="${SQUARE_SIZE / 12}" ${centerPoint(-30 + 180, PUPIL_SIZE)} />
      </g>
      <rect class="outline" width="${SQUARE_SIZE}" height="${SQUARE_SIZE}" />
    </g>

    ${makeDots(3, RADIUS / 4 * 3, 60)}

    <path class="outline" d="${anglesToPath([0, 120, 240], RADIUS - OUTLINE_WIDTH)} Z" stroke-linecap="round" />

    <!-- <line class="slash" x1="0" y1="-${RADIUS}" x2="0" y2="${RADIUS}" /> -->
  </g>
</svg>
`)

function makeDots(n, scale, offset=0) {
  return makeCorners(n, offset).map((theta) => {
    return `<circle class="pupil" r="${SQUARE_SIZE / 12}" ${centerPoint(theta, scale)} />`
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
