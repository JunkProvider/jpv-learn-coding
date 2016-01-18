var Application;
(function (Application) {
    var Code;
    (function (Code) {
        (function (LexerHint) {
            LexerHint[LexerHint["NONE"] = 0] = "NONE";
            LexerHint[LexerHint["STRING"] = 1] = "STRING";
            LexerHint[LexerHint["COMMENT"] = 2] = "COMMENT";
            LexerHint[LexerHint["WHITESPACE"] = 3] = "WHITESPACE";
            LexerHint[LexerHint["WORD"] = 4] = "WORD";
            LexerHint[LexerHint["NUMBER"] = 5] = "NUMBER";
            LexerHint[LexerHint["SPECIAL_CHAR"] = 6] = "SPECIAL_CHAR";
        })(Code.LexerHint || (Code.LexerHint = {}));
        var LexerHint = Code.LexerHint;
    })(Code = Application.Code || (Application.Code = {}));
})(Application || (Application = {}));
/// <reference path="LexerHint" />
var Application;
(function (Application) {
    var Code;
    (function (Code) {
        var Segment = (function () {
            function Segment(chars, hint) {
                this.nextSibling = null;
                this.prevSibling = null;
                this.chars = [];
                this.text = "";
                this.lexerHint = Code.LexerHint.NONE;
                this.interpreterHint = Code.Interpreter.InterpreterHint.NONE;
                this.chars = chars;
                this.lexerHint = hint;
                this.text = "";
                for (var i = 0; i < this.chars.length; i++) {
                    this.text += String.fromCharCode(this.chars[i]);
                }
            }
            Segment.prototype.getNextRelevantSibling = function () {
                return this.getNextMatchingSibling(function (segment) { return segment.lexerHint != Code.LexerHint.WHITESPACE && segment.lexerHint != Code.LexerHint.COMMENT; });
            };
            Segment.prototype.getPrevRelevantSibling = function () {
                return this.getPrevMatchingSibling(function (segment) { return segment.lexerHint != Code.LexerHint.WHITESPACE && segment.lexerHint != Code.LexerHint.COMMENT; });
            };
            Segment.prototype.getNextMatchingSibling = function (isMatching) {
                var segment = this;
                while ((segment = segment.nextSibling) != null) {
                    if (isMatching(segment))
                        return segment;
                }
                return null;
            };
            Segment.prototype.getPrevMatchingSibling = function (isMatching) {
                var segment = this;
                while ((segment = segment.prevSibling) != null) {
                    if (isMatching(segment))
                        return segment;
                }
                return null;
            };
            Segment.prototype.toString = function () {
                return "[" + this.text + "]";
            };
            return Segment;
        })();
        Code.Segment = Segment;
    })(Code = Application.Code || (Application.Code = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Code;
    (function (Code) {
        var Stream = (function () {
            function Stream(chars) {
                this.index = 0;
                this.chars = chars;
                this.length = chars.length;
                this.lastIndex = this.length - 1;
            }
            Stream.createFromString = function (value) {
                var chars = [];
                for (var i = 0; i < value.length; i++) {
                    chars.push(value.charCodeAt(i));
                }
                return new Stream(chars);
            };
            Stream.prototype.eos = function () {
                return this.index > this.lastIndex;
            };
            Stream.prototype.peek = function (offset) {
                if (offset === void 0) { offset = 0; }
                var index = this.index + offset;
                if (index < 0 || index > this.lastIndex)
                    return -1;
                return this.chars[index];
            };
            Stream.prototype.read = function () {
                if (this.index > this.lastIndex)
                    return -1;
                return this.chars[this.index++];
            };
            Stream.prototype.readMultiple = function (count) {
                var start = this.index;
                this.index += count;
                return this.chars.slice(start, start + count);
            };
            return Stream;
        })();
        Code.Stream = Stream;
    })(Code = Application.Code || (Application.Code = {}));
})(Application || (Application = {}));
/// <reference path="../Segment" />
/// <reference path="../Stream" />
var Application;
(function (Application) {
    var Code;
    (function (Code) {
        var SegmentFinder;
        (function (SegmentFinder) {
            var SymbolFinder = (function () {
                function SymbolFinder(searchedChars, hint) {
                    this.searchedChars = [];
                    this.searchedChars = searchedChars;
                    this.hint = hint;
                }
                SymbolFinder.createFromString = function (chars, hint) {
                    var charCodes = [];
                    for (var i = 0; i < chars.length; i++) {
                        charCodes.push(chars.charCodeAt(i));
                    }
                    return new SymbolFinder(charCodes, hint);
                };
                SymbolFinder.createFromStringArray = function (chars, hint) {
                    var charCodes = [];
                    for (var _i = 0; _i < chars.length; _i++) {
                        var char = chars[_i];
                        if (char.length != 1)
                            throw new Error("Each string must be a single char!");
                        charCodes.push(char.charCodeAt(0));
                    }
                    return new SymbolFinder(charCodes, hint);
                };
                SymbolFinder.prototype.find = function (stream) {
                    var char = stream.peek();
                    var searchedChars = this.searchedChars;
                    for (var i = 0, len = searchedChars.length; i < len; i++) {
                        if (char == searchedChars[i]) {
                            return new Code.Segment([stream.read()], this.hint);
                        }
                    }
                    return null;
                };
                return SymbolFinder;
            })();
            SegmentFinder.SymbolFinder = SymbolFinder;
        })(SegmentFinder = Code.SegmentFinder || (Code.SegmentFinder = {}));
    })(Code = Application.Code || (Application.Code = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Code;
    (function (Code) {
        var CharCode = (function () {
            function CharCode() {
            }
            CharCode.isAlphanumeric = function (charCode) {
                return CharCode.isNumber(charCode) || CharCode.isLetter(charCode);
            };
            CharCode.isNumber = function (charCode) {
                return charCode >= CharCode.ZERO && charCode <= CharCode.NINE;
            };
            CharCode.isLetter = function (charCode) {
                return (charCode >= CharCode.a && charCode <= CharCode.z) || (charCode >= CharCode.A && charCode <= CharCode.Z);
            };
            CharCode.isLowerCase = function (charCode) {
                return charCode >= CharCode.a && charCode <= CharCode.z;
            };
            CharCode.isUpperCase = function (charCode) {
                return charCode >= CharCode.A && charCode <= CharCode.Z;
            };
            CharCode.fromString = function (value) {
                return value.charCodeAt(0);
            };
            CharCode.SCORE = CharCode.fromString('_');
            CharCode.DOT = CharCode.fromString('.');
            CharCode.MINUS = CharCode.fromString('-');
            CharCode.SLASH = '/'.charCodeAt(0);
            CharCode.ASTERISK = '*'.charCodeAt(0);
            CharCode.SINGLE_QUOTE = '\''.charCodeAt(0);
            CharCode.DOUBLE_QUOTE = '"'.charCodeAt(0);
            CharCode.LINE_BREAK = '\n'.charCodeAt(0);
            CharCode.TAB = '\t'.charCodeAt(0);
            CharCode.SPACE = ' '.charCodeAt(0);
            CharCode.ZERO = CharCode.fromString('0');
            CharCode.NINE = CharCode.fromString('9');
            CharCode.a = CharCode.fromString('a');
            CharCode.f = CharCode.fromString('f');
            CharCode.z = CharCode.fromString('z');
            CharCode.A = CharCode.fromString('A');
            CharCode.Z = CharCode.fromString('Z');
            return CharCode;
        })();
        Code.CharCode = CharCode;
    })(Code = Application.Code || (Application.Code = {}));
})(Application || (Application = {}));
/// <reference path="Segment" />
var Application;
(function (Application) {
    var Code;
    (function (Code) {
        var Interpreter;
        (function (Interpreter) {
            (function (InterpreterHint) {
                InterpreterHint[InterpreterHint["NONE"] = 0] = "NONE";
                InterpreterHint[InterpreterHint["TYPE"] = 1] = "TYPE";
                InterpreterHint[InterpreterHint["VARIABLE"] = 2] = "VARIABLE";
                InterpreterHint[InterpreterHint["FUNCTION"] = 3] = "FUNCTION";
                InterpreterHint[InterpreterHint["KEYWORD"] = 4] = "KEYWORD";
                InterpreterHint[InterpreterHint["OPERATOR"] = 5] = "OPERATOR";
                InterpreterHint[InterpreterHint["SPECIAL_CHAR"] = 6] = "SPECIAL_CHAR";
            })(Interpreter.InterpreterHint || (Interpreter.InterpreterHint = {}));
            var InterpreterHint = Interpreter.InterpreterHint;
        })(Interpreter = Code.Interpreter || (Code.Interpreter = {}));
    })(Code = Application.Code || (Application.Code = {}));
})(Application || (Application = {}));
/// <reference path="../CharCode" />
/// <reference path="../Segment" />
/// <reference path="../LexerHint" />
/// <reference path="../IInterpreter" />
/// <reference path="../InterpreterHint" />
var Application;
(function (Application) {
    var Code;
    (function (Code) {
        var Interpreter;
        (function (Interpreter) {
            var JavaInterpreter = (function () {
                function JavaInterpreter(keywords, operators) {
                    this.keywords = JPV.Collection.Map.createFromArray(keywords, function (keyword) { return keyword; });
                    this.operators = JPV.Collection.Map.createFromArray(operators, function (operator) { return operator; });
                }
                JavaInterpreter.prototype.interpret = function (segments) {
                    for (var _i = 0; _i < segments.length; _i++) {
                        var segment = segments[_i];
                        if (segment.lexerHint == Code.LexerHint.WORD) {
                            segment.interpreterHint = this.interpretWord(segment);
                            continue;
                        }
                        if (segment.lexerHint == Code.LexerHint.SPECIAL_CHAR) {
                            segment.interpreterHint = this.interpretSpecialChar(segment);
                            continue;
                        }
                    }
                };
                JavaInterpreter.prototype.interpretSpecialChar = function (segment) {
                    var text = segment.text;
                    if (this.operators.contains(text))
                        return Interpreter.InterpreterHint.OPERATOR;
                    return Interpreter.InterpreterHint.SPECIAL_CHAR;
                };
                JavaInterpreter.prototype.interpretWord = function (segment) {
                    var text = segment.text;
                    if (this.keywords.contains(text)) {
                        return Interpreter.InterpreterHint.KEYWORD;
                    }
                    var prev = segment.getPrevRelevantSibling();
                    var prevText = prev != null ? prev.text : "";
                    var prevHint = prev != null ? prev.lexerHint : Code.LexerHint.NONE;
                    var next = segment.getNextRelevantSibling();
                    var nextText = next != null ? next.text : "";
                    var nextHint = next != null ? next.lexerHint : Code.LexerHint.NONE;
                    if (prevText == "new")
                        return Interpreter.InterpreterHint.TYPE;
                    if (nextHint == Code.LexerHint.WORD)
                        return Interpreter.InterpreterHint.TYPE;
                    if (nextText == '(')
                        return Interpreter.InterpreterHint.FUNCTION;
                    if (nextText == '[') {
                        var nextButOne = next.getNextRelevantSibling();
                        if (nextButOne != null && nextButOne.text == ']')
                            return Interpreter.InterpreterHint.TYPE;
                    }
                    if (Code.CharCode.isUpperCase(segment.chars[0]))
                        return Interpreter.InterpreterHint.TYPE;
                    return Interpreter.InterpreterHint.VARIABLE;
                };
                return JavaInterpreter;
            })();
            Interpreter.JavaInterpreter = JavaInterpreter;
        })(Interpreter = Code.Interpreter || (Code.Interpreter = {}));
    })(Code = Application.Code || (Application.Code = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Language;
    (function (Language) {
        var Factory;
        (function (Factory) {
            var Keywords = (function () {
                function Keywords() {
                }
                Keywords.JAVA_AND_CS = [
                    "true",
                    "false",
                    "if",
                    "else",
                    "switch",
                    "case",
                    "default",
                    "for",
                    "foreach",
                    "in",
                    "public",
                    "protected",
                    "private",
                    "return",
                    "new",
                    "class",
                ];
                Keywords.JAVA = Keywords.JAVA_AND_CS;
                Keywords.CS = Keywords.JAVA_AND_CS;
                Keywords.PHP = [
                    "echo",
                    "true",
                    "false",
                    "if",
                    "else",
                    "switch",
                    "case",
                    "default",
                    "for",
                    "foreach",
                    "as",
                    "public",
                    "protected",
                    "private",
                    "function",
                    "return",
                    "new",
                    "class",
                ];
                Keywords.JS = [
                    "var",
                    "true",
                    "false",
                    "if",
                    "else",
                    "switch",
                    "case",
                    "default",
                    "for",
                    "in",
                    "function",
                    "return",
                    "new",
                ];
                Keywords.TS = [
                    "var",
                    "let",
                    "const",
                    "true",
                    "false",
                    "if",
                    "else",
                    "switch",
                    "case",
                    "default",
                    "for",
                    "in",
                    "of",
                    "public",
                    "protected",
                    "private",
                    "function",
                    "return",
                    "new",
                    "class",
                    "get",
                    "set",
                ];
                Keywords.SH = [
                    "echo",
                    "if",
                    "then",
                    "else",
                    "fi",
                    "while",
                    "do",
                    "done",
                ];
                Keywords.JASS = [
                    "local",
                    "array",
                    "set",
                    "true",
                    "false",
                    "if",
                    "then",
                    "else",
                    "endif",
                    "loop",
                    "exitwhen",
                    "endloop",
                    "call",
                    "function",
                    "takes",
                    "returns",
                    "return",
                    "endfunction",
                    "public",
                    "private",
                    "static",
                    "struct",
                    "method",
                    "endmethod",
                ];
                return Keywords;
            })();
            Factory.Keywords = Keywords;
        })(Factory = Language.Factory || (Language.Factory = {}));
    })(Language = Application.Language || (Application.Language = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Operators = (function () {
        function Operators() {
        }
        Operators.BASIC = [
            "=",
            "+",
            "-",
            "*",
            "/",
            "+=",
            "-=",
            "*=",
            "/=",
            "==",
            "!=",
            "<",
            ">",
            "<=",
            ">=",
            "||",
            "&&",
            "!",
            ".",
        ];
        Operators.JAVA = Operators.BASIC;
        Operators.CS = Operators.BASIC;
        Operators.PHP = Operators.BASIC.concat(["->"]);
        Operators.JS = Operators.BASIC;
        Operators.TS = Operators.BASIC;
        Operators.SH = [
            "=",
        ];
        Operators.JASS = [
            "=",
            "+",
            "-",
            "*",
            "/",
            "==",
            "!=",
            "<",
            ">",
            "<=",
            ">=",
            ".",
        ];
        return Operators;
    })();
    Application.Operators = Operators;
})(Application || (Application = {}));
/// <reference path="../../code/interpreter/JavaInterpreter" />
/// <reference path="Keywords" />
/// <reference path="Operators" />
var Application;
(function (Application) {
    var Language;
    (function (Language) {
        var Factory;
        (function (Factory) {
            var PHPFactory = (function () {
                function PHPFactory() {
                }
                PHPFactory.createLanguage = function (lexer, formatter) {
                    var interpreter = new Application.Code.Interpreter.JavaInterpreter(Factory.Keywords.PHP, Application.Operators.PHP);
                    var language = new Language.Language("php", lexer, interpreter, formatter);
                    return language;
                };
                return PHPFactory;
            })();
            Factory.PHPFactory = PHPFactory;
        })(Factory = Language.Factory || (Language.Factory = {}));
    })(Language = Application.Language || (Application.Language = {}));
})(Application || (Application = {}));
/// <reference path="../../code/interpreter/JavaInterpreter" />
/// <reference path="Keywords" />
/// <reference path="Operators" />
var Application;
(function (Application) {
    var Language;
    (function (Language) {
        var Factory;
        (function (Factory) {
            var JassFactory = (function () {
                function JassFactory() {
                }
                JassFactory.createLanguage = function (lexer, formatter) {
                    var interpreter = new Application.Code.Interpreter.JavaInterpreter(Factory.Keywords.JASS, Application.Operators.JASS);
                    var language = new Language.Language("jass", lexer, interpreter, formatter);
                    return language;
                };
                return JassFactory;
            })();
            Factory.JassFactory = JassFactory;
        })(Factory = Language.Factory || (Language.Factory = {}));
    })(Language = Application.Language || (Application.Language = {}));
})(Application || (Application = {}));
/// <reference path="../Segment" />
/// <reference path="../Stream" />
/// <reference path="../CharCode" />
var Application;
(function (Application) {
    var Code;
    (function (Code) {
        var SegmentFinder;
        (function (SegmentFinder) {
            var StringLiteralFinder = (function () {
                function StringLiteralFinder() {
                }
                StringLiteralFinder.prototype.find = function (stream) {
                    var delimiterChar = stream.peek();
                    if (delimiterChar != Code.CharCode.DOUBLE_QUOTE && delimiterChar != Code.CharCode.SINGLE_QUOTE)
                        return null;
                    var chars = [stream.read()];
                    for (var char = stream.read(); char != -1; char = stream.read()) {
                        chars.push(char);
                        if (char == delimiterChar)
                            break;
                    }
                    return new Code.Segment(chars, Code.LexerHint.STRING);
                };
                return StringLiteralFinder;
            })();
            SegmentFinder.StringLiteralFinder = StringLiteralFinder;
        })(SegmentFinder = Code.SegmentFinder || (Code.SegmentFinder = {}));
    })(Code = Application.Code || (Application.Code = {}));
})(Application || (Application = {}));
/// <reference path="../Segment" />
/// <reference path="../Stream" />
var Application;
(function (Application) {
    var Code;
    (function (Code) {
        var SegmentFinder;
        (function (SegmentFinder) {
            var WordFinder = (function () {
                function WordFinder() {
                }
                WordFinder.prototype.find = function (stream) {
                    var firstChar = stream.peek();
                    if (!Code.CharCode.isLetter(firstChar) && firstChar != Code.CharCode.SCORE)
                        return null;
                    var chars = [];
                    for (var char = stream.read(); char != -1; char = stream.read()) {
                        chars.push(char);
                        var nextChar = stream.peek();
                        if (!Code.CharCode.isAlphanumeric(nextChar) && nextChar != Code.CharCode.SCORE)
                            break;
                    }
                    return new Code.Segment(chars, Code.LexerHint.WORD);
                };
                return WordFinder;
            })();
            SegmentFinder.WordFinder = WordFinder;
        })(SegmentFinder = Code.SegmentFinder || (Code.SegmentFinder = {}));
    })(Code = Application.Code || (Application.Code = {}));
})(Application || (Application = {}));
/// <reference path="../Segment" />
/// <reference path="../Stream" />
var Application;
(function (Application) {
    var Code;
    (function (Code) {
        var SegmentFinder;
        (function (SegmentFinder) {
            var NumberLiteralFinder = (function () {
                function NumberLiteralFinder() {
                }
                NumberLiteralFinder.prototype.find = function (stream) {
                    var firstChar = stream.peek();
                    if (!Code.CharCode.isNumber(firstChar))
                        return null;
                    var chars = [];
                    for (var char = stream.read(); char != -1; char = stream.read()) {
                        chars.push(char);
                        var nextChar = stream.peek();
                        if (!Code.CharCode.isNumber(nextChar) && nextChar != Code.CharCode.DOT && nextChar != Code.CharCode.f)
                            break;
                    }
                    return new Code.Segment(chars, Code.LexerHint.NUMBER);
                };
                return NumberLiteralFinder;
            })();
            SegmentFinder.NumberLiteralFinder = NumberLiteralFinder;
        })(SegmentFinder = Code.SegmentFinder || (Code.SegmentFinder = {}));
    })(Code = Application.Code || (Application.Code = {}));
})(Application || (Application = {}));
/// <reference path="../../code/interpreter/JavaInterpreter" />
/// <reference path="Keywords" />
/// <reference path="Operators" />
var Application;
(function (Application) {
    var Language;
    (function (Language) {
        var Factory;
        (function (Factory) {
            var CSharpFactory = (function () {
                function CSharpFactory() {
                }
                CSharpFactory.createLanguage = function (lexer, formatter) {
                    var interpreter = new Application.Code.Interpreter.JavaInterpreter(Factory.Keywords.CS, Application.Operators.CS);
                    var language = new Language.Language("c#", lexer, interpreter, formatter);
                    return language;
                };
                return CSharpFactory;
            })();
            Factory.CSharpFactory = CSharpFactory;
        })(Factory = Language.Factory || (Language.Factory = {}));
    })(Language = Application.Language || (Application.Language = {}));
})(Application || (Application = {}));
/// <reference path="../Segment" />
/// <reference path="../Stream" />
/// <reference path="../CharCode" />
var Application;
(function (Application) {
    var Code;
    (function (Code) {
        var SegmentFinder;
        (function (SegmentFinder) {
            var MultiLineCommentFinder = (function () {
                function MultiLineCommentFinder() {
                }
                MultiLineCommentFinder.prototype.find = function (stream) {
                    if (stream.peek() != Code.CharCode.SLASH || stream.peek(1) != Code.CharCode.ASTERISK)
                        return null;
                    var chars = [stream.read()];
                    for (var char = stream.read(); char != -1; char = stream.read()) {
                        chars.push(char);
                        if (char == Code.CharCode.SLASH && stream.peek(-2) == Code.CharCode.ASTERISK)
                            break;
                    }
                    return new Code.Segment(chars, Code.LexerHint.COMMENT);
                };
                return MultiLineCommentFinder;
            })();
            SegmentFinder.MultiLineCommentFinder = MultiLineCommentFinder;
        })(SegmentFinder = Code.SegmentFinder || (Code.SegmentFinder = {}));
    })(Code = Application.Code || (Application.Code = {}));
})(Application || (Application = {}));
/// <reference path="../../code/interpreter/JavaInterpreter" />
/// <reference path="Keywords" />
/// <reference path="Operators" />
var Application;
(function (Application) {
    var Language;
    (function (Language) {
        var Factory;
        (function (Factory) {
            var TypescriptFactory = (function () {
                function TypescriptFactory() {
                }
                TypescriptFactory.createLanguage = function (lexer, formatter) {
                    var interpreter = new Application.Code.Interpreter.JavaInterpreter(Factory.Keywords.TS, Application.Operators.TS);
                    var language = new Language.Language("ts", lexer, interpreter, formatter);
                    return language;
                };
                return TypescriptFactory;
            })();
            Factory.TypescriptFactory = TypescriptFactory;
        })(Factory = Language.Factory || (Language.Factory = {}));
    })(Language = Application.Language || (Application.Language = {}));
})(Application || (Application = {}));
/// <reference path="../../code/interpreter/JavaInterpreter" />
/// <reference path="Keywords" />
/// <reference path="Operators" />
var Application;
(function (Application) {
    var Language;
    (function (Language) {
        var Factory;
        (function (Factory) {
            var JavaFactory = (function () {
                function JavaFactory() {
                }
                JavaFactory.createLanguage = function (lexer, formatter) {
                    var interpreter = new Application.Code.Interpreter.JavaInterpreter(Factory.Keywords.JAVA, Application.Operators.JAVA);
                    var language = new Language.Language("java", lexer, interpreter, formatter);
                    return language;
                };
                return JavaFactory;
            })();
            Factory.JavaFactory = JavaFactory;
        })(Factory = Language.Factory || (Language.Factory = {}));
    })(Language = Application.Language || (Application.Language = {}));
})(Application || (Application = {}));
/// <reference path="Segment" />
/// <reference path="Stream" />
/// <reference path="Segment" />
/// <reference path="ISegmentFinder" />
var Application;
(function (Application) {
    var Code;
    (function (Code) {
        var Lexer = (function () {
            function Lexer(segmentFinders) {
                this.segmentFinders = [];
                this.segmentFinders = segmentFinders;
            }
            Lexer.prototype.lex = function (text) {
                var stream = Code.Stream.createFromString(text);
                var segments = [];
                while (!stream.eos()) {
                    var segment = this.findSegment(stream);
                    if (segment == null)
                        segment = new Code.Segment([stream.read()], Code.LexerHint.NONE);
                    if (segments.length != 0) {
                        var prevSibling = segments[segments.length - 1];
                        prevSibling.nextSibling = segment;
                        segment.prevSibling = prevSibling;
                    }
                    segments.push(segment);
                }
                return segments;
            };
            Lexer.prototype.findSegment = function (stream) {
                for (var _i = 0, _a = this.segmentFinders; _i < _a.length; _i++) {
                    var finder = _a[_i];
                    var segment = finder.find(stream);
                    if (segment != null) {
                        return segment;
                    }
                }
                return null;
            };
            return Lexer;
        })();
        Code.Lexer = Lexer;
    })(Code = Application.Code || (Application.Code = {}));
})(Application || (Application = {}));
/// <reference path="Segment" />
/// <reference path="../CharCode" />
/// <reference path="../Segment" />
/// <reference path="../LexerHint" />
/// <reference path="../IFormatter" />
/// <reference path="../InterpreterHint" />
var Application;
(function (Application) {
    var Code;
    (function (Code) {
        var Formatter;
        (function (Formatter) {
            var JavaFormatter = (function () {
                function JavaFormatter(options) {
                    this.options = options;
                }
                JavaFormatter.prototype.format = function (segments) {
                    var html = "";
                    for (var _i = 0; _i < segments.length; _i++) {
                        var segment = segments[_i];
                        html += this.formateSegment(segment);
                    }
                    return html;
                };
                JavaFormatter.prototype.formateSegment = function (segment) {
                    var options = this.options;
                    var text = segment.text;
                    switch (segment.interpreterHint) {
                        case Code.Interpreter.InterpreterHint.TYPE:
                            return this.span(segment, options.typeColor, "Typ");
                        case Code.Interpreter.InterpreterHint.VARIABLE:
                            return this.span(segment, options.variableColor, "Variable (Bezeichner)");
                        case Code.Interpreter.InterpreterHint.FUNCTION:
                            return this.span(segment, options.functionColor, "Funktion");
                        case Code.Interpreter.InterpreterHint.KEYWORD:
                            {
                                var color = options.keywordColors[text];
                                if (color == undefined) {
                                    color = options.defaultKeywordColor;
                                }
                                /*let title = options.keywordTitles[text];
                                if (title == undefined)
                                {
                                    title = null;
                                }*/
                                return this.span(segment, color, "Schlüsselwort");
                            }
                        case Code.Interpreter.InterpreterHint.OPERATOR:
                            return this.span(segment, "", "Operator");
                        case Code.Interpreter.InterpreterHint.SPECIAL_CHAR:
                            return this.span(segment, "", "Sonderzeichen");
                    }
                    switch (segment.lexerHint) {
                        case Code.LexerHint.NONE:
                            return text;
                        case Code.LexerHint.WHITESPACE:
                            {
                                var charCode = segment.chars[0];
                                switch (charCode) {
                                    case Code.CharCode.SPACE:
                                        return "&nbsp";
                                    case Code.CharCode.LINE_BREAK:
                                        return "<br/>";
                                    case Code.CharCode.TAB:
                                        return "<span class=\"tab\"></span>";
                                    default:
                                        return text;
                                }
                            }
                        case Code.LexerHint.COMMENT:
                            return this.span(segment, options.commentColor, "Kommentar");
                        case Code.LexerHint.STRING:
                            return this.span(segment, options.stringLiteralColor, "Zeichenkette");
                        case Code.LexerHint.NUMBER:
                            return this.span(segment, options.numberLiteralColor, "Zahl");
                        default:
                            return text;
                    }
                };
                JavaFormatter.prototype.span = function (segment, color, title) {
                    if (title === void 0) { title = null; }
                    return this.getTagString("span", {
                        "class": "segment",
                        "title": title,
                        "style": this.getStyleString({
                            "color": color
                        }),
                        "data-lexer-hint": segment.lexerHint.toString(),
                        "data-interpreter-hint": segment.interpreterHint.toString()
                    }, segment.text);
                };
                JavaFormatter.prototype.getTagString = function (tag, attributes, text) {
                    if (text === void 0) { text = ""; }
                    var attributeStrings = [];
                    for (var key in attributes) {
                        var value = attributes[key];
                        if (value != null) {
                            attributeStrings.push(key + '="' + value + '"');
                        }
                    }
                    var atributesString = attributeStrings.join(' ');
                    return '<' + tag + ' ' + atributesString + '>' + text + '</' + tag + '>';
                };
                JavaFormatter.prototype.getStyleString = function (styles) {
                    var styleStrings = [];
                    for (var key in styles) {
                        var value = styles[key];
                        if (value != null) {
                            styleStrings.push(key + ': ' + styles[key] + ';');
                        }
                    }
                    return styleStrings.join(' ');
                };
                return JavaFormatter;
            })();
            Formatter.JavaFormatter = JavaFormatter;
        })(Formatter = Code.Formatter || (Code.Formatter = {}));
    })(Code = Application.Code || (Application.Code = {}));
})(Application || (Application = {}));
/// <reference path="../../code/interpreter/JavaInterpreter" />
/// <reference path="Keywords" />
/// <reference path="Operators" />
var Application;
(function (Application) {
    var Language;
    (function (Language) {
        var Factory;
        (function (Factory) {
            var JavascriptFactory = (function () {
                function JavascriptFactory() {
                }
                JavascriptFactory.createLanguage = function (lexer, formatter) {
                    var interpreter = new Application.Code.Interpreter.JavaInterpreter(Factory.Keywords.JS, Application.Operators.JS);
                    var language = new Language.Language("js", lexer, interpreter, formatter);
                    return language;
                };
                return JavascriptFactory;
            })();
            Factory.JavascriptFactory = JavascriptFactory;
        })(Factory = Language.Factory || (Language.Factory = {}));
    })(Language = Application.Language || (Application.Language = {}));
})(Application || (Application = {}));
/// <reference path="../../code/interpreter/JavaInterpreter" />
/// <reference path="Keywords" />
/// <reference path="Operators" />
var Application;
(function (Application) {
    var Language;
    (function (Language) {
        var Factory;
        (function (Factory) {
            var ShellFactory = (function () {
                function ShellFactory() {
                }
                ShellFactory.createLanguage = function (lexer, formatter) {
                    var interpreter = new Application.Code.Interpreter.JavaInterpreter(Factory.Keywords.SH, Application.Operators.SH);
                    var language = new Language.Language("sh", lexer, interpreter, formatter);
                    return language;
                };
                return ShellFactory;
            })();
            Factory.ShellFactory = ShellFactory;
        })(Factory = Language.Factory || (Language.Factory = {}));
    })(Language = Application.Language || (Application.Language = {}));
})(Application || (Application = {}));
/// <reference path="../code/Lexer" />
/// <reference path="../code/formatter/JavaFormatter" />
/// <reference path="factory/JavaFactory" />
/// <reference path="factory/CSharpFactory" />
/// <reference path="factory/PHPFactory" />
/// <reference path="factory/JavascriptFactory" />
/// <reference path="factory/TypescriptFactory" />
/// <reference path="factory/ShellFactory" />
/// <reference path="factory/JassFactory" />
var Application;
(function (Application) {
    var Language;
    (function (Language) {
        var LanguageService = (function () {
            function LanguageService() {
                this.languagesByNames = new JPV.Collection.Map();
                var lexer = new Application.Code.Lexer([
                    new Application.Code.SegmentFinder.MultiLineCommentFinder(),
                    new Application.Code.SegmentFinder.SingleLineCommentFinder(),
                    new Application.Code.SegmentFinder.StringLiteralFinder(),
                    new Application.Code.SegmentFinder.NumberLiteralFinder(),
                    new Application.Code.SegmentFinder.WordFinder(),
                    Application.Code.SegmentFinder.SymbolFinder.createFromStringArray([' ', '\n', '\t'], Application.Code.LexerHint.WHITESPACE),
                    Application.Code.SegmentFinder.SequenceFinder.createFromStringArray([
                        "+=", "-=", "*=", "/=", "++", "--",
                        "==", "!=", "<=", ">=",
                        "===", "!==", "->",
                    ], Application.Code.LexerHint.SPECIAL_CHAR),
                    Application.Code.SegmentFinder.SymbolFinder.createFromString(".;=+-*/&|!<>{}()[]$:", Application.Code.LexerHint.SPECIAL_CHAR),
                ]);
                var formatter = new Application.Code.Formatter.JavaFormatter({
                    commentColor: "#8DB553",
                    stringLiteralColor: "#4A93D1",
                    numberLiteralColor: "#65B6CE",
                    typeColor: "#A67DE0",
                    variableColor: "#FFA500",
                    functionColor: "#FFC600",
                    defaultKeywordColor: "grey",
                    keywordColors: {
                        "true": "#65B6CE",
                        "false": "#65B6CE",
                    },
                    keywordTitles: {},
                    specialCharTitles: {}
                });
                {
                    var language = Language.Factory.JavaFactory.createLanguage(lexer, formatter);
                    this.languagesByNames.add(language.name, language);
                }
                {
                    var language = Language.Factory.CSharpFactory.createLanguage(lexer, formatter);
                    this.languagesByNames.add(language.name, language);
                }
                {
                    var language = Language.Factory.PHPFactory.createLanguage(lexer, formatter);
                    this.languagesByNames.add(language.name, language);
                }
                {
                    var language = Language.Factory.JavascriptFactory.createLanguage(lexer, formatter);
                    this.languagesByNames.add(language.name, language);
                }
                {
                    var language = Language.Factory.TypescriptFactory.createLanguage(lexer, formatter);
                    this.languagesByNames.add(language.name, language);
                }
                {
                    var language = Language.Factory.ShellFactory.createLanguage(lexer, formatter);
                    this.languagesByNames.add(language.name, language);
                }
                {
                    var language = Language.Factory.JassFactory.createLanguage(lexer, formatter);
                    this.languagesByNames.add(language.name, language);
                }
            }
            LanguageService.prototype.getAllLanguages = function () {
                return this.languagesByNames.toArray();
            };
            LanguageService.prototype.getLanguageByName = function (name) {
                if (!this.languagesByNames.contains(name))
                    throw new RangeError("Could not get language. No language with name \"" + name + "\" found.");
                return this.languagesByNames.get(name);
            };
            return LanguageService;
        })();
        Language.LanguageService = LanguageService;
    })(Language = Application.Language || (Application.Language = {}));
})(Application || (Application = {}));
/// <reference path="language/LanguageService" />
var Application;
(function (Application_1) {
    var Application = (function () {
        function Application() {
            this.languageService = new Application_1.Language.LanguageService();
        }
        Application.prototype.run = function () {
            var _this = this;
            $(".code-box-script").each(function () {
                var $codeBoxScript = $(this);
                var language = $codeBoxScript.data("title");
                if (language == undefined) {
                    language = "java";
                }
                var text = $codeBoxScript.text();
                var html = _this.formatCode(text, language);
                $codeBoxScript.html(html);
            });
            $(".multi-code-box").each(function () {
                var $codeBox = $(this);
                var $codeBoxHead = $codeBox.find(".code-box-head");
                var first = true;
                $codeBox.find(".code-box-script").each(function () {
                    var $codeBoxScript = $(this);
                    $codeBoxScript.css("display", "none");
                    // JQuery does not get which .text i want to call
                    var $codeBoxButton = $("<div>")
                        .addClass("code-box-button")
                        .text($codeBoxScript.data("title"))
                        .appendTo($codeBoxHead);
                    $codeBoxButton.on("click", function () {
                        var $codeBoxButton = $(this);
                        var $codeBox = $codeBoxButton.closest(".multi-code-box");
                        var $codeBoxScripts = $codeBox.find(".code-box-script");
                        $codeBox.find(".code-box-button").toggleClass("pressed", false);
                        $codeBoxButton.toggleClass("pressed", true);
                        $codeBoxScripts.each(function () {
                            $codeBoxScript = $(this);
                            $codeBoxScript.css("display", $codeBoxScript.data("title") == $codeBoxButton.text() ? "" : "none");
                        });
                    });
                    if (first) {
                        $codeBoxButton.trigger("click");
                        first = false;
                    }
                });
            });
            $(".code-box-script").on("click", ".segment", function () {
                var InterpreterHint = Application_1.Code.Interpreter.InterpreterHint;
                var $segment = $(this);
                var interpreterHint = parseInt($segment.data("interpreter-hint"));
                if (interpreterHint != InterpreterHint.NONE) {
                    if (interpreterHint == InterpreterHint.TYPE) {
                        alert("type");
                    }
                }
            });
        };
        Application.prototype.formatCode = function (text, languageName) {
            text = text.substring(1, text.length - 2);
            var lines = text.split('\n');
            var minTabs = null;
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                if (line.trim() == "") {
                    continue;
                }
                var tabs = 0;
                for (var j = 0; j < line.length; j++) {
                    if (line[j] == '\t') {
                        tabs++;
                    }
                    else {
                        break;
                    }
                }
                if (minTabs == null || tabs < minTabs) {
                    minTabs = tabs;
                }
            }
            for (var i = 0; i < lines.length; i++) {
                lines[i] = lines[i].substring(minTabs, lines[i].length);
            }
            text = lines.join('\n');
            var language = this.languageService.getLanguageByName(languageName);
            var segments = language.getLexer().lex(text);
            language.getInterpreter().interpret(segments);
            var formattedCode = language.getFormatter().format(segments);
            return formattedCode;
        };
        return Application;
    })();
    Application_1.Application = Application;
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Language;
    (function (Language_1) {
        var Language = (function () {
            function Language(name, lexer, interpreter, formatter) {
                this._name = name;
                this.lexer = lexer;
                this.interpreter = interpreter;
                this.formatter = formatter;
            }
            Object.defineProperty(Language.prototype, "name", {
                get: function () { return this._name; },
                enumerable: true,
                configurable: true
            });
            Language.prototype.getLexer = function () {
                return this.lexer;
            };
            Language.prototype.getInterpreter = function () {
                return this.interpreter;
            };
            Language.prototype.getFormatter = function () {
                return this.formatter;
            };
            return Language;
        })();
        Language_1.Language = Language;
    })(Language = Application.Language || (Application.Language = {}));
})(Application || (Application = {}));
/// <reference path="../Segment" />
/// <reference path="../Stream" />
/// <reference path="../CharCode" />
var Application;
(function (Application) {
    var Code;
    (function (Code) {
        var SegmentFinder;
        (function (SegmentFinder) {
            var SingleLineCommentFinder = (function () {
                function SingleLineCommentFinder() {
                }
                SingleLineCommentFinder.prototype.find = function (stream) {
                    if (stream.peek() != Code.CharCode.SLASH || stream.peek(1) != Code.CharCode.SLASH)
                        return null;
                    var chars = [stream.read()];
                    for (var char = stream.read(); char != -1; char = stream.read()) {
                        chars.push(char);
                        if (stream.peek() == Code.CharCode.LINE_BREAK)
                            break;
                    }
                    return new Code.Segment(chars, Code.LexerHint.COMMENT);
                };
                return SingleLineCommentFinder;
            })();
            SegmentFinder.SingleLineCommentFinder = SingleLineCommentFinder;
        })(SegmentFinder = Code.SegmentFinder || (Code.SegmentFinder = {}));
    })(Code = Application.Code || (Application.Code = {}));
})(Application || (Application = {}));
/// <reference path="../Segment" />
/// <reference path="../Stream" />
var Application;
(function (Application) {
    var Code;
    (function (Code) {
        var SegmentFinder;
        (function (SegmentFinder) {
            var SequenceFinder = (function () {
                function SequenceFinder(searchedSequences, hint) {
                    this.searchedSequences = [];
                    this.searchedSequences = searchedSequences;
                    this.hint = hint;
                }
                SequenceFinder.createFromStringArray = function (texts, hint) {
                    var charCodes = [];
                    for (var _i = 0; _i < texts.length; _i++) {
                        var text = texts[_i];
                        var sequenceCharCodes = [];
                        for (var i = 0; i < text.length; i++) {
                            sequenceCharCodes.push(text.charCodeAt(i));
                        }
                        charCodes.push(sequenceCharCodes);
                    }
                    return new SequenceFinder(charCodes, hint);
                };
                SequenceFinder.prototype.find = function (stream) {
                    for (var _i = 0, _a = this.searchedSequences; _i < _a.length; _i++) {
                        var searchedSequence = _a[_i];
                        var segment = this.findSequence(stream, searchedSequence);
                        if (segment != null)
                            return segment;
                    }
                    return null;
                };
                SequenceFinder.prototype.findSequence = function (stream, sequence) {
                    for (var i = 0; i < sequence.length; i++) {
                        if (stream.peek(i) != sequence[i])
                            return null;
                    }
                    return new Code.Segment(stream.readMultiple(sequence.length), this.hint);
                };
                return SequenceFinder;
            })();
            SegmentFinder.SequenceFinder = SequenceFinder;
        })(SegmentFinder = Code.SegmentFinder || (Code.SegmentFinder = {}));
    })(Code = Application.Code || (Application.Code = {}));
})(Application || (Application = {}));
