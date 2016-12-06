var _ = require('lodash'),
    fs = require('fs');

fs.readFile(__dirname+'/input.txt', 'utf8', (err, data) => {
    var count = 0,
        columns = [
            [],
            [],
            []
        ],
        tmp = [],
        start = end = total = 0,
        lines,
        values;
    
    if (err) return console.error(err);

    lines = _.map(_.split(data, "\n"), _.trim);
    _.forEach(lines, (line) => {
        values  = _.map(_.split(line, /[ ]+/), _.toInteger);
        _.forEach(values, (value, index) => {
            columns[index].push(value);
        });
    });
    
    tmp    = _.concat(columns[0], columns[1], columns[2]);
    total  = tmp.length;
    
    while(start<total) {
        end     = start+columns.length;
        values  = _.sortBy(_.slice(tmp, start, end));
        start   = end;
        if (values[0]+values[1] > values[2]) count++;
    }
    
    console.log("Answer: "+count);
});