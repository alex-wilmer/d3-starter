import * as d3 from 'd3'

let toClassName = key => key.split(` `).join(`-`)

export default ({
  clickHandler,
  data,
  selector,
  height,
  width,
  labelSize,
  offsetLeft = 0,
  offsetTop = 0,
} = {}) => {
  // Similar to a React target elemen
  let root = document.querySelector(selector)

  if (!root) throw `Must select an existing element!`

  width = width || root.clientWidth
  height = height || root.clientHeight
  labelSize = labelSize || `12px`

  let x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, 420]);

  let colorScale = d3.scaleOrdinal(d3.schemeCategory20)

  d3.select(selector)
    .selectAll(`svg`)
    .data(data)
    .enter()
    .append(`div`)
    .style(`width`, d => `${x(d)}px`)
    .style(`background-color`, (d, i) => colorScale(i))
    .text(d => d)
    .on(`click`, clickHandler)
}
