export default ({
  hasArrows,
  hasDots,
  customNavigation,
  currentSlide,
  children,
  onDotClick,
  onNextArrowClick,
  onPrevArrowClick,
  setCurrentSlide,
  hasCustomNavigation,
  validCustomNavigation,
  renderCustomNavigation,
  customArrow,
}) => (
  <div className="staw__controls">
    {hasArrows && (
      <div className="staw__arrows">
        <div
          onClick={() => {
            onPrevArrowClick(currentSlide);
            setCurrentSlide(currentSlide - 1);
          }}
          className={`staw__arrow staw__arrow--prev${
            currentSlide ? "" : " staw__arrow--disabled"
          }`}
        >
          {customArrow}
        </div>
        <div
          onClick={() => {
            onNextArrowClick(currentSlide);
            setCurrentSlide(currentSlide + 1);
          }}
          className={`staw__arrow staw__arrow--next${
            currentSlide < children.length - 1 ? "" : " staw__arrow--disabled"
          }`}
        >
          {customArrow}
        </div>
      </div>
    )}
    {hasDots && (
      <div className="staw__dots">
        {children.map((value, key) => (
          <div
            key={key}
            onClick={() => {
              setCurrentSlide(key);
              onDotClick(key);
            }}
            className={`staw__dot${
              currentSlide === key ? " staw__dot--active" : ""
            }`}
          />
        ))}
      </div>
    )}
    {renderCustomNavigation ? (
      <div className="staw__custom-dots">
        {children.map((value, key) => (
          <div
            key={key}
            onClick={() => setCurrentSlide(key)}
            className={`staw__custom-dot${
              currentSlide === key ? " staw__custom-dot--active" : ""
            }`}
          >
            {customNavigation[key]}
          </div>
        ))}
      </div>
    ) : (
      hasCustomNavigation &&
      console.error(
        "The number of items into Staw isn't the same number of custom dots"
      )
    )}
  </div>
);
