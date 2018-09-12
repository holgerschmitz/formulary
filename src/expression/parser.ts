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

import {Token} from './token';
import {Tokenizer} from './tokenizer';
import {Expression, ExpressionNode} from './expression-node';
import {ConstantExpressionNode} from './constant-expression-node';
import {VariableExpressionNode} from './variable-expression-node';
import {AdditionExpressionNode} from './addition-expression-node';
import {MultiplicationExpressionNode} from './multiplication-expression-node';
import {ExponentiationExpressionNode} from './exponentiation-expression-node';
import {FunctionExpressionNode} from './function-expression-node';

import {ParserException} from './parser-exception';

/**
 * A parser for mathematical expressions. The parser class defines a method
 * parse() which takes a string and returns an ExpressionNode that holds a
 * representation of the expression.
 *
 * Parsing is implemented in the form of a recursive descent parser.
 *
 */
export class Parser
{
  /** the tokens to parse */
  private tokens:Array<Token>;

  /** the next token */
  private lookahead:Token;

  /**
   * Parse a mathematical expression in a string and return an ExpressionNode.
   *
   * This is a convenience method that first converts the string into a linked
   * list of tokens using the expression tokenizer provided by the Tokenizer
   * class.
   *
   * @param expression
   *          the string holding the input
   * @return the internal representation of the expression in form of an
   *         expression tree made out of ExpressionNode objects
   */
  public parse(expression:string):ExpressionNode
  {
    const tokenizer = Tokenizer.getExpressionTokenizer();
    tokenizer.tokenize(expression);
    const tokens = tokenizer.getTokens();
    return this.parseTokens(tokens);
  }

  /**
   * Parse a mathematical expression in contained in a list of tokens and return
   * an ExpressionNode.
   *
   * @param tokens
   *          a list of tokens holding the tokenized input
   * @return the internal representation of the expression in form of an
   *         expression tree made out of ExpressionNode objects
   */
  public parseTokens(tokens:Array<Token>):ExpressionNode
  {
    // implementing a recursive descent parser
    this.tokens = Array.from(tokens);
    this.lookahead = this.tokens[0];

    // top level non-terminal is expression
    const expr = this.expression();

    this.diagnose(expr, "parseTokens");

    if (this.lookahead.token !== Token.EPSILON)
      throw new ParserException(`Unexpected symbol ${this.lookahead.sequence} found at position ${this.lookahead.pos}`);

    return expr;
  }

  private diagnose(expr:ExpressionNode, domain:String) {
    return;
    // console.info(domain);
    // console.info("    result = "+JSON.stringify(expr));
    // console.info("    lookahead = "+JSON.stringify(this.lookahead));
  }

  /** handles the non-terminal expression */
  private expression():ExpressionNode
  {
    // only one rule
    // expression -> signed_term sum_op
    let expr = this.signedTerm();
    this.diagnose(expr, "expression() A");

    expr = this.sumOp(expr);
    this.diagnose(expr, "expression() B");
    return expr;
  }

  /** handles the non-terminal sum_op */
  private sumOp(expr:ExpressionNode):ExpressionNode
  {
    // sum_op -> PLUSMINUS term sum_op
    if (this.lookahead.token == Token.PLUSMINUS)
    {
      let sum:AdditionExpressionNode;
      // This means we are actually dealing with a sum
      // If expr is not already a sum, we have to create one
      if (expr.getType() == Expression.ADDITION_NODE)
        sum = expr as AdditionExpressionNode;
      else
        sum = new AdditionExpressionNode(expr, true);

      // reduce the input and recursively call sum_op
      const positive = (this.lookahead.sequence === "+");
      this.nextToken();
      const t = this.term();
      sum.add(t, positive);

      return this.sumOp(sum);
    }

    this.diagnose(expr, "sumOp()");
    // sum_op -> EPSILON
    return expr;
  }

  /** handles the non-terminal signed_term */
  private signedTerm():ExpressionNode
  {
    // signed_term -> PLUSMINUS term
    if (this.lookahead.token == Token.PLUSMINUS)
    {
      const positive = (this.lookahead.sequence === "+");
      this.nextToken();
      const t = this.term();
      if (positive)
        return t;
      else
        return new AdditionExpressionNode(t, false);
    }

    const expr = this.term();
    this.diagnose(expr, "signedTerm()");
    // signed_term -> term
    return expr;
  }

