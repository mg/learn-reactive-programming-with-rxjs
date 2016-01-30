// Not used 

import Rx from 'rx'
import { DOM } from 'rx-dom'

const identity= Rx.helpers.identity

export default function(element) {
  const over= DOM.mouseover(element).map(identity(true))
  const out= DOM.mouseout(element).map(identity(false))

  return over.merge(out)
}
