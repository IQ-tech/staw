import compose from 'recompose/compose'
import state from './state'
import handlers from './handlers'
import hooks from './hooks'
import propsMapper from './propsMapper'

export default compose(
  state,
  handlers,
  hooks,
  propsMapper
)
