var _ = require('lodash'),
    fs = require('fs');

fs.readFile(__dirname+'/input.txt', 'utf8', (err, data) => {
    var index,
        nbChar,
        ranking;
    
    if (err) return console.error(err);
    
    lines = _.map(_.split(data, "\n"), _.trim);
    nbChar = lines[0].length;
    ranking = _.map(new Array(nbChar), function() {
        return [];
    });
    _.forEach(lines, (line) => {
        index = 0;

        while(index<nbChar) {
            char = line.charAt(index);
            if( !ranking[index][char] ) {
                ranking[index][char] = {
                    char: char,
                    count: 0
                };
            }

            ranking[index][char].count++;
            
            index++;
        }
    });
    
    ranking = _.map(ranking, function(value) {
        value   = _.chain(value)
                    .values()
                    .orderBy("count", "desc")
                    .head()
                    .value();
            
        return value.char;
    });
    
    console.log("Answer: "+_.join(ranking, ""));
});