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

import {Token} from './token'

/**
 * A simple subclass of RuntimeException that indicates errors when trying to
 * parse the input to Parser.
 *
 * The exception stores the token that caused the error.
 */
export class ParserException extends Error
{
  /** the token that caused the error */
  private token:Token = null;

  /**
   * Construct the evaluation exception with a message and a token.
   * @param message the message containing the cause of the exception
   * @param token the token that caused the exception
   */
  constructor(message:string, token?:Token)
  {
    super(message);
    this.token = token;
  }

  /**
   * Overrides RuntimeException.getMessage to add the token information
   * into the error message.
   *
   *  @return the error message
   */
  public getMessage():string
  {
    let msg = this.message;
    if (this.token != null)
    {
      msg = msg.replace("%s", this.token.sequence);
    }
    return msg;
  }

}
