module.exports = {
    apps: [
        {
            name: 'OOTC-prod',
            script: './dist/main.js',
            instances: -1,
            autorestart: false,
            watch: false,
            node_args: '--max-old-space-size=4096',
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
