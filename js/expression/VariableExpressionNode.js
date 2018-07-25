"use strict";
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
exports.__esModule = true;
var ExpressionNode_1 = require("./ExpressionNode");
/**
 * An ExpressionNode that stores a named variable
 */
var VariableExpressionNode = /** @class */ (function () {
    /**
     * Construct with the name of the variable.
     *
     * @param name
     *          the name of the variable
     */
    function VariableExpressionNode(name) {
        this.name = name;
        this.valueSet = false;
    }
    /**
     * @return the name of the variable
     */
    VariableExpressionNode.prototype.getName = function () {
        return this.name;
    };
    /**
     * Returns the type of the node, in this case ExpressionNode.VARIABLE_NODE
     */
    VariableExpressionNode.prototype.getType = function () {
        return ExpressionNode_1.Expression.VARIABLE_NODE;
    };
    /**
     * Sets the value of the variable
     *
     * @param value
     *          the value of the variable
     */
    VariableExpressionNode.prototype.setValue = function (value) {
        this.value = value;
        this.valueSet = true;
    };
    /**
     * Returns the value of the variable but throws an exception if the value has
     * not been set
     */
    VariableExpressionNode.prototype.getValue = function () {
        if (this.valueSet)
            return this.value;
        else
            throw new EvaluationException("Variable '" + this.name + "' was not initialized.");
    };
    /**
     * Implementation of the visitor design pattern.
     *
     * Calls visit on the visitor.
     *
     * @param visitor
     *          the visitor
     */
    VariableExpressionNode.prototype.accept = function (visitor) {
        visitor.visitVariableExpressionNode(this);
    };
    return VariableExpressionNode;
}());
exports["default"] = VariableExpressionNode;
