"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplate = void 0;
const azurill_1 = require("./azurill");
const bronzor_1 = require("./bronzor");
const chikorita_1 = require("./chikorita");
const ditto_1 = require("./ditto");
const gengar_1 = require("./gengar");
const glalie_1 = require("./glalie");
const kakuna_1 = require("./kakuna");
const leafish_1 = require("./leafish");
const nosepass_1 = require("./nosepass");
const onyx_1 = require("./onyx");
const pikachu_1 = require("./pikachu");
const rhyhorn_1 = require("./rhyhorn");
const getTemplate = (template) => {
    switch (template) {
        case "azurill": {
            return azurill_1.Azurill;
        }
        case "bronzor": {
            return bronzor_1.Bronzor;
        }
        case "chikorita": {
            return chikorita_1.Chikorita;
        }
        case "ditto": {
            return ditto_1.Ditto;
        }
        case "gengar": {
            return gengar_1.Gengar;
        }
        case "glalie": {
            return glalie_1.Glalie;
        }
        case "kakuna": {
            return kakuna_1.Kakuna;
        }
        case "leafish": {
            return leafish_1.Leafish;
        }
        case "nosepass": {
            return nosepass_1.Nosepass;
        }
        case "onyx": {
            return onyx_1.Onyx;
        }
        case "pikachu": {
            return pikachu_1.Pikachu;
        }
        case "rhyhorn": {
            return rhyhorn_1.Rhyhorn;
        }
        default: {
            return onyx_1.Onyx;
        }
    }
};
exports.getTemplate = getTemplate;
