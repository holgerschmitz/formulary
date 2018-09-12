
import {describe, it, before, after} from 'mocha';
import * as chai from 'chai';
const expect = chai.expect;

import {Parser} from '../../src/expression/parser';
import {VariableFinder} from '../../src/equation/variable-finder';

describe('VariableFinder', () => {

  it("must find a variable in an expression", () => {
    const parser = new Parser();
    const expression = parser.parse("3 + 2*sin(x)");
    const finder = new VariableFinder('x');
    expect(finder.find(expression)).to.eql(true);
  });

  it("must not find a non-existent variable in an expression", () => {
    const parser = new Parser();
    const expression = parser.parse("3 + 2*sin(y)");
    const finder = new VariableFinder('x');
    expect(finder.find(expression)).to.eql(false);
  });

});
