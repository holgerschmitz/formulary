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


import {Expression, ExpressionNode} from './ExpressionNode';
import {ExpressionNodeVisitor} from './ExpressionNodeVisitor';
import {SequenceExpressionNode} from './SequenceExpressionNode';

/**
 * An ExpressionNode that handles additions and subtractions. The node can hold
 * an arbitrary number of terms that are either added or subtraced from the sum.
 *
 */
export class AdditionExpressionNode extends SequenceExpressionNode
{

  /**
   * Constructor to create an addition with the first term already added.
   *
   * @param node
   *          the term to be added
   * @param positive
   *          a flag indicating whether the term is added or subtracted
   */
  public constructor(node:ExpressionNode, positive:boolean)
  {
    super(node, positive);
  }

  /**
   * Returns the type of the node, in this case ExpressionNode.ADDITION_NODE
   */
  public getType():number
  {
    return Expression.ADDITION_NODE;
  }

  /**
   * Returns the value of the sub-expression that is rooted at this node.
   *
   * All the terms are evaluated and added or subtracted from the total sum.
   */
  public getValue():number
  {
    let sum:number = 0.0;
    for (let t of this.terms)
    {
      if (t.positive)
        sum += t.expression.getValue();
      else
        sum -= t.expression.getValue();
    }
    return sum;
  }

  /**
   * Implementation of the visitor design pattern.
   *
   * Calls visit on the visitor and then passes the visitor on to the accept
   * method of all the terms in the sum.
   *
   * @param visitor
   *          the visitor
   */
  public accept(visitor:ExpressionNodeVisitor)
  {
    visitor.visitAdditionExpressionNode(this);
    for (let t of this.terms)
      t.expression.accept(visitor);
  }

}
