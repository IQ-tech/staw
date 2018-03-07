import stawContainer from '../../containers/Staw'
import Swipper from '../Swipper'
import './Staw.styl'

const getRollSlides = (children, visibleGutter, itemWidth) =>
	children.map((child, key) =>
		<div
			className="staw__slide"
			key={key}
			style={{
				width: itemWidth || 'inherit',
				marginLeft: key !== 0 ? `${visibleGutter / 2}px` : 0
			}}
		>
			{child}
		</div>
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
	hasArrows = true
}) =>
	<div id={stawId} className="staw">
		<Swipper
			onSwipeLeftToRight={prev}
			onSwipeRightToLeft={next}
			className="staw__container"
		>
			<div className="staw__roller" style={{
				width: containerWidth || 'inherit',
				transform: `translateX(-${position}px)`,
				padding: `0 ${visibleGutter / 2}px`
			}}>
				{getRollSlides(children, visibleGutter, itemWidth)}
			</div>
		</Swipper>
		{
			hasArrows &&
			<div className="staw__arrows">
				<div
					onClick={() => setCurrentSlide(currentSlide - 1)} className={`staw__arrow staw__arrow--prev${currentSlide ? '' : ' staw__arrow--disabled'}`}
				/>
				<div
					onClick={() => setCurrentSlide(currentSlide + 1)}
					className={`staw__arrow staw__arrow--next${currentSlide < children.length - 1 ? '' : ' staw__arrow--disabled'}`}
				/>
			</div>
		}
		{
			hasDots &&
			<div className="staw__dots">
				{
					children.map((value, key) =>
						<div
							key={key}
							onClick={() => setCurrentSlide(key)}
							className={`staw__dot${currentSlide === key ? ' staw__dot--active' : ''}`}
						/>
					)
				}
			</div>
		}
	</div>

export default stawContainer(Staw)
