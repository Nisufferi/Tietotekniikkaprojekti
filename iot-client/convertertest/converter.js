var potrace = require('potrace'),
    fs = require('fs');


var params = {
    background: '#FFFFFF',
    color: 'black',
    threshold: 110
};

var blueprintURL = "https://asiakas.kotisivukone.com/files/kttvt.kotisivukone.com/kuvat/Jounitie_2_A1_A2_A3_pohjat_2.jpg"

potrace.trace(blueprintURL, params, function (err, svg) {
    if (err) throw err;
    fs.writeFileSync('./output.svg', svg);
});