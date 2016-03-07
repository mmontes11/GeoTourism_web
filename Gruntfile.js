module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: {
                src: ['dist']
            }
        },
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: [
                        '**/*.html',
                        '!node_modules/**',
                        '!bower_components/**'
                    ],
                    dest: 'dist'
                }]
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: [
                        '**/*.css',
                        '!node_modules/**',
                        '!bower_components/**'
                    ],
                    dest: 'dist'
                }]
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: [
                        '**/*.js',
                        '!Gruntfile.js',
                        '!node_modules/**',
                        '!bower_components/**'
                    ],
                    dest: 'dist'
                }]
            }
        },
        copy: {
            libraries: {
                files: [
                    {expand: true, src: ['bower_components/**/*','lib/**/*'], dest: 'dist/', mode: true}
                ]
            },
            img: {
                files: [
                    {expand: true, src: ['img/**/*'], dest: 'dist/', mode: true}
                ]
            }
        }
    });

    //Load tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('dist', ['clean','htmlmin','cssmin','uglify','copy']);
    grunt.registerTask('default', ['dist']);
};