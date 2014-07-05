OKgrafix 2014 

Okgrafix web site 
=================

This site build with Backbone, BackboneLayoutManager, Lo-Dash (Underscore compatibility
build), jQuery, RequireJS, Bower, Grunt, Karma, Sass, Susy, IcoMoon.
Built in testing support for: QUnit, Jasmine, and Mocha with Chai.

It was build on Backbone-Boilerplate, BackboneLayoutManager by Tim Branyen,
adding SASS, Susy frameworks and IcoMoon.


## Documentation ##

View the Backbone Boilerplate documentation here:
[GitHub Wiki](https://github.com/backbone-boilerplate/backbone-boilerplate/wiki)

View Backbone Layout Manager documentation here:
[GitHub Wiki](https://github.com/tbranyen/backbone.layoutmanager/wiki)

## Getting started ##

The easiest way to get started is to install Git and clone the repository:

``` bash
# Using Git, fetch only the latest commits.  You won't need the full history
# for your project.
git clone --depth 1 git@github.com:zelcie/okgrafix.git

# Move the repository to your own project name.
mv okgrafix my-project
```

You will need to download and install [Node.js](http://nodejs.org/) if you want
to use the commands in the following sections.

## Updating dependencies ##

Third party packages may update independently from this main repo, so it's a
good idea to update after fetching.

``` bash
# Install global dependencies.  Depending on your user account you may need to
# gain elevated privileges using something like `sudo`.
npm i -gq grunt-cli bower

# Optionally install coveralls (integration is baked in with Travis CI).
npm i -gq coveralls

# Install NPM dependencies.
npm i -q

# Install Bower dependencies.
bower i -s
```

## Build process ##

The build process consists of numerous Grunt plugin tasks that work together
to optimize your application.

``` bash
# To run the build process, run the default Grunt task.
grunt

# Run a build and test the now optimized assets.
grunt default server:release
```

## Running tests ##

To run tests, simply add `.spec.js` files throughout your application and they
will be automatically picked up by the runner.  You can find example test specs
in the `test` directory.

To run Karma as a daemon:
*Which will automatically run your tests after you save.*

``` bash
grunt karma:daemon
```

To run Karma tests once and output the results:

``` bash
grunt karma:run
```

After either above command is run, code coverage reports will be available in
the `test/coverage` folder.

By default, the test runner is Mocha and Chai.  You can easily change this by
editting the commented regions of the karma configuration in `Gruntfile.js`.

## License ##
Copyright © 2014 Michael Romanoff  
Licensed under the MIT license.
