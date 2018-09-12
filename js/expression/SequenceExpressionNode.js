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
/**
 * A base class for AdditionExpressionNode and MultiplicationExpressionNode.
 *
 * Holds an arbitrary number of ExpressionNodes together with boolean flags.
 *
 */
var SequenceExpressionNode = /** @class */ (function () {
    /**
     * Constructor to create a sequence with the first term already added.
     *
     * @param node
     *          the term to be added
     * @param positive
     *          a boolean flag
     */
    function SequenceExpressionNode(a, positive) {
        this.terms.push({ positive: positive, expression: a });
    }
    /**
     * Add another term to the sequence
     * @param node
     *          the term to be added
     * @param positive
     *          a boolean flag
     */
    SequenceExpressionNode.prototype.add = function (node, positive) {
        this.terms.push({ positive: positive, expression: node });
    };
    return SequenceExpressionNode;
}());
exports["default"] = SequenceExpressionNode;
