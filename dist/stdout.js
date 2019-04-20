"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stdout = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    process.stdout.write(JSON.stringify(args));
    process.stdout.write('\n');
};
//# sourceMappingURL=stdout.js.map