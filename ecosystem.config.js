module.exports = {
    apps: [
        {
            name: 'OOTC-prod',
            script: './dist/main.js',
            instances: -1,
            autorestart: false,
            watch: false,
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
