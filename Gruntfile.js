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

  // project configuration
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      src: 'src/**/*.js',
      dest: 'public/js/',
      specs: 'spec/**/*Spec.js',
      banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("m/d/yyyy") %>\n' +
        '* <%= pkg.homepage %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
        '* Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    test: {
      files: ['test/**/*.js']
    },
    watch: {
      files: ['Gruntfile.js', '<config:lint.files>'],
      test: {
        files: ['<%= meta.src %>', '<%= meta.specs %>'],
        tasks: 'test'
      }
    },
    concat: {
      dist: {
        src: [
          '<banner>',
          //'<%= meta.dest %>/vendor/OpenLayers.js',
          '<%= meta.src %>'
        ],
        dest: 'public/js/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner>', '<%= meta.dest %><%= pkg.name %>.js'],
        dest: '<%= meta.dest %><%= pkg.name %>.min.js'
      }
    },
    uglify: {
      mangle: {toplevel: false},
      squeeze: {dead_code: false},
      codegen: {quote_keys: true},
      options: {
        sourceMap: 'public/js/source-map.js'
      },
      front_end: {
        files: {
           '<%= meta.dest %><%= pkg.name %>.min.js': ['<%= meta.dest %><%= pkg.name %>.js']
        }
      }
    },
    lint: {
      files: ['<%= meta.src %>', '<%= meta.specs %>']
    },
    jshint: {
      all: [
        //'Gruntfile.js',
        '<%= meta.src %>',
        '<%= meta.specs %>'
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
        browser: true
      },
      globals: {
        jQuery: true,
        jasmine : false,
        describe : false,
        beforeEach : false,
        expect : false,
        it : false,
        spyOn : false
      }
    }
  });



  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};
