/* types */

/**
 * @typedef {{tag: string, component: function}} registry
 *
 * @description
 * Mapping of tag names to component functions.
 * The tag names can be capitalized (like React),
 * single words (like html), or hyphenated (like web-components).
 *
 * The component functions should be functions that return {Node}
 * objects (generated from html tagged template functions).
 *
 * @example
 * import { registerHtml } from 'tram-one'
 * import CustomHeader from './CustomHeader'
 * import CustomLogin from './CustomLogin'
 *
 * const html = registerHtml({
 *   CustomHeader,
 *   'custom-login': CustomLogin,
 * })
 *
 *
 * const page = () => {
 *   return html`
 *     <div>
 *       <CustomHeader />
 *       <custom-login />
 *     </div>
 *   `
 * }
 */

/**
 * @typedef {Function} component
 *
 *
 * @description
 * Function component that returns some Node. It has the same interface as standard DOM
 * in that it takes in props and children. They are written by users of the Tram-One Framework.
 *
 * @param {Object} [props] Attributes, properties, and event handlers.
 * These can be custom properties, or ones found in standard html components.
 *
 * @param {Node[]} [children] Components inside the start and close tag.
 * Tags by default can be self-closing, so you may have no children passed in.
 *
 * @returns {Node}
 *
 * @example <caption>FancyList.js</caption>
 * import { registerHtml } from 'tram-one'
 * const html = registerHtml()
 *
 * export default (props, children) => {
 *   const listStyle = `color: ${props.color}; font-size: 2em; border: black solid 2px;`
 *   const listClasses = `fancy-list ${props.className}`
 *   const onSelect = props.onclick
 *   return html`
 *     <ul class=${listClasses} style=${listSTyle} onclick=${onSelect}>
 *       ${children}
 *     </ul>
 *   `
 * }
 *
 * @example <caption>ShoppingList.js</caption>
 * import { registerHtml } from 'tram-one'
 * import FancyList from './FancyList'
 * const html = registerHtml({
 *   'fancy-list': FancyList
 * })
 *
 * export default () => {
 *   const onSelectFancyList = (event) => {
 *     console.log(event)
 *   }
 *   return html`
 *     <fancy-list class="shopping-lsit" onclick=${onSelectFancyList} color="blue">
 *       <li>pasta</li>
 *       <li>milk</li>
 *       <li>juice</li>
 *     </fancy-list>
 *   `
 * }
 */

/**
 * @typedef {Function} dom
 *
 * @description
 * Function generated by
 * {@link Tram-One#registerDom | registerDom},
 * {@link Tram-One#registerHtml | registerHtml}, and
 * {@link Tram-One#registerSvg | registerSvg}.
 * It takes in an XML template and returns a Node DOM Tree.
 * If a registry object was passed in when building the function, then tags that
 * are in the registry will be called and used.
 *
 * @param {String} template XML Template with standard and custom components
 *
 * @returns {Node} DOM Tree from XML Template
 *
 * @example
 * import { registerHtml } from 'tram-one'
 * const html = registerHtml()
 *
 *
 * const header = () => html`<h1>Learn about Tram-One!</h1>`
 */

/* methods */

/**
 * @name registerDom
 * @function
 * @memberof Tram-One
 * @instance
 *
 * @description
 * Function to generate a tagged template function for any namespace.
 * If you need to support a custom xml namespace, you can use this function.
 * This function is the generic interface for `registerHtml` and `registerSvg`,
 * when possible you should use those functions instead.
 *
 * @param {string} [namespace] URI of the namespace, can be undefined, which will build standard XHTML in browsers
 * @param {registry} [registry={}] map of tag names to functions, use this to use custom elements built in tram-one
 *
 * @return {dom} tagged template function that builds XML components
 *
 * @example
 * import { registerDom } from 'tram-one'
 * const xulNS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul'
 * const xul = registerDom(xulNS)
 *
 *
 * const xulComponent = () => {
 *   return xul`
 *     <window id="findfile-window" title="Find Files" orient="horizontal">
 *       <button id="find-button" label="Find"/>
 *       <button id="cancel-button" label="Cancel"/>
 *     </window>
 *   `
 * }
 */

/**
 * @name registerHtml
 * @function
 * @memberof Tram-One
 * @instance
 *
 * @description
 * Function to generate a tagged template function for XHTML / HTML.
 *
 * @param {registry} [registry={}] map of tag names to functions, use this to use custom elements built in tram-one
 *
 * @return {dom} tagged template function that builds HTML components
 *
 * @example
 * import { registerHtml } from 'tram-one'
 * import customHeader from './customHeader'
 * const html = registerHtml({
 *   'custom-header': customHeader
 * })
 *
 *
 * export default () => {
 *   return html`
 *     <div>
 *       <custom-header>Learn about Tram-One!</custom-header>
 *       <span>That header sure was neat</span>
 *     </div>
 *   `
 * }
 */

/**
 * @name registerSvg
 * @function
 * @memberof Tram-One
 * @instance
 *
 * @description
 * Function to generate a tagged template function for SVG.
 *
 * @param {registry} [registry={}] map of tag names to functions, use this to use custom elements built in tram-one
 *
 * @return {dom} tagged template function that builds SVG components
 *
 * @example
 * import { registerSvg } from 'tram-one'
 * import customHeader from './customHeader'
 * const svg = registerSvg()
 *
 *
 * export default () => {
 *   return svg`
 *     <svg viewBox="0 0 864 864">
 *       <g>
 *         <circle fill="#FDF491" cx="100" cy="100" r="20"/>
 *       </g>
 *     </svg>
 *   `
 * }
 */
