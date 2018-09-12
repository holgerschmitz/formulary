// This file is part of Formulary IO.
//
// Formulary IO is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Formulary IO is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Formulary IO.  If not, see <http://www.gnu.org/licenses/>.

import {ExpressionNodeVisitor} from './ExpressionNodeVisitor';
import {VariableExpressionNode} from './VariableExpressionNode';
import {ConstantExpressionNode} from './ConstantExpressionNode';
import {AdditionExpressionNode} from './AdditionExpressionNode';
import {MultiplicationExpressionNode} from './MultiplicationExpressionNode';
import {ExponentiationExpressionNode} from './ExponentiationExpressionNode';
import {FunctionExpressionNode} from './FunctionExpressionNode';

/**
 * A visitor that sets a variable with a specific name to a given value
 */
export class SetVariable implements ExpressionNodeVisitor
{

  private name:string;
  private value:number;

  /**
   * Construct the visitor with the name and the value of the variable to set
   *
   * @param name
   *          the name of the variable
   * @param value
   *          the value of the variable
   */
  constructor(name:string, value:number)
  {
    this.name = name;
    this.value = value;
  }

  /**
   * Checks the nodes name against the name to set and sets the value if the two
   * strings match
   */
  public visitVariableExpressionNode(node:VariableExpressionNode): void
  {
    if (node.getName() === this.name)
      node.setValue(this.value);
  }

  /** Do nothing */
  public visitConstantExpressionNode(node:ConstantExpressionNode): void
  {}

  /** Do nothing */
  public visitAdditionExpressionNode(node:AdditionExpressionNode): void
  {}

  /** Do nothing */
  public visitMultiplicationExpressionNode(node:MultiplicationExpressionNode): void
  {}

  /** Do nothing */
  public visitExponentiationExpressionNode(node:ExponentiationExpressionNode): void
  {}

  /** Do nothing */
  public visitFunctionExpressionNode(node:FunctionExpressionNode): void
  {}

}
