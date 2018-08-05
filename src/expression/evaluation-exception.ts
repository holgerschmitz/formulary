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
 * A simple subclass of RuntimeException that indicates errors when trying to
 * evaluate an expression.
 */
export class EvaluationException extends Error
{
  /**
   * Construct the evaluation exception with a message.
   * @param message the message containing the cause of the exception
   */
  constructor(message:string)
  {
    super(message);
  }
}
