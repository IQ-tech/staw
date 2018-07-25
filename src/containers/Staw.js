import { compose, lifecycle, withHandlers, withState, withProps } from 'recompose'

const getPosition = (currentSlide, itemWidth, visibleGutter = 0, children, alignAll) => {
	let position = currentSlide !== 0 ? (itemWidth * currentSlide) - (visibleGutter / 2) : alignAll ? -visibleGutter : 0
	if (currentSlide > 1) {
		position += (visibleGutter / 2) * (currentSlide - 1)
		if (currentSlide === children.length - 1) {
			if (alignAll) {
				position -= visibleGutter - visibleGutter
			} else {
				position -= visibleGutter
			}
		}
	}

	return -position
}

const stawContainer = compose(
	withState('currentSlide', 'setCurrentSlide', 0),
	withState('containerWidth', 'setContainerWidth', 0),
	withState('itemWidth', 'setItemWidth', 0),
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
			const { onMountAndResize, startAt = 0, setCurrentSlide } = this.props
			startAt && setCurrentSlide(startAt)
			onMountAndResize()
			window.addEventListener('resize', onMountAndResize)
		},
		componentWillUnmount() {
			const { onMountAndResize } = this.props
			window.removeEventListener('resize', onMountAndResize)
		}
	}),
	withProps(({ currentSlide, itemWidth, visibleGutter, children, customNavigation, alignAll }) => {
		const hasCustomNavigation = !!(customNavigation && Array.isArray(customNavigation) && customNavigation.length)
		const validCustomNavigation =  hasCustomNavigation && customNavigation.length === children.length
		const renderCustomNavigation = hasCustomNavigation && validCustomNavigation
		return {
			position: getPosition(currentSlide, itemWidth, visibleGutter, children, alignAll),
			hasCustomNavigation,
			validCustomNavigation,
			renderCustomNavigation
		}
	})
)

export default stawContainer
