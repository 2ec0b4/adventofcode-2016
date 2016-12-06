var _ = require('lodash'),
    fs = require('fs');

fs.readFile(__dirname+'/input.txt', 'utf8', (err, data) => {
    var keyboard = [
            ["7","8","9"],
            ["4","5","6"],
            ["1","2","3"]
        ],
        x = y = 1,
        code = "",
        lines,
        char;

    if (err) return console.error(err);

    lines    = _.split(data, "\n");
    _.forEach(lines, function(line) {
        for(var i=0, end=line.length;i<end;i++) {
            char = line.slice(i,i+1);
            switch(char) {
                case "U":
                    y = Math.min(y+1, 2);
                    break;

                case "D":
                    y = Math.max(y-1, 0);
                    break;

                case "L":
                    x = Math.max(x-1, 0);
                    break;

                case "R":
                    x = Math.min(x+1, 2);
                    break;
            }
        }
        
        code += keyboard[y][x];
    });

    console.log("Answer: "+code);
});
