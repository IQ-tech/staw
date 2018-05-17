import { compose, lifecycle, withHandlers, withState, withProps } from 'recompose'

const getPosition = (currentSlide, itemWidth, visibleGutter = 0, children) => {
	let position = currentSlide !== 0 ? (itemWidth * currentSlide) - (visibleGutter / 2) : 0
	if (currentSlide > 1) {
		position += (visibleGutter / 2) * (currentSlide - 1)
		if (currentSlide === children.length - 1)
			position -= visibleGutter
	}
	return position
}

const stawContainer = compose(
	withState('currentSlide', 'setCurrentSlide', 0),
	withState('containerWidth', 'setContainerWidth', 0),
	withState('itemWidth', 'setItemWidth', 0),
	withState('slideInterval', 'setSlideInterval', 0),
	withState('slideTimeout', 'setSlideTimeout', 0),
	withState('stawId', 'setStawId', () => `staw-${Date.now()}`),
	withHandlers({
		next: ({ children, currentSlide, setCurrentSlide, transitionDuration }) => () => {
			if (currentSlide < children.length - 1) {
				setCurrentSlide(currentSlide + 1)
			}
		},
		prev: ({ currentSlide, setCurrentSlide }) => () => {
			// !== 0
			if (currentSlide) {
				setCurrentSlide(currentSlide - 1)
			}
		},
		onMountAndResize: ({ stawId, children, setContainerWidth, setItemWidth, visibleGutter = 0 }) => () => {
			const newOffsetWidth = document.getElementById(stawId).offsetWidth
			const newContainerWidth = newOffsetWidth * children.length
			setContainerWidth(newContainerWidth - visibleGutter)
			setItemWidth(newOffsetWidth - (visibleGutter * 3))
		}
	}),
	lifecycle({
		componentDidMount() {
			const { onMountAndResize, next, autoSlide, setSlideInterval } = this.props
			onMountAndResize()
			if (autoSlide)
				setSlideInterval(setInterval(() => next(), autoSlide))
			window.addEventListener('resize', onMountAndResize)
		},
		componentDidUpdate(prevProps) {
			const { currentSlide, setCurrentSlide, children, autoSlide, setSlideInterval } = this.props
			if (currentSlide === children.length - 1 && prevProps.currentSlide !== this.props.currentSlide) {
				setSlideInterval(setTimeout(() => setCurrentSlide(0), autoSlide))
			}

		},
		componentWillUnmount() {
			const { onMountAndResize, slideInterval, slideTimeout } = this.props
			window.removeEventListener('resize', onMountAndResize)
			clearTimeout(slideTimeout)
			clearInterval(slideInterval)
		}
	}),
	withProps(({ currentSlide, itemWidth, visibleGutter, children }) => ({
		position: getPosition(currentSlide, itemWidth, visibleGutter, children),
	}))
)

export default stawContainer