  /** handles the non-terminal term */
  private term():ExpressionNode
  {
    // term -> factor term_op
    const f = this.factor();
    this.diagnose(f, "term() f");
    const expr = this.termOp(f);
    this.diagnose(expr, "term() expr");
    return expr;
  }

  /** handles the non-terminal term_op */
  private termOp(expression:ExpressionNode):ExpressionNode
  {
    // term_op -> MULTDIV factor term_op
    if (this.lookahead.token == Token.MULTDIV)
    {
      let prod:MultiplicationExpressionNode;

      // This means we are actually dealing with a product
      // If expr is not already a PRODUCT, we have to create one
      if (expression.getType() == Expression.MULTIPLICATION_NODE)
        prod = expression as MultiplicationExpressionNode;
      else
        prod = new MultiplicationExpressionNode(expression, true);

      // reduce the input and recursively call sum_op
      const positive = (this.lookahead.sequence === "*");
      this.nextToken();
      const f = this.signedFactor();
      prod.add(f, positive);

      return this.termOp(prod);
    }

    // term_op -> EPSILON
    return expression;
  }

 /** handles the non-terminal signed_factor */
  private signedFactor():ExpressionNode
  {
    // signed_factor -> PLUSMINUS factor
    if (this.lookahead.token == Token.PLUSMINUS)
    {
      const positive = (this.lookahead.sequence === "+");
      this.nextToken();
      const t = this.factor();
      if (positive)
        return t;
      else
        return new AdditionExpressionNode(t, false);
    }

    // signed_factor -> factor
    return this.factor();
  }

  /** handles the non-terminal factor */
  private factor():ExpressionNode
  {
    // factor -> argument factor_op
    const a = this.argument();
    return this.factorOp(a);
  }

  /** handles the non-terminal factor_op */
  private factorOp(expr:ExpressionNode):ExpressionNode
  {
    // factor_op -> RAISED expression
    if (this.lookahead.token == Token.RAISED)
    {
      this.nextToken();
      const exponent = this.signedFactor();

      return new ExponentiationExpressionNode(expr, exponent);
    }

    // factor_op -> EPSILON
    return expr;
  }

  /** handles the non-terminal argument */
  private argument():ExpressionNode
  {
    // argument -> FUNCTION argument
    if (this.lookahead.token == Token.FUNCTION)
    {
      const func = FunctionExpressionNode.stringToFunction(this.lookahead.sequence);
      this.nextToken();
      const expr = this.argument();
      return new FunctionExpressionNode(func, expr);
    }
    // argument -> OPEN_BRACKET sum CLOSE_BRACKET
    else if (this.lookahead.token == Token.OPEN_BRACKET)
    {
      this.nextToken();
      const expr = this.expression();
      if (this.peek() != Token.CLOSE_BRACKET)
        throw new ParserException("Closing brackets expected", this.lookahead);
      this.nextToken();
      return expr;
    }

    // argument -> value
    return this.value();
  }

  /** handles the non-terminal value */
  private value():ExpressionNode
  {
    // argument -> NUMBER
    if (this.lookahead.token == Token.NUMBER)
    {
      const expr = new ConstantExpressionNode(parseFloat(this.lookahead.sequence));
      this.nextToken();
      return expr;
    }

    // argument -> VARIABLE
    if (this.lookahead.token == Token.VARIABLE)
    {
      const expr = new VariableExpressionNode(this.lookahead.sequence);
      this.nextToken();
      return expr;
    }

    if (this.lookahead.token == Token.EPSILON)
      throw new ParserException("Unexpected end of input");
    else
      throw new ParserException("Unexpected symbol %s found", this.lookahead);
  }

  /**
   * Remove the first token from the list and store the next token in lookahead
   */
  private nextToken():void
  {
    this.tokens.shift();
    // at the end of input we return an epsilon token
    if (this.tokens.length == 0)
      this.lookahead = {token:Token.EPSILON, sequence:"", pos:-1};
    else
      this.lookahead = this.tokens[0];
  }

  private peek():number {
    return this.lookahead.token;
  }
}
