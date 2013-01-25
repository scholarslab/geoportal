module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib');

  // project configuration
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("m/d/yyyy") %>\n' +
        '* <%= pkg.homepage %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
        '* Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    test: {
      files: ['test/**/*.js']
    },
    watch: {
      files: ['grunt.js', '<config:lint.files>'],
      tasks: ['lint','test','concat', 'min']
    },
    concat: {
      dist: {
        src: [
          '<banner>',
          'public/js/vendor/OpenLayers.js',
          'src/plugins.js',
          'src/geoportal.js'
        ],
        dest: 'public/js/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner>', 'public/js/<%= pkg.name %>.js'],
        dest: 'public/js/<%= pkg.name %>.min.js'
      }
    },
    uglify: {
      //mangle: {toplevel: false},
      //squeeze: {dead_code: false},
      //codegen: {quote_keys: true}
      //sourceMap: 'public/js/source-map.js'
    },
    lint: {
      files: ['src/**/*.js', 'test/**/*.js']
    },
    jshint: {
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
        jQuery: true
      }
    }
  });

  grunt.registerTask('default', 'lint test concat min');
};
