# Staw

One Carousel to rule them all, One Carousel to find them,
One Carousel to bring them all and in the light bind them

### Installing

In your project folder, type on console

`yarn add staw`

or you can use NPM aswell

`npm i staw`


### Usage

Import the component from Node Modules

`import Staw from 'staw';`

Input all slides section as children

```
<Staw>
	children1
	children2
	children3
</Staw>

```

Configuration Props

Prop Name | Prop Description
--------- | ----------------
visibleGutter| amount of next slide that should appear in px, if the slide isn't the first one or the last one, this amount is halfed in the next and previous slide. Default 0 px.
hasDots| boolean that define if have or not dots for navigation. Default true.
hasArrows| boolean that define if have or not arrow for navigation. Default true.

### Dependencies

* React
* ReactDOM
* Recompose

### License

Licensed under the MIT license.
