module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**\n' +
    '* Version <%= pkg.version %>\n' +
    '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
    '* E-mail <%= pkg.email %>\n' +
    '*/\n',

    'clean-pattern': {
      'js': { path: './public/js', pattern: /all(.*)?\.js/},
      'css': { path: './public/css', pattern: /style(.*)?\.css/ }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['./public/js/*.js']
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      bootstrap: {
        src: [
          './bower_components/underscore/underscore.js',
          './bower_components/jquery/dist/jquery.min.js',
          './bower_components/backbone/backbone.js',
          './public/js/config.js',
          './public/js/*/*.js',
          './public/js/app.js'
        ],
        dest: './public/js/all.js'
      }
    },

    stylus: {
      compile: {
        options: {
          urlfunc: 'embedurl'
        },
        files: {
          './public/css/style.css': './public/css/style.styl'
        }
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      //developer: {
      //  options: {
      //    beautify: true,
      //    compress: false,
      //    mangle: {
      //      except: ['jQuery', 'Modernizr']
      //    }
      //  },
      //  files: {
      //    './public/js/all.package.js': ['<%= concat.bootstrap.dest %>']
      //  }
      //},
      production: {
        options: {
          compress: false,
          mangle: {
            except: ['jQuery', 'Modernizr']
          }
        },
        files: {
          './public/js/all.min.js': ['<%= concat.bootstrap.dest %>']
        }
      }
    },

    watch: {
      scripts: {
        files: ['./public/js/*.js', './public/js/**/*.js'],
        tasks: ['script'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['./public/css/**/*.styl'],
        tasks: ['stylus'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.loadNpmTasks('clean-pattern');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('test', ['jshint']);
  // Javascript task
  grunt.registerTask('script', ['concat', 'uglify']);
  // Full distribution task.
  grunt.registerTask('dist', ['clean-pattern', 'script', 'stylus']);
  // Default task.
  grunt.registerTask('default', ['dist']);
  // Watch task
  //grunt.registerTask('watch', ['script']);

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

  return grunt;
};