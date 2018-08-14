// This file is part of Formulary IO.
//
// Formulary IO is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Foobar is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Foobar.  If not, see <http://www.gnu.org/licenses/>.

import {VariableExpressionNode} from './variable-expression-node';
import {ConstantExpressionNode} from './constant-expression-node';
import {AdditionExpressionNode} from './addition-expression-node';
import {MultiplicationExpressionNode} from './multiplication-expression-node';
import {ExponentiationExpressionNode} from './exponentiation-expression-node';
import {FunctionExpressionNode} from './function-expression-node';
/**
 * An interface for the visitor design pattern.
 *
 * Expression nodes can be visited by ExpressionNodeVisitor by calling their
 * accept methods. The expression nodes, in turn, call the appropriate visit
 * method of the expression node visitor.
 */
export interface ExpressionNodeVisitor
{
  /** Visit a VariableExpressionNode */
  visitVariableExpressionNode(node:VariableExpressionNode): void;

  /**  Visit a ConstantExpressionNode */
  visitConstantExpressionNode(node:ConstantExpressionNode): void;

  /**  Visit a AdditionExpressionNode */
  visitAdditionExpressionNode(node:AdditionExpressionNode): void;

  /**  Visit a MultiplicationExpressionNode */
  visitMultiplicationExpressionNode(node:MultiplicationExpressionNode): void;

  /**  Visit a ExponentiationExpressionNode */
  visitExponentiationExpressionNode(node:ExponentiationExpressionNode): void;

  /**  Visit a FunctionExpressionNode */
  visitFunctionExpressionNode(node:FunctionExpressionNode): void;

}
