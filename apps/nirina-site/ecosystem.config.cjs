module.exports = {
  apps: [
    {
      name: 'nirina-site',
      script: 'server.mjs',
      watch: ['./dist'],
      ignore_watch: ['node_modules', 'logs'],
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
}
