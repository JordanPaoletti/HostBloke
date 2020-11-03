hostsReader = require('./hostsReader');
hostsWriter = require('./hostsWriter');
dns = require('./dnsUtils');

fs = require('fs');

dns.lookupAddresses(['216.58.193.78', '127.0.1.1']).then(values => {
    console.log(values);
});

dns.lookupIP('google.com').then(console.log);

fs.readFile('res/basic_hosts', 'utf8', (err, data) => {
    let lines = hostsReader.parseHostsString(data)
    let namesMap = hostsReader.mapByName(hostsReader.filterToAddresses(lines));
    console.log(namesMap);

    fs.writeFile('./res/test_hosts', hostsWriter.createHostsString(lines), console.log);
});