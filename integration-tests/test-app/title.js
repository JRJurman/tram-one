const { registerHtml } = require('../../src/tram-one')

const html = registerHtml()

module.exports = () => {
	return html`
		<h1>Home Page</h1>
	`
}
