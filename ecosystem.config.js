module.exports = {
    apps: [
        {
            name: 'your-app-name',
            script: 'node_modules/.bin/nest',
            args: 'start',
            node_args: '--max-old-space-size=4096',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
        },
    ],
};
