var rgb = (r, g, b) => `\x1b[38;2;${r};${g};${b}m`;
var bgRgb = (r, g, b) => `\x1b[48;2;${r};${g};${b}m`;

var hex = value => {
    value = value.replace("#", "");
    return rgb(
        parseInt(value.slice(0, 2), 16),
        parseInt(value.slice(2, 4), 16),
        parseInt(value.slice(4, 6), 16)
    );
};

var bgHex = value => {
    value = value.replace("#", "");
    return bgRgb(
        parseInt(value.slice(0, 2), 16),
        parseInt(value.slice(2, 4), 16),
        parseInt(value.slice(4, 6), 16)
    );
};

var color256 = n => `\x1b[38;5;${n}m`;
var bg256 = n => `\x1b[48;5;${n}m`;

var black = rgb(0, 0, 0);
var white = rgb(255, 255, 255);
var red = rgb(255, 0, 0);
var green = rgb(0, 255, 0);
var blue = rgb(0, 0, 255);
var yellow = rgb(255, 255, 0);
var cyan = rgb(0, 255, 255);
var magenta = rgb(255, 0, 255);

var orange = rgb(255, 165, 0);
var purple = rgb(128, 0, 128);
var pink = rgb(255, 192, 203);
var brown = rgb(165, 42, 42);
var lime = rgb(0, 255, 0);
var navy = rgb(0, 0, 128);
var teal = rgb(0, 128, 128);
var olive = rgb(128, 128, 0);
var maroon = rgb(128, 0, 0);
var silver = rgb(192, 192, 192);
var gold = rgb(255, 215, 0);
var coral = rgb(255, 127, 80);
var salmon = rgb(250, 128, 114);
var crimson = rgb(220, 20, 60);
var scarlet = rgb(255, 36, 0);
var violet = rgb(238, 130, 238);
var indigo = rgb(75, 0, 130);
var turquoise = rgb(64, 224, 208);
var aqua = rgb(0, 255, 255);
var beige = rgb(245, 245, 220);
var khaki = rgb(240, 230, 140);
var lavender = rgb(230, 230, 250);
var orchid = rgb(218, 112, 214);
var plum = rgb(221, 160, 221);
var chocolate = rgb(210, 105, 30);
var tomato = rgb(255, 99, 71);
var peach = rgb(255, 218, 185);
var mint = rgb(152, 255, 152);
var emerald = rgb(80, 200, 120);
var ruby = rgb(224, 17, 95);
var sapphire = rgb(15, 82, 186);
var amber = rgb(255, 191, 0);
var rose = rgb(255, 0, 127);
var neonGreen = rgb(57, 255, 20);
var neonBlue = rgb(31, 81, 255);
var neonPink = rgb(255, 16, 240);
var neonPurple = rgb(188, 19, 254);
var neonOrange = rgb(255, 95, 31);
var neonYellow = rgb(255, 255, 51);

var reset = "\x1b[0m";
var bold = "\x1b[1m";
var dim = "\x1b[2m";
var italic = "\x1b[3m";
var underline = "\x1b[4m";
var blink = "\x1b[5m";
var inverse = "\x1b[7m";
var hidden = "\x1b[8m";
var strikethrough = "\x1b[9m";
var overline = "\x1b[53m";


var blackB = "\x1b[1;30m";
var redB = "\x1b[1;31m";
var greenB = "\x1b[1;32m";
var yellowB = "\x1b[1;33m";
var blueB = "\x1b[1;34m";
var magentaB = "\x1b[1;35m";
var cyanB = "\x1b[1;36m";
var whiteB = "\x1b[1;37m";



export {
rgb, bgRgb, hex, bgHex, color256, bg256, black, white, red, green, blue, yellow, cyan, magenta, orange, purple, pink, brown, lime, navy, teal, olive, maroon, silver, gold, coral, salmon, crimson, scarlet, violet, indigo, turquoise, aqua, beige, khaki, lavender, orchid, plum, chocolate, tomato, peach, mint, emerald, ruby, sapphire, amber, rose, neonGreen, neonBlue, neonPink, neonPurple, neonOrange, neonYellow, reset, bold, dim, italic, underline, blink, inverse, hidden,strikethrough,overline,yellowB,greenB,cyanB, blueB, magentaB, redB, blackB, whiteB 
}
