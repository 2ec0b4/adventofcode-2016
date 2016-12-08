var _ = require('lodash'),
    fs = require('fs');

fs.readFile(__dirname+'/input.txt', 'utf8', (err, data) => {
    var result  = 0,
        lines,
        ranking,
        top,
        checksum,
        encrypted,
        char,
        nbChar,
        nbCharMax;

    if (err) return console.error(err);

    lines = _.map(_.split(data, "\n"), _.trim);
    _.forEach(lines, (line, index) => {
        ranking = [];
        checksum = line.match(/.+\[(.+)\]$/)[1];
        encrypted = line.match(/^(.+)-[0-9]+\[.+\]$/)[1];
        nbChar = 0;
        nbCharMax = encrypted.length;

        while(nbChar<nbCharMax) {
            char = encrypted.slice(nbChar, nbChar+1);
            nbChar++;

            if( char === "-" ) {
                continue;
            }

            if( !ranking[char] ) {
                ranking[char]   = {
                    char: char,
                    count: 0
                };
            }

            ranking[char].count++;
        }

        top = _.chain(ranking)
                .values()
                .orderBy(["count", "char"], ["desc", "asc"])
                .take(5)
                .map("char")
                .join("")
                .value();
        
        if (checksum === top) {
            result  += ~~line.match(/^.+-([0-9]+)\[.+\]$/)[1];
        }
    });

    console.log("Answer: "+result);
});