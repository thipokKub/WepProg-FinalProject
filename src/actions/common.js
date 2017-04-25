import _ from 'lodash';

export function fillDigits(seed, digits) {
    let rStr = "";
    let uNum = seed%(Math.pow(10, digits));

    if(String(uNum).length < digits) {
        for(var x = (digits - String(uNum).length); x >0; x--) {
            rStr += "0";
        }
    }

    rStr += String(uNum);
    return rStr;
}

export function generateStr(prefix, suffix, randomInsert) {
    // I generate the UID from two parts here
    // to ensure the random number provide enough bits.
    var tmp = function() {
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);

        var mod = "";

        for(var i = 0; i < firstPart.length; i++) {
            mod += ((parseInt((Math.random())*100)%2) === 0) ? firstPart[i] : _.toUpper(firstPart[i]);
        }

        for(var i = 0; i < secondPart.length; i++) {
            mod += ((parseInt((Math.random())*100)%2) === 0) ? secondPart[i] : _.toUpper(secondPart[i]);
        }

        return mod;
    }

    var hasCode = function(str) {
        var hash = 0, i, chr;
        if (str.length === 0) return hash;
        for (i = 0; i < str.length; i++) {
            chr   = str.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    let returnString = tmp() + tmp();
    const randomPos = parseInt(Math.random()*returnString.length);
    returnString = (typeof(randomInsert) === "string") ? (returnString.slice(0, randomPos) + randomInsert + returnString.slice(randomPos, returnString.length)) : returnString;
    returnString = ((typeof(prefix) === "string") ? prefix : "") + returnString + ((typeof(suffix) === "string") ? suffix : "");

    return returnString;
}

export function generateUniqueID(prefix, suffix, digitsLength) {
    return generateStr(prefix, suffix, fillDigits(_.uniqueId(), digitsLength));
}

export function clone(obj) {
    if (null === obj || "object" !== typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

export function filterKeyOut(initialObject, arrayOfKeys) {
    //actions.requestActionList
    let newObj = clone(initialObject);
    if(typeof(arrayOfKeys) !== "undefined" && arrayOfKeys.length > 0) {
        arrayOfKeys.map((item) => {
            delete newObj[item];
            return null;
        });
    }
    return newObj;
}

export function filterKeyIn(initialObject, arrayOfKeys) {
    //actions.requestActionList
    let newObj = {};
    if(typeof(arrayOfKeys) !== "undefined" && arrayOfKeys.length > 0) {
        arrayOfKeys.map((item) => {
            newObj[item] = initialObject[item];
            return null;
        });
    }
    return newObj;
}

export function mergeObjectWithKeys(objectToBeMerged, objectToMergeWith, arrayOfKeys) {
    let newObj = clone(objectToBeMerged);
    if(typeof(arrayOfKeys) !== "undefined" && arrayOfKeys.length > 0) {
        arrayOfKeys.map((item) => {
            newObj[item] = objectToMergeWith[item];
            return null;
        });
    }
    return newObj;
}

export function setCookie(cname, cvalue, expireInterval) {
    var d = new Date();
    d.setTime(d.getTime() + expireInterval);
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    //expire auto delete
    return "";
}

export function clearAllCookie() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
}

let colorCounter = 0;
export function incrementColorCounter(maxMod) {
    colorCounter = (colorCounter + 1)%maxMod;
}
export function getColorCounter() {
    return colorCounter;
}

export function getColor() {
    let color = ["red", "yellow", "pink", "green", "blue"];
    incrementColorCounter(color.length);
    if(getColorCounter() === 0) return color[color.length - 1];
    return color[getColorCounter() - 1];
}
