fs = require('fs');
path = require('path');
moment = require('moment');

ps = require('./promptUtils');

const STORE_DIR_NAME = ".hostsStore";
const INFO_FILE_NAME = ".info";
const TIME_FORMAT = 'yyyy-mm-dd:hh:mm:ss';

/**
 * Info on a hosts file
 * - last updated
 * - username
 * - isLocal
 * - host (key)
 */

function isLocal(info) {
    return !!info.host;
}

function promptForHostInfo(name) {
    if (!ps.promptYN(`add ${name} to hosts store`)) {
        return null;
    }

    let info = {
        host: name
    };

    info.isLocal = !ps.promptYN('Is this file from a remote server?');
    if (!info.isLocal) {
        info.username = ps.promptUsername();
    }

    info.lastUpdated = moment().format();

    return info;
}

// hosts file names should follow convention hosts_{host name}
function checkForNewHosts(store) {
    const names = fs.readdirSync(store.rootDir);
    const hosts = names.filter(name => name.startsWith("hosts_"))
                    .map(name => name.substring(6));

    const newHosts = hosts.filter(host => !store.data[host]);
    newHosts.forEach(host => {
        let info = promptForHostInfo(host);
        if (info) {
            store.data[host] = info;
        }
    })
}

exports.load = () => {
    let store = {}
    store.rootDir = path.resolve(__dirname, '..', STORE_DIR_NAME);

    console.log('Loading hosts store information...');

    if (!fs.existsSync(store.rootDir)) {
        console.log('Creating hosts store directory: ' + store.rootDir);
        fs.mkdirSync(store.rootDir);
    }

    store.infoPath = path.resolve(store.rootDir, INFO_FILE_NAME);
    if (fs.existsSync(store.infoPath)) {
        store.data = JSON.parse(fs.readFileSync(store.infoPath).toString());
    } else {
        console.log('No hosts store information found...');
        store.data = {};
    }

    checkForNewHosts(store)

    return store;
}

exports.save = (store) => {
    fs.writeFileSync(store.infoPath, JSON.stringify(store.data));
}

