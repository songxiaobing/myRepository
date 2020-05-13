/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./FrontProjects/Student/src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./FrontProjects/Student/src/controllers/StudentMain.js":
/*!**************************************************************!*\
  !*** ./FrontProjects/Student/src/controllers/StudentMain.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _views_StudentMain_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/StudentMain.html */ \"./FrontProjects/Student/src/views/StudentMain.html\");\n/* harmony import */ var _views_StudentMain_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_views_StudentMain_html__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _commons_Dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../commons/Dialog */ \"./FrontProjects/commons/Dialog.js\");\n/* harmony import */ var _commons_components_ClientList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../commons/components/ClientList */ \"./FrontProjects/commons/components/ClientList.js\");\n\r\n\r\n\r\n\r\nconst StudentMain = Vue.component(\"student-main\", {\r\n    template: _views_StudentMain_html__WEBPACK_IMPORTED_MODULE_0___default.a,\r\n    data() {\r\n        return {\r\n            classroomName: \"\"\r\n        };\r\n    },\r\n    mounted() {\r\n        this._socket = io();\r\n        this._remoteStream = new MediaStream();\r\n        this.$refs.remote_preview.srcObject = this._remoteStream;\r\n\r\n        this.addSocketListeners();\r\n        this.showJoinClassroomDialog();\r\n    },\r\n\r\n    methods: {\r\n        addSocketListeners() {\r\n            this._socket.on(\"listClients\", clients => {\r\n                this.$refs.client_list.setClients(clients);\r\n            });\r\n            this._socket.on(\"teacherOffer\", async data => {\r\n                console.log(data);\r\n                this._teacherId = data.from;\r\n                this._answerPc = new RTCPeerConnection();\r\n                this._answerPc.onicecandidate = e => {\r\n                    if (e.candidate) {\r\n                        this._socket.emit(\"ice\", {from: this._socket.id, to: this._teacherId, ice: e.candidate});\r\n                    }\r\n                };\r\n\r\n                this._answerPc.ontrack = e => {\r\n                    console.log(e);\r\n                    this._remoteStream.addTrack(e.track);\r\n                };\r\n\r\n                await this._answerPc.setRemoteDescription(new RTCSessionDescription(data.offer));\r\n\r\n                let answer = await this._answerPc.createAnswer();\r\n                await this._answerPc.setLocalDescription(new RTCSessionDescription(answer));\r\n                this._socket.emit(\"studentAnswer\", {from: this._socket.id, to: this._teacherId, answer: answer});\r\n            });\r\n            this._socket.on(\"ice\", data => {\r\n                this._answerPc.addIceCandidate(new RTCIceCandidate(data.ice));\r\n            });\r\n        },\r\n\r\n        showJoinClassroomDialog() {\r\n            _commons_Dialog__WEBPACK_IMPORTED_MODULE_1__[\"default\"].showInput(\"请输入教室名称\", (name) => {\r\n                if (name) {\r\n                    let ld = _commons_Dialog__WEBPACK_IMPORTED_MODULE_1__[\"default\"].showLoading(\"正在加入教室...\");\r\n                    this._socket.emit(\"joinClassroom\", name, () => {\r\n                        ld.modal(\"hide\");\r\n                        this.classroomName = name;\r\n                    });\r\n                } else {\r\n                    this.showJoinClassroomDialog();\r\n                }\r\n            }, \"static\", false, false, \"\", \"加入\");\r\n        },\r\n    }\r\n});\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (StudentMain);\n\n//# sourceURL=webpack:///./FrontProjects/Student/src/controllers/StudentMain.js?");

/***/ }),

/***/ "./FrontProjects/Student/src/main.js":
/*!*******************************************!*\
  !*** ./FrontProjects/Student/src/main.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_StudentMain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/StudentMain */ \"./FrontProjects/Student/src/controllers/StudentMain.js\");\n\r\n\r\nlet app = new _controllers_StudentMain__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\nlet root = document.createElement(\"div\");\r\ndocument.body.appendChild(root);\r\napp.$mount(root);\n\n//# sourceURL=webpack:///./FrontProjects/Student/src/main.js?");

/***/ }),

