const { start, registerHtml } = require('../../src/tram-one')

const html = registerHtml({
	'title': require('./title'),
	'logo': require('./logo'),
	'click-tracker': require('./click-tracker'),
	'startup-wait': require('./startup-wait')
})

const app = () => {
	return html`
		<main>
			<title />
			<logo />
			<p>Test Page Content</p>
			<click-tracker />
			<startup-wait />
		</main>
	`
}

module.exports = {
	app,
}
