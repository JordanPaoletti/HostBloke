readlineSync = require('readline-sync');

exports.promptQuestion = (question) => {
    return readlineSync.question(question + ": ");
}

exports.promptYN = (question) => {
    return readlineSync.keyInYN(question);
}

exports.promptUsername = () => {
    return readlineSync.question("Username: ", {});
}

exports.promptPassword = () => {
    return readlineSync.question("Password: ", {
        hideEchoBack: true
    });
}

exports.promptCreds = () => {
    const username = exports.promptUsername();
    const password = exports.promptPassword();
    return { username, password };
}