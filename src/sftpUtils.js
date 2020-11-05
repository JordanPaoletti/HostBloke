Client = require('ssh2-sftp-client');
let sftp = new Client();

exports.getHosts = (username, password, host, location, port) => {
    return sftp.connect({
        host,
        port: port ? port : 22,
        username,
        password
    }).then(() => {
        return sftp.get(location ? location : '/etc/hosts');
    }).then(data => {
        sftp.end();
        return data.toString();
    }).catch(err => console.log(err.message));
}