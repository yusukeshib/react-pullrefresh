import shadow from '../shadow'

export default {
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  component: {
    position: 'absolute',
    backgroundColor:'white',
    ...shadow(2)
  }
}
