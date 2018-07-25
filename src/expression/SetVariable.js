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
 * A visitor that sets a variable with a specific name to a given value
 */
public class SetVariable implements ExpressionNodeVisitor
{

  private String name;
  private double value;

  /**
   * Construct the visitor with the name and the value of the variable to set
   *
   * @param name
   *          the name of the variable
   * @param value
   *          the value of the variable
   */
  public SetVariable(String name, double value)
  {
    super();
    this.name = name;
    this.value = value;
  }

  /**
   * Checks the nodes name against the name to set and sets the value if the two
   * strings match
   */
  public void visit(VariableExpressionNode node)
  {
    if (node.getName().equals(name))
      node.setValue(value);
  }

  /** Do nothing */
  public void visit(ConstantExpressionNode node)
  {}

  /** Do nothing */
  public void visit(AdditionExpressionNode node)
  {}

  /** Do nothing */
  public void visit(MultiplicationExpressionNode node)
  {}

  /** Do nothing */
  public void visit(ExponentiationExpressionNode node)
  {}

  /** Do nothing */
  public void visit(FunctionExpressionNode node)
  {}

}
