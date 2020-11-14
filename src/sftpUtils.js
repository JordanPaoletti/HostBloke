Client = require('ssh2-sftp-client');

exports.getHostsString = (username, password, host, location, port) => {
    let sftp = new Client();
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

exports.getHostsFile = (username, password, host, dst, location, port) => {
    let sftp = new Client();
    sftp.connect({
        host,
        port: port ? port : 22,
        username,
        password
    }).then(() => {
        return sftp.fastGet(location ? location : '/etc/hosts', dst, {});
    }).then(() => {
        sftp.end();
    }).catch(err => console.log(err.message));
}
