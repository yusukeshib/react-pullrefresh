import { findDOMNode } from 'react-dom'

export default component => {
  const node = findDOMNode(component)
  return node.scrollTop
}
