# Gulp Init Squarespace - Bootstrap

A boilerplate for working with Gulp and Squarespace. This repo makes it easy to write Less CSS (the up-to-date JavaScript version, not the Squarespace version) and ES6 (using Babel for transpiling) for your Squarespace project. Ships with support for bootstrap-grid and custom media query mixins that mirror those used in bootsrap.

## Getting Started

First fork and then clone this repository. Then in the command line do the following.

    cd gulp-init-squarespace
    npm install
    git clone https://{my-site-title}.squarespace.com/template.git
    gulp watch
    
### Further Configuration

*This project ships with normalize.css as your css reset and places it within an inline "critical/above-the-fold" stylesheet.* **As a result, you won't need a file named "reset.css" within the template/styles directory. Furthermore, everytime you add a new stylesheet at the top level of the root /styles/ folder, you'll also need to add that stylesheet's name to your "template.conf" file.**

**OTHERWISE YOUR TEMPLATE WON'T LOAD YOUR CSS.**

Your "template.conf" would include something like this:

	"stylesheets" : [ "main.css","my-stylesheet-name.css", etc...],

## Editing Files

Unlike the original [gulp-init-squarespace](https://github.com/foleyatwork/gulp-init-squarespace) by [Kevin Foley](https://github.com/foleyatwork), we're integrating your own custom styles and scripts into the default template/styles & template/scripts folders. When you want to edit your CSS and JS, go into the styles and scripts folders in the root directory.

### Less

When editing Less files, anything in the root of the styles folder will get processed and turned into a corresponding file in the ./template/styles folder. Files inside subfolders are not processed intentionally. This allows you to organize your Less in a sensible way, putting modular files in subfolders. You can use imports inside the files your root folder to combine files.

    // This is the main less file, import all other files here.
    @import "./modules/my-module.less";
    
####What About Above-the-Fold/Critical Styles?

When loading styles using Squarespace's less compiler, you might notice a brief lag in how fast your stylesheets are loaded. To get around this, the "less" task is comprised of two tasks: "styles-crit" & "styles-main". I've created a 'critical' folder within the root styles folder with a "critical.less" file. Anything you import or hard code into the "critical.less" file gets compiled into a critical.block file in your template/blocks folder. What the "styles-crit" task is doing here is:

1. Compiling the "critical.less" stylesheet into a "critical.css" stylesheet within the same directory.
2. Converting the critical.css styles to inlined styles within the "critical.html" file
3. Taking that stream, renaming it to "critical.block", and placing it in the template/blocks folder.

What you'll need to do is include the "critical.block" file in your headers like so:

	{@|apply critical.block}


### JS

All JavaScript is processed with Browserify and Babel (Babelify). It will process each JS file in the root of the ./scripts folder and distribute it to the ./template/scripts folder.

    // This is the main.js file, import all other files here.
    import { MyModule } from './modules/my-module.js';


## Why Not Assets Instead of the Squarespace Script and CSS Loaders?

The default Squarespace script and CSS loaders cause some problems with custom code. Here are the main bullet points for why Kevin Foley chose to bypass them:

- The <squarespace:script> tag strips attributes, like async, for instance. Bypassing that gives you more freedom to load your JS the way you want.
- Loading CSS files the Squarespace way always goes through the company's proprietary Less preprocessor. There are some edge case issues with that, the biggest one I've come across is using calc() in your CSS; when it goes through a Less preprocessor it evaluates the mathematical expression when you actually want the browser to do that.

Me on the other hand, I don't mind the way Squarespace loads my scripts and styles. Since this project compiles your js into a single es6 compliant bundle, I don't have a problem complying by squarespace's template guidelines. I'm working around squarespace's less compiler by compiling my .less files into a css file which is then in turn added to my template/styles folder. At this point, there's no more .less files left to compile.

## Tasks

The complete list of tasks that are supported right now.

- **watch** Watches for changes to your .less and .js files in the styles and scripts directory.
- **browserify** Compiles all .js files in the root of the scripts folder into a browserify bundle in /template/scripts.
- **less** Compiles all Less files in the root of the styles folder and puts them in /template/styles.

## Further Development

In the future, I'd like to include a task that automatically adds your main css files to your template.conf file. If you have a clever way to do this, let me know!

## Contact

You can reach me at [mario@lowrycreative.com](mailto:mario@lowrycreative.com). [Fork me](https://github.com/mperez415/gulp-init-squarespace) on github if you want to build on this version of gulp-init-squarespace!

## Credits

The original version of [gulp-init-squarespace](https://github.com/foleyatwork/gulp-init-squarespace) was built by [Kevin Foley](https://github.com/foleyatwork), an employee at Squarespace. Fork his version if you want to build on his original tasks.

