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
 * An ExpressionNode that handles exponentiation. The node holds
 * a base and an exponent and calulates base^exponent
 *
 */
export class ExponentiationExpressionNode implements ExpressionNode
{
  /** the node containing the base */
  private base:ExpressionNode;
  /** the node containing the exponent */
  private exponent:ExpressionNode;

  /**
   * Construct the ExponentiationExpressionNode with base and exponent
   * @param base the node containing the base
   * @param exponent the node containing the exponent
   */
  constructor(base:ExpressionNode, exponent:ExpressionNode)
  {
    this.base = base;
    this.exponent = exponent;
  }

  /**
   * Returns the type of the node, in this case ExpressionNode.EXPONENTIATION_NODE
   */
  public getType():number
  {
    return Expression.EXPONENTIATION_NODE;
  }

  /**
   * Returns the value of the sub-expression that is rooted at this node.
   *
   * Calculates base^exponent
   */
  public getValue():number
  {
    return Math.pow(this.base.getValue(), this.exponent.getValue());
  }

  /**
   * Implementation of the visitor design pattern.
   *
   * Calls visit on the visitor and then passes the visitor on to the accept
   * method of the base and the exponent.
   *
   * @param visitor
   *          the visitor
   */
  public accept(visitor:ExpressionNodeVisitor):void
  {
    visitor.visitExponentiationExpressionNode(this);
    this.base.accept(visitor);
    this.exponent.accept(visitor);
  }
}
