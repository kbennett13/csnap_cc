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
        tasks: ['jshint', 'concat', 'nodeunit'],
        options: {
          spawn: false
        }
      }
    },
    nodeunit: {
      all: ['src/test/*.js']
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'src/**/*.js',
        'src/**/*.json'
      ],
      /*options: {
        jshintrc: '.jshintrc'
      }*/
    },
    concat: {
      test: {
        src: _.union(
          _.map(csnap_source, function(s){ return 'csnap/' + s;}),
          [
            'src/blocks/*.js',
          ]
        ),
        dest: 'dist/csnap.js'
      }
    },
    zip: {
      module: {
        cwd: 'src/',
        src: ['blocks.json', 'stage.xml', 'blocks/*'],
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
