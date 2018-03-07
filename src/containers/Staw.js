import { compose, lifecycle, withHandlers, withState, mapProps } from 'recompose'

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
		}
	}),
	lifecycle({
		componentDidMount() {
			const { stawId, children, setContainerWidth, visibleGutter = 0, setItemWidth } = this.props
			const { offsetWidth } = document.getElementById(stawId)
			const containerWidth = offsetWidth * children.length
			setContainerWidth(containerWidth - visibleGutter)
			setItemWidth(offsetWidth - (visibleGutter * 3))

			window.addEventListener('resize', () => {
				const newOffsetWidth = document.getElementById(stawId).offsetWidth
				const newContainerWidth = newOffsetWidth * children.length
				setContainerWidth(newContainerWidth - visibleGutter)
				setItemWidth(newOffsetWidth - (visibleGutter * 3))
			})
		}
		// TODO removeEventListener
	}),
	mapProps(({ currentSlide, itemWidth, visibleGutter, children, ...props }) => {
		return {
			position: getPosition(currentSlide, itemWidth, visibleGutter, children),
			children,
			visibleGutter,
			itemWidth,
			currentSlide,
			...props
		}
	})
)

export default stawContainer
