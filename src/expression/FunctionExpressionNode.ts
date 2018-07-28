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

import {ExpressionNode, Expression} from './ExpressionNode'
import {ExpressionNodeVisitor} from './ExpressionNodeVisitor'
import {ParserException} from './ParserException'
import {EvaluationException} from './EvaluationException'

/**
 * An ExpressionNode that handles mathematical functions.
 *
 * Some pre-defined functions are handled, others can easily be added.
 */
export class FunctionExpressionNode implements ExpressionNode
{
  /** function id for the sin function */
  public static readonly SIN = 1;
  /** function id for the cos function */
  public static readonly COS = 2;
  /** function id for the tan function */
  public static readonly TAN = 3;

  /** function id for the asin function */
  public static readonly ASIN = 4;
  /** function id for the acos function */
  public static readonly ACOS = 5;
  /** function id for the atan function */
  public static readonly ATAN = 6;

  /** function id for the sqrt function */
  public static readonly SQRT = 7;
  /** function id for the exp function */
  public static readonly EXP = 8;

  /** function id for the ln function */
  public static readonly LN = 9;
  /** function id for the log function */
  public static readonly LOG = 10;
  /** function id for the log2 function */
  public static readonly LOG2 = 11;

  /** the id of the function to apply to the argument */
  private func:number;

  /** the argument of the function */
  private arg:ExpressionNode;

  /**
   * Construct a function by id and argument.
   *
   * @param function
   *          the id of the function to apply
   * @param argument
   *          the argument of the function
   */
  constructor(func:number, arg:ExpressionNode)
  {
    this.func = func;
    this.arg = arg;
  }

  /**
   * Returns the type of the node, in this case ExpressionNode.FUNCTION_NODE
   */
  public getType():number
  {
    return Expression.FUNCTION_NODE;
  }

  /**
   * Converts a string to a function id.
   *
   * If the function is not found this method throws an error.
   *
   * @param str
   *          the name of the function
   * @return the id of the function
   */
  public static stringToFunction(str:string):number
  {
    switch (str) {
      case "sin":
        return FunctionExpressionNode.SIN;
      case "cos":
        return FunctionExpressionNode.COS;
      case "tan":
        return FunctionExpressionNode.TAN;

      case "asin":
        return FunctionExpressionNode.ASIN;
      case "acos":
        return FunctionExpressionNode.ACOS;
      case "atan":
        return FunctionExpressionNode.ATAN;

      case "sqrt":
        return FunctionExpressionNode.SQRT;
      case "exp":
        return FunctionExpressionNode.EXP;

      case "ln":
        return FunctionExpressionNode.LN;
      case "log":
        return FunctionExpressionNode.LOG;
      case "log2":
        return FunctionExpressionNode.LOG2;
    }
    throw new ParserException("Unexpected Function " + str + " found");
  }

  /**
   * Returns a string with all the function names concatenated by a | symbol.
   *
   * This string is used in Tokenizer.createExpressionTokenizer to create a
   * regular expression for recognizing function names.
   *
   * @return a string containing all the function names
   */
  public static getAllFunctions():string
  {
    return "sin|cos|tan|asin|acos|atan|sqrt|exp|ln|log|log2";
  }

  /**
   * Returns the value of the sub-expression that is rooted at this node.
   *
   * The argument is evaluated and then the function is applied to the resulting
   * value.
   */
  public getValue():number
  {
    switch (this.func)
    {
      case FunctionExpressionNode.SIN:
        return Math.sin(this.arg.getValue());
      case FunctionExpressionNode.COS:
        return Math.cos(this.arg.getValue());
      case FunctionExpressionNode.TAN:
        return Math.tan(this.arg.getValue());
      case FunctionExpressionNode.ASIN:
        return Math.asin(this.arg.getValue());
      case FunctionExpressionNode.ACOS:
        return Math.acos(this.arg.getValue());
      case FunctionExpressionNode.ATAN:
        return Math.atan(this.arg.getValue());
      case FunctionExpressionNode.SQRT:
        return Math.sqrt(this.arg.getValue());
      case FunctionExpressionNode.EXP:
        return Math.exp(this.arg.getValue());
      case FunctionExpressionNode.LN:
        return Math.log(this.arg.getValue());
      case FunctionExpressionNode.LOG:
        return Math.log(this.arg.getValue()) * 0.43429448190325182765;
      case FunctionExpressionNode.LOG2:
        return Math.log(this.arg.getValue()) * 1.442695040888963407360;
    }

    throw new EvaluationException("Invalid function id "+this.func+"!");
  }

  /**
   * Implementation of the visitor design pattern.
   *
   * Calls visit on the visitor and then passes the visitor on to the accept
   * method of the argument.
   *
   * @param visitor
   *          the visitor
   */
  public accept(visitor:ExpressionNodeVisitor):void
  {
    visitor.visitFunctionExpressionNode(this);
    this.arg.accept(visitor);
  }

}
