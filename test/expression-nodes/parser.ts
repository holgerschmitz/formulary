
import {describe, it, before, after} from 'mocha';
import * as chai from 'chai';
const expect = chai.expect;

import {Parser} from '../../src/expression/parser';
import {ExpressionNode} from '../../src/expression/expression-node';

describe('Parser', () => {

  it("must be able to create a parser", () => {
    const parser = new Parser();
    expect(parser.parse).to.be.a('function');
    expect(parser.parseTokens).to.be.a('function');
  });

  it("must parse simple expressions correctly", () => {
      const eps = 1e-11;
      const value = 7.8901;
      const parser = new Parser();
      let expression:ExpressionNode;

      expression = parser.parse(`${value}`);
      expect(expression.getValue()).to.be.closeTo(value, eps);

      expression = parser.parse(`3+${value}`);
      expect(expression.getValue()).to.be.closeTo(3+value, eps);

      expression = parser.parse(`3 - ${value}`);
      expect(expression.getValue()).to.be.closeTo(3-value, eps);

      expression = parser.parse(`3 *${value}`);
      expect(expression.getValue()).to.be.closeTo(3*value, eps);

      expression = parser.parse(`3/ ${value}`);
      expect(expression.getValue()).to.be.closeTo(3/value, eps);

      expression = parser.parse(`3^${value}`);
      expect(expression.getValue()).to.be.closeTo(Math.pow(3,value), eps);

      expression = parser.parse(`sin(${value})`);
      expect(expression.getValue()).to.be.closeTo(Math.sin(value), eps);
  });

  it("handles operator precenence correctly", () => {
      const eps = 1e-11;
      const value = 7.8901;
      const parser = new Parser();
      let expression:ExpressionNode;

      expression = parser.parse(`3+2*${value}`);
      expect(expression.getValue()).to.be.closeTo(3+2*value, eps);

      expression = parser.parse(`3+2/${value}`);
      expect(expression.getValue()).to.be.closeTo(3+2/value, eps);

      expression = parser.parse(`3*${value}^2`);
      expect(expression.getValue()).to.be.closeTo(3*Math.pow(value,2), eps);

      expression = parser.parse(`-2 + ${value}`);
      expect(expression.getValue()).to.be.closeTo(-2 + value, eps);

      expression = parser.parse(`3 + ${value}^2`);
      expect(expression.getValue()).to.be.closeTo(3 + Math.pow(value,2), eps);
  });

});
