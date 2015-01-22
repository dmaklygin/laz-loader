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
      'templates': { path: './public/js', pattern: /templates(.*)?\.js/},
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

    jade: {
      compile: {
        options: {
          data: {
            debug: false
          },
          client: true,
          compileDebug: false,
          amd: false,
          namespace: 'App.Templates',
          processName: function(filename) {
            return filename
              .replace('./public/js/views/', '')
              .replace('.jade', '');
          }
        },
        files: {
          "./public/js/templates.js": ["./public/js/views/*.jade"]
        }
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: {
          block: true,
          line: true
        },
        sourceMap: true
      },
      bootstrap: {
        src: [
          './bower_components/underscore/underscore.js',
          './bower_components/jquery/dist/jquery.min.js',
          './bower_components/backbone/backbone.js',
          './node_modules/jade/runtime.js',
          './public/js/app.js',
          './public/js/templates.js',
          './public/js/models/*.js',
          './public/js/collections/*.js',
          './public/js/views/*.js',
          './public/js/*/*.js'
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
          './public/css/style.css': ['./bower_components/html5-reset/assets/css/reset.css', './public/css/style.styl']
        }
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
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
      },
      jade: {
        files: ['./public/js/**/*.jade'],
        tasks: ['script'],
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
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint']);
  // Jade Templates task
  grunt.registerTask('templates', ['jade']);
  // Javascript task
  grunt.registerTask('script', ['templates', 'concat', 'uglify']);
  // Full distribution task
  grunt.registerTask('dist', ['clean-pattern', 'script', 'stylus']);
  // Default task.
  grunt.registerTask('default', ['dist']);

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

  return grunt;
};