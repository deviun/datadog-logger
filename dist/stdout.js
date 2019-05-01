"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MSG_SEPARATOR = ' ';
var formattingOutput = function (msg, arrFormat) {
    if (arrFormat === void 0) { arrFormat = true; }
    if (msg instanceof Error || msg instanceof Date) {
        return [msg.toString() + MSG_SEPARATOR];
    }
    else if (msg instanceof Array) {
        if (!arrFormat) {
            return msg;
        }
        return msg.map(function (any) {
            var res = formattingOutput(any, false)[0];
            return res;
        });
    }
    else if (typeof msg === 'object') {
        return [JSON.stringify(msg) + MSG_SEPARATOR];
    }
    else {
        return [msg + MSG_SEPARATOR];
    }
};
exports.stdout = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    args.forEach(function (arg) {
        return formattingOutput(arg)
            .forEach(function (out) { return process.stdout.write(out); });
    });
    process.stdout.write('\n');
};
//# sourceMappingURL=stdout.js.map