/***/ "./FrontProjects/Student/src/views/StudentMain.html":
/*!**********************************************************!*\
  !*** ./FrontProjects/Student/src/views/StudentMain.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"card\\\">\\r\\n    <div class=\\\"card-header\\\">\\r\\n        教室：{{classroomName}}\\r\\n    </div>\\r\\n    <div style=\\\"display: flex;flex-direction: row;\\\">\\r\\n        <client-list ref=\\\"client_list\\\"></client-list>\\r\\n        <video style=\\\"display: block;width: 480px;height: 320px\\\" autoplay ref=\\\"remote_preview\\\"></video>\\r\\n    </div>\\r\\n</div>\";\n\n//# sourceURL=webpack:///./FrontProjects/Student/src/views/StudentMain.html?");

/***/ }),

/***/ "./FrontProjects/commons/Dialog.js":
/*!*****************************************!*\
  !*** ./FrontProjects/commons/Dialog.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Dialog = {\r\n    showInput(title, callback, backdrop = true, keyboard = true, showCloseBtn = true, cancelBtnLabel = \"取消\", okBtnLabel = \"确定\") {\r\n        $(`<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">${title}</h5>\r\n        ${showCloseBtn ? \"<button type=\\\"button\\\" class=\\\"close\\\" data-dismiss=\\\"modal\\\" aria-label=\\\"Close\\\"><span aria-hidden=\\\"true\\\">&times;</span></button>\" : \"\"}\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <input type=\"text\" class=\"message-input form-control\">\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        ${cancelBtnLabel ? \"<button type=\\\"button\\\" class=\\\"btn btn-secondary\\\" data-dismiss=\\\"modal\\\">\" + cancelBtnLabel + \"</button>\" : \"\"}\r\n        ${okBtnLabel ? \"<button type=\\\"button\\\" class=\\\"btn btn-primary\\\" data-dismiss=\\\"modal\\\">\" + okBtnLabel + \"</button>\" : \"\"}\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>`).appendTo(document.body).modal({\r\n            keyboard: keyboard,\r\n            backdrop: backdrop\r\n        }).on(\"hidden.bs.modal\", function () {\r\n            let jqThis = $(this);\r\n            if (callback) {\r\n                callback(jqThis.find(\".message-input\").val());\r\n            }\r\n            jqThis.remove();\r\n        });\r\n    },\r\n\r\n    showMessageBox(msg, title = \"\", closeCallback = null) {\r\n        $(`<div class=\"modal fade\" id=\"staticBackdrop\" data-backdrop=\"static\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"staticBackdropLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"staticBackdropLabel\">${title}</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        ${msg}\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">OK</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>`).appendTo(document.body).modal().on(\"hidden.bs.modal\", function () {\r\n            $(this).remove();\r\n\r\n            if (closeCallback) {\r\n                closeCallback();\r\n            }\r\n        });\r\n    },\r\n\r\n\r\n    showLoading(msg) {\r\n        return $(`<div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-body\">\r\n        ${msg}\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>`).modal({\r\n            keyboard: false,\r\n            backdrop: \"static\"\r\n        }).on(\"hidden.bs.modal\", function () {\r\n            $(this).remove();\r\n        });\r\n    }\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Dialog);\n\n//# sourceURL=webpack:///./FrontProjects/commons/Dialog.js?");

/***/ }),

/***/ "./FrontProjects/commons/components/ClientList.html":
/*!**********************************************************!*\
  !*** ./FrontProjects/commons/components/ClientList.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"card\\\" style=\\\"width: 220px;\\\">\\r\\n    <div class=\\\"card-header\\\">\\r\\n        所有人\\r\\n    </div>\\r\\n    <div>\\r\\n        <div v-for=\\\"c in clients\\\">\\r\\n            {{c}}\\r\\n        </div>\\r\\n    </div>\\r\\n</div>\";\n\n//# sourceURL=webpack:///./FrontProjects/commons/components/ClientList.html?");

/***/ }),

/***/ "./FrontProjects/commons/components/ClientList.js":
/*!********************************************************!*\
  !*** ./FrontProjects/commons/components/ClientList.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ClientList_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClientList.html */ \"./FrontProjects/commons/components/ClientList.html\");\n/* harmony import */ var _ClientList_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ClientList_html__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst ClientList = Vue.component(\"client-list\", {\r\n    template: _ClientList_html__WEBPACK_IMPORTED_MODULE_0___default.a,\r\n\r\n    data() {\r\n        return {\r\n            clients: []\r\n        };\r\n    },\r\n\r\n    methods: {\r\n        setClients(clients) {\r\n            this.clients.length = 0;\r\n            this.clients.push(...clients);\r\n        }\r\n    }\r\n});\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ClientList);\n\n//# sourceURL=webpack:///./FrontProjects/commons/components/ClientList.js?");

/***/ })

/******/ });