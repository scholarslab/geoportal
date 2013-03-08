/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */
module.exports = function(grunt) {
  'use strict';

  //grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-smushit');

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      src: 'src/**/*.js',
      dest: 'public/js/',
      image_dest: 'public/images/',
      specs: 'spec/**/*Spec.js',
      banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("m/d/yyyy") %>\n' +
        '* <%= pkg.homepage %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
        '* Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    jshint: {
      files: [
        '<%= meta.src %>'
      ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: false,
          jasmine: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'concat', 'uglify']
    },
    concat: {
      dist: {
        src: [
          '<%= meta.src %>'
        ],
        dest: 'public/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      mangle: {toplevel: false},
      squeeze: {dead_code: false},
      codegen: {quote_keys: true},
      options: {
        sourceMappingURL: '/js/source-map.js',
        sourceMap: 'public/js/source-map.js',
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= meta.dest %><%= pkg.name %>.min.js': ['<%= meta.dest %><%= pkg.name %>.js']
        }
      }
    },
    smushit: {
      path: {
        src: '<%= meta.image_dest %>'
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};
