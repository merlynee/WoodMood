module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['assert/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['public/libs/**/*.js']
            },
            all: ['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
        },

        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 2,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        mochaTest:{
            options:{
                reporter:'spec'
            },
            src:['test/**/*.js']
        },

        concurrent: {
            tasks: ['jshint','nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')
    
    grunt.loadNpmTasks('grunt-contrib-jshint')

    grunt.option('force', true)

    grunt.registerTask('default', ['concurrent'])

}