
import {describe, it, before, after} from 'mocha';
import * as chai from 'chai';
const expect = chai.expect;

import {ConstantExpressionNode} from '../../src/expression/constant-expression-node';
import {Expression} from '../../src/expression/expression-node';

describe('ConstantExpressionNode', () => {
  const value = 3.14157;

  it("must be constructable with a value", () => {
    const constantExpressionNode = new ConstantExpressionNode(value);
    expect(constantExpressionNode).to.not.be.undefined;
  });

  it("must return the correct value", () => {
    const constantExpressionNode = new ConstantExpressionNode(value);
    expect(constantExpressionNode.getValue()).to.equal(value);
  });

  it("must have the correct type", () => {
    const constantExpressionNode = new ConstantExpressionNode(value);
    expect(constantExpressionNode.getType()).to.equal(Expression.CONSTANT_NODE);
  });
});
