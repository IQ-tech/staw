import compose from 'recompose/compose'
import withState from 'recompose/withState'

export default compose(
	withState('currentSlide', 'setCurrentSlide', 0),
	withState('containerWidth', 'setContainerWidth', 0),
	withState('itemWidth', 'setItemWidth', 0),
	withState('slideItems', 'setSlideItems', []),
	withState('stawId', 'setStawId', () => `staw-${Date.now()}`)
)
