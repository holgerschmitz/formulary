
import {describe, it, before, after} from 'mocha';
import * as chai from 'chai';
const expect = chai.expect;

import {Token} from '../../src/expression/token';
import {Tokenizer} from '../../src/expression/tokenizer';

describe('Tokenizer', () => {

  it("must be able to create an expression tokenizer", () => {
    expect(Tokenizer).to.have.property('getExpressionTokenizer');
    const tokenizer = Tokenizer.getExpressionTokenizer();
    expect(tokenizer).to.not.be.undefined;
    expect(tokenizer.add).to.be.a('function');
    expect(tokenizer.tokenize).to.be.a('function');
    expect(tokenizer.getTokens).to.be.a('function');
  });

  it("must tokenize a string containing all token types", () => {
    const input = '+-*/^ sin cos tan asin acos atan sqrt exp ln log log2 ( ) 3 3.141 x val';
    const expectedTokens:Array<Token> = [
      {token:Token.PLUSMINUS, sequence:'+', pos:0},
      {token:Token.PLUSMINUS, sequence:'-', pos:1},
      {token:Token.MULTDIV, sequence:'*', pos:2},
      {token:Token.MULTDIV, sequence:'/', pos:3},
      {token:Token.RAISED, sequence:'^', pos:4},
      {token:Token.FUNCTION, sequence:'sin', pos:6},
      {token:Token.FUNCTION, sequence:'cos', pos:10},
      {token:Token.FUNCTION, sequence:'tan', pos:14},
      {token:Token.FUNCTION, sequence:'asin', pos:18},
      {token:Token.FUNCTION, sequence:'acos', pos:23},
      {token:Token.FUNCTION, sequence:'atan', pos:28},
      {token:Token.FUNCTION, sequence:'sqrt', pos:33},
      {token:Token.FUNCTION, sequence:'exp', pos:38},
      {token:Token.FUNCTION, sequence:'ln', pos:42},
      {token:Token.FUNCTION, sequence:'log', pos:45},
      {token:Token.FUNCTION, sequence:'log2', pos:49},
      {token:Token.OPEN_BRACKET, sequence: '(', pos: 54 },
      {token:Token.CLOSE_BRACKET, sequence: ')', pos: 56 },
      {token:Token.NUMBER, sequence: '3', pos: 58 },
      {token:Token.NUMBER, sequence: '3.141', pos: 60 },
      {token:Token.VARIABLE, sequence: 'x', pos: 66 },
      {token:Token.VARIABLE, sequence: 'val', pos: 68 }
    ];
    const tokenizer = Tokenizer.getExpressionTokenizer();
    tokenizer.tokenize(input);
    const tokens = tokenizer.getTokens();

    expect(tokens.length).to.eql(expectedTokens.length);

    for (let i=0; i<tokens.length; i++) {
      expect(tokens[i]).to.deep.equal(expectedTokens[i]);
    }
  });

  it("must correctly understand numbers", () => {
    const input = '3 +4 -5 3.141 +2.456 -91.635 3.3e1 4.5e-3 5.6e+8';
    const expectedTokens:Array<Token> =  [
      { token:Token.NUMBER, sequence: '3', pos: 0 },
      { token:Token.PLUSMINUS, sequence: '+', pos: 2 },
      { token:Token.NUMBER, sequence: '4', pos: 3 },
      { token:Token.PLUSMINUS, sequence: '-', pos: 5 },
      { token:Token.NUMBER, sequence: '5', pos: 6 },
      { token:Token.NUMBER, sequence: '3.141', pos: 8 },
      { token:Token.PLUSMINUS, sequence: '+', pos: 14 },
      { token:Token.NUMBER, sequence: '2.456', pos: 15 },
      { token:Token.PLUSMINUS, sequence: '-', pos: 21 },
      { token:Token.NUMBER, sequence: '91.635', pos: 22 },
      { token:Token.NUMBER, sequence: '3.3e1', pos: 29 },
      { token:Token.NUMBER, sequence: '4.5e-3', pos: 35 },
      { token:Token.NUMBER, sequence: '5.6e+8', pos: 42 } ]

    const tokenizer = Tokenizer.getExpressionTokenizer();
    tokenizer.tokenize(input);
    const tokens = tokenizer.getTokens();

    expect(tokens.length).to.eql(expectedTokens.length);

    for (let i=0; i<tokens.length; i++) {
      expect(tokens[i]).to.deep.equal(expectedTokens[i]);
    }
  });

  it("must throw on unexpected input", () => {
    const input="sin(%)";
    const tokenizer = Tokenizer.getExpressionTokenizer();
    expect(tokenizer.tokenize.bind(tokenizer, input)).to.throw();
  });

});
