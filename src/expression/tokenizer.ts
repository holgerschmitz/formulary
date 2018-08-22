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

import {Token} from './token'
import {FunctionExpressionNode} from './function-expression-node'
import {ParserException} from './parser-exception'
/**
 * Internal class holding the information about a token type.
 */
interface TokenInfo
{
  /** the regular expression to match against */
  readonly regex:RegExp;
  /** the token id that the regular expression is linked to */
  readonly token:number;
};

/**
 * A class for reading an input string and separating it into tokens that can be
 * fed into Parser.
 *
 * The user can add regular expressions that will be matched against the front
 * of the string. Regular expressions should not contain beginning-of-string or
 * end-of-string anchors or any capturing groups as these will be added by the
 * tokenizer itslef.
 */
export class Tokenizer
{

  /**
   * a list of TokenInfo objects
   *
   * Each token type corresponds to one entry in the list
   */
  private tokenInfos:Array<TokenInfo>;

  /** the list of tokens produced when tokenizing the input */
  private tokens:Array<Token>;

  /** a tokenizer that can handle mathematical expressions */
  private static expressionTokenizer:Tokenizer = null;

  /**
   * Default constructor
   */
  constructor()
  {
    this.tokenInfos = [];
    this.tokens = [];
  }

  /**
   * A static method that returns a tokenizer for mathematical expressions
   * @return a tokenizer that can handle mathematical expressions
   */
  public static getExpressionTokenizer():Tokenizer
  {
    if (this.expressionTokenizer == null)
      this.expressionTokenizer = this.createExpressionTokenizer();
    return this.expressionTokenizer;
  }

  /**
   * A static method that actually creates a tokenizer for mathematical expressions
   * @return a tokenizer that can handle mathematical expressions
   */
  private static createExpressionTokenizer():Tokenizer
  {
    const tokenizer:Tokenizer = new Tokenizer();

    tokenizer.add("[+-]", Token.PLUSMINUS);
    tokenizer.add("[*/]", Token.MULTDIV);
    tokenizer.add("\\^", Token.RAISED);

    const funcs = FunctionExpressionNode.getAllFunctions();
    tokenizer.add("(" + funcs + ")(?!\\w)", Token.FUNCTION);

    tokenizer.add("\\(", Token.OPEN_BRACKET);
    tokenizer.add("\\)", Token.CLOSE_BRACKET);
    tokenizer.add("(?:\\d+\\.?|\\.\\d)\\d*(?:[Ee][-+]?\\d+)?", Token.NUMBER);
    tokenizer.add("[a-zA-Z]\\w*", Token.VARIABLE);

    return tokenizer;
  }

  /**
   * Add a regular expression and a token id to the internal list of recognized tokens
   * @param regex the regular expression to match against
   * @param token the token id that the regular expression is linked to
   */
  public add(regex:string, token:number):void
  {
    this.tokenInfos.push({regex: new RegExp("^(" + regex+")"), token: token});
  }

  /**
   * Tokenize an input string.
   *
   * The reult of tokenizing can be accessed via getTokens
   *
   * @param str the string to tokenize
   */
  public tokenize(str:string):void
  {
    let s = str.trim();
    const totalLength = s.length;
    this.tokens = [];
    while (s !=="")
    {
      const remaining = s.length;
      let match = false;
      for (let info of this.tokenInfos)
      {
        const m = s.match(info.regex);
        if (m !== null)
        {
          match = true;
          const tok = m[0].trim();
          // System.out.println("Success matching " + s + " against " +
          // info.regex.pattern() + " : " + tok);
          s = s.replace(info.regex, "").trim();
          this.tokens.push({token: info.token, sequence:tok, pos:totalLength - remaining});
          break;
        }
      }
      if (!match)
        throw new ParserException("Unexpected character in input: " + s);
    }
  }

  /**
   * Get the tokens generated in the last call to tokenize.
   * @return a list of tokens to be fed to Parser
   */
  public getTokens():Array<Token>
  {
    return this.tokens;
  }

}
