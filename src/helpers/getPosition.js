const getPosition = ({
	currentSlide,
	itemWidth,
	visibleGutter = 0,
	children,
	alignAll,
	slidesPerView,
	stawId,
	containerWidth
}) => {
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

export default getPosition
