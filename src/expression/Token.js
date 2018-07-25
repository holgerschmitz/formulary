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
public class Token
{
  /** Token id for the epsilon terminal */
  public static final int EPSILON = 0;
  /** Token id for plus or minus */
  public static final int PLUSMINUS = 1;
  /** Token id for multiplication or division */
  public static final int MULTDIV = 2;
  /** Token id for the exponentiation symbol */
  public static final int RAISED = 3;
  /** Token id for function names */
  public static final int FUNCTION = 4;
  /** Token id for opening brackets */
  public static final int OPEN_BRACKET = 5;
  /** Token id for closing brackets */
  public static final int CLOSE_BRACKET = 6;
  /** Token id for numbers */
  public static final int NUMBER = 7;
  /** Token id for variable names */
  public static final int VARIABLE = 8;

  /** the token identifier */
  public final int token;
  /** the string that the token was created from */
  public final String sequence;
  /** the position of the token in the input string */
  public final int pos;

  /**
   * Construct the token with its values
   * @param token the token identifier
   * @param sequence the string that the token was created from
   * @param pos the position of the token in the input string
   */
  public Token(int token, String sequence, int pos)
  {
    super();
    this.token = token;
    this.sequence = sequence;
    this.pos = pos;
  }

}
