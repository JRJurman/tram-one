const ensureObject = require('type/object/ensure')
const { raw } = require('@nx-js/observer-util')

const { TRAM_OBSERVABLE_STORE, TRAM_HOOK_KEY } = require('./engine-names')
const { getObservableStore } = require('./observable-store')
const { getWorkingKeyValue, incrementWorkingKeyBranch } = require('./working-key')

/**
 * @private
 * @description
 * Source code for both observable hooks, useObservable, and useGlobalObservable.
 * This hook exposes a globally stored value (in either case), that can cause the component
 * to update when that value (or a subfield of that value) is updated.
 *
 * It has a similar interface to React's useState
 */
module.exports = (key, value) => {
	// values must be objects
	ensureObject(value, { errorMessage: `Tram-One: value should be an object, recieved ${typeof value}, ${value}` })

	// get the store of effects
	const observableStore = getObservableStore(TRAM_OBSERVABLE_STORE)

	// increment the working key branch value
	// this makes successive useEffects calls unique (until we reset the key)
	incrementWorkingKeyBranch(TRAM_HOOK_KEY)

	// if a key was passed in, use that, otherwise, generate a key
	const resolvedKey = key || getWorkingKeyValue(TRAM_HOOK_KEY)

	// saves value into the store if it doesn't exist in the observableStore yet
	// and if the value we are writing is defined
	if (!Object.prototype.hasOwnProperty.call(observableStore, resolvedKey) && value !== undefined) {
		observableStore[resolvedKey] = value
	}

	// get value for key
	const keyValue = observableStore[resolvedKey]

	// generate the raw value, in the rare case that this is required
	const rawValue = raw(keyValue)

	// return value, and raw value for the key
	return [keyValue, rawValue]
}
