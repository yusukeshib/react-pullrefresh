export default function(v) {
  return {
    shadowRadius: v * 2,
    shadowOffset: { width: 0, height: v },
    shadowOpacity: 0.3,
    shadowColor: 'black'
  }
}
