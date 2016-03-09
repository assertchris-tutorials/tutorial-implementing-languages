class Definition {
  constructor(type, identity, value = null) {
    this.type = type;
    this.identity = identity;
    this.value = value;
  }
}

class Inspection {
  constructor(identity) {
    this.identity = identity;
  }
}

class Parser {
  analyse(tokens = []) {
    tokens = tokens.filter(token => token[0] != "whitespace");

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i][0] == "assign") {
        if (i > 1 && tokens[i - 2][0] == "type") {
          tokens.splice(i - 2, 4, [
            "definition", [
              tokens[i - 2][1],
              tokens[i - 1][1],
              tokens[i + 1][1],
            ]
          ])

          i = 0;
        } else {
          throw new Error("syntax error");
        }
      }

      if (tokens[i][0] == "definition") {
        tokens.splice(i, 1, new Definition(...tokens[i][1]));
        i = 0;
      }

      if (tokens[i][0] == "inspect") {
        tokens.splice(i, 2, new Inspection(tokens[i + 1][1]));
        i = 0;
      }
    }

    return tokens;
  }
}

// int minutes = 90

let tokens = [["type", "int"], ["whitespace", " "], ["identity", "minutes"], ["whitespace", " "], ["assign", "="], ["whitespace", " "], ["value", "90"], ["terminal", ";"], ["whitespace", " "], ["inspect", "inspect"], ["whitespace", " "], ["identity", "minutes"], ["terminal", ";"]];

let parser = new Parser();
let result = parser.analyse(tokens);

console.log(result);
