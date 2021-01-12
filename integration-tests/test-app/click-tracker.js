const { registerHtml, useObservable } = require('../../src/tram-one')

const html = registerHtml()

module.exports = () => {
	let [totalClicks] = useObservable({clicks: 0})
	const incrementClicks = () => totalClicks.clicks++
	return html`
		<button onclick=${incrementClicks}>Total Clicks: ${totalClicks.clicks}</button>
	`
}
