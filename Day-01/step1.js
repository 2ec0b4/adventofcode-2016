var _ = require('lodash'),
    fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    var x = y = 0,
        directionX = directionY = 1,
        instructions;
        
    if (err) return console.error(err);
    
    instructions    = _.split(data, ", ");
    _.forEach(instructions, function(value, index) {
        var nb  = ~~_.replace(value, /L|R/, "");

        if (index%2 === 0) {
            directionX  = ( _.startsWith(value, 'L') ? -1 : 1 ) * directionY;
            x += directionX * nb;
        } else {
            directionY  = ( _.startsWith(value, 'L') ? 1 : -1 ) * directionX;
            y += directionY * nb;
        }
    });
    
    console.log("Answer: "+(Math.abs(x)+Math.abs(y)));
});
