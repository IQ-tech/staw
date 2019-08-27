import withHandlers from 'recompose/withHandlers'
import isClient from '../helpers/isClient'

export default withHandlers({
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
})
