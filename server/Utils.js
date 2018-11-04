"use strict";

const fs = require("fs");

class Utils {
    static forEachToArray (arr, fun) {
        let res = [];
        arr.forEach(function(item) {
            res.push(fun(item));
        });
        return res;
    }

    static readdirSyncRecursive(dir) {
        var results = [];
        var list = fs.readdirSync(dir);
        list.forEach(function(file) {
            file = (dir.slice(-1) == '/' ? dir : dir + '/') + file;
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) { 
                /* Recurse into a subdirectory */
                results = results.concat(Utils.readdirSyncRecursive(file));
            } else { 
                /* Is a file */
                results.push(file);
            }
        });
        return results;
    }
}

module.exports = Utils;