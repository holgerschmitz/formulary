import {ExpressionNodeVisitorImpl} from '../expression/expression-node-visitor';

import {VariableExpressionNode} from '../expression/variable-expression-node';
import {ConstantExpressionNode} from '../expression/constant-expression-node';
import {AdditionExpressionNode} from '../expression/addition-expression-node';
import {MultiplicationExpressionNode} from '../expression/multiplication-expression-node';
import {ExponentiationExpressionNode} from '../expression/exponentiation-expression-node';
import {FunctionExpressionNode} from '../expression/function-expression-node';
import {ExpressionNode} from '../../src/expression/expression-node';


export class VariableFinder extends ExpressionNodeVisitorImpl {
  private found:boolean = false;
  private varName:string;

  constructor(varName:string) {
    super();
    this.varName = varName;
  }

	visitVariableExpressionNode(node: VariableExpressionNode): void {
    if (this.varName===node.getName()) {
      this.found = true;
    }
	}

  find(expression:ExpressionNode):boolean {
    this.found = false;
    expression.accept(this);
    return this.found;
  }
}
