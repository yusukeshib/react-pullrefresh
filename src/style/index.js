import shadow from '../shadow'

export default {
  component: {
    position: 'absolute',
    backgroundColor:'white',
    userSelect:'none',
    boxSizing: 'border-box',
    ...shadow(2)
  }
}
