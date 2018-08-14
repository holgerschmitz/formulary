
import {describe, it, before, after} from 'mocha';
import * as chai from 'chai';
const expect = chai.expect;

import {AdditionExpressionNode} from '../../src/expression/addition-expression-node';
import {ConstantExpressionNode} from '../../src/expression/constant-expression-node';
import {Expression} from '../../src/expression/expression-node';
import {EvaluationException} from '../../src/expression/evaluation-exception';

describe('AdditionExpressionNode', () => {
  const value1 = 3.14157;
  const value2 = 2.5;
  const value1Expr = new ConstantExpressionNode(value1);
  const value2Expr = new ConstantExpressionNode(value2);

  it("must be constructable with an expression and sign", () => {
    const additionExpressionNode = new AdditionExpressionNode(value1Expr, true);
    expect(additionExpressionNode).to.not.be.undefined;
  });

  it("must return the correct value when adding two numbers", () => {
    const additionExpressionNode = new AdditionExpressionNode(value1Expr, true);
    additionExpressionNode.add(value2Expr, true);
    expect(additionExpressionNode.getValue()).to.closeTo(value1+value2, 1e-11);
  });

  it("must return the correct value when subtracting two numbers", () => {
    const additionExpressionNode = new AdditionExpressionNode(value1Expr, true);
    additionExpressionNode.add(value2Expr, false);
    expect(additionExpressionNode.getValue()).to.closeTo(value1-value2, 1e-11);
  });

  it("must return the correct value when adding two negative numbers", () => {
    const additionExpressionNode = new AdditionExpressionNode(value1Expr, false);
    additionExpressionNode.add(value2Expr, false);
    expect(additionExpressionNode.getValue()).to.closeTo(-value1-value2, 1e-11);
  });

  it("must have the correct type", () => {
    const additionExpressionNode = new AdditionExpressionNode(value1Expr, true);
    expect(additionExpressionNode.getType()).to.equal(Expression.ADDITION_NODE);
  });

});
