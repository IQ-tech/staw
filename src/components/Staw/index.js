import stawContainer from '../../containers/Staw'
import Swipper from '../Swipper'
import StawControls from './Controls'
import './Staw.styl'

const getRollSlides = (children, visibleGutter, itemWidth, currentSlide) =>
	children.map((child, key) => {

      let className = 'staw__slide'
      className += (currentSlide == key) ? ' staw__slide--active' : ''

      return <div
              className={className}
              key={key}
              style={{
                width: itemWidth || 'inherit',
                marginLeft: key !== 0 ? `${visibleGutter / 2}px` : 0
              }}
            >
              {child}
            </div>
      
    }
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
	onPrevArrowClick = () => {},
	onNextArrowClick = () => {},
	onSwipeLeftToRight = () => {},
	onSwipeRightToLeft = () => {}
}) =>
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
						width: containerWidth || 'inherit',
						transform: `translateX(-${position}px)`,
						padding: `0 ${visibleGutter / 2}px`
					}}>
					{getRollSlides(children, visibleGutter, itemWidth, currentSlide)}
				</div>
			</Swipper>
		</div>
		<StawControls
			hasArrows={hasArrows}
			hasDots={hasDots}
			currentSlide={currentSlide}
			onNextArrowClick={onNextArrowClick}
			onPrevArrowClick={onPrevArrowClick}
			setCurrentSlide={setCurrentSlide}
			children={children} />
	</div>

export default stawContainer(Staw)
