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

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
  var _btn$parentNode;
  btn === null || btn === void 0 ? void 0 : (_btn$parentNode = btn.parentNode) === null || _btn$parentNode === void 0 ? void 0 : _btn$parentNode.addEventListener('click', function (e) {
    var isOperator = /[+,*,.,/\-]/g;
    btnList.forEach(function (item) {
      var _item$parentElement;
      return item === null || item === void 0 ? void 0 : (_item$parentElement = item.parentElement) === null || _item$parentElement === void 0 ? void 0 : _item$parentElement.classList.remove("bg-slate-900", "text-white");
    });
    var calculator = new Calculator(previousValue, currentValue, btn.innerText);
    currentValue.innerText = currentValue.innerText.replace(/[+*./=\-]/g, "");
    if (btn.innerText.match(isOperator)) {
      var _btn$parentElement;
      (_btn$parentElement = btn.parentElement) === null || _btn$parentElement === void 0 ? void 0 : _btn$parentElement.classList.add("bg-slate-900", "text-white");
      operation = btn.innerText;
    } else if (btn.innerText === "=") {
      var _btn$parentElement2;
      (_btn$parentElement2 = btn.parentElement) === null || _btn$parentElement2 === void 0 ? void 0 : _btn$parentElement2.classList.add("bg-slate-900", "text-white");
      setTimeout(function () {
        btnList.forEach(function (item) {
          var _item$parentElement2;
          return item === null || item === void 0 ? void 0 : (_item$parentElement2 = item.parentElement) === null || _item$parentElement2 === void 0 ? void 0 : _item$parentElement2.classList.remove("bg-slate-900", "text-white");
        });
        currentValue.innerText = "";
      }, 2000);
      calculator.compute(operation);
    } else if (btn.innerText === "DEL") {
      var _btn$parentElement3;
      (_btn$parentElement3 = btn.parentElement) === null || _btn$parentElement3 === void 0 ? void 0 : _btn$parentElement3.classList.add("bg-slate-900", "text-white");
      calculator.delete();
    } else if (btn.innerText === "AC") {
      var _btn$parentElement4;
      (_btn$parentElement4 = btn.parentElement) === null || _btn$parentElement4 === void 0 ? void 0 : _btn$parentElement4.classList.add("bg-slate-900", "text-white");
      calculator.remove();
    }
    calculator.appendNumber();
  });
});
var div = document.querySelector(".container_section");
var img = document.createElement('img');
div.append(img);
img.classList.add('nav__logo', "mb-3", "ml-3");
var imgURL = new URL('./logo.5f25a564.svg', import.meta.url);
img.src = imgURL.toString();
},{}]},{},["EVxB"], null)
//# sourceMappingURL=app.0cf745bc.js.map