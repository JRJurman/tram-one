const { TRAM_HOOK_KEY, TRAM_STATE_ENGINE } = require('../engine-names')
const { get } = require('../namespace')
const { getWorkingKeyValue, incrementWorkingKeyBranch } = require('../working-key')
const { assertGlobalSpaceAndEngine } = require('../asserts')

/**
 * This file defines one function, useState, which is a hook that
 * that enables component state.
 *
 * This function has an identical interface to React's useState hook.
 *
 * Under the hood it uses Hover-Engine to save values and trigger re-renders.
 *
 * @see https://tram-one.io/api/#Tram-One#useState
 */

module.exports = (globalSpace, engineName = TRAM_STATE_ENGINE, workingKeyName = TRAM_HOOK_KEY) => {
	assertGlobalSpaceAndEngine(TRAM_STATE_ENGINE, globalSpace, engineName)

	return value => {
		// get a state engine
		const stateEngine = get(globalSpace, engineName)

		// get the key value from working-key
		const key = getWorkingKeyValue(globalSpace, workingKeyName)

		// if we couldn't get an engine or working key, just return whatever value we got
		if (!stateEngine || !key) return [value, () => {}]

		// increment the working key branch value
		// this makes successive useState calls unique (until we reset the key)
		incrementWorkingKeyBranch(globalSpace, workingKeyName)

		// save this value in our stateEngine if we haven't
		// check if we have the action (the store value could be falsy)
		if (!stateEngine.actions[`set${key}`]) {
			stateEngine.addActions({
				[key]: {
					init: () => value,
					[`set${key}`]: (oldValue, newValue) => newValue
				}
			})
		}

		// generate getter for key
		const keyGetter = stateEngine.store[key]

		// generate setter for key
		const keySetter = stateEngine.actions[`set${key}`]

		return [keyGetter, keySetter]
	}
}
