
import {describe, it, before, after} from 'mocha';
import * as chai from 'chai';
const expect = chai.expect;

import {MultiplicationExpressionNode} from '../../src/expression/multiplication-expression-node';
import {ConstantExpressionNode} from '../../src/expression/constant-expression-node';
import {Expression} from '../../src/expression/expression-node';
import {EvaluationException} from '../../src/expression/evaluation-exception';

describe('MultiplicationExpressionNode', () => {
  const value1 = 3.14157;
  const value2 = 2.5;
  const value1Expr = new ConstantExpressionNode(value1);
  const value2Expr = new ConstantExpressionNode(value2);

  it("must be constructable with an expression and sign", () => {
    const multiplicationExpressionNode = new MultiplicationExpressionNode(value1Expr, true);
    expect(multiplicationExpressionNode).to.not.be.undefined;
  });

  it("must return the correct value when multiplying two numbers", () => {
    const multiplicationExpressionNode = new MultiplicationExpressionNode(value1Expr, true);
    multiplicationExpressionNode.add(value2Expr, true);
    expect(multiplicationExpressionNode.getValue()).to.closeTo(value1*value2, 1e-11);
  });

  it("must return the correct value when dividing two numbers", () => {
    const multiplicationExpressionNode = new MultiplicationExpressionNode(value1Expr, true);
    multiplicationExpressionNode.add(value2Expr, false);
    expect(multiplicationExpressionNode.getValue()).to.closeTo(value1/value2, 1e-11);
  });

  it("must return the correct value when multiplying the reciprocal of two numbers", () => {
    const multiplicationExpressionNode = new MultiplicationExpressionNode(value1Expr, false);
    multiplicationExpressionNode.add(value2Expr, false);
    expect(multiplicationExpressionNode.getValue()).to.closeTo(1/(value1*value2), 1e-11);
  });

  it("must have the correct type", () => {
    const multiplicationExpressionNode = new MultiplicationExpressionNode(value1Expr, true);
    expect(multiplicationExpressionNode.getType()).to.equal(Expression.MULTIPLICATION_NODE);
  });

});
