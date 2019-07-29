module.exports = {
    "presets": [
        "@babel/preset-react",
        "@babel/typescript",
        [
            "@babel/preset-env",
            {
                "targets": {
                    "browsers": "> 2%"
                }
            }
        ]
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties"
    ]
};
