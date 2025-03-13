# vue-aria

A collection of unstyled primitive components. Accessible by default and great
developer experience out-of-the-box.

## Why?

Why does this library exist when we have [Reka UI](https://reka-ui.com/) and other great UI libraries?

The biggest difference between vue-aria and many other component libraries, is the architecture. vue-aria
is build in a way that separates the component state from the rendered output.

There's one part that that takes care of the component logic i.e. is the switch turned on or off and offer
a way to change the state of the switch.

The other part, make sure we use the correct HTML elements, that aria attributes set and so on.

The benefit is that the first part, the logic part, can be re-used on non-web platforms like mobile development
looking at you [Lynx](https://lynxjs.org/) 👀.
