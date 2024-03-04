cordova.define("cordova-plugin-zebra-printer.ZebraBluetoothPrinter", function(require, exports, module) {
var exec = require('cordova/exec');

exports.printLabel = function(successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'ZebraBluetoothPrinter', 'printLabel', [mac]);
};

exports.print = function(mac, str, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'ZebraBluetoothPrinter', 'print', [mac, str]);
};

exports.find = function(successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'ZebraBluetoothPrinter', 'find', []);
};


});
