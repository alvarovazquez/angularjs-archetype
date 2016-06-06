module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		concat: {
			options: {
				separator: ';\n',
			},
			all: {
				src: ['src/modules/**/*.js'],
				dest: 'src/js/<%= pkg.name %>.min.js',
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				src: 'src/js/<%= pkg.name %>.min.js',
				dest: 'dist/js/<%= pkg.name %>.min.js'
			}
		},
		
		sass: {
			all: {
				options: {
					style: 'expanded'
				},
				files: {
					'src/styles/main.css': 'src/styles/main.scss'
				}
			}
		},
		
		copy: {
			all: {
				files: [
					{expand: true, cwd:'src/js/', src: ['**/*.js'], dest: 'dist/js/'},
					{expand: true, cwd:'src/styles/', src: ['**/*.css'], dest: 'dist/styles/'},
					{expand: true, cwd:'src/data/', src: ['**'], dest: 'dist/data/'},
					{expand: true, cwd:'src/img/', src: ['**'], dest: 'dist/img/'},
					{expand: true, cwd:'src/templates/', src: ['**'], dest: 'dist/templates/'},
					{expand: true, cwd:'src/', src: ['index.html'], dest: 'dist/'}
				]
			},
			dev: {
				files: [
					{expand: true, cwd:'src/js/', src: ['**/*.map'], dest: 'dist/js/'},
					{expand: true, cwd:'src/styles/', src: ['**/*.map', '**/*.scss'], dest: 'dist/styles/'}
				]
			}
		},
		
		clean: {
			all: ['dist/*'],
			allpost: ['src/styles/main.css'],
			distpost: ['src/js/<%= pkg.name %>.js'],
			commitpre: ['src/js/<%= pkg.name %>.min.js', 'src/styles/main.css.map']
		},
		
		'http-server': {
			dev: {
				root: 'dist',
				port: 8081,
				host: '0.0.0.0',
				ext: 'html',
				runInBackground: false,
				openBrowser : true
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-http-server');
	
	grunt.registerTask('dev', ['clean:all', 'concat', 'sass', 'copy:all', 'copy:dev', 'clean:allpost']);
	grunt.registerTask('dist', ['clean:all', 'concat', 'uglify', 'sass', 'copy:all', 'clean:allpost', 'clean:distpost']);
	grunt.registerTask('start-server', ['http-server']);
	grunt.registerTask('prepare-commit', ['clean']);
	grunt.registerTask('default', ['dist']);
};
