"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
exports.cc = exports.debugOut = exports.pp = exports.getTestWorkFolderFullPath = exports.checkNotInGitWorking = exports.pathResolve = exports.inputSkip = exports.inputPath = exports.getInputObject = exports.input = void 0;
var fs = require("fs");
var path = require("path");
var readline = require("readline");
var inputDefault = [ /*
    'test.json',
    'id',
    'name',
    ''
*/];
// StandardInputBuffer
var StandardInputBuffer = /** @class */ (function () {
    function StandardInputBuffer() {
        this.inputBuffer = [];
        this.inputResolver = undefined;
    }
    StandardInputBuffer.prototype.delayedConstructor = function () {
        var _this = this;
        this.readlines = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.readlines.on('line', function (line) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.inputResolver) {
                    this.inputResolver(line);
                    this.inputResolver = undefined;
                }
                else {
                    this.inputBuffer.push(line);
                }
                return [2 /*return*/];
            });
        }); });
        this.readlines.setPrompt('');
        this.readlines.prompt();
    };
    StandardInputBuffer.prototype.input = function (guide) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.readlines) {
                    this.delayedConstructor();
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var nextLine = _this.inputBuffer.shift();
                        if (nextLine) {
                            console.log(guide + nextLine);
                            resolve(nextLine);
                        }
                        else {
                            process.stdout.write(guide);
                            _this.inputResolver = resolve;
                        }
                    })];
            });
        });
    };
    StandardInputBuffer.prototype.close = function () {
        if (this.readlines) {
            this.readlines.close();
        }
    };
    return StandardInputBuffer;
}());
// InputOption
var InputOption = /** @class */ (function () {
    function InputOption(inputLines) {
        this.inputLines = inputLines;
        this.nextLineIndex = 0;
        this.nextParameterIndex = 2;
    }
    return InputOption;
}());
// inputOption
var inputOption = new InputOption(inputDefault);
// input
// Example: const name = await input('What is your name? ');
function input(guide) {
    return __awaiter(this, void 0, void 0, function () {
        var value, value;
        return __generator(this, function (_a) {
            // Input emulation
            if (inputOption.inputLines) {
                if (inputOption.nextLineIndex < inputOption.inputLines.length) {
                    value = inputOption.inputLines[inputOption.nextLineIndex];
                    inputOption.nextLineIndex += 1;
                    console.log(guide + value);
                    return [2 /*return*/, value];
                }
            }
            // Read the starting process parameters
            while (inputOption.nextParameterIndex < process.argv.length) {
                value = process.argv[inputOption.nextParameterIndex];
                inputOption.nextParameterIndex += 1;
                if (value.substr(0, 1) !== '-') {
                    console.log(guide + value);
                    return [2 /*return*/, value];
                }
                if (value !== '--test') {
                    inputOption.nextParameterIndex += 1;
                }
            }
            // input
            return [2 /*return*/, InputObject.input(guide)];
        });
    });
}
exports.input = input;
var InputObject = new StandardInputBuffer();
function getInputObject() {
    return InputObject;
}
exports.getInputObject = getInputObject;
// inputPath
// Example: const name = await input('What is your name? ');
function inputPath(guide) {
    return __awaiter(this, void 0, void 0, function () {
        var key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, input(guide)];
                case 1:
                    key = _a.sent();
                    if (key.endsWith('()')) {
                        return [2 /*return*/, key];
                    }
                    else {
                        return [2 /*return*/, pathResolve(key)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.inputPath = inputPath;
// inputSkip
function inputSkip(count) {
    inputOption.nextParameterIndex += count;
}
exports.inputSkip = inputSkip;
// pathResolve
function pathResolve(path_) {
    // '/c/home' format to current OS format
    if (path_.length >= 3) {
        if (path_[0] === '/' && path_[2] === '/') {
            path_ = path_[1] + ':' + path_.substr(2);
        }
    }
    // Replace separators to OS format
    path_ = path.resolve(path_);
    return path_;
}
exports.pathResolve = pathResolve;
// checkNotInGitWorking
function checkNotInGitWorking() {
    var path_ = process.cwd();
    if (!path_.includes('extract_git_branches')) {
        throw new Error('This is not in project folder.');
    }
    while (path_.includes('extract_git_branches')) {
        path_ = path.dirname(path_);
    }
    while (path_ !== '/') {
        if (fs.existsSync(path_ + "/.git")) {
            throw new Error('This test is not supported with git submodule.');
        }
        path_ = path.dirname(path_);
    }
}
exports.checkNotInGitWorking = checkNotInGitWorking;
// getTestWorkFolderFullPath
function getTestWorkFolderFullPath() {
    var path_ = process.cwd();
    if (!path_.includes('extract_git_branches')) {
        throw new Error('This is not in project folder.');
    }
    while (path_.includes('extract_git_branches')) {
        path_ = path.dirname(path_);
    }
    return path_ + "/_test_of_extract_git_branches";
}
exports.getTestWorkFolderFullPath = getTestWorkFolderFullPath;
// pp
// Debug print.
// #keyword: pp
// Example:
//    pp(var);
// Example:
//    var d = pp(var);
//    d = d;  // Set break point here and watch the variable d
// Example:
//    try {
//
//        await main();
//    } finally {
//        var d = pp('');
//        d = [];  // Set break point here and watch the variable d
//    }
function pp(message) {
    if (typeof message === 'object') {
        message = JSON.stringify(message);
    }
    exports.debugOut.push(message.toString());
    return exports.debugOut;
}
exports.pp = pp;
exports.debugOut = [];
// cc
// Through counter.
// #keyword: cc
// Example:
//   cc();
// Example:
//   var c = cc().debugOut;  // Set break point here and watch the variable c
// Example:
//   if ( cc(2).isTarget )
//   var d = pp('');  // Set break point here and watch the variable d
function cc(targetCount, label) {
    if (targetCount === void 0) { targetCount = 9999999; }
    if (label === void 0) { label = '0'; }
    if (!(label in gCount)) {
        gCount[label] = 0;
    }
    gCount[label] += 1;
    pp(label + ":countThrough[" + label + "] = " + gCount[label]);
    var isTarget = (gCount[label] === targetCount);
    if (isTarget) {
        pp('    **** It is before the target! ****');
    }
    return { isTarget: isTarget, debugOut: exports.debugOut };
}
exports.cc = cc;
var gCount = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1QkFBeUI7QUFDekIsMkJBQTZCO0FBQzdCLG1DQUFxQztBQUVyQyxJQUFNLFlBQVksR0FBYSxFQUFDOzs7OztFQUs5QixDQUFDLENBQUM7QUFFSixzQkFBc0I7QUFDdEI7SUFBQTtRQUVJLGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBQzNCLGtCQUFhLEdBQTJCLFNBQVMsQ0FBQztJQTRDdEQsQ0FBQztJQTFDRyxnREFBa0IsR0FBbEI7UUFBQSxpQkFnQkM7UUFmRyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7WUFDdEMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1lBQ3BCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBTyxJQUFZOztnQkFDekMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztpQkFDbEM7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQy9COzs7YUFDSixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTSxtQ0FBSyxHQUFaLFVBQWEsS0FBYTs7OztnQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ2pCLElBQUks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bEMsT0FBTyxnQkFBUSxDQUFDO0FBQ3BCLENBQUM7QUFORCxnQkFNQztBQUNhLFFBQUEsUUFBUSxHQUFhLEVBQUUsQ0FBQztBQUV0QyxLQUFLO0FBQ0wsbUJBQW1CO0FBQ25CLGVBQWU7QUFDZixXQUFXO0FBQ1gsVUFBVTtBQUNWLFdBQVc7QUFDWCw2RUFBNkU7QUFDN0UsV0FBVztBQUNYLDBCQUEwQjtBQUMxQixzRUFBc0U7QUFDdEUsU0FBaUIsRUFBRSxDQUFFLFdBQTZCLEVBQUUsS0FBbUI7SUFBbEQsNEJBQUEsRUFBQSxxQkFBNkI7SUFBRSxzQkFBQSxFQUFBLFdBQW1CO0lBQ25FLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsRUFBRTtRQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3JCO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQixFQUFFLENBQUssS0FBSyxzQkFBaUIsS0FBSyxZQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUcsQ0FBRSxDQUFDO0lBQzNELElBQU0sUUFBUSxHQUFHLENBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsQ0FBRSxDQUFDO0lBRW5ELElBQUksUUFBUSxFQUFFO1FBQ1YsRUFBRSxDQUFFLHdDQUF3QyxDQUFFLENBQUM7S0FDbEQ7SUFDRCxPQUFRLEVBQUUsUUFBUSxVQUFBLEVBQUUsUUFBUSxrQkFBQSxFQUFFLENBQUM7QUFDbkMsQ0FBQztBQWJELGdCQWFDO0FBQ0QsSUFBTyxNQUFNLEdBQTZCLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCAqIGFzIHJlYWRsaW5lIGZyb20gJ3JlYWRsaW5lJztcclxuXHJcbmNvbnN0IGlucHV0RGVmYXVsdDogc3RyaW5nW10gPSBbLypcclxuICAgICd0ZXN0Lmpzb24nLFxyXG4gICAgJ2lkJyxcclxuICAgICduYW1lJyxcclxuICAgICcnXHJcbiovXTtcclxuXHJcbi8vIFN0YW5kYXJkSW5wdXRCdWZmZXJcclxuY2xhc3MgIFN0YW5kYXJkSW5wdXRCdWZmZXIge1xyXG4gICAgcmVhZGxpbmVzOiByZWFkbGluZS5JbnRlcmZhY2UgfCB1bmRlZmluZWQ7XHJcbiAgICBpbnB1dEJ1ZmZlcjogc3RyaW5nW10gPSBbXTtcclxuICAgIGlucHV0UmVzb2x2ZXI/OiAoYW5zd2VyOnN0cmluZyk9PnZvaWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgZGVsYXllZENvbnN0cnVjdG9yKCkgeyAgLy8gSXQgaXMgbm90IGNvbnN0cnVjdG9yLCBiZWNhdXNlIFwiY3JlYXRlSW50ZXJmYWNlXCIgc3RvcHMgdGhlIHByb2dyYW0sIGlmIHN0ZGluIHdhcyBub3QgdXNlZC5cclxuICAgICAgICB0aGlzLnJlYWRsaW5lcyA9IHJlYWRsaW5lLmNyZWF0ZUludGVyZmFjZSh7XHJcbiAgICAgICAgICAgIGlucHV0OiBwcm9jZXNzLnN0ZGluLFxyXG4gICAgICAgICAgICBvdXRwdXQ6IHByb2Nlc3Muc3Rkb3V0XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZWFkbGluZXMub24oJ2xpbmUnLCBhc3luYyAobGluZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0UmVzb2x2ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRSZXNvbHZlcihsaW5lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRSZXNvbHZlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRCdWZmZXIucHVzaChsaW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJlYWRsaW5lcy5zZXRQcm9tcHQoJycpO1xyXG4gICAgICAgIHRoaXMucmVhZGxpbmVzLnByb21wdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jICBpbnB1dChndWlkZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBpZiAoIXRoaXMucmVhZGxpbmVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsYXllZENvbnN0cnVjdG9yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gIG5ldyBQcm9taXNlKFxyXG4gICAgICAgICAgICAocmVzb2x2ZTogKGFuc3dlcjpzdHJpbmcpPT52b2lkLCAgcmVqZWN0OiAoYW5zd2VyOnN0cmluZyk9PnZvaWQgKSA9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgIG5leHRMaW5lID0gdGhpcy5pbnB1dEJ1ZmZlci5zaGlmdCgpO1xyXG4gICAgICAgICAgICBpZiAobmV4dExpbmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGd1aWRlICsgbmV4dExpbmUpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShuZXh0TGluZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShndWlkZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0UmVzb2x2ZXIgPSByZXNvbHZlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZGxpbmVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVhZGxpbmVzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBJbnB1dE9wdGlvblxyXG5jbGFzcyBJbnB1dE9wdGlvbiB7XHJcbiAgICBpbnB1dExpbmVzOiBzdHJpbmdbXTtcclxuICAgIG5leHRMaW5lSW5kZXg6IG51bWJlcjtcclxuICAgIG5leHRQYXJhbWV0ZXJJbmRleDogbnVtYmVyOyAgLy8gVGhlIGluZGV4IG9mIHRoZSBzdGFydGluZyBwcm9jZXNzIHBhcmFtZXRlcnNcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dExpbmVzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRMaW5lcyA9IGlucHV0TGluZXM7XHJcbiAgICAgICAgdGhpcy5uZXh0TGluZUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLm5leHRQYXJhbWV0ZXJJbmRleCA9IDI7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGlucHV0T3B0aW9uXHJcbmNvbnN0IGlucHV0T3B0aW9uID0gbmV3IElucHV0T3B0aW9uKGlucHV0RGVmYXVsdCk7XHJcblxyXG4vLyBpbnB1dFxyXG4vLyBFeGFtcGxlOiBjb25zdCBuYW1lID0gYXdhaXQgaW5wdXQoJ1doYXQgaXMgeW91ciBuYW1lPyAnKTtcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uICBpbnB1dCggZ3VpZGU6IHN0cmluZyApOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgLy8gSW5wdXQgZW11bGF0aW9uXHJcbiAgICBpZiAoaW5wdXRPcHRpb24uaW5wdXRMaW5lcykge1xyXG4gICAgICAgIGlmIChpbnB1dE9wdGlvbi5uZXh0TGluZUluZGV4IDwgaW5wdXRPcHRpb24uaW5wdXRMaW5lcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgIHZhbHVlID0gaW5wdXRPcHRpb24uaW5wdXRMaW5lc1tpbnB1dE9wdGlvbi5uZXh0TGluZUluZGV4XTtcclxuICAgICAgICAgICAgaW5wdXRPcHRpb24ubmV4dExpbmVJbmRleCArPSAxO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhndWlkZSArIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAgdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlYWQgdGhlIHN0YXJ0aW5nIHByb2Nlc3MgcGFyYW1ldGVyc1xyXG4gICAgd2hpbGUgKGlucHV0T3B0aW9uLm5leHRQYXJhbWV0ZXJJbmRleCA8IHByb2Nlc3MuYXJndi5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCAgdmFsdWUgPSBwcm9jZXNzLmFyZ3ZbaW5wdXRPcHRpb24ubmV4dFBhcmFtZXRlckluZGV4XTtcclxuICAgICAgICBpbnB1dE9wdGlvbi5uZXh0UGFyYW1ldGVySW5kZXggKz0gMTtcclxuICAgICAgICBpZiAodmFsdWUuc3Vic3RyKDAsMSkgIT09ICctJykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhndWlkZSArIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAgdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gJy0tdGVzdCcpIHtcclxuICAgICAgICAgICAgaW5wdXRPcHRpb24ubmV4dFBhcmFtZXRlckluZGV4ICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGlucHV0XHJcbiAgICByZXR1cm4gIElucHV0T2JqZWN0LmlucHV0KGd1aWRlKTtcclxufVxyXG5jb25zdCAgSW5wdXRPYmplY3QgPSBuZXcgU3RhbmRhcmRJbnB1dEJ1ZmZlcigpO1xyXG5leHBvcnQgZnVuY3Rpb24gIGdldElucHV0T2JqZWN0KCk6IFN0YW5kYXJkSW5wdXRCdWZmZXIge1xyXG4gICAgcmV0dXJuICBJbnB1dE9iamVjdDtcclxufVxyXG5cclxuLy8gaW5wdXRQYXRoXHJcbi8vIEV4YW1wbGU6IGNvbnN0IG5hbWUgPSBhd2FpdCBpbnB1dCgnV2hhdCBpcyB5b3VyIG5hbWU/ICcpO1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gIGlucHV0UGF0aCggZ3VpZGU6IHN0cmluZyApIHtcclxuICAgIGNvbnN0ICBrZXkgPSBhd2FpdCBpbnB1dChndWlkZSk7XHJcbiAgICBpZiAoa2V5LmVuZHNXaXRoKCcoKScpKSB7XHJcbiAgICAgICAgcmV0dXJuICBrZXk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAgcGF0aFJlc29sdmUoa2V5KTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gaW5wdXRTa2lwXHJcbmV4cG9ydCBmdW5jdGlvbiAgaW5wdXRTa2lwKGNvdW50OiBudW1iZXIpIHtcclxuICAgIGlucHV0T3B0aW9uLm5leHRQYXJhbWV0ZXJJbmRleCArPSBjb3VudDtcclxufVxyXG5cclxuLy8gcGF0aFJlc29sdmVcclxuZXhwb3J0IGZ1bmN0aW9uICBwYXRoUmVzb2x2ZShwYXRoXzogc3RyaW5nKSB7XHJcblxyXG4gICAgLy8gJy9jL2hvbWUnIGZvcm1hdCB0byBjdXJyZW50IE9TIGZvcm1hdFxyXG4gICAgaWYgKHBhdGhfLmxlbmd0aCA+PSAzKSB7XHJcbiAgICAgICAgaWYgKHBhdGhfWzBdID09PSAnLycgICYmICBwYXRoX1syXSA9PT0gJy8nKSB7XHJcbiAgICAgICAgICAgIHBhdGhfID0gcGF0aF9bMV0gKyc6JysgcGF0aF8uc3Vic3RyKDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXBsYWNlIHNlcGFyYXRvcnMgdG8gT1MgZm9ybWF0XHJcbiAgICBwYXRoXyA9IHBhdGgucmVzb2x2ZShwYXRoXyk7XHJcblxyXG4gICAgcmV0dXJuIHBhdGhfXHJcbn1cclxuXHJcbi8vIGNoZWNrTm90SW5HaXRXb3JraW5nXHJcbmV4cG9ydCBmdW5jdGlvbiAgY2hlY2tOb3RJbkdpdFdvcmtpbmcoKSB7XHJcbiAgICB2YXIgIHBhdGhfID0gcHJvY2Vzcy5jd2QoKTtcclxuXHJcbiAgICBpZiAoICEgcGF0aF8uaW5jbHVkZXMoJ2V4dHJhY3RfZ2l0X2JyYW5jaGVzJykpIHtcclxuICAgICAgICB0aHJvdyAgbmV3IEVycm9yKCdUaGlzIGlzIG5vdCBpbiBwcm9qZWN0IGZvbGRlci4nKVxyXG4gICAgfVxyXG4gICAgd2hpbGUgKHBhdGhfLmluY2x1ZGVzKCdleHRyYWN0X2dpdF9icmFuY2hlcycpKSB7XHJcbiAgICAgICAgcGF0aF8gPSBwYXRoLmRpcm5hbWUocGF0aF8pO1xyXG4gICAgfVxyXG4gICAgd2hpbGUgKHBhdGhfICE9PSAnLycpIHtcclxuXHJcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoYCR7cGF0aF99Ly5naXRgKSkge1xyXG4gICAgICAgICAgICB0aHJvdyAgbmV3IEVycm9yKCdUaGlzIHRlc3QgaXMgbm90IHN1cHBvcnRlZCB3aXRoIGdpdCBzdWJtb2R1bGUuJylcclxuICAgICAgICB9XHJcbiAgICAgICAgcGF0aF8gPSBwYXRoLmRpcm5hbWUocGF0aF8pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBnZXRUZXN0V29ya0ZvbGRlckZ1bGxQYXRoXHJcbmV4cG9ydCBmdW5jdGlvbiAgZ2V0VGVzdFdvcmtGb2xkZXJGdWxsUGF0aCgpOiBzdHJpbmcge1xyXG4gICAgdmFyICBwYXRoXyA9IHByb2Nlc3MuY3dkKCk7XHJcblxyXG4gICAgaWYgKCAhIHBhdGhfLmluY2x1ZGVzKCdleHRyYWN0X2dpdF9icmFuY2hlcycpKSB7XHJcbiAgICAgICAgdGhyb3cgIG5ldyBFcnJvcignVGhpcyBpcyBub3QgaW4gcHJvamVjdCBmb2xkZXIuJylcclxuICAgIH1cclxuICAgIHdoaWxlIChwYXRoXy5pbmNsdWRlcygnZXh0cmFjdF9naXRfYnJhbmNoZXMnKSkge1xyXG4gICAgICAgIHBhdGhfID0gcGF0aC5kaXJuYW1lKHBhdGhfKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gIGAke3BhdGhffS9fdGVzdF9vZl9leHRyYWN0X2dpdF9icmFuY2hlc2A7XHJcbn1cclxuXHJcbi8vIHBwXHJcbi8vIERlYnVnIHByaW50LlxyXG4vLyAja2V5d29yZDogcHBcclxuLy8gRXhhbXBsZTpcclxuLy8gICAgcHAodmFyKTtcclxuLy8gRXhhbXBsZTpcclxuLy8gICAgdmFyIGQgPSBwcCh2YXIpO1xyXG4vLyAgICBkID0gZDsgIC8vIFNldCBicmVhayBwb2ludCBoZXJlIGFuZCB3YXRjaCB0aGUgdmFyaWFibGUgZFxyXG4vLyBFeGFtcGxlOlxyXG4vLyAgICB0cnkge1xyXG4vL1xyXG4vLyAgICAgICAgYXdhaXQgbWFpbigpO1xyXG4vLyAgICB9IGZpbmFsbHkge1xyXG4vLyAgICAgICAgdmFyIGQgPSBwcCgnJyk7XHJcbi8vICAgICAgICBkID0gW107ICAvLyBTZXQgYnJlYWsgcG9pbnQgaGVyZSBhbmQgd2F0Y2ggdGhlIHZhcmlhYmxlIGRcclxuLy8gICAgfVxyXG5leHBvcnQgZnVuY3Rpb24gIHBwKG1lc3NhZ2U6IGFueSkge1xyXG4gICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeShtZXNzYWdlKTtcclxuICAgIH1cclxuICAgIGRlYnVnT3V0LnB1c2gobWVzc2FnZS50b1N0cmluZygpKTtcclxuICAgIHJldHVybiBkZWJ1Z091dDtcclxufVxyXG5leHBvcnQgY29uc3QgIGRlYnVnT3V0OiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuLy8gY2NcclxuLy8gVGhyb3VnaCBjb3VudGVyLlxyXG4vLyAja2V5d29yZDogY2NcclxuLy8gRXhhbXBsZTpcclxuLy8gICBjYygpO1xyXG4vLyBFeGFtcGxlOlxyXG4vLyAgIHZhciBjID0gY2MoKS5kZWJ1Z091dDsgIC8vIFNldCBicmVhayBwb2ludCBoZXJlIGFuZCB3YXRjaCB0aGUgdmFyaWFibGUgY1xyXG4vLyBFeGFtcGxlOlxyXG4vLyAgIGlmICggY2MoMikuaXNUYXJnZXQgKVxyXG4vLyAgIHZhciBkID0gcHAoJycpOyAgLy8gU2V0IGJyZWFrIHBvaW50IGhlcmUgYW5kIHdhdGNoIHRoZSB2YXJpYWJsZSBkXHJcbmV4cG9ydCBmdW5jdGlvbiAgY2MoIHRhcmdldENvdW50OiBudW1iZXIgPSA5OTk5OTk5LCBsYWJlbDogc3RyaW5nID0gJzAnICkge1xyXG4gICAgaWYgKCEobGFiZWwgaW4gZ0NvdW50KSkge1xyXG4gICAgICAgIGdDb3VudFtsYWJlbF0gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdDb3VudFtsYWJlbF0gKz0gMTtcclxuICAgIHBwKCBgJHtsYWJlbH06Y291bnRUaHJvdWdoWyR7bGFiZWx9XSA9ICR7Z0NvdW50W2xhYmVsXX1gICk7XHJcbiAgICBjb25zdCBpc1RhcmdldCA9ICggZ0NvdW50W2xhYmVsXSA9PT0gdGFyZ2V0Q291bnQgKTtcclxuXHJcbiAgICBpZiAoaXNUYXJnZXQpIHtcclxuICAgICAgICBwcCggJyAgICAqKioqIEl0IGlzIGJlZm9yZSB0aGUgdGFyZ2V0ISAqKioqJyApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICB7IGlzVGFyZ2V0LCBkZWJ1Z091dCB9O1xyXG59XHJcbmNvbnN0ICBnQ291bnQ6IHtbbmFtZTogc3RyaW5nXTogbnVtYmVyfSA9IHt9O1xyXG4iXX0=