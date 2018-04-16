export default ({
  hasArrows,
  hasDots,
  currentSlide,
  children,
  onNextArrowClick,
  onPrevArrowClick,
  setCurrentSlide
}) =>
  <div className="staw__controls">
    {
      hasArrows &&
      <div className="staw__arrows">
        <div
          onClick={() => {
            onPrevArrowClick(currentSlide)
            setCurrentSlide(currentSlide - 1)
          }} className={`staw__arrow staw__arrow--prev${currentSlide ? '' : ' staw__arrow--disabled'}`}
        />
        <div
          onClick={() => {
            onNextArrowClick(currentSlide)
            setCurrentSlide(currentSlide + 1)
          }}
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
