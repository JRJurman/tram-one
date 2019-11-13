const {TRAM_HOOK_KEY, TRAM_REF_STORE} = require('../engine-names')
const {getEffectStore} = require('../effect-store')
const {getWorkingKeyValue, incrementWorkingKeyBranch} = require('../working-key')
const {assertGlobalSpaceAndEngine, assertIsFunction, assertIsArray} = require('../asserts')

/**
 * This file defines one function, useEffect, which is a hook that
 * that enables side-effects for tram-one components.
 *
 * This hook slightly mimics the react implementation, in that if you
 * pass in an array of values, and those differ from a previous call,
 * it will trigger the cleanup of the old effect and start a new one.
 *
 * @see https://tram-one.io/api/#Tram-One#useEffect
 */

module.exports = (globalSpace, storeName = TRAM_REF_STORE, workingKeyName = TRAM_HOOK_KEY) => {
	assertGlobalSpaceAndEngine(TRAM_REF_STORE, globalSpace, storeName)

	return value => {
		// get the store of effects
		const refStore = getEffectStore(globalSpace, storeName)

		// get the key value from working-key
		const key = getWorkingKeyValue(globalSpace, workingKeyName)

		// if there is no store, call start and cleanup
		if (!refStore || !key) return [value, () => {}]

		// increment the working key branch value
		// this makes successive useEffects calls unique (until we reset the key)
		incrementWorkingKeyBranch(globalSpace, workingKeyName)

		// saves value into the store if it doesn't exist in the refStore yet
		// const hasOwnProperty = Object.prototype.hasOwnProperty.call
		if (!Object.prototype.hasOwnProperty.call(refStore, key)) {
			refStore[key] = value
		}

		// generate getter for key
		const keyGetter = refStore[key]

		// generate setter for key
		const keySetter = newValue => { refStore[key] = newValue }

		// return getter and setter for the key
		return [keyGetter, keySetter]
	}
}
