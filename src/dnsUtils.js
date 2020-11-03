const { Resolver } = require('dns').promises;
const resolver = new Resolver();

exports.lookupAddress = (address) => {
    return resolver.reverse(address);
}

exports.lookupAddresses = (addresses) => {
    return Promise.all(addresses.map(exports.lookupAddress));
}

exports.lookupIP = (name) => {
    return resolver.resolveAny(name).then(values => {
        const ipv4 = values.find(v => v.type === 'A');
        const ipv6 = values.find(v => v.type === 'AAAA');
        return { ipv4, ipv6 };
    });
}

exports.lookupIPs = (names) => {
    return Promise.all(names.map(exports.lookupIP));
}

// A probably terrible and admittedly lazy way to check
exports.isIpv6 = (addr) => {
    return addr.indexOf(":") !== -1;
}
