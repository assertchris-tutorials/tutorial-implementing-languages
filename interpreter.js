class Definition {
  constructor(type, identity, value = null) {
    this.type = type;
    this.identity = identity;
    this.value = value;
  }

  applyTo(context = {}) {
    if (context[this.identity]) {
      throw new Error(this.identity + " is defined");
    }

    if (this.type == "int" && this.value.match(/[0-9]+/)) {
      context[this.identity] = parseInt(this.value, 10);
    } else {
      throw new Error(this.identity + " can not be " + this.value);
    }

    return context;
  }
}

class Inspection {
  constructor(identity) {
    this.identity = identity;
  }

  applyTo(context = {}) {
    console.log(context[this.identity]);

    return context;
  }
}

class Interpreter {
  analyse(objects = [], context = {}) {
    for (let i = 0; i < objects.length; i++) {
      context = objects[i].applyTo(context);
    }

    return context;
  }
}

// int minutes = 90

let objects = [
  new Definition("int", "minutes", "90"),
  new Inspection("minutes"),
];

let interpreter = new Interpreter();
let result = interpreter.analyse(objects);

console.log(result);
