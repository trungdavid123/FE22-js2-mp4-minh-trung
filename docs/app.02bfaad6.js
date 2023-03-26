// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"EVxB":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Calculator = /*#__PURE__*/function () {
  function Calculator(previousValueTextElement, currentValueTextElement, value) {
    _classCallCheck(this, Calculator);
    this.previousValueTextElement = previousValueTextElement;
    this.currentValueTextElement = currentValueTextElement;
    this.value = value;
  }
  _createClass(Calculator, [{
    key: "appendNumber",
    value: function appendNumber() {
      var isOperator = /[+*./,\-]/g;
      if (this.value.match(isOperator) && this.currentValueTextElement.innerText.length > 0) {
        this.previousValueTextElement.innerText = this.currentValueTextElement.innerText;
        this.currentValueTextElement.innerText = "";
        this.previousValueTextElement.classList.add('hidden');
      }
      var stringNumber = this.currentValueTextElement.innerText.toString().replace(/,/g, '') + this.value.toString();
      this.currentValueTextElement.innerText = this.displayNumber(stringNumber);
    }
  }, {
    key: "displayNumber",
    value: function displayNumber(stringNumber) {
      var floatNumber = parseFloat(stringNumber);
      if (isNaN(floatNumber)) return "";
      return floatNumber.toLocaleString('en');
    }
  }, {
    key: "compute",
    value: function compute(operation) {
      var computation;
      var prev = parseFloat(this.previousValueTextElement.innerText.replace(/,/g, ''));
      var current = parseFloat(this.currentValueTextElement.innerText.replace(/,/g, ''));
      if (isNaN(prev) || isNaN(current)) return;
      switch (operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
          computation = prev * current;
          break;
        case '/':
          computation = prev / current;
          break;
        default:
          return;
      }
      this.currentValueTextElement.innerText = computation.toString();
    }
  }, {
    key: "delete",
    value: function _delete() {
      this.currentValueTextElement.innerText = this.currentValueTextElement.innerText.toString().slice(0, -1);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.currentValueTextElement.innerText = "";
    }
  }]);
  return Calculator;
}();
var btnList = document.querySelectorAll('button');
var previousValue = document.querySelector('.previous-value');
var currentValue = document.querySelector('.current-value');
var operation;
var lastTarget;
btnList.forEach(function (btn) {
  var _a;
  (_a = btn === null || btn === void 0 ? void 0 : btn.parentNode) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (e) {
    var _a, _b, _c, _d;
    var isOperator = /[+,*,.,/\-]/g;
    btnList.forEach(function (item) {
      var _a;
      return (_a = item === null || item === void 0 ? void 0 : item.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove("bg-slate-900", "text-white");
    });
    var calculator = new Calculator(previousValue, currentValue, btn.innerText);
    currentValue.innerText = currentValue.innerText.replace(/[+*./=\-]/g, "");
    if (btn.innerText.match(isOperator)) {
      (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add("bg-slate-900", "text-white");
      operation = btn.innerText;
    } else if (btn.innerText === "=") {
      (_b = btn.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("bg-slate-900", "text-white");
      setTimeout(function () {
        btnList.forEach(function (item) {
          var _a;
          return (_a = item === null || item === void 0 ? void 0 : item.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove("bg-slate-900", "text-white");
        });
        currentValue.innerText = "";
      }, 2000);
      calculator.compute(operation);
    } else if (btn.innerText === "DEL") {
      (_c = btn.parentElement) === null || _c === void 0 ? void 0 : _c.classList.add("bg-slate-900", "text-white");
      calculator.delete();
    } else if (btn.innerText === "AC") {
      (_d = btn.parentElement) === null || _d === void 0 ? void 0 : _d.classList.add("bg-slate-900", "text-white");
      calculator.remove();
    }
    calculator.appendNumber();
  });
});
},{}]},{},["EVxB"], null)
//# sourceMappingURL=app.02bfaad6.js.map