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
import {EvaluationException} from './evaluation-exception';

/**
 * An ExpressionNode that stores a named variable
 */
export class VariableExpressionNode implements ExpressionNode
{
  /** The name of the variable */
  private name:string;
  /** The value of the variable */
  private value:number;
  /** indicates if the value has been set */
  private valueSet:boolean;

  /**
   * Construct with the name of the variable.
   *
   * @param name
   *          the name of the variable
   */
  public constructor(name:string)
  {
    this.name = name;
    this.valueSet = false;
  }

  /**
   * @return the name of the variable
   */
  public getName():string
  {
    return this.name;
  }

  /**
   * Returns the type of the node, in this case ExpressionNode.VARIABLE_NODE
   */
  public getType():number
  {
    return Expression.VARIABLE_NODE;
  }

  /**
   * Sets the value of the variable
   *
   * @param value
   *          the value of the variable
   */
  public setValue(value:number)
  {
    this.value = value;
    this.valueSet = true;
  }

  /**
   * Returns the value of the variable but throws an exception if the value has
   * not been set
   */
  public getValue():number
  {
    if (this.valueSet)
      return this.value;
    else
      throw new EvaluationException("Variable '" + this.name + "' was not initialized.");
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
    visitor.visitVariableExpressionNode(this);
  }

}
