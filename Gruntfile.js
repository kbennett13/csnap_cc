module.exports = function(grunt) {
    var _ = require('underscore');
 
    // List of CSnap files - order sensitive!
    var csnap_source = ['morphic.js', 'widgets.js', 'blocks.js', 'threads.js',
                        'objects.js', 'gui.js', 'paint.js', 'lists.js', 
                        'byob.js', 'xml.js', 'store.js', 'locale.js', 
                        'cloud.js', 'sha512.js'];
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['Gruntfile.js', 'src/**/*.js', 'src/**/*.json'],
                tasks: ['jshint', 'concat'],
                options: {
                    spawn: false,
                }
            },
            options: {
                livereload: true,
            }
        },
        nodeunit: {
            all: ['src/test/*.js']
        },
        jshint: {
            beforeconcat: [
                'Gruntfile.js',
                'src/**/*.js',
                'src/**/*.json'
            ],
            afterconcat: [
                // Currently, there are too many errors in the Snap code
                //'dist/*.js',
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        concat: {
            test: {
                src: _.union(_.map(csnap_source, 
                    function(s){ return 'csnap/' + s;}),['src/blocks/*.js',]),
                dest: 'dist/csnap.js'
            }
        },
        zip: {
            module: {
                cwd: 'src/',
                src: ['src/blocks.json', 'src/stage.xml', 'src/blocks/*'],
                dest: 'module.zip'
            }
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-zip');
    grunt.registerTask('default', ['watch']);
};
