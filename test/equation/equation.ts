
import {describe, it, before, after} from 'mocha';
import * as chai from 'chai';
const expect = chai.expect;

import {VariableExpressionNode} from '../../src/expression/variable-expression-node';
import {FunctionExpressionNode} from '../../src/expression/function-expression-node';
import {Equation} from '../../src/equation/equation';

describe('Equation', () => {

  it("must be constructable with two expressions", () => {
    const variableExpressionNode1 = new VariableExpressionNode('VarA');
    const variableExpressionNode2 = new VariableExpressionNode('VarB');

    const functionExpressionNode = new FunctionExpressionNode(FunctionExpressionNode.SIN, variableExpressionNode2);

    const equation = new Equation(variableExpressionNode1, variableExpressionNode2);

    expect(equation).to.not.be.undefined;

    expect(equation.getLhs()).to.equal(variableExpressionNode1);
    expect(equation.getRhs()).to.equal(variableExpressionNode2);
  });

});
