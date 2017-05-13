module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        config: {
            url: 'http://angular2.localhost/',
            livereload: {
                port: 35788
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        server : {
            default: {
                // the server root directory
                root: '/',

                // the server port
                // can also be written as a function, e.g.
                // port: function() { return 8282; }
                port: 8282,

                // the host ip address
                // If specified to, for example, "127.0.0.1" the server will
                // only be available on that ip.
                // Specify "0.0.0.0" to be available everywhere
                host: "0.0.0.0",

                cache: 0,
                showDir: true,
                autoIndex: true,

                // server default file extension
                ext: "html",

                // run in parallel with other tasks
                runInBackground: true | false,

                // specify a logger function. By default the requests are
                // sent to stdout.
                logFn: function (req, res, error) {
                },

                // Proxies all requests which can't be resolved locally to the given url
                // Note this this will disable 'showDir'
                proxy: "http://someurl.com",

                /// Use 'https: true' for default module SSL configuration
                /// (default state is disabled)
                https: {
                    cert: "cert.pem",
                    key: "key.pem"
                },

                // Tell grunt task to open the browser
                openBrowser: false,

                // customize url to serve specific pages
                customPages: {
                    "/readme": "README.md",
                    "/readme.html": "README.html"
                }
            }
        },

        ts: {
            default: {
                tsconfig: true,
                src: ['ts/**/*.ts'],
                outDir: ['js'],
                options: {
                    fast: 'never'
                }
            }
        },
        watch: {
            livereload: {
                files: [
                    'css/*.css',
                    '*.html',
                    'templates/**/*.html',
                    'js/*.js',
                    'js/**/*.js'
                ],
                options: {
                    livereload: '<%= config.livereload.port%>'
                }
            },
            ts: {
                files: [
                    'ts/*.ts',
                    'ts/**/*.ts',
                    'ts/*.d.ts'
                ],
                tasks: ['ts']
            },
            sass: {
                files: ['scss/*.scss', 'scss/**/*.scss'],
                tasks: ['sass']
            }
        },
        sass: {
            dist: {
                files: [
                    {
                        'css/style.css': ['scss/*/styles.scss']
                    }
                ]
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'www/*',
                        'js/*',
                        'ts/**/*.js',
                        'ts/**/*.js.map'
                    ]
                }]
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    // Default task(s).
    grunt.registerTask('default', [
        'ts',
        'sass',
        'watch',
        'server'
    ]);

};