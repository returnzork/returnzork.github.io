//This code has been adapted from the formula located at
//https://gamefaqs.gamespot.com/gbc/198308-pokemon-gold-version/faqs/12550
//
//it is a direct 1:1 of me converting from the .cs code in this same directory
//source for all of my (https://returnzork.github.io) scripts are located at
//https://github.com/returnzork/returnzork.github.io-scripts

function ConvertNameToNumber(name) {
    var value = 0;
    for (var i = 0; i < name.length && i < 5; i++) {
        if (name[i] >= 'A' && name[i] <= 'Z') {
            //ascii A = 65, Z = 90
            //game A = 128, Z = 153
            var tmp = (128 - 65) + name.charCodeAt(i);
            value += tmp;
        }
        else if (name[i] >= 'a' && name[i] <= 'z') {
            //ascii a = 97, z = 122
            //game a = 160, z = 185
            var tmp = (160 - 97) + name.charCodeAt(i);
            value += tmp;
        }
    }

    return value;
}

function ConvertMoneyToNumber(money) {
    var whole = Math.trunc(money / 256);
    var remainder = money % 256;
    return whole + remainder;
}

function ConvertIDToNumber(id) {
    var whole = Math.trunc(id / 256);
    var remainder = id % 256;
    return whole + remainder;
}

function GetPassword(name, money, id) {
    var res1 = ConvertNameToNumber(name);
    var res2 = ConvertMoneyToNumber(money);
    var res3 = ConvertIDToNumber(id);
    return res1 + res2 + res3;
}