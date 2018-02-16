module.exports = (label, value) => `
<svg xmlns="http://www.w3.org/2000/svg" width="82" height="20">
  <linearGradient id="b" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="a">
    <rect width="82" height="20" rx="3" fill="#fff"/>
  </mask>
  <g mask="url(#a)">
    <path fill="#555" d="M0 0h33v20H0z"/>
    <path fill="#e05d44" d="M33 0h49v20H33z"/>
    <path fill="url(#b)" d="M0 0h82v20H0z"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
    <text x="16.5" y="15" fill="#010101" fill-opacity=".3">${label}</text>
    <text x="16.5" y="14">${label}</text>
    <text x="56.5" y="15" fill="#010101" fill-opacity=".3">${value}</text>
    <text x="56.5" y="14">${value}</text>
  </g>
</svg>
`
