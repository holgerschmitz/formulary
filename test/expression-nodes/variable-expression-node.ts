
import {describe, it, before, after} from 'mocha';
import * as chai from 'chai';
const expect = chai.expect;

import {VariableExpressionNode} from '../../src/expression/variable-expression-node';
import {Expression} from '../../src/expression/expression-node';
import {EvaluationException} from '../../src/expression/evaluation-exception';

describe('VariableExpressionNode', () => {
  const value = 3.14157;
  const name = 'pi_approx';

  it("must be constructable with a value", () => {
    const variableExpressionNode = new VariableExpressionNode(name);
    expect(variableExpressionNode).to.not.be.undefined;
  });

  it("must return the correct name", () => {
    const variableExpressionNode = new VariableExpressionNode(name);
    expect(variableExpressionNode.getName()).to.equal(name);
  });

  it("must have the correct type", () => {
    const variableExpressionNode = new VariableExpressionNode(name);
    expect(variableExpressionNode.getType()).to.equal(Expression.VARIABLE_NODE);
  });

  it("must allow setting and getting the value", () => {
    const variableExpressionNode = new VariableExpressionNode(name);
    expect(variableExpressionNode.setValue).not.to.be.undefined;
    variableExpressionNode.setValue(value);
    expect(variableExpressionNode.getValue()).to.equal(value);
  });

  it("must throw an error when unassigned", () => {
    const variableExpressionNode = new VariableExpressionNode(name);
    expect(variableExpressionNode.getValue.bind(variableExpressionNode)).to.throw(new EvaluationException('Error: Variable \''+name+'\' was not initialized.'));
  });
});
