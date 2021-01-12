const { getByTitle, getByTestId, getByRole, fireEvent, waitFor } = require('@testing-library/dom')
const { start, registerHtml } = require('../src/tram-one')

const { app } = require('./test-app/index')
const { frozenCounter, globalCounter, graphic, home, loadingPage, loading, removablePage, updatablePage, updatable, urlLabel } = require('./mock-components')

const startApp = (container) => {
	if (container === undefined) {
		container = document.createElement('div')
		container.id = 'app'
	}

	start(app, container)

	return {
		container
	}
}

describe('Tram-One', () => {
	it('should render on a Node', () => {
		// mount the app on the container
		const container = document.createElement('div')
		startApp(container)

		// verify that the home page is rendered
		expect(container).toHaveTextContent('Test Page Content')
	})

	it('should render on the window with a selector', () => {
		// create and attach an element to the window
		const appContainer = document.createElement('div')
		appContainer.id = 'app'
		window.document.body.appendChild(appContainer)

		// start the app using a css selector
		startApp('#app')

		// verify that the home page is rendered
		expect(appContainer).toHaveTextContent('Test Page Content')

		// cleanup - remove app
		appContainer.remove()
	})

	it('should warn if selector is not found', () => {
		const originalError = console.error
		console.error = jest.fn()
		startApp('#app')

		// verify that the console warning occured
		expect(console.error).toHaveBeenCalledWith('Tram-One: could not find target, is the element on the page yet?')

		// cleanup - reset console.error
		console.error = originalError
	})

	it('should render html from registry', () => {
		// start the app
		const { container } = startApp()

		// verify that the home page is rendered with a registered component
		expect(getByRole(container, 'heading')).toHaveTextContent('Home Page')
	})

	it('should render svg graphics', () => {
		// start the app
		const { container } = startApp()

		// verify a basic svg is rendered
		expect(getByRole(container, 'logo')).toHaveTextContent('Test SVG')
	})

	it('should update components on observer updates', () => {
		// start the app
		const { container } = startApp()

		// verify the button exists with the default value
		expect(getByRole(container, 'button')).toHaveTextContent('Total Clicks: 0')

		// click on the button
		fireEvent.click(getByRole(container, 'button'))

		// verify the button updated with the new value
		expect(getByRole(container, 'button')).toHaveTextContent('Total Clicks: 1')
	})

	it('should process effects on mount', async () => {
		// start the app
		const { container } = startApp()

		// verify that it has the loading text
		expect(getByRole(container, 'is-page-loading')).toHaveTextContent('The page is loading.')

		// wait for mutation observer to pick up new elements
		await waitFor(() => {})

		// verify that it (eventually) has the finished text
		expect(getByRole(container, 'is-page-loading')).toHaveTextContent('The page is done.')
	})

	// it('should process cleanup effects', async () => {
	// 	// mount the app on the container
	// 	const container = document.createElement('div')
	// 	start(container, removablePage)

	// 	// verify that the home page is rendered and the removable element is there
	// 	expect(getByTestId(container, 'home-page')).toHaveTextContent('Remove not triggered')
	// 	expect(getByTestId(container, 'removable-element')).toHaveTextContent('Removable')

	// 	// wait for mutation observer to pick up new elements
	// 	await waitFor(() => {})

	// 	// trigger removal
	// 	fireEvent.click(getByTestId(container, 'hide-removable'))

	// 	// wait for mutation observer to pick up removed elements
	// 	await waitFor(() => {})

	// 	// verify that the element was removed
	// 	expect(getByTestId(container, 'home-page')).toHaveTextContent('Remove was triggered')
	// })

	// it('should process nested component effects', async () => {
	// 	// mount the app on the container
	// 	const container = document.createElement('div')
	// 	start(container, loadingPage)

	// 	// verify the home page is there, and we haven't loaded or fetched
	// 	expect(getByTestId(container, 'home-page')).toHaveTextContent('Fetching...')
	// 	expect(getByTestId(container, 'loader')).toHaveTextContent('loading...')

	// 	// wait for mutation observer to pick up new elements
	// 	await waitFor(() => {})

	// 	// verify both elements were updated
	// 	expect(getByTestId(container, 'home-page')).toHaveTextContent('Finished Fetching!')
	// 	expect(getByTestId(container, 'loader')).toHaveTextContent('Finished loading!')
	// })

	// it('should share state in a global store', async () => {
	// 	// mount the app on the container
	// 	const container = document.createElement('div')
	// 	const homeWithGlobalCounters = () => {
	// 		return html`
	// 			<home>
	// 				<globalCounter testId="global-counter-0" />
	// 				<globalCounter testId="global-counter-1" />
	// 			</home>
	// 		`
	// 	}

	// 	start(container, homeWithGlobalCounters)

	// 	// verify the home page is there with 2 couters at 0
	// 	expect(getByTestId(container, 'global-counter-0')).toHaveTextContent('0')
	// 	expect(getByTestId(container, 'global-counter-1')).toHaveTextContent('0')

	// 	// increment one of the global counters
	// 	fireEvent.click(getByTestId(container, 'global-counter-0'))

	// 	// verify both counters updated
	// 	expect(getByTestId(container, 'global-counter-0')).toHaveTextContent('1')
	// 	expect(getByTestId(container, 'global-counter-1')).toHaveTextContent('1')
	// })

	// it('should re-render components dependent on url params', () => {
	// 	// mount the app on the container
	// 	const container = document.createElement('div')
	// 	const homeWithColorLabel = () => {
	// 		return html`
	// 			<home>
	// 				<urlLabel />
	// 			</home>
	// 		`
	// 	}

	// 	start(container, homeWithColorLabel)

	// 	// verify the color label appears on the page
	// 	expect(getByTestId(container, 'color-label')).toBeTruthy()

	// 	// set the url to /blue
	// 	window.history.pushState({}, '', '/color/blue')

	// 	// verify the color label appears with the property
	// 	expect(getByTestId(container, 'color-label')).toHaveTextContent('blue')

	// 	// change the url to be /red
	// 	window.history.pushState({}, '', '/color/red')

	// 	// verify the color label is updated
	// 	expect(getByTestId(container, 'color-label')).toHaveTextContent('red')

	// 	// set the url to a non-matching route
	// 	window.history.pushState({}, '', '/test')

	// 	// verify the color label is blank
	// 	expect(getByTestId(container, 'color-label')).toHaveTextContent('')
	// })

	// it('should call effects on remount', async () => {
	// 	// mount the app on the container
	// 	const container = document.createElement('div')
	// 	start(container, updatablePage)

	// 	// verify the page is mounted with default values
	// 	expect(getByTestId(container, 'updatable-button')).toHaveTextContent('5')

	// 	// let effects process
	// 	await waitFor(() => {})

	// 	// verify the title is the default value
	// 	expect(document.title).toBe('The count is 5')

	// 	// click on the top level button (that updates the props)
	// 	fireEvent.click(getByTestId(container, 'increment-count'))

	// 	// let effects process
	// 	await waitFor(() => {})

	// 	// verify the page and title updated
	// 	expect(getByTestId(container, 'updatable-button')).toHaveTextContent('6')
	// 	expect(document.title).toBe('The count is 6')

	// 	// click on the inner component (that updates the component's state)
	// 	fireEvent.click(getByTestId(container, 'updatable-button'))

	// 	// let effects process
	// 	await waitFor(() => {})

	// 	// verify the page and title updated
	// 	expect(getByTestId(container, 'updatable-button')).toHaveTextContent('7')
	// 	expect(document.title).toBe('The count is 7')
	// })

	// it('should call updated cleanups', async () => {
	// 	// mount the app on the container
	// 	const container = document.createElement('div')
	// 	start(container, updatablePage)

	// 	// verify the page is mounted with default values
	// 	expect(getByTestId(container, 'updatable-button')).toHaveTextContent('5')

	// 	// let effects process
	// 	await waitFor(() => {})

	// 	// verify the title is the default value
	// 	expect(document.title).toBe('The count is 5')

	// 	// click on the inner component (that updates the component's state)
	// 	fireEvent.click(getByTestId(container, 'updatable-button'))

	// 	// let effects process
	// 	await waitFor(() => {})

	// 	// verify the page and title updated
	// 	expect(getByTestId(container, 'updatable-button')).toHaveTextContent('6')
	// 	expect(document.title).toBe('The count is 6')

	// 	// click on the remove button to trigger cleanup
	// 	fireEvent.click(getByTestId(container, 'remove-count'))

	// 	// let effects process
	// 	await waitFor(() => {})

	// 	// verify the page and title updated
	// 	expect(getByTestId(container, 'home-page')).toHaveTextContent('Counter Removed')
	// 	expect(document.title).toBe('The count was 6')
	// })

	// it('should render a page with a pre-configured global', () => {
	// 	global.tramSpace = {}

	// 	// mount the app on the container
	// 	const container = document.createElement('div')
	// 	start(container, updatablePage)

	// 	// verify that the home page is rendered
	// 	expect(getByTestId(container, 'home-page')).toHaveTextContent('Home Page')

	// 	// verify that the global tramSpace was used
	// 	const keys = Object.keys(global.tramSpace)
	// 	expect(keys.length).toBeGreaterThan(0)
	// })

	// it('should not trigger side-effects of raw objects', () => {
	// 	// mount the app on the container
	// 	const container = document.createElement('div')
	// 	start(container, frozenCounter)

	// 	// verify that the button is rendered with the default text
	// 	expect(getByRole(container, 'button')).toHaveTextContent('clicks: 0')
	// 	// click on the click button to trigger update
	// 	fireEvent.click(getByRole(container, 'button'))

	// 	// verify that the button was not updated
	// 	expect(getByRole(container, 'button')).toHaveTextContent('clicks: 0')
	// })
})
