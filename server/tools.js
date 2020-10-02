const bcrypt = require('bcryptjs');

const tools = {
    enbcrypt(pwd){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(pwd,salt);
        return hash;
    }
};

module.exports = tools;