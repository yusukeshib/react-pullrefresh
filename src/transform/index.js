const validate = (v, key) => {
  if(key.match(/^translate[XY]{0,1}$/)) return `${v}px`
  return v
}
export default params => {
  const ret = params.map(param => {
    const key = Object.keys(param)[0]
    const value = validate(param[key], key)
    return `${key}(${value})`
  }).join(' ')
  return ret
}
