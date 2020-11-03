function isComment(token) {
    return token[0] === "#";
}

exports.parseHostsString = (data) => {
    const lines = data.split('\n');
    const mappings = [];

    lines.forEach((raw, line) => {
        const mapping = {raw, line};
        const trimmed = raw.trim();
        const tokens = trimmed.split(/\s+/);

        if (raw.length > 0 && !isComment(tokens[0])) {
            mapping.address = tokens[0]

            const names = [];

            let i = 1;
            while (i < tokens.length && !isComment(tokens[i])) {
                names.push(tokens[i]);
                i++;
            }

            mapping.names = names;
            if (i < tokens.length) {
                mapping.comment = tokens.slice(i).join(" ");
            }

        } else if (trimmed.length > 0) { // don't assign empty lines as comments
            mapping.comment = raw;
        }
        mappings.push(mapping);
    });

    return mappings;
}

exports.filterToAddresses = (lines) => {
    return lines.filter(line => line.address);
}

exports.mapByName = (addresses) => {
    const mapping = {};

    addresses.forEach(addr => {
        addr.names.forEach(name => mapping[name] = addr);
    });

    return mapping;
}