class Lexer {
  get patterns() {
    return {
      "whitespace": "\\s+",
      "type": "int",
      "assign": "=",
      "inspect": "inspect",
      "identity": "[a-z]+",
      "value": "[0-9]+",
      "terminal": ";",
    };
  }

  analyse(code = "") {
    let tokens = [];

    while(true) {
      let length = code.length;

      for (let key in this.patterns) {
        let pattern = new RegExp(
          "^(" + this.patterns[key] + ")"
        );

        let matches = code.match(pattern);

        if (matches) {
          tokens.push([
            key, matches[1]
          ]);

          code = code.substring(matches[1].length);
        }
      }

      if (length == code.length) {
        break;
      }
    }

    return {
      tokens,
      code,
    };
  }
}

let lexer = new Lexer();
let result = lexer.analyse("int minutes = 90; inspect minutes;");

console.log(result);
