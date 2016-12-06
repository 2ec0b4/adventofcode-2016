var _ = require('lodash'),
    fs = require('fs');

fs.readFile(__dirname+'/input.txt', 'utf8', (err, data) => {
    var x = y = tmpX = tmpY = 0,
        directionX = directionY = 1,
        positions = [],
        instructions;
        
    if (err) return console.error(err);
    
    instructions    = _.split(data, ", ");
    _.forEach(instructions, function(value, index) {
        var nb  = ~~_.replace(value, /L|R/, ""),
            position;

        tmpX = x;
        tmpY = y;

        if (index%2 === 0) {
            directionX  = ( _.startsWith(value, 'L') ? -1 : 1 ) * directionY;
            x += directionX * nb;
            
            while(tmpX !== x) {
                tmpX += directionX;
                
                position = {
                    x: tmpX,
                    y: y
                };
                
                if (_.findIndex(positions, position) !== -1) return false;
                
                positions.push(position);
            }
        } else {
            directionY  = ( _.startsWith(value, 'L') ? 1 : -1 ) * directionX;
            y += directionY * nb;
            
            while(tmpY !== y) {
                tmpY += directionY;
                
                position = {
                    x: x,
                    y: tmpY
                };
                
                if (_.findIndex(positions, position) !== -1) return false;
                
                positions.push(position);
            }
        }
    });
    
    console.log("Answer: "+(Math.abs(tmpX)+Math.abs(tmpY)));
});
