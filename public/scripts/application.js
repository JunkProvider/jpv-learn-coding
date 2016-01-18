var Common;
(function (Common) {
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
    Common.CharCode = CharCode;
})(Common || (Common = {}));
var Code;
(function (Code) {
    var Lexer;
    (function (Lexer) {
        (function (LexerHint) {
            LexerHint[LexerHint["NONE"] = 0] = "NONE";
            LexerHint[LexerHint["STRING"] = 1] = "STRING";
            LexerHint[LexerHint["COMMENT"] = 2] = "COMMENT";
            LexerHint[LexerHint["WHITESPACE"] = 3] = "WHITESPACE";
            LexerHint[LexerHint["WORD"] = 4] = "WORD";
            LexerHint[LexerHint["NUMBER"] = 5] = "NUMBER";
            LexerHint[LexerHint["SPECIAL_CHAR"] = 6] = "SPECIAL_CHAR";
        })(Lexer.LexerHint || (Lexer.LexerHint = {}));
        var LexerHint = Lexer.LexerHint;
    })(Lexer = Code.Lexer || (Code.Lexer = {}));
})(Code || (Code = {}));
/// <reference path="LexerHint" />
var Code;
(function (Code) {
    var Lexer;
    (function (Lexer) {
        var Segment = (function () {
            function Segment(chars, hint) {
                this.nextSibling = null;
                this.prevSibling = null;
                this.chars = [];
                this.text = "";
                this.lexerHint = Lexer.LexerHint.NONE;
                this.interpreterHint = Code.Interpreter.InterpreterHint.NONE;
                this.chars = chars;
                this.lexerHint = hint;
                this.text = "";
                for (var i = 0; i < this.chars.length; i++) {
                    this.text += String.fromCharCode(this.chars[i]);
                }
            }
            Segment.prototype.getNextRelevantSibling = function () {
                return this.getNextMatchingSibling(function (segment) { return segment.lexerHint != Lexer.LexerHint.WHITESPACE && segment.lexerHint != Lexer.LexerHint.COMMENT; });
            };
            Segment.prototype.getPrevRelevantSibling = function () {
                return this.getPrevMatchingSibling(function (segment) { return segment.lexerHint != Lexer.LexerHint.WHITESPACE && segment.lexerHint != Lexer.LexerHint.COMMENT; });
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
        Lexer.Segment = Segment;
    })(Lexer = Code.Lexer || (Code.Lexer = {}));
})(Code || (Code = {}));
/// <reference path="../../Common/CharCode" />
/// <reference path="Segment" />
var Code;
(function (Code) {
    var Lexer;
    (function (Lexer) {
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
                        return new Lexer.Segment([stream.read()], this.hint);
                    }
                }
                return null;
            };
            return SymbolFinder;
        })();
        Lexer.SymbolFinder = SymbolFinder;
    })(Lexer = Code.Lexer || (Code.Lexer = {}));
})(Code || (Code = {}));
var Code;
(function (Code) {
    var Lexer;
    (function (Lexer) {
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
        Lexer.Stream = Stream;
    })(Lexer = Code.Lexer || (Code.Lexer = {}));
})(Code || (Code = {}));
var Code;
(function (Code) {
    var View;
    (function (View) {
        var SegmentData = (function () {
            function SegmentData(text, lexerHint, interpreterHint) {
                this.text = text;
                this.lexerHint = lexerHint;
                this.interpreterHint = interpreterHint;
            }
            ;
            return SegmentData;
        })();
        View.SegmentData = SegmentData;
        var CodeContainer = (function () {
            function CodeContainer(selection, language) {
                this.segmentClickedEvent = new JPV.Event.Event();
                this.selection = selection;
                this.language = language;
                this.initialize();
            }
            CodeContainer.prototype.initialize = function () {
                var _this = this;
                var text = this.selection.text();
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
                var segments = this.language.getLexer().lex(text);
                this.language.getInterpreter().interpret(segments);
                var html = this.language.getFormatter().format(segments);
                this.selection.html(html);
                this.selection.on("click", ".segment", function () {
                    var InterpreterHint = Code.Interpreter.InterpreterHint;
                    var $segment = $(this);
                    var lexerHint = parseInt($segment.data("lexer-hint"));
                    var interpreterHint = parseInt($segment.data("interpreter-hint"));
                    if (interpreterHint != InterpreterHint.NONE) {
                        if (interpreterHint == InterpreterHint.TYPE) {
                            alert("type");
                        }
                    }
                    _this.segmentClickedEvent.trigger(this, new SegmentData($segment.text(), lexerHint, interpreterHint));
                });
            };
            CodeContainer.prototype.setDisplayed = function (displayed) {
                this.selection.css("display", displayed ? "" : "none");
            };
            return CodeContainer;
        })();
        View.CodeContainer = CodeContainer;
    })(View = Code.View || (Code.View = {}));
})(Code || (Code = {}));
var Code;
(function (Code) {
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
    })(Language = Code.Language || (Code.Language = {}));
})(Code || (Code = {}));
var Application_Old;
(function (Application_Old) {
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
    Application_Old.Operators = Operators;
})(Application_Old || (Application_Old = {}));
/// <reference path="../../Common/CharCode" />
/// <reference path="Segment" />
var Code;
(function (Code) {
    var Lexer;
    (function (Lexer) {
        var WordFinder = (function () {
            function WordFinder() {
            }
            WordFinder.prototype.find = function (stream) {
                var firstChar = stream.peek();
                if (!Common.CharCode.isLetter(firstChar) && firstChar != Common.CharCode.SCORE)
                    return null;
                var chars = [];
                for (var char = stream.read(); char != -1; char = stream.read()) {
                    chars.push(char);
                    var nextChar = stream.peek();
                    if (!Common.CharCode.isAlphanumeric(nextChar) && nextChar != Common.CharCode.SCORE)
                        break;
                }
                return new Lexer.Segment(chars, Lexer.LexerHint.WORD);
            };
            return WordFinder;
        })();
        Lexer.WordFinder = WordFinder;
    })(Lexer = Code.Lexer || (Code.Lexer = {}));
})(Code || (Code = {}));
/// <reference path="../../Common/CharCode" />
/// <reference path="Segment" />
var Code;
(function (Code) {
    var Lexer;
    (function (Lexer) {
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
                return new Lexer.Segment(stream.readMultiple(sequence.length), this.hint);
            };
            return SequenceFinder;
        })();
        Lexer.SequenceFinder = SequenceFinder;
    })(Lexer = Code.Lexer || (Code.Lexer = {}));
})(Code || (Code = {}));
/// <reference path="Segment" />
/// <reference path="LexerHint" />
var Code;
(function (Code) {
    var Lexer;
    (function (Lexer_1) {
        var Lexer = (function () {
            function Lexer(segmentFinders) {
                this.segmentFinders = [];
                this.segmentFinders = segmentFinders;
            }
            Lexer.prototype.lex = function (text) {
                var stream = Lexer_1.Stream.createFromString(text);
                var segments = [];
                while (!stream.eos()) {
                    var segment = this.findSegment(stream);
                    if (segment == null)
                        segment = new Lexer_1.Segment([stream.read()], Lexer_1.LexerHint.NONE);
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
        Lexer_1.Lexer = Lexer;
    })(Lexer = Code.Lexer || (Code.Lexer = {}));
})(Code || (Code = {}));
/// <reference path="../Lexer/Lexer" />
var Code;
(function (Code) {
    var Language;
    (function (Language) {
        var LanguageService = (function () {
            function LanguageService() {
                this.languagesByNames = new JPV.Collection.Map();
                var lexer = new Code.Lexer.Lexer([
                    new Code.Lexer.MultiLineCommentFinder(),
                    new Code.Lexer.SingleLineCommentFinder(),
                    new Code.Lexer.StringLiteralFinder(),
                    new Code.Lexer.NumberLiteralFinder(),
                    new Code.Lexer.WordFinder(),
                    Code.Lexer.SymbolFinder.createFromStringArray([' ', '\n', '\t'], Code.Lexer.LexerHint.WHITESPACE),
                    Code.Lexer.SequenceFinder.createFromStringArray([
                        "+=", "-=", "*=", "/=", "++", "--",
                        "==", "!=", "<=", ">=",
                        "===", "!==", "->",
                    ], Code.Lexer.LexerHint.SPECIAL_CHAR),
                    Code.Lexer.SymbolFinder.createFromString(".;=+-*/&|!<>{}()[]$:", Code.Lexer.LexerHint.SPECIAL_CHAR),
                ]);
                var formatter = new Code.Formatter.JavaFormatter({
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
                var interpreter = new Code.Interpreter.JavaInterpreter([
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
                ], [
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
                ]);
                var language = new Language.Language("java", lexer, interpreter, formatter);
                this.languagesByNames.add(language.name, language);
                /*{
                    const language = Factory.JavaFactory.createLanguage(lexer, formatter);
                    this.languagesByNames.add(language.name, language);
                }
                {
                    const language = Factory.CSharpFactory.createLanguage(lexer, formatter);
                    this.languagesByNames.add(language.name, language);
                }
                {
                    const language = Factory.PHPFactory.createLanguage(lexer, formatter);
                    this.languagesByNames.add(language.name, language);
                }
                {
                    const language = Factory.JavascriptFactory.createLanguage(lexer, formatter);
                    this.languagesByNames.add(language.name, language);
                }
                {
                    const language = Factory.TypescriptFactory.createLanguage(lexer, formatter);
                    this.languagesByNames.add(language.name, language);
                }
                {
                    const language = Factory.ShellFactory.createLanguage(lexer, formatter);
                    this.languagesByNames.add(language.name, language);
                }
                {
                    const language = Factory.JassFactory.createLanguage(lexer, formatter);
                    this.languagesByNames.add(language.name, language);
                }*/
            }
            LanguageService.prototype.getAllLanguages = function () {
                return this.languagesByNames.toArray();
            };
            LanguageService.prototype.getLanguageByName = function (name) {
                return this.languagesByNames.get("java");
                if (!this.languagesByNames.contains(name))
                    throw new RangeError("Could not get language. No language with name \"" + name + "\" found.");
                return this.languagesByNames.get(name);
            };
            return LanguageService;
        })();
        Language.LanguageService = LanguageService;
    })(Language = Code.Language || (Code.Language = {}));
})(Code || (Code = {}));
/// <reference path="CodeContainer" />
var Code;
(function (Code) {
    var View;
    (function (View) {
        var MultiCodeBox = (function () {
            function MultiCodeBox(selection, languageService) {
                this.codeContainersByLanguageNames = new JPV.Collection.Map();
                this.buttonsByLanguageNames = new JPV.Collection.Map();
                this.selection = selection;
                this.languageService = languageService;
                this.initialize();
            }
            MultiCodeBox.prototype.initialize = function () {
                var _this = this;
                var $codeBoxHead = this.selection.find(".code-box-head");
                var first = true;
                this.selection.find(".code-box-script").each(function () {
                    var $codeContainer = $(this);
                    var languageName = $codeContainer.data("title");
                    var language = _this.languageService.getLanguageByName(languageName);
                    var codeContainer = new View.CodeContainer($codeContainer, language);
                    codeContainer.setDisplayed(false);
                    _this.codeContainersByLanguageNames.add(languageName, codeContainer);
                    // JQuery does not get which .text i want to call
                    var $button = $("<div>")
                        .addClass("code-box-button")
                        .text(languageName)
                        .appendTo($codeBoxHead);
                    _this.buttonsByLanguageNames.add(languageName, $button);
                    $button.on("click", function () {
                        var $clickedButton = $(this);
                        var clickedButtonLanguageName = $button.text();
                        // Set only the clicked button to 'pressed'
                        _this.buttonsByLanguageNames.forEach(function ($button, languageName) {
                            $button.toggleClass("pressed", languageName == clickedButtonLanguageName);
                        });
                        // Show only the code which belongs to the clicked button
                        _this.codeContainersByLanguageNames.forEach(function (codeContainer, languageName) {
                            codeContainer.setDisplayed(languageName == clickedButtonLanguageName);
                        });
                    });
                });
                this.buttonsByLanguageNames.toArray()[0].trigger("click");
            };
            return MultiCodeBox;
        })();
        View.MultiCodeBox = MultiCodeBox;
    })(View = Code.View || (Code.View = {}));
})(Code || (Code = {}));
/// <reference path="../Code/Language/LanguageService" />
/// <reference path="../Code/View/MultiCodeBox" />
var Application;
(function (Application_1) {
    var Application = (function () {
        function Application() {
            this.languageService = new Code.Language.LanguageService();
        }
        Application.prototype.run = function () {
            var _this = this;
            $(".single-code-box").each(function () {
                var $codeContainer = $(this).find(".code-box-script");
                var languageName = $codeContainer.data("title");
                var language = _this.languageService.getLanguageByName(languageName);
                new Code.View.CodeContainer($codeContainer, language);
            });
            $(".multi-code-box").each(function () {
                var $codeBox = $(this);
                new Code.View.MultiCodeBox($codeBox, _this.languageService);
            });
        };
        return Application;
    })();
    Application_1.Application = Application;
})(Application || (Application = {}));
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
})(Code || (Code = {}));
/// <reference path="../../Common/CharCode" />
/// <reference path="../Lexer/LexerHint" />
/// <reference path="../Interpreter/InterpreterHint" />
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
                    case Code.Lexer.LexerHint.NONE:
                        return text;
                    case Code.Lexer.LexerHint.WHITESPACE:
                        {
                            var charCode = segment.chars[0];
                            switch (charCode) {
                                case Common.CharCode.SPACE:
                                    return "&nbsp";
                                case Common.CharCode.LINE_BREAK:
                                    return "<br/>";
                                case Common.CharCode.TAB:
                                    return "<span class=\"tab\"></span>";
                                default:
                                    return text;
                            }
                        }
                    case Code.Lexer.LexerHint.COMMENT:
                        return this.span(segment, options.commentColor, "Kommentar");
                    case Code.Lexer.LexerHint.STRING:
                        return this.span(segment, options.stringLiteralColor, "Zeichenkette");
                    case Code.Lexer.LexerHint.NUMBER:
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
})(Code || (Code = {}));
/// <reference path="../../Common/CharCode" />
/// <reference path="../Lexer/LexerHint" />
/// <reference path="InterpreterHint" />
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
                    if (segment.lexerHint == Code.Lexer.LexerHint.WORD) {
                        segment.interpreterHint = this.interpretWord(segment);
                        continue;
                    }
                    if (segment.lexerHint == Code.Lexer.LexerHint.SPECIAL_CHAR) {
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
                var prevHint = prev != null ? prev.lexerHint : Code.Lexer.LexerHint.NONE;
                var next = segment.getNextRelevantSibling();
                var nextText = next != null ? next.text : "";
                var nextHint = next != null ? next.lexerHint : Code.Lexer.LexerHint.NONE;
                if (prevText == "new")
                    return Interpreter.InterpreterHint.TYPE;
                if (nextHint == Code.Lexer.LexerHint.WORD)
                    return Interpreter.InterpreterHint.TYPE;
                if (nextText == '(')
                    return Interpreter.InterpreterHint.FUNCTION;
                if (nextText == '[') {
                    var nextButOne = next.getNextRelevantSibling();
                    if (nextButOne != null && nextButOne.text == ']')
                        return Interpreter.InterpreterHint.TYPE;
                }
                if (Common.CharCode.isUpperCase(segment.chars[0]))
                    return Interpreter.InterpreterHint.TYPE;
                return Interpreter.InterpreterHint.VARIABLE;
            };
            return JavaInterpreter;
        })();
        Interpreter.JavaInterpreter = JavaInterpreter;
    })(Interpreter = Code.Interpreter || (Code.Interpreter = {}));
})(Code || (Code = {}));
var Application_Old;
(function (Application_Old) {
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
    })(Language = Application_Old.Language || (Application_Old.Language = {}));
})(Application_Old || (Application_Old = {}));
/// <reference path="../../Common/CharCode" />
/// <reference path="Segment" />
var Code;
(function (Code) {
    var Lexer;
    (function (Lexer) {
        var NumberLiteralFinder = (function () {
            function NumberLiteralFinder() {
            }
            NumberLiteralFinder.prototype.find = function (stream) {
                var firstChar = stream.peek();
                if (!Common.CharCode.isNumber(firstChar))
                    return null;
                var chars = [];
                for (var char = stream.read(); char != -1; char = stream.read()) {
                    chars.push(char);
                    var nextChar = stream.peek();
                    if (!Common.CharCode.isNumber(nextChar) && nextChar != Common.CharCode.DOT && nextChar != Common.CharCode.f)
                        break;
                }
                return new Lexer.Segment(chars, Lexer.LexerHint.NUMBER);
            };
            return NumberLiteralFinder;
        })();
        Lexer.NumberLiteralFinder = NumberLiteralFinder;
    })(Lexer = Code.Lexer || (Code.Lexer = {}));
})(Code || (Code = {}));
/// <reference path="../../Common/CharCode" />
/// <reference path="Segment" />
var Code;
(function (Code) {
    var Lexer;
    (function (Lexer) {
        var SingleLineCommentFinder = (function () {
            function SingleLineCommentFinder() {
            }
            SingleLineCommentFinder.prototype.find = function (stream) {
                if (stream.peek() != Common.CharCode.SLASH || stream.peek(1) != Common.CharCode.SLASH)
                    return null;
                var chars = [stream.read()];
                for (var char = stream.read(); char != -1; char = stream.read()) {
                    chars.push(char);
                    if (stream.peek() == Common.CharCode.LINE_BREAK)
                        break;
                }
                return new Lexer.Segment(chars, Lexer.LexerHint.COMMENT);
            };
            return SingleLineCommentFinder;
        })();
        Lexer.SingleLineCommentFinder = SingleLineCommentFinder;
    })(Lexer = Code.Lexer || (Code.Lexer = {}));
})(Code || (Code = {}));
/// <reference path="../../Common/CharCode" />
/// <reference path="Segment" />
var Code;
(function (Code) {
    var Lexer;
    (function (Lexer) {
        var MultiLineCommentFinder = (function () {
            function MultiLineCommentFinder() {
            }
            MultiLineCommentFinder.prototype.find = function (stream) {
                if (stream.peek() != Common.CharCode.SLASH || stream.peek(1) != Common.CharCode.ASTERISK)
                    return null;
                var chars = [stream.read()];
                for (var char = stream.read(); char != -1; char = stream.read()) {
                    chars.push(char);
                    if (char == Common.CharCode.SLASH && stream.peek(-2) == Common.CharCode.ASTERISK)
                        break;
                }
                return new Lexer.Segment(chars, Lexer.LexerHint.COMMENT);
            };
            return MultiLineCommentFinder;
        })();
        Lexer.MultiLineCommentFinder = MultiLineCommentFinder;
    })(Lexer = Code.Lexer || (Code.Lexer = {}));
})(Code || (Code = {}));
/// <reference path="../../Common/CharCode" />
/// <reference path="Segment" />
var Code;
(function (Code) {
    var Lexer;
    (function (Lexer) {
        var StringLiteralFinder = (function () {
            function StringLiteralFinder() {
            }
            StringLiteralFinder.prototype.find = function (stream) {
                var delimiterChar = stream.peek();
                if (delimiterChar != Common.CharCode.DOUBLE_QUOTE && delimiterChar != Common.CharCode.SINGLE_QUOTE)
                    return null;
                var chars = [stream.read()];
                for (var char = stream.read(); char != -1; char = stream.read()) {
                    chars.push(char);
                    if (char == delimiterChar)
                        break;
                }
                return new Lexer.Segment(chars, Lexer.LexerHint.STRING);
            };
            return StringLiteralFinder;
        })();
        Lexer.StringLiteralFinder = StringLiteralFinder;
    })(Lexer = Code.Lexer || (Code.Lexer = {}));
})(Code || (Code = {}));
