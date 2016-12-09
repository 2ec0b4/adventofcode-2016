var _ = require('lodash'),
    fs = require('fs'),
    minCharCode = ~~"a".charCodeAt(0),
    maxCharCode = ~~"z".charCodeAt(0);

fs.readFile(__dirname+'/input.txt', 'utf8', (err, data) => {
    var realName  = "",
        lines,
        ranking,
        top,
        checksum,
        encrypted,
        char,
        charCode,
        nbChar,
        nbCharMax;

    if (err) return console.error(err);

    lines = _.map(_.split(data, "\n"), _.trim);
    _.forEach(lines, (line) => {
        realName = "";
        ranking = [];
        checksum = line.match(/.+\[(.+)\]$/)[1];
        match = line.match(/^(.+)-([0-9]+)\[.+\]$/);
        encrypted = match[1];
        sector = ~~match[2];
        remain = ( sector > 26 ? sector%26 : sector );
        nbChar = 0;
        nbCharMax = encrypted.length;

        while(nbChar<nbCharMax) {
            char = encrypted.charAt(nbChar);
            charCode = ~~encrypted.charCodeAt(nbChar);
            nbChar++;

            if( char === "-" ) {
                realName    += " ";
                continue;
            }

            if( !ranking[char] ) {
                ranking[char]   = {
                    char: char,
                    count: 0
                };
            }

            ranking[char].count++;

            realName    += rotChar(charCode, remain);
        }

        top = _.chain(ranking)
                .values()
                .orderBy(["count", "char"], ["desc", "asc"])
                .take(5)
                .map("char")
                .join("")
                .value();

        if (checksum === top && realName.indexOf("north")!==-1) {
            console.log("Answer: "+sector, " with decrypted room name \""+realName+"\"", "from "+line);
            
            return false;
        }
    });
});

function rotChar(charCode, num) {
    var newCharCode = ~~(charCode+num);
    if( newCharCode > maxCharCode ) {
        newCharCode = minCharCode+(newCharCode-maxCharCode)-1;
    }
    return String.fromCharCode(newCharCode);
}