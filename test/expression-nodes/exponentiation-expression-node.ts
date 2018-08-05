
import {describe, it, before, after} from 'mocha';
import * as chai from 'chai';
const expect = chai.expect;

import {ConstantExpressionNode} from '../../src/expression/constant-expression-node';
import {ExponentiationExpressionNode} from '../../src/expression/exponentiation-expression-node';
import {Expression} from '../../src/expression/expression-node';

describe('ExponentiationExpressionNode', () => {
  const base = 3.14157;
  const exponent = 2.5;
  const baseExpr = new ConstantExpressionNode(base);
  const exponentExpr = new ConstantExpressionNode(exponent);

  it("must be constructable with two expressions", () => {
    const exponentiationExpressionNode = new ExponentiationExpressionNode(baseExpr, exponentExpr);
    expect(exponentiationExpressionNode).to.not.be.undefined;
  });

  it("must return the correct value", () => {
    const exponentiationExpressionNode = new ExponentiationExpressionNode(baseExpr, exponentExpr);
    const result = Math.pow(base, exponent);
    expect(exponentiationExpressionNode.getValue()).to.closeTo(result, result*1e-11);
  });

  it("must have the correct type", () => {
    const exponentiationExpressionNode = new ExponentiationExpressionNode(baseExpr, exponentExpr);
    expect(exponentiationExpressionNode.getType()).to.equal(Expression.EXPONENTIATION_NODE);
  });
});
