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
var fs = require("fs"); // or fs = require("fs")  // file system
var lib = require("./lib"); // or fs = require("fs")  // file system
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var input_file_path, output_file_path, a_JSON, an_object, formatted_JSON;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lib.input("Input JSON UTF-8 file path>")];
                case 1:
                    input_file_path = _a.sent();
                    output_file_path = input_file_path + ".updating";
                    a_JSON = fs.readFileSync(input_file_path, "utf-8");
                    return [4 /*yield*/, inputPriorityKeys()];
                case 2:
                    _a.sent();
                    an_object = JSON.parse(a_JSON);
                    formatted_JSON = JSON.stringify(an_object, sortWithPriority, "\t");
                    fs.writeFileSync(output_file_path, formatted_JSON);
                    console.log('Sorted.');
                    return [2 /*return*/];
            }
        });
    });
}
var priorityKeyNames = [];
var orders = [];
function inputPriorityKeys() {
    return __awaiter(this, void 0, void 0, function () {
        var key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, lib.input("Priority key name (To continue, enter only)>")];
                case 1:
                    key = _a.sent();
                    if (key === '' || key === '\\') {
                        return [2 /*return*/];
                    }
                    priorityKeyNames.push(key);
                    orders.push({ key: key, reverse: false });
                    _a.label = 2;
                case 2: return [3 /*break*/, 0];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function sortWithPriority(_, nodeValue) {
    var nodeType = 'other';
    if (nodeValue !== null) {
        if (typeof nodeValue === 'object') {
            if (nodeValue instanceof Array) {
                nodeType = 'Array';
            }
            else {
                nodeType = 'object';
            }
        }
    }
    if (nodeType === 'object') {
        var nodeObject_1 = nodeValue;
        var returnObject = {};
        var copyAValueFunction = function (returnObject, key) {
            returnObject[key] = nodeObject_1[key];
            return returnObject;
        };
        var priorityCompareFunction = function (a, b) {
            var aPriority = priorityKeyNames.indexOf(a);
            var bPriority = priorityKeyNames.indexOf(b);
            if (aPriority === notFound) {
                if (bPriority === notFound) {
                    if (a < b) {
                        return -1;
                    }
                    else if (a > b) {
                        return +1;
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    return +1;
                }
            }
            else {
                if (bPriority === notFound) {
                    return -1;
                }
                else {
                    return aPriority - bPriority;
                }
            }
        };
        var objectAttributeNames = Object.keys(nodeObject_1).sort(priorityCompareFunction);
        returnObject = objectAttributeNames.reduce(copyAValueFunction, returnObject);
        return returnObject;
    }
    else if (nodeType === 'Array') {
        return nodeValue.sort(sortBy(orders));
    }
    else {
        return nodeValue;
    }
}
function sortBy(orders) {
    return function (a, b) {
        for (var _i = 0, orders_1 = orders; _i < orders_1.length; _i++) {
            var order = orders_1[_i];
            if (a[order.key] !== b[order.key]) {
                var orderBy = order.reverse ? 1 : -1;
                if (a[order.key] < b[order.key]) {
                    return orderBy;
                }
                else {
                    return orderBy * -1;
                }
            }
        }
        return 0;
    };
}
function callMain() {
    return __awaiter(this, void 0, void 0, function () {
        var dummy, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 4]);
                    return [4 /*yield*/, main()];
                case 1:
                    _a.sent();
                    dummy = 0;
                    return [3 /*break*/, 4];
                case 2:
                    e_1 = _a.sent();
                    console.log("ERROR: " + e_1.message);
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var notFound = -1;
callMain();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydF9qc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NvcnRfanNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVCQUF5QixDQUFFLHdDQUF3QztBQUNuRSwyQkFBNkIsQ0FBRSx3Q0FBd0M7QUFFdkUsU0FBZ0IsSUFBSTs7Ozs7d0JBQ00scUJBQU0sR0FBRyxDQUFDLEtBQUssQ0FBRSw2QkFBNkIsQ0FBRSxFQUFBOztvQkFBbEUsZUFBZSxHQUFHLFNBQWdEO29CQUNsRSxnQkFBZ0IsR0FBRyxlQUFlLEdBQUUsV0FBVyxDQUFDO29CQUNoRCxNQUFNLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBRSxlQUFlLEVBQUcsT0FBTyxDQUFFLENBQUM7b0JBQzdELHFCQUFPLGlCQUFpQixFQUFFLEVBQUE7O29CQUExQixTQUEwQixDQUFDO29CQUVwQixTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBRSxNQUFNLENBQUUsQ0FBQztvQkFDakMsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBRSxDQUFDO29CQUM1RSxFQUFFLENBQUMsYUFBYSxDQUFFLGdCQUFnQixFQUFHLGNBQWMsQ0FBRSxDQUFDO29CQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7OztDQUN2QjtBQUVELElBQU8sZ0JBQWdCLEdBQUcsRUFBYyxDQUFDO0FBQ3pDLElBQU8sTUFBTSxHQUFHLEVBQVcsQ0FBQztBQUM1QixTQUFnQixpQkFBaUI7Ozs7O3dCQUVsQixxQkFBTSxHQUFHLENBQUMsS0FBSyxDQUFFLDhDQUE4QyxDQUFFLEVBQUE7O29CQUF2RSxHQUFHLEdBQUcsU0FBaUU7b0JBQzlFLElBQUksR0FBRyxLQUFLLEVBQUUsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO3dCQUMvQixzQkFBTztx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SSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ2hDLE9BQU8sT0FBTyxDQUFDO2lCQUNmO3FCQUFNO29CQUNOLE9BQU8sT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNwQjthQUNEO1NBQ0Q7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNWLENBQUMsQ0FBQztBQUNILENBQUM7QUFFRCxTQUFnQixRQUFROzs7Ozs7O29CQUV0QixxQkFBTyxJQUFJLEVBQUUsRUFBQTs7b0JBQWIsU0FBYSxDQUFDO29CQUNQLEtBQUssR0FBRyxDQUFDLENBQUM7Ozs7b0JBRWpCLE9BQU8sQ0FBQyxHQUFHLENBQUUsWUFBVSxHQUFDLENBQUMsT0FBUyxDQUFFLENBQUM7b0JBQ3JDLHFCQUFNLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxFQUFBOztvQkFBdkQsU0FBdUQsQ0FBQzs7Ozs7O0NBRXpEO0FBQ0QsSUFBTyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDckIsUUFBUSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjsgIC8vIG9yIGZzID0gcmVxdWlyZShcImZzXCIpICAvLyBmaWxlIHN5c3RlbVxyXG5pbXBvcnQgKiBhcyBsaWIgZnJvbSBcIi4vbGliXCI7ICAvLyBvciBmcyA9IHJlcXVpcmUoXCJmc1wiKSAgLy8gZmlsZSBzeXN0ZW1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uICBtYWluKCkge1xyXG5cdGNvbnN0ICBpbnB1dF9maWxlX3BhdGggPSBhd2FpdCBsaWIuaW5wdXQoIFwiSW5wdXQgSlNPTiBVVEYtOCBmaWxlIHBhdGg+XCIgKTtcclxuXHRjb25zdCAgb3V0cHV0X2ZpbGVfcGF0aCA9IGlucHV0X2ZpbGVfcGF0aCArXCIudXBkYXRpbmdcIjtcclxuXHRjb25zdCAgYV9KU09OID0gZnMucmVhZEZpbGVTeW5jKCBpbnB1dF9maWxlX3BhdGgsICBcInV0Zi04XCIgKTtcclxuXHRhd2FpdCAgaW5wdXRQcmlvcml0eUtleXMoKTtcclxuXHJcblx0Y29uc3QgIGFuX29iamVjdCA9IEpTT04ucGFyc2UoIGFfSlNPTiApO1xyXG5cdGNvbnN0ICBmb3JtYXR0ZWRfSlNPTiA9IEpTT04uc3RyaW5naWZ5KCBhbl9vYmplY3QsIHNvcnRXaXRoUHJpb3JpdHksIFwiXFx0XCIgKTtcclxuXHRmcy53cml0ZUZpbGVTeW5jKCBvdXRwdXRfZmlsZV9wYXRoLCAgZm9ybWF0dGVkX0pTT04gKTtcclxuXHRjb25zb2xlLmxvZygnU29ydGVkLicpO1xyXG59XHJcblxyXG5jb25zdCAgcHJpb3JpdHlLZXlOYW1lcyA9IFtdIGFzIHN0cmluZ1tdO1xyXG5jb25zdCAgb3JkZXJzID0gW10gYXMgYW55W107XHJcbmFzeW5jIGZ1bmN0aW9uICBpbnB1dFByaW9yaXR5S2V5cygpIHtcclxuXHRmb3IgKDs7KSB7XHJcblx0XHRjb25zdCAga2V5ID0gYXdhaXQgbGliLmlucHV0KCBcIlByaW9yaXR5IGtleSBuYW1lIChUbyBjb250aW51ZSwgZW50ZXIgb25seSk+XCIgKTtcclxuXHRcdGlmIChrZXkgPT09ICcnIHx8IGtleSA9PT0gJ1xcXFwnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHByaW9yaXR5S2V5TmFtZXMucHVzaChrZXkpO1xyXG5cdFx0b3JkZXJzLnB1c2goe2tleSwgcmV2ZXJzZTogZmFsc2V9KTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uICBzb3J0V2l0aFByaW9yaXR5KF86IGFueSwgbm9kZVZhbHVlOiBhbnkpIHtcclxuXHRsZXQgIG5vZGVUeXBlID0gJ290aGVyJztcclxuXHRpZiAobm9kZVZhbHVlICE9PSBudWxsKSB7XHJcblx0XHRpZiAodHlwZW9mIG5vZGVWYWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aWYgKG5vZGVWYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdFx0bm9kZVR5cGUgPSAnQXJyYXknO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG5vZGVUeXBlID0gJ29iamVjdCc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlmIChub2RlVHlwZSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdGNvbnN0ICBub2RlT2JqZWN0ID0gbm9kZVZhbHVlO1xyXG5cdFx0bGV0ICByZXR1cm5PYmplY3QgPSB7fVxyXG5cdFx0Y29uc3QgIGNvcHlBVmFsdWVGdW5jdGlvbiA9IGZ1bmN0aW9uKHJldHVybk9iamVjdDogYW55LCBrZXk6IHN0cmluZykge1xyXG5cdFx0XHRyZXR1cm5PYmplY3Rba2V5XSA9IG5vZGVPYmplY3Rba2V5XTtcclxuXHRcdFx0cmV0dXJuICByZXR1cm5PYmplY3Q7XHJcblx0XHR9XHJcblx0XHRjb25zdCAgcHJpb3JpdHlDb21wYXJlRnVuY3Rpb24gPSBmdW5jdGlvbihhOiBzdHJpbmcsIGI6IHN0cmluZykge1xyXG5cdFx0XHRjb25zdCAgYVByaW9yaXR5ID0gcHJpb3JpdHlLZXlOYW1lcy5pbmRleE9mKGEpXHJcblx0XHRcdGNvbnN0ICBiUHJpb3JpdHkgPSBwcmlvcml0eUtleU5hbWVzLmluZGV4T2YoYilcclxuXHRcdFx0aWYgKGFQcmlvcml0eSA9PT0gbm90Rm91bmQpIHtcclxuXHRcdFx0XHRpZiAoYlByaW9yaXR5ID09PSBub3RGb3VuZCkge1xyXG5cdFx0XHRcdFx0aWYgKGEgPCBiKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiAgLTE7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGEgPiBiKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiAgKzE7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gIDA7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJldHVybiAgKzE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmIChiUHJpb3JpdHkgPT09IG5vdEZvdW5kKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gIC0xO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gIGFQcmlvcml0eSAtIGJQcmlvcml0eTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCAgb2JqZWN0QXR0cmlidXRlTmFtZXMgPSBPYmplY3Qua2V5cyhub2RlT2JqZWN0KS5zb3J0KHByaW9yaXR5Q29tcGFyZUZ1bmN0aW9uKTtcclxuXHRcdHJldHVybk9iamVjdCA9IG9iamVjdEF0dHJpYnV0ZU5hbWVzLnJlZHVjZShjb3B5QVZhbHVlRnVuY3Rpb24sIHJldHVybk9iamVjdCk7XHJcblx0XHRyZXR1cm4gIHJldHVybk9iamVjdDtcclxuXHR9XHJcblx0ZWxzZSBpZiAobm9kZVR5cGUgPT09ICdBcnJheScpIHtcclxuXHRcdHJldHVybiAgbm9kZVZhbHVlLnNvcnQoc29ydEJ5KG9yZGVycykpO1xyXG5cdH1cclxuXHRlbHNlIHtcclxuXHRcdHJldHVybiAgbm9kZVZhbHVlO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gIHNvcnRCeShvcmRlcnM6IGFueVtdKSB7XHJcblx0cmV0dXJuIChhOiBhbnksIGI6IGFueSkgPT4ge1xyXG5cdFx0Zm9yIChjb25zdCBvcmRlciBvZiBvcmRlcnMpIHtcclxuXHRcdFx0aWYgKGFbb3JkZXIua2V5XSAhPT0gYltvcmRlci5rZXldKSB7XHJcblx0XHRcdFx0Y29uc3QgIG9yZGVyQnkgPSBvcmRlci5yZXZlcnNlID8gMSA6IC0xO1xyXG5cdFx0XHRcdGlmIChhW29yZGVyLmtleV0gPCBiW29yZGVyLmtleV0pIHtcclxuXHRcdFx0XHRcdHJldHVybiBvcmRlckJ5O1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gb3JkZXJCeSAqIC0xO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIDA7XHJcblx0fTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gIGNhbGxNYWluKCkge1xyXG5cdHRyeSB7XHJcblx0XHRhd2FpdCAgbWFpbigpO1xyXG5cdFx0Y29uc3QgIGR1bW15ID0gMDtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRjb25zb2xlLmxvZyggYEVSUk9SOiAke2UubWVzc2FnZX1gICk7XHJcblx0XHRhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgNTAwMCkpO1xyXG5cdH1cclxufVxyXG5jb25zdCAgbm90Rm91bmQgPSAtMTtcclxuY2FsbE1haW4oKTtcclxuIl19