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
// :
// You should have received a copy of the GNU General Public License
// along with Formulary IO.  If not, see <http://www.gnu.org/licenses/>.

import {ExpressionNodeVisitor} from './expression-node-visitor';

export class Expression {
  /** Node id for variable nodes */
  public static readonly VARIABLE_NODE = 1;
  /** Node id for constant nodes */
  public static readonly CONSTANT_NODE = 2;
  /** Node id for addition nodes */
  public static readonly ADDITION_NODE = 3;
  /** Node id for multiplication nodes */
  public static readonly MULTIPLICATION_NODE = 4;
  /** Node id for exponentiation nodes */
  public static readonly EXPONENTIATION_NODE = 5;
  /** Node id for function nodes */
  public static readonly FUNCTION_NODE = 6;
};

/**
 * An interface for expression nodes.
 *
 * Every concrete type of expression node has to implement this interface.
 */
export interface ExpressionNode
{

  /**
   * Returns the type of the node.ExpressionNode
   *
   * Each class derived from ExpressionNode representing a specific
   * role in the expression should return the type according to that
   * role.
   *
   * @return type of the node
   */
  getType():number;

  /**
   * Calculates and returns the value of the sub-expression represented by
   * the node.
   *
   * @return value of expression
   */
  getValue():number;

  /**
   * Method needed for the visitor design pattern
   *
   * @param visitor
   *          the visitor
   */
  accept(visitor:ExpressionNodeVisitor):void;

}
