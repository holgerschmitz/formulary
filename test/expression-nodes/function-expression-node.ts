
import {describe, it, before, after} from 'mocha';
import * as chai from 'chai';
const expect = chai.expect;

import {ConstantExpressionNode} from '../../src/expression/constant-expression-node';
import {FunctionExpressionNode} from '../../src/expression/function-expression-node';
import {Expression} from '../../src/expression/expression-node';

describe('FunctionExpressionNode', () => {
  const value = 0.23213;
  const valueExpr = new ConstantExpressionNode(value);

  it("must be constructable with one expression", () => {
    const functionExpressionNode = new FunctionExpressionNode(FunctionExpressionNode.SIN, valueExpr);
    expect(functionExpressionNode).to.not.be.undefined;
  });

  it("must have the correct type", () => {
    const functionExpressionNode = new FunctionExpressionNode(FunctionExpressionNode.SIN, valueExpr);
    expect(functionExpressionNode.getType()).to.equal(Expression.FUNCTION_NODE);
  });

  it("must return the correct value for 'sin'", () => {
    const functionExpressionNode = new FunctionExpressionNode(FunctionExpressionNode.SIN, valueExpr);
    const result = Math.sin(value);
    expect(functionExpressionNode.getValue()).to.closeTo(result, Math.abs(result)*1e-11);
  });

  it("must return the correct value for 'cos'", () => {
    const functionExpressionNode = new FunctionExpressionNode(FunctionExpressionNode.COS, valueExpr);
    const result = Math.cos(value);
    expect(functionExpressionNode.getValue()).to.closeTo(result, Math.abs(result)*1e-11);
  });

  it("must return the correct value for 'tan'", () => {
    const functionExpressionNode = new FunctionExpressionNode(FunctionExpressionNode.TAN, valueExpr);
    const result = Math.tan(value);
    expect(functionExpressionNode.getValue()).to.closeTo(result, Math.abs(result)*1e-11);
  });

  it("must return the correct value for 'asin'", () => {
    const functionExpressionNode = new FunctionExpressionNode(FunctionExpressionNode.ASIN, valueExpr);
    const result = Math.asin(value);
    expect(functionExpressionNode.getValue()).to.closeTo(result, Math.abs(result)*1e-11);
  });

  it("must return the correct value for 'acos'", () => {
    const functionExpressionNode = new FunctionExpressionNode(FunctionExpressionNode.ACOS, valueExpr);
    const result = Math.acos(value);
    expect(functionExpressionNode.getValue()).to.closeTo(result, Math.abs(result)*1e-11);
  });

  it("must return the correct value for 'atan'", () => {
    const functionExpressionNode = new FunctionExpressionNode(FunctionExpressionNode.ATAN, valueExpr);
    const result = Math.atan(value);
    expect(functionExpressionNode.getValue()).to.closeTo(result, Math.abs(result)*1e-11);
  });

  it("must return the correct value for 'sqrt'", () => {
    const functionExpressionNode = new FunctionExpressionNode(FunctionExpressionNode.SQRT, valueExpr);
    const result = Math.sqrt(value);
    expect(functionExpressionNode.getValue()).to.closeTo(result, Math.abs(result)*1e-11);
  });

  it("must return the correct value for 'exp'", () => {
    const functionExpressionNode = new FunctionExpressionNode(FunctionExpressionNode.EXP, valueExpr);
    const result = Math.exp(value);
    expect(functionExpressionNode.getValue()).to.closeTo(result, Math.abs(result)*1e-11);
  });

  it("must return the correct value for 'ln'", () => {
    const functionExpressionNode = new FunctionExpressionNode(FunctionExpressionNode.LN, valueExpr);
    const result = Math.log(value);
    const lnValue = functionExpressionNode.getValue();
    expect(lnValue).to.closeTo(result, Math.abs(result)*1e-11);
    expect(Math.exp(lnValue)).to.closeTo(value, Math.abs(value)*1e-11);
  });

  it("must return the correct value for 'log'", () => {
    const functionExpressionNode = new FunctionExpressionNode(FunctionExpressionNode.LOG, valueExpr);
    const result = Math.log(value) * 0.43429448190325182765;
    const lnValue = functionExpressionNode.getValue();
    expect(lnValue).to.closeTo(result, Math.abs(result)*1e-11);
    expect(Math.pow(10,lnValue)).to.closeTo(value, Math.abs(value)*1e-11);
  });

  it("must return the correct value for 'log2'", () => {
    const functionExpressionNode = new FunctionExpressionNode(FunctionExpressionNode.LOG2, valueExpr);
    const result = Math.log(value)* 1.442695040888963407360;
    const lnValue = functionExpressionNode.getValue();
    expect(lnValue).to.closeTo(result, Math.abs(result)*1e-11);
    expect(Math.pow(2,lnValue)).to.closeTo(value, Math.abs(value)*1e-11);
  });
});
