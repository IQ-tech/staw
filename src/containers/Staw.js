import { compose, lifecycle, withHandlers, withState, withProps } from 'recompose'

const isClient = () => !!(typeof window !== 'undefined' && window.document && window.document.createElement);

const NOOP = () => {}

const getPosition = (currentSlide, itemWidth, visibleGutter = 0, children, alignAll, slidesPerView, stawId, containerWidth) => {

	let slidesWidth = 0,
			position

	const slides = [...document.querySelectorAll('#' + stawId + ' .staw__slide')]
	const currentSlideWidth = slides.length && slides[currentSlide].offsetWidth

	if (slidesPerView === 'auto') {
		for (let i = 0; i < currentSlide; i++) {
			slidesWidth += slides[i].offsetWidth
		}
	} else {
		slidesWidth = itemWidth * currentSlide
	}

	position = currentSlide !== 0 ? slidesWidth - (visibleGutter / 2) : alignAll ? -visibleGutter : 0

	if (currentSlide > 1) {
		position += (visibleGutter / 2) * (currentSlide - 1)
		if (currentSlide === children.length - 1) {
			if (alignAll) {
				position -= visibleGutter - visibleGutter
			}
		}
	}

	if (alignAll && slides.length) {
		position = -(-position + (document.getElementById(stawId).offsetWidth / 2) - (currentSlideWidth / 2) - visibleGutter)
	}

	return -position
}

const stawContainer = compose(
	withState('currentSlide', 'setCurrentSlide', 0),
	withState('containerWidth', 'setContainerWidth', 0),
	withState('itemWidth', 'setItemWidth', 0),
	withState('slideItems', 'setSlideItems', []),
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
		onMountAndResize: ({ stawId, children, setContainerWidth, setItemWidth, visibleGutter = 0, slidesPerView = 1 }) => () => {
			const newOffsetWidth = isClient() ? document.getElementById(stawId).offsetWidth : 0
			const newContainerWidth = newOffsetWidth * children.length
			setContainerWidth(newContainerWidth - visibleGutter)
			setItemWidth(slidesPerView === 'auto' ? slidesPerView : (newOffsetWidth / slidesPerView) - (visibleGutter * 3))
		},
		onItemClick: ({ navigateOnItemClick, setCurrentSlide, currentSlide }) => e => {
			if (!!navigateOnItemClick) {
				const dataKey = e.currentTarget.dataset.key
				currentSlide !== dataKey && setCurrentSlide(~~dataKey)
			}
		}
	}),
	lifecycle({
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
	}),
	withProps(({
		currentSlide,
		itemWidth,
		visibleGutter,
		children,
		customNavigation,
		alignAll,
		slidesPerView,
		stawId,
		containerWidth
	}) => {
		const hasCustomNavigation = !!(customNavigation && Array.isArray(customNavigation) && customNavigation.length)
		const validCustomNavigation =  hasCustomNavigation && customNavigation.length === children.length
		const renderCustomNavigation = hasCustomNavigation && validCustomNavigation

		return {
			position: isClient() && getPosition(
				currentSlide,
				itemWidth,
				visibleGutter,
				children,
				alignAll,
				slidesPerView,
				stawId,
				containerWidth
			),
			hasCustomNavigation,
			validCustomNavigation,
			renderCustomNavigation
		}
	})
)

export default stawContainer
