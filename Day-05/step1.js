var _ = require('lodash'),
    fs = require('fs'),
    Spinner = require('cli-spinner').Spinner,
    md5 = require('md5');

fs.readFile(__dirname+'/input.txt', 'utf8', (err, data) => {
    var i = 0,
        password = "",
        spinner,
        str;
    
    if (err) return console.error(err);
    
//    spinner = new Spinner(_.padEnd(password, 8, '*'));
//    spinner.setSpinnerString('|/-\\');
//    spinner.start();
    
    setTimeout(function() {
        while(password.length<8) {
            str = md5(data+i);
            if (str.slice(0, 5) === "00000") {
                password += str.charAt(5);
//                spinner.stop(true);                
//                spinner = new Spinner(_.padEnd(password, 8, '*'));
//                spinner.setSpinnerString('|/-\\');
//                spinner.start();
                console.log(_.padEnd(password, 8, '*'));
            }

            i++;
        }

//        spinner.stop();
        console.log("Answer: "+password);
    }, 1000);
});