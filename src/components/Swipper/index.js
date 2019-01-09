import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'

const enhance = compose(
	withState('startReference', 'changeStartReference', null),
	withHandlers({
		onTouchStart: ({ changeStartReference }) => ev => {
			changeStartReference(ev.touches[0].pageX)
		},
		onTouchEnd: ({ changeStartReference, onSwipeLeftToRight, onSwipeRightToLeft, startReference }) => ev => {
			const pageX = ev.changedTouches[0].pageX
			const diff = pageX - startReference
			if	(diff > 0 && diff - 50 > 0) {
				if (typeof onSwipeLeftToRight === 'function') {
					onSwipeLeftToRight(ev)
				}
			} else if (diff + 50 < 0) {
				if (typeof onSwipeRightToLeft === 'function') {
					onSwipeRightToLeft(ev)
				}
			}
			changeStartReference(0)

			console.log('lllllllllllll');
		}
	})
)

const Swipper = ({ children, onTouchEnd, onTouchStart, ...rest }) =>
 	<div
		onTouchEnd={onTouchEnd}
		onTouchStart={onTouchStart}
		className={rest.className}
	 >
	 { children }
 	</div>

export default enhance(Swipper)
