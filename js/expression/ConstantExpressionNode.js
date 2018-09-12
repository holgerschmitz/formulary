"use strict";
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
exports.__esModule = true;
var ExpressionNode_1 = require("./ExpressionNode");
/**
 * An ExpressionNode that stores a constant value
 */
var ConstantExpressionNode = /** @class */ (function () {
    /**
     * Construct with the fixed value.
     *
     * @param value
     *          the value of the constant
     */
    function ConstantExpressionNode(value) {
        this.value = value;
    }
    /**
     * Returns the value of the constant
     */
    ConstantExpressionNode.prototype.getValue = function () {
        return this.value;
    };
    /**
     * Returns the type of the node, in this case ExpressionNode.CONSTANT_NODE
     */
    ConstantExpressionNode.prototype.getType = function () {
        return ExpressionNode_1.Expression.CONSTANT_NODE;
    };
    /**
     * Implementation of the visitor design pattern.
     *
     * Calls visit on the visitor.
     *
     * @param visitor
     *          the visitor
     */
    ConstantExpressionNode.prototype.accept = function (visitor) {
        visitor.visitConstantExpressionNode(this);
    };
    return ConstantExpressionNode;
}());
exports["default"] = ConstantExpressionNode;
