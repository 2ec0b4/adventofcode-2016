var _ = require('lodash'),
    fs = require('fs');

fs.readFile(__dirname+'/input.txt', 'utf8', (err, data) => {
    var keyboard = [
            ["-","-","D","-","-"],
            ["-","A","B","C","-"],
            ["5","6","7","8","9"],
            ["-","2","3","4","-"],
            ["-","-","1","-","-"]
        ],
        x = 0,
        y = 2,
        code = "",
        tmpX,
        tmpY,
        lines,
        char;

    if (err) return console.error(err);

    lines    = _.split(data, "\n");
    _.forEach(lines, function(line) {
        for(var i=0, end=line.length;i<end;i++) {
            char = line.slice(i,i+1);
            tmpX = x;
            tmpY = y;
            
            switch(char) {
                case "U":
                    tmpY += 1;
                    break;

                case "D":
                    tmpY -= 1;
                    break;

                case "L":
                    tmpX -= 1;
                    break;

                case "R":
                    tmpX += 1;
                    break;
            }

            if (!!keyboard[tmpX] && !!keyboard[tmpX][tmpY] && keyboard[tmpX][tmpY] !== "-") {
                x = tmpX;
                y = tmpY;
            }
        }
        
        code += keyboard[y][x];
    });

    console.log("Answer: "+code);
});