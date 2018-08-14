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


import {Expression, ExpressionNode} from './expression-node';
import {ExpressionNodeVisitor} from './expression-node-visitor';
import {SequenceExpressionNode} from './sequence-expression-node';

/**
 * An ExpressionNode that handles multiplications and divisions. The node can hold
 * an arbitrary number of factors that are either multiplied or divided to the product.
 *
 */
export class MultiplicationExpressionNode extends SequenceExpressionNode
{
  /**
   * Constructor to create a multiplication with the first term already added.
   *
   * @param node
   *          the term to be added
   * @param positive
   *          a flag indicating whether the term is multiplied or divided
   */
  public constructor(a:ExpressionNode, positive:boolean)
  {
    super(a, positive);
  }

  /**
   * Returns the type of the node, in this case ExpressionNode.MULTIPLICATION_NODE
   */
  public getType():number
  {
    return Expression.MULTIPLICATION_NODE;
  }

  /**
   * Returns the value of the sub-expression that is rooted at this node.
   *
   * All the terms are evaluated and multiplied or divided to the product.
   */
  public getValue(): number
  {
    let prod = 1.0;
    for (const t of this.terms)
    {
      if (t.positive)
        prod *= t.expression.getValue();
      else
        prod /= t.expression.getValue();
    }
    return prod;
  }

  /**
   * Implementation of the visitor design pattern.
   *
   * Calls visit on the visitor and then passes the visitor on to the accept
   * method of all the terms in the product.
   *
   * @param visitor
   *          the visitor
   */
  public accept(visitor:ExpressionNodeVisitor):void
  {
    visitor.visitMultiplicationExpressionNode(this);
    for (const t of this.terms)
      t.expression.accept(visitor);
  }
}
