var _ = require('lodash'),
    fs = require('fs');

fs.readFile(__dirname+'/input.txt', 'utf8', (err, data) => {
    var count = 0,
        lines,
        values;
    
    if (err) return console.error(err);

    lines = _.map(_.split(data, "\n"), _.trim);
    _.forEach(lines, (line) => {
        values  = _.sortBy(_.map(_.split(line, /[ ]+/), _.toInteger));
        if (values[0]+values[1] > values[2]) count++;
    });

    console.log("Answer: "+count);
});
