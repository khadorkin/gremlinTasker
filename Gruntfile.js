'use strict';
var webpack = require('webpack');
var uglify = new webpack.optimize.UglifyJsPlugin();

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      migrate: {
        command: 'node_modules/.bin/sequelize db:migrate'
      }
    },
    webpack: {
      mainApp: {
        entry: './public/javascripts/main.jsx',
        output: {
          path: 'public/dist',
          filename: 'app.min.js'
        },
        module: {
          loaders: [
            {
              test: /\.jsx/,
              loader: 'babel-loader',
              query: {
                presets: ['es2015', 'react']
              }
            }
          ]
        },
        plugins: [uglify]
      }
    },
    git_changelog: {
      extended: {
        options: {
          file: './CHANGELOG.md',
          repo_url: 'https://github.com/mattdharmon/gremlinTasker',
          app_name : 'Gremlin Tasker changelog',
          grep_commits: '^fix|^feat|^docs|^refactor|^chore|BREAKING',
          debug: true,
          tag: false
        }
      }
    },
    watch: {
      jsx: {
        files: ['public/javascripts/**/*.jsx'],
        tasks: ['webpack']
      }
    }
  });


  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('git-changelog');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['webpack', 'shell:migrate']);
  grunt.registerTask('migrate', ['shell:migrate']);
};
