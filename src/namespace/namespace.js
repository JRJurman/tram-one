const { assertGlobalSpaceAndEngine, assertIsFunction } = require('../asserts')

const setup = (constructor) => {
  assertIsFunction(constructor, 'constructor')
  return (globalSpace, namespace) => {
    assertGlobalSpaceAndEngine('namespace', globalSpace, namespace)

    // we do not have a space to put our object
    if (!globalSpace) return false

    // if one already exists, return existing one
    if (globalSpace[namespace]) return globalSpace[namespace]

    globalSpace[namespace] = constructor()
    return globalSpace[namespace]
  }
}

const get = (globalSpace, namespace) => {
  assertGlobalSpaceAndEngine('namespace', globalSpace, namespace)
  return globalSpace && globalSpace[namespace]
}

module.exports = { setup, get }
