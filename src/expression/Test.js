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
 * Test the Parser
 */
public class Test
{

  /**
   * The main method to test the functionality of the parser
   */
  public static void main(String[] args)
  {

    String exprstr = "2*(1+sin(pi/2))^2";
    if (args.length>0) exprstr = args[0];

    Parser parser = new Parser();
    try
    {
      ExpressionNode expr = parser.parse(exprstr);
      expr.accept(new SetVariable("pi", Math.PI));
      System.out.println("The value of the expression is "+expr.getValue());

    }
    catch (ParserException e)
    {
      System.out.println(e.getMessage());
    }
    catch (EvaluationException e)
    {
      System.out.println(e.getMessage());
    }
  }
}
