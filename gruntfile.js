module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: "/* <%= pkg.name %> v.<%= pkg.version %> */\n",
                mangle: true
            },
            target: {
                files: {
                    'dist/angular-worker.min.js': 'src/angular-worker.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
}