class Model {
  add() {
    // TODO
  }
  compile() {
    // TODO
  }
  
  async fit() {
    // TODO
  }

  predict() {
    // TODO
    return {
      print: () => {},
    };
  }
}

const tf = {
  sequential: () =>  { return new Model(); },
  layers: {
    dense: () => { return { /* TODO */ }},
  },
  tensor2d: () => { return { /* TODO */ }},
}
