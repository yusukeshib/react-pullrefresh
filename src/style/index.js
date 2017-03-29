import shadow from '../shadow'

export default {
  container: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
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
    bottom:0,
    touchAction:'none'
  },
  component: {
    backgroundColor:'white',
    userSelect:'none',
    ...shadow(2)
  }
}
