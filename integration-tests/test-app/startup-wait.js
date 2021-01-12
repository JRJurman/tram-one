const { registerHtml, useObservable, useEffect } = require('../../src/tram-one')

const html = registerHtml()

module.exports = () => {
	let [initialWait] = useObservable({isDone: false})

	// after the element first renders, run effect to set isDone to true
	useEffect(() => {
		initialWait.isDone = true
	})

	return html`
		<p role="is-page-loading">
			The page is ${initialWait.isDone ? 'done' : 'loading'}.
		</p>
	`
}
