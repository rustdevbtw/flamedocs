function ev(str, i) {
    return str
      .replace(/%i<\{([^}]+)\}>/g, (_, e) => Function("i", `"use strict"; return (i${e})`)(i));
}

function splitString(str, max = 50, tmpl = '%s') {
    const maxLen = max;
    const words = str.split(' ');
    let lines = [];
    let currentLine = '';

    words.forEach(word => {
        if ((currentLine + word).length <= maxLen) {
            currentLine += (currentLine.length ? ' ' : '') + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    });

    if (currentLine.length) {
        lines.push(currentLine);
    }

    return lines.map((l, i) => ev(tmpl, i).replaceAll("%s", l));
}

// Example usage:
const text = "Outlines all the details you may need to know before Contributing";
console.log(splitString(text, 48, `<tspan x="50%" y="%i<{*3+326}>" dominant-baseline="middle" text-anchor="middle">%s</tspan>`));
