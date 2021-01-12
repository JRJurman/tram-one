const { registerHtml } = require('../../src/tram-one')

const svg = registerHtml()

module.exports = () => {
	return svg`
    <svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="4" role="logo">
        <title>Test SVG</title>
      </circle>
    </svg>
  `
}
