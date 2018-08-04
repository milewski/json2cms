"use strict";
exports.__esModule = true;
exports["default"] = {
    plugins: function (loader) {
        return [
            require('autoprefixer')({
                browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
            })
        ];
    }
};
