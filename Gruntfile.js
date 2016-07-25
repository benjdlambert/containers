module.exports = (grunt) => {
    grunt.initConfig({
        babel: {
            options: {
                plugins: ['add-module-exports', 'transform-react-jsx'],
                presets: ['es2015', 'react']
            },
            jsx: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['*.jsx','./!(node_modules)/**/*.jsx'],
                    dest: '.',
                    ext: '.js'
                }]
            }
        },
        webpack: {
            component: {
                entry: "./view/component.jsx",
                output: {
                    library: ['Component'],
                    path: './dist'
                },
                module: {
                    loaders: [
                        {
                            test: /\.jsx$/,
                            loader: 'babel',
                            query: {
                                plugins: ['transform-react-jsx'],
                                presets: ['react', 'es2015']
                            }
                        },
                        { test: require.resolve("react"), loader: "expose?React" },
                        { test: require.resolve("react-dom"), loader: "expose?ReactDOM" },
                        {
                            test: /\.js$/,
                            exclude: /(node_modules|bower_components)/,
                            loader: 'babel',
                            query: {
                                presets: ['es2015']
                            }
                        }
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-babel');
    grunt.registerTask('build', ['babel', 'webpack']);

}
