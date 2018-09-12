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

import {ExpressionNode} from '../expression/expression-node';
import {ExpressionNodeVisitor} from '../expression/expression-node-visitor';

/**
 * The Equation class encapsulates the concept of a mathematical equation with
 * a left hand side and a right hand side.
 */
export class Equation {
  private lhs:ExpressionNode;
  private rhs:ExpressionNode;

  /**
   * Create an equation from the left hand side and right hand side
   * @param lhs The left hand side of the equation
   * @param rhs The right hand side of the equation
   */
  constructor(lhs:ExpressionNode, rhs:ExpressionNode) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  /**
   * Get the left hand side
   * @return The left hand side of the equation
   */
  getLhs():ExpressionNode {
    return this.lhs;
  }

  /**
   * Get the right hand side
   * @return The right hand side of the equation
   */
  getRhs():ExpressionNode {
    return this.rhs;
  }

  /**
   * Implementation of the visitor design pattern.
   *
   * Passes the visitor on to the accept method of both sides of the equation.
   *
   * @param visitor
   *          the visitor
   */
  public accept(visitor:ExpressionNodeVisitor)
  {
    this.lhs.accept(visitor);
    this.rhs.accept(visitor);
  }
}
