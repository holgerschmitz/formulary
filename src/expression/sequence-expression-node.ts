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
 * A base class for AdditionExpressionNode and MultiplicationExpressionNode.
 *
 * Holds an arbitrary number of ExpressionNodes together with boolean flags.
 *
 */
export abstract class SequenceExpressionNode implements ExpressionNode
{
  /** the list of terms in the sequence */
  protected terms: {positive:boolean, expression:ExpressionNode}[] = [];


  /**
   * Constructor to create a sequence with the first term already added.
   *
   * @param node
   *          the term to be added
   * @param positive
   *          a boolean flag
   */
  public constructor(a:ExpressionNode, positive:boolean)
  {
    this.terms.push({positive:positive, expression:a});
  }

  /**
   * Add another term to the sequence
   * @param node
   *          the term to be added
   * @param positive
   *          a boolean flag
   */
  public add(node:ExpressionNode, positive:boolean)
  {
    this.terms.push({positive:positive, expression:node});
  }

  /**
   * Returns the type of the node.ExpressionNode
   *
   * Each class derived from ExpressionNode representing a specific
   * role in the expression should return the type according to that
   * role.
   *
   * @return type of the node
   */
  public abstract getType():number;

  /**
   * Calculates and returns the value of the sub-expression represented by
   * the node.
   *
   * @return value of expression
   */
  public abstract getValue():number;

  /**
   * Method needed for the visitor design pattern
   *
   * @param visitor
   *          the visitor
   */
  public abstract accept(visitor:ExpressionNodeVisitor):void;

}
