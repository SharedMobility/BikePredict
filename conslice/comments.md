## Comments for [*put the tile of your project here*]

### c001
The source for this reset has long since been lost but in its own comments, it cites inspiration from those listed below. We have since made own modifications to it but it is largely intact as it was when we first started implementing it.
+ [Eric Meyer](http://meyerweb.com)
+ [HTML5 Doctor](http://html5doctor.com)
+ [HTML5 Boilerplate](http://html5boilerplate.com)

### c002
Keep in mind that the ` <table> ` element still needs *cellspacing="0"* in the markup.

### c003
For those among us who like trivia:
+ ` white-space: pre; ` for CSS2
+ ` white-space: pre-wrap; ` for CSS 2.1
+ ` white-space: pre-line; ` for CSS 3 (works also in 2.1)
+ ` word-wrap: break-word; ` for our beloved Internet Explorer

### c004
Using ` sup ` and ` sub ` can result in [unexpected behavior](https://gist.github.com/unruthless/413930) when also using ` line-height `.

### c005
This standardizes monospaced elements.

### c006
Webkit browsers add a 2px margin outside the chrome of form elements.

### c007
Make buttons play nice in Internet Explorer.

### c008
This scales images in IE7 in a more pleasant manner.

### c009
This is [non-standard](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-tap-highlight-color) behavior as of August 2017.

### c010
Our heartfelt thanks go out to Nicholas Gallagher for the [Clearfix Hack](http://nicolasgallagher.com/micro-clearfix-hack/).

### c011
Mozilla does not style placeholders by default.

### c012
Here we remove any [text shadows](http://twitter.com/miketaylr/status/12228805301) and give a background color to selections in the browser.

### c013
The default font family is Arial but you should customize this as needed.
+ $font1 – body
+ $font2 – headings
+ $font3 – accents

### c014
Responsive breakpoints are provided but will likely be unnecessary if you use Bootstrap.

### c015
This is simply to mark a Twitter Bootstrap breakpoint.

### c016
The file *zasu.scss* is the digital equivalent of scratch paper. We use this file to test styles that may or may not be ultimately implemented. It should be empty when you deploy.

### c017
Six ` font-size ` variables are provided to get started (e.g. *biggest, bigger, big, base, small, smaller, and smallest*) but you should modify their values as needed.

### c018
Because font weights can vary depending on the font, no default weights are provided. For the majority of fonts, however, *400* is regular and *700* is bold.

### c019
Read Matt West's excellent introductory article on [sectioning elements](http://blog.teamtreehouse.com/use-html5-sectioning-elements) for more information.

### c020
The different SASS stylesheets here are based on the [SMACCS styleguide](https://smacss.com/) developed by Jonathan Snook.

### c021
The class ` .pac-container ` is defined by Google. We hide it so that the user does not see what we feel is an unnecessary drop-down list below the address input as the user enters data.
