module.exports = function(grunt) {

	grunt.initConfig({
	  mochacov: {
	    coverage: {
	      options: {
	        coveralls: true
	      }
	    },
	    test: {
	      options: {
	        reporter: 'spec'
	      }
	    },
	    options: {
	      files: 'test/*.js'
	    }
	  }
	});
	 
	// Production Build Tools
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('travis', ['mochacov:coverage']);
	grunt.registerTask('test', ['mochacov:test']);

}