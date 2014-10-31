module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        // Wipe out previous builds and test reporting.
        clean: ['dist/', 'test/reports'],

        // Run your source code through JSHint's defaults.
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'app/**/*.js',
                'test/jasmine/**/*.js',
                '!app/fonts/**/*.js',
                '!app/kss/**/*.js'
            ]
        },

        // This task uses James Burke's excellent r.js AMD builder to take all
        // modules and concatenate them into a single file.
        requirejs: {
            release: {
                options: {
                    mainConfigFile: 'app/config.js',
                    generateSourceMaps: true,
                    include: ['main'],
                    out: 'dist/source.min.js',
                    optimize: 'uglify2',

                    // Since we bootstrap with nested `require` calls this option allows
                    // R.js to find them.
                    findNestedDependencies: true,

                    // Include a minimal AMD implementation shim.
                    name: 'almond',

                    // Setting the base url to the distribution directory allows the
                    // Uglify minification process to correctly map paths for Source
                    // Maps.
                    baseUrl: 'dist/app',

                    // Wrap everything in an IIFE.
                    wrap: true,

                    // Do not preserve any license comments when working with source
                    // maps.  These options are incompatible.
                    preserveLicenseComments: false
                }
            }
        },

        compass: {
            dev: {
                options: {
                    config: 'config.rb',
                    require: 'susy',
                    environment: 'development'
                    //watch: true
                }
            }
        },

        // This task simplifies working with CSS inside Backbone Boilerplate
        // projects.  Instead of manually specifying your stylesheets inside the
        // HTML, you can use `@imports` and this task will concatenate only those
        // paths.
        styles: {
            // Out the concatenated contents of the following styles into the below
            // development file path.
            'dist/styles.css': {
                // Point this to where your `index.css` file is location.
                src: 'app/css/index.css',

                // The relative path to use for the @imports.
                paths: ['app/css'],

                // Rewrite image paths during release to be relative to the `img`
                // directory.
                forceRelative: '/app/img/'
            }
        },

        // Minfiy the distribution CSS.
        cssmin: {
            release: {
                files: {
                    'dist/styles.min.css': ['dist/app/css/index.css']
                }
            }
        },

        server: {
            options: {
                host: '0.0.0.0',
                port: 8000
            },

            development: {},

            release: {
                options: {
                    prefix: 'dist'
                }
            },

            test: {
                options: {
                    forever: false,
                    port: 8001
                }
            }
        },

        processhtml: {
            release: {
                files: {
                    'dist/index.html': ['index.html'],
                    'dist/google5ad6ca720883e813.html': ['google5ad6ca720883e813.html']
                }
            }
        },

        // Move vendor and app logic during a build.
        copy: {
            release: {
                files: [
                    { src: ['app/**'], dest: 'dist/' },
                    { src: 'vendor/**', dest: 'dist/' }
                ]
            }
        },

        compress: {
            release: {
                options: {
                    archive: 'dist/source.min.js.gz'
                },

                files: ['dist/source.min.js']
            }
        },

        // Unit testing is provided by Karma.  Change the two commented locations
        // below to either: mocha, jasmine, or qunit.
        karma: {
            options: {
                basePath: process.cwd(),
                singleRun: true,
                captureTimeout: 7000,
                autoWatch: true,


                // level of logging
                // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
                //logLevel: config.LOG_INFO,
                //logLevel: 'ERROR',
                logLevel: 'ERROR',

                // test results reporter to use
                // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
                reporters: ['progress', 'coverage'],
                // Start these browsers, currently available:
                // - Chrome
                // - ChromeCanary
                // - Firefox
                // - Opera (has to be installed with `npm install karma-opera-launcher`)
                // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
                // - PhantomJS
                // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
                browsers: ['PhantomJS'],

                // Change this to the framework you want to use.
                frameworks: ['jasmine'],

                plugins: [
                    'karma-jasmine',
                    'karma-mocha',
                    'karma-qunit',
                    'karma-phantomjs-launcher',
                    'karma-coverage'
                ],

                preprocessors: {
                    'app/**/*.js': 'coverage'
                },

                coverageReporter: {
                    type: 'lcov',
                    dir: 'test/coverage'
                },

                files: [
                    // You can optionally remove this or swap out for a different expect.
                    //'vendor/bower/chai/chai.js',
                    'vendor/bower/requirejs/require.js',
                    'test/runner.js',
                    //'app/config.js',

                    { pattern: 'app/*.js', included: false },
                    { pattern: 'app/**/*.js', included: false },
                    { pattern: 'vendor/**/*.js', included: false },

                    // Derives test framework from Karma configuration.
                    {
                        pattern: 'test/<%= karma.options.frameworks[0] %>/**/*.spec.js',
                        included: false
                    }
                ]
            },

            // This creates a server that will automatically run your tests when you
            // save a file and display results in the terminal.
            daemon: {
                options: {
                    singleRun: false
                }
            },

            // This is useful for running the tests just once.
            run: {
                options: {
                    singleRun: true
                }
            }
        },

        coveralls: {
            options: {
                coverage_dir: 'test/coverage/PhantomJS 1.9.7 (Mac OS X)'
            }
        },


// TODO: fix this. it doesn't load tasks
        watch: {
            options: {
                livereload: true
            },
            tasks: ['compass:dev']
        }
    });

    // Grunt contribution tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Third-party tasks.
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-karma-coveralls');
    grunt.loadNpmTasks('grunt-processhtml');

    // Grunt BBB tasks.
    grunt.loadNpmTasks('grunt-bbb-server');
    grunt.loadNpmTasks('grunt-bbb-requirejs');
    grunt.loadNpmTasks('grunt-bbb-styles');

    // When running the default Grunt command, just lint the code.
    grunt.registerTask('default', [
        'clean',
        'jshint',
        'compass',
        'processhtml',
        'copy',
        'requirejs',
        //'styles',
        'cssmin'
    ]);
};