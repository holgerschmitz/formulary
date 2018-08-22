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

/**
 * A token that is produced by Tokenizer and fed into Parser.parse
 *
 * A token consists of a token identifier, a string that the token was
 * created from and the position in the input string that the token was found.
 *
 * The token id must be one of a number of pre-defined values
 */
export class Token
{
  /** Token id for the epsilon terminal */
  public static readonly EPSILON = 0;
  /** Token id for plus or minus */
  public static readonly PLUSMINUS = 1;
  /** Token id for multiplication or division */
  public static readonly MULTDIV = 2;
  /** Token id for the exponentiation symbol */
  public static readonly RAISED = 3;
  /** Token id for function names */
  public static readonly FUNCTION = 4;
  /** Token id for opening brackets */
  public static readonly OPEN_BRACKET = 5;
  /** Token id for closing brackets */
  public static readonly CLOSE_BRACKET = 6;
  /** Token id for numbers */
  public static readonly NUMBER = 7;
  /** Token id for variable names */
  public static readonly VARIABLE = 8;

  /** the token identifier */
  public token:number;
  /** thereadonly string that the token was created from */
  public readonly sequence:string;
  /** the position of the token in the input string */
  public readonly pos:number;
}
