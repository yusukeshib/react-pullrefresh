import shadow from './shadow'

export default {
  container: {
    width: '100%',
    position: 'fixed',
    display: 'flex',
    left: 0,
    justifyContent: 'center'
  },
  cover: {
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    userSelect:'none'
  },
  component: {
    background:'white',
    userSelect:'none',
    ...shadow(2)
  }
}
