exports.createHostsString = (lines) => {
    let hosts = "";
    lines.forEach(line => {
        let addition = "";
        if (line.address) {
            addition += line.address + "\t" + line.names.join(" ");
        }
        if (line.comment) {
            if (addition.length > 0) {
                addition += " ";
            }
            addition += line.comment;
        }
        hosts += addition + "\n";
    });

    return hosts;
}