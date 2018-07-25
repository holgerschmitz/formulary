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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ExpressionNode_1 = require("./ExpressionNode");
var SequenceExpressionNode_1 = require("./SequenceExpressionNode");
/**
 * An ExpressionNode that handles additions and subtractions. The node can hold
 * an arbitrary number of terms that are either added or subtraced from the sum.
 *
 */
var AdditionExpressionNode = /** @class */ (function (_super) {
    __extends(AdditionExpressionNode, _super);
    /**
     * Constructor to create an addition with the first term already added.
     *
     * @param node
     *          the term to be added
     * @param positive
     *          a flag indicating whether the term is added or subtracted
     */
    function AdditionExpressionNode(node, positive) {
        return _super.call(this, node, positive) || this;
    }
    /**
     * Returns the type of the node, in this case ExpressionNode.ADDITION_NODE
     */
    AdditionExpressionNode.prototype.getType = function () {
        return ExpressionNode_1.Expression.ADDITION_NODE;
    };
    /**
     * Returns the value of the sub-expression that is rooted at this node.
     *
     * All the terms are evaluated and added or subtracted from the total sum.
     */
    AdditionExpressionNode.prototype.getValue = function () {
        var sum = 0.0;
        for (var _i = 0, _a = this.terms; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.positive)
                sum += t.expression.getValue();
            else
                sum -= t.expression.getValue();
        }
        return sum;
    };
    /**
     * Implementation of the visitor design pattern.
     *
     * Calls visit on the visitor and then passes the visitor on to the accept
     * method of all the terms in the sum.
     *
     * @param visitor
     *          the visitor
     */
    AdditionExpressionNode.prototype.accept = function (visitor) {
        visitor.visitAdditionExpressionNode(this);
        for (var _i = 0, _a = this.terms; _i < _a.length; _i++) {
            var t = _a[_i];
            t.expression.accept(visitor);
        }
    };
    return AdditionExpressionNode;
}(SequenceExpressionNode_1["default"]));
exports["default"] = AdditionExpressionNode;
