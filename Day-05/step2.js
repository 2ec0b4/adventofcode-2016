var _ = require('lodash'),
    fs = require('fs'),
    md5 = require('md5');

fs.readFile(__dirname+'/input.txt', 'utf8', (err, data) => {
    var i = 0,
        password = new Array(8).fill("*"),
        passwordStr = password.join(""),
        position,
        char,
        str;
    
    if (err) return console.error(err);
    
    while(passwordStr.indexOf("*") > -1) {
        str = md5(data+i);
        if (str.slice(0, 5) === "00000") {
            position = str.charAt(5);
            char = str.charAt(6);

            if( !!password[position] && password[position] === "*" ) {
                password[position]  = char;
                passwordStr = password.join("");

                console.log(passwordStr);
            }
        }

        i++;
    }

    console.log("Answer: "+password.join(""));
});