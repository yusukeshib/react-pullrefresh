import shadow from '../shadow'

export default {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  component: {
    position: 'absolute',
    backgroundColor:'white',
    userSelect:'none',
    boxSizing: 'border-box',
    ...shadow(2)
  }
}
