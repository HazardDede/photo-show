"use strict";

const fs = require("fs");
const path = require("path");
const Utils = require("./Utils");

class Default {
    constructor (base_path) {
        this.base_path = base_path.slice(-1) == '/' ? base_path : (base_path + '/');
    }

    files() {
        let photos = Utils.readdirSyncRecursive(this.base_path);
        return Utils.forEachToArray(photos, filename => {
            return filename.replace(this.base_path, "")
        });
    }
}

class Calender {
    constructor (base_path) {
        this.base_path = base_path.slice(-1) == '/' ? base_path : (base_path + '/');
    }

    getPhotosOfDir(dir, fallback=true) {
        if (!fs.existsSync(dir))
            return fallback ? this.getDefaultPhotos() : [];
        let photos = Utils.readdirSyncRecursive(dir);
        return Utils.forEachToArray(photos, filename => {
            return filename.replace(this.base_path, "");
        }); 
    }

    getDefaultPhotos() {
        let default_dir = this.base_path + 'default';
        return this.getPhotosOfDir(default_dir, false);
    }

    getDatePhotos(date) {
        let dir = this.base_path + date.getDate();
        return this.getPhotosOfDir(dir);
    }

    getAllPhotos() {
        return this.getPhotosOfDir(this.base_path);
    }

    files() {
        const startOfCalendar = new Date("2018-12-01 00:00:00.0");
        const endOfCalendar = new Date("2018-12-24 23:59:59.9")
        const now = new Date();
        if (now < startOfCalendar)
            return this.getDefaultPhotos();
        if (now > endOfCalendar)
            return this.getAllPhotos();
        
        return this.getDatePhotos(now);
    }
}

module.exports = {
    'Default': Default,
    'Calendar': Calender
};