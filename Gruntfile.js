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
      developer: {
        options: {
          beautify: true,
          compress: false,
          mangle: {
            except: ['jQuery', 'Modernizr', 'mousewheel', 'lightbox']
          }
        },
        files: {
          './public/js/all.package.js': ['<%= concat.bootstrap.dest %>']
        }
      },
      production: {
        options: {
          compress: false,
          mangle: {
            except: ['jQuery', 'Modernizr', 'mousewheel', 'lightbox']
          }
        },
        files: {
          './public/js/all.min.js': ['<%= concat.bootstrap.dest %>']
        }
      }
    }

  });

  grunt.loadNpmTasks('clean-pattern');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-stylus');


  grunt.registerTask('test', ['jshint']);
  // Full distribution task.
  grunt.registerTask('dist', ['clean-pattern', 'concat', 'stylus', 'uglify']);
  // Default task.
  grunt.registerTask('default', ['dist']);
};