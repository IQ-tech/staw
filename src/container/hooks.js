import lifecycle from 'recompose/lifecycle'
import isClient from '../helpers/isClient'

const NOOP = () => {}

export default lifecycle({
  componentDidMount() {
    const { onMountAndResize, startAt = 0, setCurrentSlide } = this.props
    startAt && setCurrentSlide(startAt)
    if (isClient()) {
      onMountAndResize()
      window.addEventListener('resize', onMountAndResize)
    }
  },
  componentWillUnmount() {
    const { onMountAndResize } = this.props
    if (isClient())
       window.removeEventListener('resize', onMountAndResize)
  },
  componentDidUpdate(prevProps) {
    const { slidesPerView, onMountAndResize, currentSlide, onChange = NOOP } = this.props
    if (prevProps.slidesPerView !== slidesPerView) onMountAndResize()
    if (prevProps.currentSlide !== currentSlide) onChange(currentSlide)
  }
})
