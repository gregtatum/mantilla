const COUNT = 30
const TRANSITION_SPEED = 1500

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
  container.innerHTML = '<div></div>'
  document.body.appendChild(container)

  const errorDiv = document.createElement('div')
  errorDiv.className = 'error-container'
  errorDiv.innerHTML = '<p></p>'
  document.body.appendChild(errorDiv)

  repeat(() => {
    const div = document.createElement('div')
    container.children[0].appendChild(div)
  })

  return container
}

window.globalLoaderError = error => {
  console.error(error)

  const errorContainer = document.querySelector('.error-container')
  const errorP = document.querySelector('.error-container p')
  const loaderContainer = document.querySelector('.loading')
  errorP.innerText = "Uh oh, looks like there was some kind of error loading the page. " +
    (typeof error === "string" ? error : "")

  errorContainer.style.visibility = "visible"
  setTimeout(() => errorContainer.style.opacity = 1, 1)
  loaderContainer.className += " error"
}

function createStyle () {
  addStyleSheet(`
    .error-container {
      opacity: 0;
      visibility: hidden;
      transition: opacity ${TRANSITION_SPEED}ms;
      display: flex;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      align-items: center;
      color: #fff;
      z-index: 1001;
      text-align: center;
      margin: 12.5%;
      line-height: 1.5;
    }

    .loading.error > div {
      opacity: 0;
    }

    .loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      opacity: 1;
      background-color: hsl(7, 51%, 51%);
      transition: opacity ${TRANSITION_SPEED}ms;
    }

    .loading > div {
      display: flex;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      align-items: center;
      transition: opacity ${TRANSITION_SPEED}ms;
    }

    .loading.loaded {
      opacity: 0;
      pointer-events: none;
    }

    .loading > div > div {
      width: ${75 / COUNT}%;
      height: 100px;
      margin: 0 3px;
      animation-duration: 1s;
      animation-name: slidein;
      animation-iteration-count: infinite;
      background-color: hsl(300, 50%, 100%);
      opacity: 0;
    }

    ${repeat(i => `
      .loading > div > div:nth-child(${i + 1}) {
        animation-delay: ${i * 0.1 - 0.1 * COUNT}s;
        filter: hue-rotate(${i * 6}deg);
        width: ${Math.sin(Math.PI * i / COUNT) * 75 / COUNT}%;
      }
    `).join("\n")}

    @keyframes slidein {
      0% {
        opacity: 0;
        transform: scaleY(1);
        animation-timing-function: ease-in-out;
      }

      20% {
        opacity: 1;
        transform: scaleY(0.5) rotate(10deg);
        animation-timing-function: cubic-bezier(0.4, 0, 0, 1);
      }

      100% {
        opacity: 0;
        transform: scaleY(1);
        animation-timing-function: ease-in-out;
      }
    }
  `)
}

;(function createLoader() {
  const container = createDomNodes()
  createStyle()

  window.globalHideLoader = () => {
    container.className += " loaded"
    setTimeout(() => container.remove(), TRANSITION_SPEED)
  }
})()
