readlineSync = require('readline-sync');

exports.promptUsername = () => {
    return readlineSync.question("Username: ", {});
}

exports.promptPassword = () => {
    return readlineSync.question("Password: ", {
        hideEchoBack: true
    });
}
