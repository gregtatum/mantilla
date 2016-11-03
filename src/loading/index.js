const COUNT = 30
const TRANSITION_SPEED = 400

function repeat(fn) {
  const results = []
  for(let i=0; i < COUNT; i++) {
    results.push(fn(i))
  }
  return results
}

function addStyleSheet (text) {
  const style = document.createElement('style')
  style.innerHTML = text
  document.body.appendChild(style)
}

function createDomNodes() {
  const container = document.createElement('div')
        container.className = 'loading'
        document.body.appendChild(container)

  repeat(() => {
    const div = document.createElement('div')
    container.appendChild(div)
  })
}

function createStyle () {
  addStyleSheet(`
    .loading {
      display: flex;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      align-items: center;
      background-color: #333;
      transition: opacity ${TRANSITION_SPEED}ms;
      opacity: 1;
      z-index: 3;
    }
    .loading.loaded {
      opacity: 0;
      pointer-events: none;
    }

    .loading div {
      width: 10px;
      height: 100px;
      margin: 0 3px;
      animation-duration: 1s;
      animation-name: slidein;
      animation-iteration-count: infinite;
      background-color: hsl(150, 50%, 50%);
    }

    ${repeat(i => `
      .loading div:nth-child(${i + 1}) {
          animation-delay: ${i * 0.1}s;
        filter: hue-rotate(${i * 8}deg);
        width: ${Math.sin(Math.PI * i / COUNT) * 10}px;
        opacity: ${Math.sin(Math.PI * i / COUNT) * 0.5 + 0.5};
      }
    `).join("\n")}

    @keyframes slidein {
      0% {
        transform: scaleY(1);
        animation-timing-function: ease-in-out;
      }

      20% {
        transform: scaleY(0.5) rotate(10deg);
        animation-timing-function: cubic-bezier(0.4, 0, 0, 1);
      }

      100% {
        transform: scaleY(1);
        animation-timing-function: ease-in-out;
      }
    }
  `)
}

module.exports = function createLoaderScreen() {
  const container = createDomNodes()
  createStyle()

  return () => {
    container.className += " loaded"
    setTimeout(() => container.remove(), TRANSITION_SPEED)
  }
}
