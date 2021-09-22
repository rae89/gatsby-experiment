export default function Sketch(p5) {
  let num = 20000
  let range = 60

  let ax = []
  let ay = []

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    for (let i = 0; i < num; i++) {
      ax[i] = p5.width / 2
      ay[i] = p5.height / 2
    }
    p5.frameRate(1000000)
  }

  p5.draw = () => {
    p5.background(161, 184, 161)

    // Shift all elements 1 place to the left
    for (let i = 1; i < num; i++) {
      ax[i - 1] = ax[i]
      ay[i - 1] = ay[i]
    }

    // Put a new value at the end of the array
    ax[num - 1] += p5.random(-range, range)
    ay[num - 1] += p5.random(-range, range)

    // Constrain all points to the screen
    ax[num - 1] = p5.constrain(ax[num - 1], 0, p5.width)
    ay[num - 1] = p5.constrain(ay[num - 1], 0, p5.height)

    // Draw a line connecting the points
    for (let j = 1; j < num; j++) {
      let val = (j / num) * 204.0 + 51
      //stroke(val);
      p5.stroke(255, 204, 0)
      p5.strokeWeight(8)
      p5.line(ax[j - 1], ay[j - 1], ax[j], ay[j])
    }
  }

  p5.mousePressed = () => {
    p5.remove()
  }
}
