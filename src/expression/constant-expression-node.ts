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

import {Expression, ExpressionNode} from './expression-node';
import {ExpressionNodeVisitor} from './expression-node-visitor';

/**
 * An ExpressionNode that stores a constant value
 */
export class ConstantExpressionNode implements ExpressionNode
{
  /** The value of the constant */
  private value:number;

  /**
   * Construct with the fixed value.
   *
   * @param value
   *          the value of the constant
   */
  public constructor(value:number)
  {
    this.value = value;
  }

  /**
   * Returns the value of the constant
   */
  public getValue():number
  {
    return this.value;
  }

  /**
   * Returns the type of the node, in this case Expression.CONSTANT_NODE
   */
  public getType():number
  {
    return Expression.CONSTANT_NODE;
  }

  /**
   * Implementation of the visitor design pattern.
   *
   * Calls visit on the visitor.
   *
   * @param visitor
   *          the visitor
   */
  public accept(visitor:ExpressionNodeVisitor):void
  {
    visitor.visitConstantExpressionNode(this);
  }
}
