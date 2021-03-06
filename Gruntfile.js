// Generated on 2015-06-08 using generator-firefox-extension 0.3.1

module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-jpm');

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    config.name = grunt.file.readJSON(config.app + '/package.json').id;
    config.version = grunt.file.readJSON(config.app + '/package.json').version;


    grunt.initConfig({
        config: config,

        shell: {
            serveXpi: {
                command: 'jpm run <%= config.dist %>'
            },
            serveProject: {
                command: [
                    'cd <%= config.app %>',
                    'jpm run . -b /usr/bin/firefox'
                ].join('&&')
            }
        },
        jpm: {
            options: {
                src: "./<%= config.app %>/",
                xpi: "./<%= config.dist %>/"
            }
        },
        watch: {
            xpi: {
                files: ['<%= config.app %>/**/*'],
                tasks: ['shell:jpm', 'shell:serveProject']
            }
        }
    });

    grunt.registerTask('run', ['shell:serveProject']);
    grunt.registerTask('default', ['jpm:xpi', 'shell:serveProject']);
};
