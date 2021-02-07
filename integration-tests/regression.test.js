const { getByText, fireEvent, waitFor } = require('@testing-library/dom')
const { startApp } = require('./test-app')

describe('Tram-One - regressions', () => {
	it('should not call cleanups that are not functions', async () => {
		// start the app
		const { container } = startApp()

		// previously this would fail because the cleanup was called,
		// even though it was not a function, and instead was a promise (the result of an async function)
		// the fix was to do the same check we do in other places, to make sure cleanup is a function
		expect(() => {
			// dismiss tab to trigger cleanup effect
			fireEvent.click(getByText(container, 'Dismiss'))
		}).not.toThrow()
	})

	it('should call updated cleanups', async () => {
		// start the app
		const { container } = startApp()

		// verify that the tab is rendered and the lock button is there
		expect(getByText(container, 'Was Locked: false')).toBeVisible()
		expect(getByText(container, 'Lock Tab')).toBeVisible()

		// wait for mutation observer to pick up new elements
		await waitFor(() => {})

		// dismiss tab to trigger cleanup effect
		fireEvent.click(getByText(container, 'Lock Tab'))

		// wait for mutation observer to pick up removed elements
		await waitFor(() => {})

		// verify that effect update was triggered
		expect(getByText(container, 'Was Locked: false')).toBeVisible()

		// dismiss tab to trigger cleanup effect
		fireEvent.click(getByText(container, 'Unlock Tab'))

		// wait for mutation observer to pick up removed elements
		await waitFor(() => {})

		// verify that effect update was triggered
		expect(getByText(container, 'Was Locked: true')).toBeVisible()
	})
})