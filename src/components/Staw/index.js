import stawContainer from '../../containers/Staw'
import Swipper from '../Swipper'
import StawControls from './Controls'
import './Staw.styl'

const getRollSlides = (
	children,
	visibleGutter,
	itemWidth,
	currentSlide,
	onItemClick
) => children.map((child, key) => {
  let className = 'staw__slide'
  className += (currentSlide == key) ? ' staw__slide--active' : ''

  return (
		<div
			className={className}
			key={key}
			data-key={key}
			onClick={onItemClick}
			style={{
				width: itemWidth || 'inherit',
				marginLeft: key !== 0 ? `${visibleGutter / 2}px` : 0
			}}
			>
			{child}
		</div>
	)}
)

const Staw = ({
	children,
	containerWidth,
	stawId,
	currentSlide,
	setCurrentSlide,
	next,
	prev,
	position,
	itemWidth,
	visibleGutter = 0,
	hasDots = true,
	hasArrows = true,
	customNavigation = false,
	hasCustomNavigation,
	validCustomNavigation,
	renderCustomNavigation,
	onItemClick,
	onDotClick = () => {},
	onPrevArrowClick = () => {},
	onNextArrowClick = () => {},
	onSwipeLeftToRight = () => {},
	onSwipeRightToLeft = () => {}
}) => {
	return (
		<div className="staw">
			<div id={stawId} className="staw__holder">
				<Swipper
					onSwipeLeftToRight={() => {
						onSwipeLeftToRight(currentSlide)
						prev()
					}}
					onSwipeRightToLeft={() => {
						onSwipeRightToLeft(currentSlide)
						next()
					}}
					className="staw__container"
					>
					<div className="staw__roller" style={{
							transform: `translateX(${position}px)`
						}}>
						{getRollSlides(
							children,
							visibleGutter,
							itemWidth,
							currentSlide,
							onItemClick
						)}
					</div>
				</Swipper>
			</div>
			<StawControls
				hasArrows={hasArrows}
				hasDots={hasDots}
				customNavigation={customNavigation}
				currentSlide={currentSlide}
				onDotClick={onDotClick}
				onNextArrowClick={onNextArrowClick}
				onPrevArrowClick={onPrevArrowClick}
				setCurrentSlide={setCurrentSlide}
				renderCustomNavigation={renderCustomNavigation}
				hasCustomNavigation={hasCustomNavigation}
				validCustomNavigation={validCustomNavigation}
				children={children} />
		</div>
	)
}

export default stawContainer(Staw)
