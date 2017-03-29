import shadow from '../shadow'

export default {
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'column',
    alignItems: 'center'
  },
  cover: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0
  },
  component: {
    backgroundColor:'white',
    ...shadow(2)
  }
}
