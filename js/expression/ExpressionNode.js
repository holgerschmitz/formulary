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
// :
// You should have received a copy of the GNU General Public License
// along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
exports.__esModule = true;
var Expression = /** @class */ (function () {
    function Expression() {
    }
    /** Node id for variable nodes */
    Expression.VARIABLE_NODE = 1;
    /** Node id for constant nodes */
    Expression.CONSTANT_NODE = 2;
    /** Node id for addition nodes */
    Expression.ADDITION_NODE = 3;
    /** Node id for multiplication nodes */
    Expression.MULTIPLICATION_NODE = 4;
    /** Node id for exponentiation nodes */
    Expression.EXPONENTIATION_NODE = 5;
    /** Node id for function nodes */
    Expression.FUNCTION_NODE = 6;
    return Expression;
}());
exports.Expression = Expression;
;
