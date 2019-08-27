import withProps from 'recompose/withProps'
import getPosition from '../helpers/getPosition'
import isClient from '../helpers/isClient'

export default withProps(({
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
    position: isClient() && getPosition({
      currentSlide,
      itemWidth,
      visibleGutter,
      children,
      alignAll,
      slidesPerView,
      stawId,
      containerWidth
    }),
    hasCustomNavigation,
    validCustomNavigation,
    renderCustomNavigation
  }
})
