# Staw

One Carousel to rule them all. Simple like recompose, weightless like a leaf and very easy to Staw (badum tsss)

### Installing

In your project folder, type on console

`yarn add staw`

or you can use NPM aswell

`npm i staw`


### Usage

Import the component from Node Modules

`import Staw from 'staw';`

Input all slides section as children

```html
<Staw>
	child1
	child2
	child3
</Staw>

```

Each child will be a slide

### Props

Name | Description | Default Value
--------- | -------- | ----------------
visibleGutter| amount of next slide that should appear in px, if the slide isn't the first one or the last one, this amount is halfed in the next and previous slide. | 0 
startAt| number (array index based) that defines the initial slide that's considered 'active' | 0
hasDots| boolean that define if have or not dots for navigation. | true
customNavigation | An array of strings. Each string will behave as a Dot behaves | false
hasArrows | boolean that define if have or not arrow for navigation. | true
onPrevArrowClick(currentSlide) | a callback that executes on prev arrow click, before currentSlide update | (currentSlide) => {}
onNextArrowClick(currentSlide) | a callback that executes on next arrow click, before currentSlide update | (currentSlide) => {}
onSwipeLeftToRight(currentSlide) | same as prevArrowClick but for swipe | (currentSlide) => {}
onSwipeRightToLeft(currentSlide) | same as nextArrowClick but for swipe | (currentSlide) => {}

### Example
```jsx
<Staw
    visibleGutter={30}
    startAt={0}
    hasDots={false}
    customNavigation={['First','Second','Third']}
    onPrevArrowClick={(currentSlide) => {
        console.log(currentSlide)
    }}
>
    <div className="firstSlide">
        <div className="anyClass">content of my first slide</div>
    </div>
    <div className="secondSlide">
        <div className="anyClass">content of my second slide</div>
    </div>
    <div className"thirdSlide">
        <div className="anyClass">a lot of items</div>
        <div className="anyClass">in the same</div>
        <div className="anyClass">slide depends only of yours css</div>
    </div>
</Staw>
```


### Dependencies

* React ^16.0.0
* ReactDOM ^16.0.0
* Recompose ^0.26.0

### License

Licensed under the MIT license.
