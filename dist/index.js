"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_transport_1 = require("./api-transport");
var stdout_1 = require("./stdout");
var levelInt = {
    off: 0,
    fatal: 1,
    error: 2,
    warn: 3,
    info: 4,
    debug: 5,
    trace: 6,
    all: 7,
};
var DEFAULT_LOG_LEVEL = 'info';
var DEFAULT_HOST = 'localhost';
var DEFAULT_SOURCE = 'nodejs-script';
var DEFAULT_TAGS = [];
var DatadogLogger = /** @class */ (function () {
    function DatadogLogger(_a) {
        var apiKey = _a.apiKey, _b = _a.logLevel, logLevel = _b === void 0 ? DEFAULT_LOG_LEVEL : _b, _c = _a.source, source = _c === void 0 ? DEFAULT_SOURCE : _c, _d = _a.hostname, hostname = _d === void 0 ? DEFAULT_HOST : _d, _e = _a.tags, tags = _e === void 0 ? DEFAULT_TAGS : _e, _f = _a.allowStdout, allowStdout = _f === void 0 ? false : _f, _g = _a.stdoutOnly, stdoutOnly = _g === void 0 ? false : _g;
        if (!apiKey) {
            throw new Error('Datadog api key not found');
        }
        this.level = logLevel;
        this.source = source;
        this.hostname = hostname;
        this.tags = tags;
        this.allowStdout = allowStdout;
        this.stdoutOnly = stdoutOnly;
        this.apiTransport = new api_transport_1.ApiTransport(apiKey);
    }
    DatadogLogger.prototype.log = function (fromLevel) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a, level, source, hostname, tags, message;
            return __generator(this, function (_b) {
                _a = this, level = _a.level, source = _a.source, hostname = _a.hostname, tags = _a.tags;
                if (!DatadogLogger.allowLevelLogging(fromLevel, level)) {
                    return [2 /*return*/];
                }
                message = DatadogLogger.createMessage(args);
                if (!message) {
                    return [2 /*return*/];
                }
                if (this.allowStdout) {
                    stdout_1.stdout(new Date(), fromLevel, message);
                }
                if (this.stdoutOnly) {
                    // prevent sending to datadog
                    return [2 /*return*/];
                }
                return [2 /*return*/, this.apiTransport.send({
                        level: fromLevel,
                        source: source,
                        hostname: hostname,
                        tags: DatadogLogger.tagsToExternal(tags),
                        message: message,
                    })];
            });
        });
    };
    DatadogLogger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.log.apply(this, ['error'].concat(args))];
            });
        });
    };
    DatadogLogger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.log.apply(this, ['info'].concat(args))];
            });
        });
    };
    DatadogLogger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.log.apply(this, ['debug'].concat(args))];
            });
        });
    };
    DatadogLogger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.log.apply(this, ['warn'].concat(args))];
            });
        });
    };
    DatadogLogger.prototype.fatal = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.log.apply(this, ['fatal'].concat(args))];
            });
        });
    };
    DatadogLogger.prototype.trace = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.log.apply(this, ['trace'].concat(args))];
            });
        });
    };
    DatadogLogger.tagsToExternal = function (tags) {
        return Object
            .keys(tags)
            .map(function (key) {
            var value = tags[key]
                .replace(/:/g, '\\:')
                .replace(/,/g, '\\,')
                .trim();
            return key + ":" + value;
        }, [])
            .join(',');
    };
    DatadogLogger.allowLevelLogging = function (levelFrom, levelTo) {
        var levelFromInt = levelInt[levelFrom];
        var levelToInt = levelInt[levelTo];
        return levelFromInt <= levelToInt;
    };
    DatadogLogger.createMessage = function (args) {
        var message;
        if (!args.length) {
            return null;
        }
        var prepareErrors = function (item) {
            if (item instanceof Error) {
                return item.stack;
            }
            return item;
        };
        if (args.length === 1) {
            (message = args[0]);
            return prepareErrors(message);
        }
        else {
            message = args;
        }
        return message.map(function (item) { return prepareErrors(item); });
    };
    return DatadogLogger;
}());
exports.DatadogLogger = DatadogLogger;
//# sourceMappingURL=index.js.map