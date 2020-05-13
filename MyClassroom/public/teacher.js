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
/******/ 	return __webpack_require__(__webpack_require__.s = "./FrontProjects/Teacher/src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./FrontProjects/Teacher/src/controllers/MainApp.js":
/*!**********************************************************!*\
  !*** ./FrontProjects/Teacher/src/controllers/MainApp.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _views_MainApp_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/MainApp.html */ \"./FrontProjects/Teacher/src/views/MainApp.html\");\n/* harmony import */ var _views_MainApp_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_views_MainApp_html__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _commons_Dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../commons/Dialog */ \"./FrontProjects/commons/Dialog.js\");\n/* harmony import */ var _commons_components_ClientList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../commons/components/ClientList */ \"./FrontProjects/commons/components/ClientList.js\");\n/* harmony import */ var _net_StudentConnection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../net/StudentConnection */ \"./FrontProjects/Teacher/src/net/StudentConnection.js\");\n\r\n\r\n\r\n\r\n\r\nconst MainApp = Vue.component(\"main-app\", {\r\n    template: _views_MainApp_html__WEBPACK_IMPORTED_MODULE_0___default.a,\r\n    data() {\r\n        return {classroomName: \"\"}\r\n    },\r\n\r\n    async mounted() {\r\n        this._localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});\r\n        this.$refs.local_preview.srcObject = this._localStream;\r\n\r\n        this._socket = io();\r\n        this._studentConnections = new Map();\r\n\r\n        this.addSocketListeners();\r\n        this.showCreateClassroomDialog();\r\n    },\r\n\r\n    methods: {\r\n        addSocketListeners() {\r\n            this._socket.on(\"listClients\", clients => {\r\n                this.$refs.client_list.setClients(clients);\r\n            });\r\n            this._socket.on(\"studentJoinedIn\", data => {\r\n                this._studentConnections.set(data.studentSid, new _net_StudentConnection__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this._socket, data.studentSid, this._localStream));\r\n            });\r\n            this._socket.on(\"studentAnswer\", data => {\r\n                let sc = this._studentConnections.get(data.from);\r\n                if (sc) {\r\n                    sc.studentAnswerHandler(data);\r\n                }\r\n            });\r\n            this._socket.on(\"ice\", data => {\r\n                let sc = this._studentConnections.get(data.from);\r\n                if (sc) {\r\n                    sc.iceHandler(data);\r\n                }\r\n            });\r\n        },\r\n\r\n        showCreateClassroomDialog() {\r\n            _commons_Dialog__WEBPACK_IMPORTED_MODULE_1__[\"default\"].showInput(\"请创建一个教室\", function (name) {\r\n                if (name) {\r\n                    let ld = _commons_Dialog__WEBPACK_IMPORTED_MODULE_1__[\"default\"].showLoading(\"正在创建教室...\");\r\n                    this._socket.emit(\"createClassroom\", name, function (suc) {\r\n                        ld.modal(\"hide\");\r\n                        if (suc) {\r\n                            this.classroomName = name;\r\n                            console.log(\"Joined in room\");\r\n                        } else {\r\n                            _commons_Dialog__WEBPACK_IMPORTED_MODULE_1__[\"default\"].showMessageBox(\"教室已存在，请另选其它名称\", \"提示\", function () {\r\n                                this.showCreateClassroomDialog();\r\n                            }.bind(this));\r\n                        }\r\n                    }.bind(this));\r\n                } else {\r\n                    this.showCreateClassroomDialog();\r\n                }\r\n            }.bind(this), \"static\", false, false, \"\");\r\n        }\r\n    }\r\n});\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (MainApp);\r\n\n\n//# sourceURL=webpack:///./FrontProjects/Teacher/src/controllers/MainApp.js?");

/***/ }),

/***/ "./FrontProjects/Teacher/src/main.js":
/*!*******************************************!*\
  !*** ./FrontProjects/Teacher/src/main.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_MainApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/MainApp */ \"./FrontProjects/Teacher/src/controllers/MainApp.js\");\n\r\n\r\nlet rootElement = document.createElement(\"div\");\r\ndocument.body.appendChild(rootElement);\r\n\r\nnew _controllers_MainApp__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().$mount(rootElement);\n\n//# sourceURL=webpack:///./FrontProjects/Teacher/src/main.js?");

/***/ }),

/***/ "./FrontProjects/Teacher/src/net/StudentConnection.js":
/*!************************************************************!*\
  !*** ./FrontProjects/Teacher/src/net/StudentConnection.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass StudentConnection {\r\n\r\n\r\n    constructor(socket, studentSid, stream) {\r\n        this._socket = socket;\r\n        this._studentSid = studentSid;\r\n        this._stream = stream;\r\n\r\n        this.asyncInit();\r\n    }\r\n\r\n    async asyncInit() {\r\n        this._offerPc = new RTCPeerConnection();\r\n\r\n        this._offerPc.onicecandidate = e => {\r\n            if (e.candidate) {\r\n                this._socket.emit(\"ice\", {from: this._socket.id, to: this._studentSid, ice: e.candidate});\r\n            }\r\n        };\r\n\r\n        this._stream.getTracks().forEach(t => {\r\n            this._offerPc.addTrack(t);\r\n        });\r\n\r\n        let offer = await this._offerPc.createOffer();\r\n        this._socket.emit(\"teacherOffer\", {from: this._socket.id, to: this._studentSid, offer: offer});\r\n        await this._offerPc.setLocalDescription(new RTCSessionDescription(offer));\r\n    }\r\n\r\n    async studentAnswerHandler(data) {\r\n        await this._offerPc.setRemoteDescription(new RTCSessionDescription(data.answer));\r\n        console.log(data);\r\n    }\r\n\r\n    iceHandler(data) {\r\n        this._offerPc.addIceCandidate(new RTCIceCandidate(data.ice));\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (StudentConnection);\n\n//# sourceURL=webpack:///./FrontProjects/Teacher/src/net/StudentConnection.js?");

/***/ }),

/***/ "./FrontProjects/Teacher/src/views/MainApp.html":
/*!******************************************************!*\
  !*** ./FrontProjects/Teacher/src/views/MainApp.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div>\\r\\n    <div class=\\\"card\\\">\\r\\n        <div class=\\\"card-header font-weight-bold\\\">\\r\\n            教室名：{{classroomName}}\\r\\n        </div>\\r\\n        <div style=\\\"display: flex;flex-direction: row;\\\">\\r\\n            <div style=\\\"display: flex;flex-direction: column;width: 220px\\\">\\r\\n                <client-list ref=\\\"client_list\\\"></client-list>\\r\\n                <video style=\\\"width: 200px;height: 150px;display: block\\\" autoplay ref=\\\"local_preview\\\"></video>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n</div>\";\n\n//# sourceURL=webpack:///./FrontProjects/Teacher/src/views/MainApp.html?");

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