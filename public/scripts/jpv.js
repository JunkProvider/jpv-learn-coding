var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var SynchroneValidatorBase = (function () {
            function SynchroneValidatorBase(stopIfInvalid, text) {
                this._stopIfInvalid = stopIfInvalid;
                this._text = text;
            }
            Object.defineProperty(SynchroneValidatorBase.prototype, "stopIfInvalid", {
                get: function () { return this._stopIfInvalid; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SynchroneValidatorBase.prototype, "text", {
                get: function () { return this._text; },
                enumerable: true,
                configurable: true
            });
            SynchroneValidatorBase.prototype.isSynchroneValidator = function () {
                return true;
            };
            SynchroneValidatorBase.prototype.isValidationElement = function () {
                return true;
            };
            return SynchroneValidatorBase;
        })();
        Validation.SynchroneValidatorBase = SynchroneValidatorBase;
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="../SynchroneValidatorBase.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var Validator;
        (function (Validator) {
            var NumberInteger = (function (_super) {
                __extends(NumberInteger, _super);
                function NumberInteger() {
                    _super.apply(this, arguments);
                }
                NumberInteger.prototype.isValid = function (value) {
                    if (value == null || isNaN(value) || !isFinite(value))
                        return false;
                    return value == Math.floor(value);
                };
                return NumberInteger;
            })(Validation.SynchroneValidatorBase);
            Validator.NumberInteger = NumberInteger;
        })(Validator = Validation.Validator || (Validation.Validator = {}));
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="NumberInteger.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var Validator;
        (function (Validator) {
            var NumberIntegerFactory = (function () {
                function NumberIntegerFactory() {
                }
                NumberIntegerFactory.prototype.produce = function (json) {
                    return new Validator.NumberInteger(json.stopIfInvalid, json.infoText);
                };
                return NumberIntegerFactory;
            })();
            Validator.NumberIntegerFactory = NumberIntegerFactory;
        })(Validator = Validation.Validator || (Validation.Validator = {}));
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var ClassList = (function () {
            function ClassList(classList) {
                this.classList = classList;
            }
            ClassList.prototype.add = function (cssClass) {
                if (cssClass == null || cssClass == "")
                    return;
                this.classList.add(cssClass);
            };
            ClassList.prototype.remove = function (cssClass) {
                if (cssClass == null || cssClass == "")
                    return;
                this.classList.remove(cssClass);
            };
            ClassList.prototype.toggle = function (cssClass) {
                if (cssClass == null || cssClass == "")
                    return;
                this.classList.toggle(cssClass);
            };
            ClassList.prototype.swich = function (cssClass, enabled) {
                if (cssClass == null || cssClass == "")
                    return;
                if (enabled) {
                    this.classList.add(cssClass);
                }
                else {
                    this.classList.remove(cssClass);
                }
            };
            return ClassList;
        })();
        View.ClassList = ClassList;
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="ClassList.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View_1) {
        var View = (function () {
            function View(htmlElement) {
                this.parent = null;
                this.children = [];
                this._htmlElement = htmlElement;
                this._classes = new View_1.ClassList(htmlElement.classList);
            }
            Object.defineProperty(View.prototype, "htmlElement", {
                get: function () { return this._htmlElement; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "classes", {
                get: function () { return this._classes; },
                enumerable: true,
                configurable: true
            });
            View.prototype.dispose = function () {
                this.remove();
            };
            View.prototype.appendTo = function (parent) {
                if (parent instanceof View) {
                    parent.appendView(this);
                    return;
                }
                if (parent instanceof HTMLElement) {
                    parent.appendChild(this.htmlElement);
                    return;
                }
                throw new Error("Could not append to given parent. Parent must be instance of html element or ui element.");
            };
            View.prototype.remove = function () {
                if (this.parent != null) {
                    this.parent.removeView(this);
                }
                else {
                    this.htmlElement.remove();
                }
            };
            View.prototype.addClass = function (cssClass) {
                this.classes.add(cssClass);
            };
            View.prototype.append = function (child) {
                if (child instanceof View) {
                    this.appendView(child);
                    return;
                }
                if (child instanceof HTMLElement) {
                    this.htmlElement.appendChild(child);
                    return;
                }
                throw new Error("Could not append child. Child must be instance of html element or ui element.");
            };
            View.prototype.clear = function () {
                var children = this.children;
                var child = null;
                while (child = children.pop()) {
                    child.parent = null;
                }
                var node = this.htmlElement;
                var childNode = null;
                while (childNode = node.lastChild) {
                    node.removeChild(childNode);
                }
            };
            View.prototype.appendView = function (child) {
                if (child.parent != null)
                    throw new Error("Could not append child. The child already has a parent.");
                this.children.push(child);
                child.parent = this;
                this.htmlElement.appendChild(child.htmlElement);
            };
            View.prototype.removeView = function (child) {
                if (child.parent != this)
                    throw new Error("Could not remove child. This is not the parent of the child.");
                child.parent = null;
                this.children.splice(this.children.indexOf(child), 1);
                child.remove();
            };
            return View;
        })();
        View_1.View = View;
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="../View" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Input;
        (function (Input) {
            var TextInput = (function (_super) {
                __extends(TextInput, _super);
                function TextInput(htmlElement) {
                    var _this = this;
                    _super.call(this, htmlElement);
                    this.valueChangedEvent = new JPV.Event.Event();
                    this.maxLength = null;
                    this.allowedCharacters = null;
                    this.htmlElement.onchange = function () {
                        _this.validateCurrentValue();
                        _this.valueChangedEvent.trigger(_this, true);
                    };
                }
                Object.defineProperty(TextInput.prototype, "htmlElement", {
                    get: function () { return this._htmlElement; },
                    enumerable: true,
                    configurable: true
                });
                TextInput.prototype.setMaxLength = function (maxLength) {
                    this.maxLength = maxLength;
                    this.htmlElement.maxLength = maxLength;
                    this.validateCurrentValue();
                };
                TextInput.prototype.setAllowedCharacters = function (allowedCharacters) {
                    this.allowedCharacters = allowedCharacters;
                    this.validateCurrentValue();
                };
                TextInput.prototype.getValue = function () {
                    return this.htmlElement.value;
                };
                TextInput.prototype.setValue = function (value) {
                    value = this.validateValue(value);
                    var prevValue = this.htmlElement.value;
                    if (value == prevValue)
                        return;
                    this.htmlElement.value = value;
                    this.valueChangedEvent.trigger(this, false);
                };
                TextInput.prototype.onUserInput = function () {
                    this.validateCurrentValue();
                    this.valueChangedEvent.trigger(this, true);
                };
                TextInput.prototype.validateCurrentValue = function () {
                    this.htmlElement.value = this.validateValue(this.htmlElement.value);
                };
                TextInput.prototype.validateValue = function (value) {
                    if (this.maxLength != null) {
                        value = value.substring(0, this.maxLength);
                    }
                    if (this.allowedCharacters != null) {
                        var regExp = new RegExp("[^" + this.allowedCharacters + "]+", "g");
                        value = value.replace(regExp, "");
                    }
                    return value;
                };
                return TextInput;
            })(View.View);
            Input.TextInput = TextInput;
        })(Input = View.Input || (View.Input = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="TextInput" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Input;
        (function (Input) {
            var TextArea = (function (_super) {
                __extends(TextArea, _super);
                function TextArea() {
                    // TODO: nicht casten, lösung finden
                    _super.call(this, document.createElement("textarea"));
                }
                return TextArea;
            })(Input.TextInput);
            Input.TextArea = TextArea;
        })(Input = View.Input || (View.Input = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var TextAlign = (function () {
            function TextAlign() {
            }
            TextAlign.LEFT = "left";
            TextAlign.RIGHT = "right";
            TextAlign.CENTER = "center";
            return TextAlign;
        })();
        View.TextAlign = TextAlign;
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var DataTable;
        (function (DataTable) {
            var SortMode = (function () {
                function SortMode(sign) {
                    this._sign = sign;
                }
                Object.defineProperty(SortMode.prototype, "sign", {
                    get: function () { return this._sign; },
                    enumerable: true,
                    configurable: true
                });
                SortMode.ASC = new SortMode(1);
                SortMode.DESC = new SortMode(-1);
                return SortMode;
            })();
            DataTable.SortMode = SortMode;
        })(DataTable = View.DataTable || (View.DataTable = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="../SynchroneValidatorBase.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var Validator;
        (function (Validator) {
            var StringLength = (function (_super) {
                __extends(StringLength, _super);
                function StringLength(min, max, stopIfInvalid, text) {
                    if (min === void 0) { min = null; }
                    if (max === void 0) { max = null; }
                    if (stopIfInvalid === void 0) { stopIfInvalid = false; }
                    if (text === void 0) { text = null; }
                    _super.call(this, stopIfInvalid, text);
                    this._min = min;
                    this._max = max;
                }
                Object.defineProperty(StringLength.prototype, "min", {
                    get: function () { return this._min; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StringLength.prototype, "max", {
                    get: function () { return this._max; },
                    enumerable: true,
                    configurable: true
                });
                StringLength.prototype.isValid = function (value) {
                    var stringLength = value.length;
                    if (this.min != null && stringLength < this.min)
                        return false;
                    if (this.max != null && stringLength > this.max)
                        return false;
                    return true;
                };
                return StringLength;
            })(Validation.SynchroneValidatorBase);
            Validator.StringLength = StringLength;
        })(Validator = Validation.Validator || (Validation.Validator = {}));
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="StringLength.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var Validator;
        (function (Validator) {
            var StringLengthFactory = (function () {
                function StringLengthFactory() {
                }
                StringLengthFactory.prototype.produce = function (json) {
                    return new Validator.StringLength(json.min, json.max, json.stopIfInvalid, json.infoText);
                };
                return StringLengthFactory;
            })();
            Validator.StringLengthFactory = StringLengthFactory;
        })(Validator = Validation.Validator || (Validation.Validator = {}));
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="../SynchroneValidatorBase.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var Validator;
        (function (Validator) {
            var StringPattern = (function (_super) {
                __extends(StringPattern, _super);
                function StringPattern(pattern, stopIfInvalid, text) {
                    if (stopIfInvalid === void 0) { stopIfInvalid = false; }
                    if (text === void 0) { text = null; }
                    _super.call(this, stopIfInvalid, text);
                    this._pattern = pattern;
                }
                Object.defineProperty(StringPattern.prototype, "pattern", {
                    get: function () { return this._pattern; },
                    enumerable: true,
                    configurable: true
                });
                StringPattern.prototype.isValid = function (value) {
                    var regExp = new RegExp(this.pattern);
                    return regExp.test(value);
                };
                return StringPattern;
            })(Validation.SynchroneValidatorBase);
            Validator.StringPattern = StringPattern;
        })(Validator = Validation.Validator || (Validation.Validator = {}));
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="StringLength.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var Validator;
        (function (Validator) {
            var StringPatternFactory = (function () {
                function StringPatternFactory() {
                }
                StringPatternFactory.prototype.produce = function (json) {
                    return new Validator.StringPattern(json.pattern, json.stopIfInvalid, json.infoText);
                };
                return StringPatternFactory;
            })();
            Validator.StringPatternFactory = StringPatternFactory;
        })(Validator = Validation.Validator || (Validation.Validator = {}));
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="StringLength.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var Validator;
        (function (Validator) {
            var EMailAddressLength = (function (_super) {
                __extends(EMailAddressLength, _super);
                function EMailAddressLength(stopIfInvalid) {
                    if (stopIfInvalid === void 0) { stopIfInvalid = false; }
                    _super.call(this, null, EMailAddressLength.MAX_LENGTH, stopIfInvalid, "Can not have more than " + EMailAddressLength.MAX_LENGTH + " characters.");
                }
                EMailAddressLength.MAX_LENGTH = 254;
                return EMailAddressLength;
            })(Validator.StringLength);
            Validator.EMailAddressLength = EMailAddressLength;
        })(Validator = Validation.Validator || (Validation.Validator = {}));
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="StringPattern.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var Validator;
        (function (Validator) {
            var EMailAddressPattern = (function (_super) {
                __extends(EMailAddressPattern, _super);
                function EMailAddressPattern(stopIfInvalid) {
                    if (stopIfInvalid === void 0) { stopIfInvalid = false; }
                    _super.call(this, EMailAddressPattern.PATTERN, stopIfInvalid, "Must be a valid e-mail address.");
                }
                EMailAddressPattern.PATTERN = ".+@.+\\..+";
                return EMailAddressPattern;
            })(Validator.StringPattern);
            Validator.EMailAddressPattern = EMailAddressPattern;
        })(Validator = Validation.Validator || (Validation.Validator = {}));
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="../SynchroneValidatorBase.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var Validator;
        (function (Validator) {
            var NumberRange = (function (_super) {
                __extends(NumberRange, _super);
                function NumberRange(min, minInclusive, max, maxInclusive, stopIfInvalid, text) {
                    if (min === void 0) { min = null; }
                    if (minInclusive === void 0) { minInclusive = true; }
                    if (max === void 0) { max = null; }
                    if (maxInclusive === void 0) { maxInclusive = true; }
                    if (stopIfInvalid === void 0) { stopIfInvalid = false; }
                    if (text === void 0) { text = null; }
                    _super.call(this, stopIfInvalid, text);
                    this._min = min;
                    this._minInclusive = minInclusive;
                    this._max = max;
                    this._maxInclusive = maxInclusive;
                }
                Object.defineProperty(NumberRange.prototype, "min", {
                    get: function () { return this._min; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NumberRange.prototype, "minInclusive", {
                    get: function () { return this._minInclusive; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NumberRange.prototype, "max", {
                    get: function () { return this._max; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NumberRange.prototype, "maxInclusive", {
                    get: function () { return this._maxInclusive; },
                    enumerable: true,
                    configurable: true
                });
                NumberRange.prototype.isValid = function (value) {
                    if (value == null || isNaN(value) || !isFinite(value))
                        return false;
                    if (this.min != null) {
                        if (this.minInclusive) {
                            if (value < this.min)
                                return false;
                        }
                        else {
                            if (value <= this.min)
                                return false;
                        }
                    }
                    if (this.max != null) {
                        if (this.maxInclusive) {
                            if (value > this.max)
                                return false;
                        }
                        else {
                            if (value >= this.max)
                                return false;
                        }
                    }
                    return true;
                };
                return NumberRange;
            })(Validation.SynchroneValidatorBase);
            Validator.NumberRange = NumberRange;
        })(Validator = Validation.Validator || (Validation.Validator = {}));
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="NumberRange.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var Validator;
        (function (Validator) {
            var NumberRangeFactory = (function () {
                function NumberRangeFactory() {
                }
                NumberRangeFactory.prototype.produce = function (json) {
                    return new Validator.NumberRange(json.min, json.minInclusive, json.max, json.maxInclusive, json.stopIfInvalid, json.infoText);
                };
                return NumberRangeFactory;
            })();
            Validator.NumberRangeFactory = NumberRangeFactory;
        })(Validator = Validation.Validator || (Validation.Validator = {}));
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="StringLength.ts" />
/// <reference path="StringLengthJson.ts" />
/// <reference path="StringLengthFactory.ts" />
/// <reference path="StringPattern.ts" />
/// <reference path="StringPatternJson.ts" />
/// <reference path="StringPatternFactory.ts" />
/// <reference path="EMailAddressLength.ts" />
/// <reference path="EMailAddressPattern.ts" />
/// <reference path="NumberInteger.ts" />
/// <reference path="NumberIntegerJson.ts" />
/// <reference path="NumberIntegerFactory.ts" />
/// <reference path="NumberRange.ts" />
/// <reference path="NumberRangeJson.ts" />
/// <reference path="NumberRangeFactory.ts" />
/// <reference path="../View.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Window;
        (function (Window) {
            var WindowHeadButtonList = (function (_super) {
                __extends(WindowHeadButtonList, _super);
                function WindowHeadButtonList() {
                    _super.call(this, document.createElement("div"));
                    this.classes.add("window-head-buttons");
                }
                WindowHeadButtonList.prototype.setButtons = function (buttons) {
                    this.clear();
                    for (var _i = 0; _i < buttons.length; _i++) {
                        var button = buttons[_i];
                        this.append(button);
                    }
                };
                WindowHeadButtonList.prototype.addButton = function (button) {
                    this.append(button);
                };
                return WindowHeadButtonList;
            })(View.View);
            var WindowHead = (function (_super) {
                __extends(WindowHead, _super);
                function WindowHead(caption, buttons) {
                    if (buttons === void 0) { buttons = []; }
                    _super.call(this, document.createElement("div"));
                    this.classes.add("window-head");
                    // Caption
                    this.append(this.caption = document.createElement("span"));
                    this.caption.classList.add("window-head-caption");
                    this.caption.textContent = caption;
                    // Buttons
                    this.append(this.buttonList = new WindowHeadButtonList());
                    this.buttonList.setButtons(buttons);
                }
                /**
                 * Adds a button to the button list.
                 */
                WindowHead.prototype.addButton = function (button) {
                    this.buttonList.addButton(button);
                };
                return WindowHead;
            })(View.View);
            Window.WindowHead = WindowHead;
        })(Window = View.Window || (View.Window = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var Event;
    (function (Event) {
        var Delegate = (function () {
            function Delegate(context, handler) {
            }
            Delegate.prototype.call = function () {
                var parameters = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    parameters[_i - 0] = arguments[_i];
                }
                this.handler.call(this.context, parameters);
            };
            return Delegate;
        })();
        Event.Delegate = Delegate;
    })(Event = JPV.Event || (JPV.Event = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var Geometry;
    (function (Geometry) {
        var Point = (function () {
            function Point(x, y) {
                this._x = x;
                this._y = y;
            }
            Object.defineProperty(Point.prototype, "x", {
                get: function () { return this._x; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Point.prototype, "y", {
                get: function () { return this._y; },
                enumerable: true,
                configurable: true
            });
            Point.prototype.add = function (point) {
                return this.move(point.x, point.y);
            };
            Point.prototype.move = function (x, y) {
                return new Point(this._x + x, this._y + y);
            };
            Point.prototype.equals = function (point) {
                if (point == null)
                    return false;
                return point._x == this._x && point._y == this._y;
            };
            Point.prototype.toString = function () {
                return "Point(" + this._x + ", " + this._y + ")";
            };
            return Point;
        })();
        Geometry.Point = Point;
    })(Geometry = JPV.Geometry || (JPV.Geometry = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var Geometry;
    (function (Geometry) {
        var Size = (function () {
            function Size(width, height) {
                this._width = width;
                this._height = height;
            }
            Object.defineProperty(Size.prototype, "width", {
                get: function () { return this._width; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Size.prototype, "height", {
                get: function () { return this._height; },
                enumerable: true,
                configurable: true
            });
            Size.prototype.toString = function () {
                return "Size(" + this._width + ", " + this._height + ")";
            };
            return Size;
        })();
        Geometry.Size = Size;
    })(Geometry = JPV.Geometry || (JPV.Geometry = {}));
})(JPV || (JPV = {}));
/// <reference path="Point.ts" />
/// <reference path="Size.ts" />
var JPV;
(function (JPV) {
    var Geometry;
    (function (Geometry) {
        var Rectangle = (function () {
            function Rectangle(x, y, width, height) {
                this._x = x;
                this._y = y;
                this._width = width;
                this._height = height;
            }
            Object.defineProperty(Rectangle.prototype, "x", {
                get: function () { return this._x; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "y", {
                get: function () { return this._y; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "width", {
                get: function () { return this._width; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "height", {
                get: function () { return this._height; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "position", {
                get: function () {
                    return new Geometry.Point(this._x, this._y);
                },
                enumerable: true,
                configurable: true
            });
            Rectangle.prototype.move = function (x, y) {
                return new Rectangle(this._x + x, this._y + y, this._width, this._height);
            };
            Rectangle.prototype.toString = function () {
                return "Rectangle(" + this._x + ", " + this._y + ", " + this._width + ", " + this._height + ")";
            };
            return Rectangle;
        })();
        Geometry.Rectangle = Rectangle;
    })(Geometry = JPV.Geometry || (JPV.Geometry = {}));
})(JPV || (JPV = {}));
/// <reference path="../View.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Dialog;
        (function (Dialog) {
            var DialogBackground = (function (_super) {
                __extends(DialogBackground, _super);
                function DialogBackground() {
                    _super.call(this, document.createElement("div"));
                    this.classes.add("dialog-background");
                }
                return DialogBackground;
            })(View.View);
            Dialog.DialogBackground = DialogBackground;
        })(Dialog = View.Dialog || (View.Dialog = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="../View.ts" />
/// <reference path="DialogBackground.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Dialog;
        (function (Dialog) {
            var DialogManager = (function (_super) {
                __extends(DialogManager, _super);
                function DialogManager() {
                    _super.call(this, document.createElement("div"));
                    this.dialogs = [];
                    this.classes.add("dialog-manager");
                    this.background = new Dialog.DialogBackground();
                }
                DialogManager.prototype.openDialog = function (dialog) {
                    dialog.closeButtonClickedEvent.add(this, this.onDialogCloseButtonClicked);
                    this.dialogs.push(dialog);
                    this.append(this.background);
                    this.append(dialog);
                };
                DialogManager.prototype.closeDialog = function (dialog) {
                    dialog.closeButtonClickedEvent.remove(this, this.onDialogCloseButtonClicked);
                    var index = this.dialogs.indexOf(dialog);
                    this.dialogs.splice(index, 1);
                    if (this.dialogs.length == 0) {
                        this.background.remove();
                    }
                    dialog.remove();
                };
                DialogManager.prototype.onDialogCloseButtonClicked = function (dialog) {
                    this.closeDialog(dialog);
                };
                return DialogManager;
            })(View.View);
            Dialog.DialogManager = DialogManager;
        })(Dialog = View.Dialog || (View.Dialog = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="../View.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Structure;
        (function (Structure) {
            var Container = (function (_super) {
                __extends(Container, _super);
                function Container(cssClass) {
                    if (cssClass === void 0) { cssClass = null; }
                    _super.call(this, document.createElement("div"));
                    if (cssClass != null) {
                        this.classes.add(cssClass);
                    }
                }
                Object.defineProperty(Container.prototype, "htmlElement", {
                    get: function () { return this._htmlElement; },
                    enumerable: true,
                    configurable: true
                });
                Container.prototype.append = function (child) {
                    _super.prototype.append.call(this, child);
                };
                Container.prototype.clear = function () {
                    _super.prototype.clear.call(this);
                };
                return Container;
            })(View.View);
            Structure.Container = Container;
        })(Structure = View.Structure || (View.Structure = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="../View.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Button;
        (function (Button_1) {
            var Button = (function (_super) {
                __extends(Button, _super);
                function Button() {
                    var _this = this;
                    _super.call(this, document.createElement("div"));
                    this.clickedEvent = new JPV.Event.Event();
                    this.displayed = true;
                    this.enabled = true;
                    this.pressed = false;
                    this.htmlElement.onclick = function () { return _this.onClicked(); };
                }
                Button.prototype.isDisplayed = function () {
                    return this.displayed;
                };
                Button.prototype.setDisplayed = function (displayed) {
                    this.htmlElement.style.display = displayed ? "" : "none";
                };
                Button.prototype.isEnabled = function () {
                    return this.enabled;
                };
                Button.prototype.setEnabled = function (enabled) {
                    if (enabled == this.enabled)
                        return;
                    this.enabled = enabled;
                    this.classes.swich("disabled", !enabled);
                };
                Button.prototype.isPressed = function () {
                    return this.pressed;
                };
                Button.prototype.setPressed = function (pressed) {
                    if (pressed == this.pressed)
                        return;
                    this.pressed = pressed;
                    this.classes.swich("pressed", pressed);
                };
                Button.prototype.onClicked = function () {
                    if (this.enabled) {
                        this.clickedEvent.trigger(this, null);
                    }
                };
                return Button;
            })(View.View);
            Button_1.Button = Button;
        })(Button = View.Button || (View.Button = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="Button.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Button;
        (function (Button) {
            var ImageButton = (function (_super) {
                __extends(ImageButton, _super);
                function ImageButton(src, title, cssClass) {
                    if (title === void 0) { title = null; }
                    if (cssClass === void 0) { cssClass = null; }
                    _super.call(this);
                    // Create HTML elements
                    this.image = document.createElement("img");
                    // Customize HTML elements
                    this.classes.add("image-button");
                    if (cssClass != null) {
                        this.classes.add(cssClass);
                    }
                    this.image.src = src;
                    if (title != null) {
                        this.image.title = title;
                    }
                    // Append HTML elements
                    this.append(this.image);
                }
                return ImageButton;
            })(Button.Button);
            Button.ImageButton = ImageButton;
        })(Button = View.Button || (View.Button = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="../View.ts" />
/// <reference path="../structure/Container.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Dialog;
        (function (Dialog) {
            var DialogButtonList = (function (_super) {
                __extends(DialogButtonList, _super);
                function DialogButtonList() {
                    _super.call(this, document.createElement("div"));
                    this.classes.add("dialog-buttons");
                    this.append(this.leftContainer = new View.Structure.Container("left-dialog-buttons"));
                    this.append(this.rightContainer = new View.Structure.Container("right-dialog-buttons"));
                    this.append(new View.Structure.Container("clear-fix"));
                }
                DialogButtonList.prototype.addButtonLeft = function (button) {
                    this.leftContainer.append(button);
                };
                DialogButtonList.prototype.addButtonRight = function (button) {
                    this.rightContainer.append(button);
                };
                return DialogButtonList;
            })(View.View);
            Dialog.DialogButtonList = DialogButtonList;
        })(Dialog = View.Dialog || (View.Dialog = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="../View.ts" />
/// <reference path="../window/WindowHead.ts" />
/// <reference path="../structure/Container.ts" />
/// <reference path="../button/ImageButton.ts" />
/// <reference path="DialogButtonList.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Dialog;
        (function (Dialog_1) {
            var Dialog = (function (_super) {
                __extends(Dialog, _super);
                function Dialog(caption, closeButton) {
                    if (closeButton === void 0) { closeButton = true; }
                    _super.call(this, document.createElement("div"));
                    this.closeButtonClickedEvent = new JPV.Event.Event();
                    this.overlay = null;
                    this.closeButton = null;
                    this.enabled = true;
                    this.classes.add("dialog");
                    // Window head
                    this.append(this.head = new View.Window.WindowHead(caption));
                    this.head.addButton(this.closeButton = new View.Button.ImageButton("images/close.svg", "Close dialog", "close-dialog-button"));
                    this.closeButton.clickedEvent.add(this, this.onCloseButtonClicked);
                    // Window content
                    this.append(this.content = new View.Structure.Container());
                    this.content.addClass("dialog-content");
                    // Window button list
                    this.append(this.buttonList = new Dialog_1.DialogButtonList());
                    this.overlay = new View.View(document.createElement("div"));
                    this.overlay.addClass("dialog-overlay");
                    this.setCloseButtonDisplayed(closeButton);
                }
                Dialog.prototype.setSize = function (width, height) {
                    this.htmlElement.style.width = width;
                    this.htmlElement.style.height = height;
                };
                Dialog.prototype.setPosition = function (x, y) {
                    this.htmlElement.style.left = x;
                    this.htmlElement.style.top = y;
                };
                Dialog.prototype.setEnabled = function (enabled) {
                    if (enabled == this.enabled)
                        return;
                    if (enabled) {
                        this.overlay.remove();
                    }
                    else {
                        this.append(this.overlay);
                    }
                    this.enabled = enabled;
                };
                Dialog.prototype.setCloseButtonDisplayed = function (displayed) {
                    this.closeButton.setDisplayed(displayed);
                };
                Dialog.prototype.onCloseButtonClicked = function () {
                    this.closeButtonClickedEvent.trigger(this, null);
                };
                return Dialog;
            })(View.View);
            Dialog_1.Dialog = Dialog;
        })(Dialog = View.Dialog || (View.Dialog = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var Collection;
    (function (Collection) {
        var Map = (function () {
            function Map(values) {
                if (values === void 0) { values = {}; }
                this.values = {};
                this.values = values;
            }
            Map.createFromArray = function (values, getKey) {
                var valuesWithKeys = {};
                for (var i = 0, len = values.length; i < len; i++) {
                    valuesWithKeys[getKey(values[i])] = values[i];
                }
                return new Map(valuesWithKeys);
            };
            Map.prototype.contains = function (key) {
                return this.values[key] != undefined;
            };
            Map.prototype.get = function (key) {
                return this.values[key];
            };
            Map.prototype.add = function (key, value) {
                key = String(key);
                if (this.values[key] != undefined)
                    throw new Error("Key '" + key + "' is already defined.");
                this.values[key] = value;
            };
            Map.prototype.set = function (key, value) {
                key = String(key);
                this.values[key] = value;
            };
            Map.prototype.remove = function (key) {
                key = String(key);
                delete this.values[key];
            };
            Map.prototype.merge = function (map) {
                var values = map.values;
                for (var key in values) {
                    this.set(key, values[key]);
                }
            };
            Map.prototype.forEach = function (callback) {
                var values = this.values;
                for (var key in values) {
                    callback(values[key], key);
                }
            };
            Map.prototype.toArray = function () {
                var array = [];
                for (var key in this.values) {
                    array.push(this.values[key]);
                }
                return array;
            };
            return Map;
        })();
        Collection.Map = Map;
    })(Collection = JPV.Collection || (JPV.Collection = {}));
})(JPV || (JPV = {}));
/// <reference path="../collection/Map.ts" />
var JPV;
(function (JPV) {
    var Mathematics;
    (function (Mathematics) {
        var NumberComparison = (function () {
            function NumberComparison(id, compareFunction) {
                this._id = id;
                this.compareFunction = compareFunction;
            }
            NumberComparison.getAll = function () {
                return NumberComparison.all;
            };
            NumberComparison.getById = function (id) {
                return NumberComparison.allById.get(id);
            };
            Object.defineProperty(NumberComparison.prototype, "id", {
                get: function () { return this._id; },
                enumerable: true,
                configurable: true
            });
            NumberComparison.prototype.compare = function (a, b) {
                return this.compareFunction(a, b);
            };
            NumberComparison.all = [];
            NumberComparison.allById = new JPV.Collection.Map();
            NumberComparison.EQUAL = new NumberComparison(1, function (a, b) { return a == b; });
            NumberComparison.NOT_EQUAL = new NumberComparison(1, function (a, b) { return a != b; });
            NumberComparison.GEATER = new NumberComparison(3, function (a, b) { return a > b; });
            NumberComparison.GEATER_OR_EQUAL = new NumberComparison(4, function (a, b) { return a >= b; });
            NumberComparison.LESS = new NumberComparison(5, function (a, b) { return a < b; });
            NumberComparison.LESS_OR_EQUAL = new NumberComparison(6, function (a, b) { return a <= b; });
            return NumberComparison;
        })();
        Mathematics.NumberComparison = NumberComparison;
    })(Mathematics = JPV.Mathematics || (JPV.Mathematics = {}));
})(JPV || (JPV = {}));
/// <reference path="NumberComparison.ts" />
/// <reference path="ClassList.ts" />
var JPV;
(function (JPV) {
    var Ajax;
    (function (Ajax) {
        var Method = (function () {
            function Method() {
            }
            Method.GET = "GET";
            Method.POST = "POST";
            return Method;
        })();
        Ajax.Method = Method;
    })(Ajax = JPV.Ajax || (JPV.Ajax = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var SynchroneFilterBase = (function () {
            function SynchroneFilterBase(text) {
                this._text = text;
            }
            Object.defineProperty(SynchroneFilterBase.prototype, "text", {
                get: function () { return this._text; },
                enumerable: true,
                configurable: true
            });
            SynchroneFilterBase.prototype.isSynchroneFilter = function () {
                return true;
            };
            SynchroneFilterBase.prototype.isValidationElement = function () {
                return true;
            };
            return SynchroneFilterBase;
        })();
        Validation.SynchroneFilterBase = SynchroneFilterBase;
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="../SynchroneFilterBase.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var Filter;
        (function (Filter) {
            var StringTrim = (function (_super) {
                __extends(StringTrim, _super);
                function StringTrim() {
                    _super.apply(this, arguments);
                }
                StringTrim.prototype.filter = function (value) {
                    return value.trim();
                };
                return StringTrim;
            })(Validation.SynchroneFilterBase);
            Filter.StringTrim = StringTrim;
        })(Filter = Validation.Filter || (Validation.Filter = {}));
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="StringTrim.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var Filter;
        (function (Filter) {
            var StringTrimFactory = (function () {
                function StringTrimFactory() {
                }
                StringTrimFactory.prototype.produce = function (json) {
                    return new Filter.StringTrim(json.infoText);
                };
                return StringTrimFactory;
            })();
            Filter.StringTrimFactory = StringTrimFactory;
        })(Filter = Validation.Filter || (Validation.Filter = {}));
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="StringTrim.ts" />
/// <reference path="StringTrimJson.ts" />
/// <reference path="StringTrimFactory.ts" />
/// <reference path="../../collection/Map.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var Factory;
        (function (Factory) {
            var ValidationFactory = (function () {
                function ValidationFactory(synchroneFilterFactories, synchroneValidatorFactories) {
                    if (synchroneFilterFactories === void 0) { synchroneFilterFactories = new JPV.Collection.Map(); }
                    if (synchroneValidatorFactories === void 0) { synchroneValidatorFactories = new JPV.Collection.Map(); }
                    this.synchroneFilterFactories = new JPV.Collection.Map({
                        "JPVValidation\\Filter\\StringTrim": new Validation.Filter.StringTrimFactory()
                    });
                    this.synchroneValidatorFactories = new JPV.Collection.Map({
                        "JPVValidation\\Validator\\StringLength": new Validation.Validator.StringLengthFactory(),
                        "JPVValidation\\Validator\\NumberInteger": new Validation.Validator.NumberIntegerFactory(),
                        "JPVValidation\\Validator\\NumberRange": new Validation.Validator.NumberRangeFactory()
                    });
                    this.synchroneFilterFactories.merge(synchroneFilterFactories);
                    this.synchroneValidatorFactories.merge(synchroneValidatorFactories);
                }
                ValidationFactory.prototype.produceValidationElements = function (elementsJson) {
                    var elements = [];
                    for (var _i = 0; _i < elementsJson.length; _i++) {
                        var elementJson = elementsJson[_i];
                        elements.push(this.produceValidationElement(elementJson));
                    }
                    return elements;
                };
                ValidationFactory.prototype.produceValidationElement = function (elementJson) {
                    if (elementJson.type == Factory.ValidationElementType.FILTER)
                        return this.produceSynchroneFilter(elementJson);
                    if (elementJson.type == Factory.ValidationElementType.VALIDATOR)
                        return this.produceSynchroneValidator(elementJson);
                    throw new Error("Unknown validation element type.");
                };
                ValidationFactory.prototype.produceSynchroneFilters = function (filtersJson) {
                    var filters = [];
                    for (var _i = 0; _i < filtersJson.length; _i++) {
                        var filterJson = filtersJson[_i];
                        filters.push(this.produceSynchroneFilter(filterJson));
                    }
                    return filters;
                };
                ValidationFactory.prototype.produceSynchroneFilter = function (filterJson) {
                    var factory = this.synchroneFilterFactories.get(filterJson.class);
                    if (factory == undefined)
                        throw new Error("No factory for filter of class '" + filterJson.class + "' found.");
                    var filter = factory.produce(filterJson);
                    return filter;
                };
                ValidationFactory.prototype.produceSynchroneValidators = function (validatorsJson) {
                    var validators = [];
                    for (var _i = 0; _i < validatorsJson.length; _i++) {
                        var validatorJson = validatorsJson[_i];
                        validators.push(this.produceSynchroneValidator(validatorJson));
                    }
                    return validators;
                };
                ValidationFactory.prototype.produceSynchroneValidator = function (validatorJson) {
                    var factory = this.synchroneValidatorFactories.get(validatorJson.class);
                    if (factory == undefined)
                        throw new Error("No factory for validator of class '" + validatorJson.class + "' found.");
                    var validator = factory.produce(validatorJson);
                    return validator;
                };
                return ValidationFactory;
            })();
            Factory.ValidationFactory = ValidationFactory;
        })(Factory = Validation.Factory || (Validation.Factory = {}));
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var ValidationProgress = (function () {
            function ValidationProgress(items, callback) {
                this.items = [];
                this.running = false;
                this.state = null;
                this.currentItemIndex = 0;
                this.items = items;
                this.callback = callback;
            }
            ValidationProgress.prototype.start = function (state) {
                if (this.running)
                    this.stop();
                this.running = true;
                for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.reset();
                }
                this.state = state;
                this.currentItemIndex = -1;
                this.updateNextItem();
            };
            ValidationProgress.prototype.stop = function () {
                if (!this.running)
                    return;
                if (this.currentItemIndex != -1) {
                    var currentItem = this.items[this.currentItemIndex];
                    currentItem.cancelUpdate();
                }
                this.running = false;
            };
            ValidationProgress.prototype.updateNextItem = function () {
                var _this = this;
                this.currentItemIndex++;
                // Call the callback and break if all items were updated
                if (this.currentItemIndex >= this.items.length) {
                    this.callback(this.state);
                    this.running = false;
                    return;
                }
                // Update the next item
                this.items[this.currentItemIndex].update(this.state, function () { return _this.updateNextItem(); });
            };
            return ValidationProgress;
        })();
        Validation.ValidationProgress = ValidationProgress;
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="Method.ts" />
var JPV;
(function (JPV) {
    var Ajax;
    (function (Ajax) {
        var Request = (function () {
            function Request(controller, action, parameters, method, callback) {
                this.jqRequest = null;
                this.wasSend = false;
                this.controller = controller;
                this.action = action;
                this.parameters = parameters;
                this.method = method;
                this.callback = callback;
            }
            Request.prototype.send = function () {
                var _this = this;
                if (this.wasSend)
                    throw new Error("Could not send request, the request was already send.");
                var successCallback = function (data, textStatus, jqXHR) {
                    var response = null;
                    try {
                        response = JSON.parse(data);
                    }
                    catch (error) {
                        throw new Error("Could not parse data \"" + data + "\". " + error.message);
                    }
                    if (response.exception != null) {
                        throw new Error(response.exception.message);
                    }
                    if (response.buffer != null && response.buffer.length != 0) {
                        throw new Error(response.buffer);
                    }
                    _this.callback(response.data);
                };
                var errorCallback = function (jqXHR, textStatus, errorThrown) {
                    throw new Error(errorThrown);
                };
                var settings = {
                    url: "",
                    // TODO: method: this.method,
                    data: {
                        c: this.controller,
                        a: this.action,
                        p: JSON.stringify(this.parameters)
                    },
                    success: successCallback,
                    error: errorCallback
                };
                this.jqRequest = $.ajax("", settings);
                this.wasSend = true;
                return this;
            };
            Request.prototype.abort = function () {
                this.jqRequest.abort();
                return this;
            };
            return Request;
        })();
        Ajax.Request = Request;
    })(Ajax = JPV.Ajax || (JPV.Ajax = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var Timing;
    (function (Timing) {
        var Timer = (function () {
            function Timer(timeout, periodic, callback) {
                this.intervalId = null;
                this.timeout = timeout;
                this.periodic = periodic;
                this.callback = callback;
            }
            Timer.prototype.start = function () {
                var _this = this;
                this.stop();
                this.intervalId = window.setInterval(function () { return _this.elapsed(); }, this.timeout);
            };
            Timer.prototype.stop = function () {
                if (this.intervalId != null) {
                    window.clearInterval(this.intervalId);
                    this.intervalId = null;
                }
            };
            Timer.prototype.elapsed = function () {
                if (!this.periodic)
                    this.stop();
                this.callback();
            };
            return Timer;
        })();
        Timing.Timer = Timer;
    })(Timing = JPV.Timing || (JPV.Timing = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var Event;
    (function (Event_1) {
        var EventListener = (function () {
            function EventListener(context, handler) {
                this.context = context;
                this.handler = handler;
            }
            return EventListener;
        })();
        Event_1.EventListener = EventListener;
        var Event = (function () {
            function Event() {
                this.listeners = [];
            }
            Event.prototype.add = function (context, handler) {
                this.listeners.push(new EventListener(context, handler));
            };
            Event.prototype.trigger = function (sender, data) {
                var listeners = this.listeners;
                for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                    var listener = _a[_i];
                    listener.handler.call(listener.context, sender, data);
                }
            };
            Event.prototype.remove = function (context, handler) {
                var listeners = this.listeners;
                for (var i = 0; i < listeners.length; i++) {
                    if (listeners[i].context == context && listeners[i].handler == handler) {
                        this.listeners.slice(i, 1);
                        return true;
                    }
                }
                return false;
            };
            return Event;
        })();
        Event_1.Event = Event;
    })(Event = JPV.Event || (JPV.Event = {}));
})(JPV || (JPV = {}));
/// <reference path="../View" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Input;
        (function (Input) {
            var Checkbox = (function (_super) {
                __extends(Checkbox, _super);
                function Checkbox() {
                    var _this = this;
                    _super.call(this, document.createElement("input"));
                    this.valueChangedEvent = new JPV.Event.Event();
                    this.htmlElement.type = "checkbox";
                    this.classes.add("checkbox");
                    this.htmlElement.onchange = function () {
                        _this.valueChangedEvent.trigger(_this, true);
                    };
                }
                Object.defineProperty(Checkbox.prototype, "htmlElement", {
                    get: function () { return this._htmlElement; },
                    enumerable: true,
                    configurable: true
                });
                Checkbox.prototype.getValue = function () {
                    return this.htmlElement.checked;
                };
                Checkbox.prototype.setValue = function (value) {
                    var prevValue = this.htmlElement.checked;
                    if (value == prevValue)
                        return;
                    this.htmlElement.checked = value;
                    this.valueChangedEvent.trigger(this, false);
                };
                return Checkbox;
            })(View.View);
            Input.Checkbox = Checkbox;
        })(Input = View.Input || (View.Input = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="SortMode.ts" />
var JPV;
(function (JPV) {
    var Exception;
    (function (Exception) {
        var AbstractMethodCallError = (function () {
            function AbstractMethodCallError() {
            }
            Object.defineProperty(AbstractMethodCallError.prototype, "message", {
                get: function () { return "Abstract method called."; },
                enumerable: true,
                configurable: true
            });
            return AbstractMethodCallError;
        })();
        Exception.AbstractMethodCallError = AbstractMethodCallError;
        AbstractMethodCallError.prototype = new Error();
    })(Exception = JPV.Exception || (JPV.Exception = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var ValidityItemState = (function () {
            function ValidityItemState(valid, css) {
                this._valid = valid;
                this._css = css;
                this._iconSrc = "images/" + css + ".png";
            }
            Object.defineProperty(ValidityItemState.prototype, "valid", {
                get: function () { return this._valid; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ValidityItemState.prototype, "css", {
                get: function () { return this._css; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ValidityItemState.prototype, "iconSrc", {
                get: function () { return this._iconSrc; },
                enumerable: true,
                configurable: true
            });
            ValidityItemState.IN_PROGRESS = new ValidityItemState(false, "in-progress");
            ValidityItemState.NOT_CHECKED = new ValidityItemState(false, "not-checked");
            ValidityItemState.VALID = new ValidityItemState(true, "valid");
            ValidityItemState.IVALID = new ValidityItemState(false, "invalid");
            ValidityItemState.WILL_FILTER = new ValidityItemState(true, "will-filter");
            ValidityItemState.WILL_NOT_FILTER = new ValidityItemState(true, "will-not-filter");
            return ValidityItemState;
        })();
        Validation.ValidityItemState = ValidityItemState;
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="../event/Event.ts" />
/// <reference path="ValidityItemState.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var ValidityItemBase = (function () {
            function ValidityItemBase(text, filtersValue) {
                this.stateChangedEvent = new JPV.Event.Event();
                this._state = Validation.ValidityItemState.NOT_CHECKED;
                this._text = text;
                this._filtersValue = filtersValue;
            }
            Object.defineProperty(ValidityItemBase.prototype, "text", {
                get: function () { return this._text; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ValidityItemBase.prototype, "filtersValue", {
                get: function () { return this._filtersValue; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ValidityItemBase.prototype, "state", {
                get: function () { return this._state; },
                enumerable: true,
                configurable: true
            });
            ValidityItemBase.prototype.setState = function (state) {
                if (state == this._state)
                    return;
                this._state = state;
                this.stateChangedEvent.trigger(this, null);
            };
            return ValidityItemBase;
        })();
        Validation.ValidityItemBase = ValidityItemBase;
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="Point.ts" />
/// <reference path="Size.ts" />
/// <reference path="Rectangle.ts" />
/// <reference path="ValidityItemBase.ts" />
/// <reference path="SynchroneValidator.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var SynchroneValidatorItem = (function (_super) {
            __extends(SynchroneValidatorItem, _super);
            function SynchroneValidatorItem(validator) {
                _super.call(this, validator.text, false);
                this.validator = validator;
            }
            SynchroneValidatorItem.prototype.update = function (validationState, callback) {
                if (validationState.interrupted) {
                    this.setState(Validation.ValidityItemState.NOT_CHECKED);
                    callback(validationState);
                    return;
                }
                var valid = this.validator.isValid(validationState.value);
                var state;
                if (valid) {
                    state = Validation.ValidityItemState.VALID;
                }
                else {
                    state = Validation.ValidityItemState.IVALID;
                    validationState.valid = false;
                    if (this.validator.stopIfInvalid)
                        validationState.interrupted = true;
                }
                this.setState(state);
                callback(validationState);
            };
            SynchroneValidatorItem.prototype.cancelUpdate = function () {
                // Do nothing because this validator is not asynchrone	
            };
            SynchroneValidatorItem.prototype.reset = function () {
                this.setState(Validation.ValidityItemState.NOT_CHECKED);
            };
            return SynchroneValidatorItem;
        })(Validation.ValidityItemBase);
        Validation.SynchroneValidatorItem = SynchroneValidatorItem;
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="Event.ts" />
/// <reference path="../event/Event.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var ValidationChain = (function () {
            function ValidationChain(items) {
                if (items === void 0) { items = []; }
                this.changedEvent = new JPV.Event.Event();
                this._items = [];
                this._items = items;
            }
            Object.defineProperty(ValidationChain.prototype, "items", {
                get: function () { return this._items; },
                enumerable: true,
                configurable: true
            });
            ValidationChain.prototype.getFilteredItems = function (filter) {
                var items = this.items;
                var filteredItems = [];
                for (var _i = 0; _i < items.length; _i++) {
                    var item = items[_i];
                    if (filter(item))
                        filteredItems.push(item);
                }
                return filteredItems;
            };
            ValidationChain.prototype.addSynchroneFilter = function (filter) {
                this._items.push(new Validation.SynchroneFilterItem(filter));
            };
            ValidationChain.prototype.addSynchroneValidator = function (validator) {
                this._items.push(new Validation.SynchroneValidatorItem(validator));
            };
            ValidationChain.prototype.addItem = function (item) {
                this._items.push(item);
            };
            return ValidationChain;
        })();
        Validation.ValidationChain = ValidationChain;
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="Column.ts" />
/// <reference path="SortMode.ts" />
/// <reference path="../TextAlign.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var DataTable;
        (function (DataTable) {
            var StringColumn = (function () {
                function StringColumn(heading, textAlign, width, getValue, sort) {
                    if (sort === void 0) { sort = null; }
                    this.heading = heading;
                    this.textAlign = textAlign;
                    this._width = width;
                    this.getValue = getValue;
                    this.sortFunction = sort;
                }
                Object.defineProperty(StringColumn.prototype, "sortable", {
                    get: function () { return this.sortFunction != null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StringColumn.prototype, "width", {
                    get: function () { return this._width; },
                    enumerable: true,
                    configurable: true
                });
                StringColumn.prototype.customizeTH = function (th) {
                    th.textContent = this.heading;
                    th.appendChild(document.createElement("span"));
                };
                StringColumn.prototype.customizeTD = function (td, entry) {
                    td.textContent = this.getValue(entry);
                    td.style.textAlign = this.textAlign;
                };
                StringColumn.prototype.sort = function (entries, mode) {
                    var _this = this;
                    entries.sort(function (a, b) { return mode.sign * _this.sortFunction(a, b); });
                };
                return StringColumn;
            })();
            DataTable.StringColumn = StringColumn;
        })(DataTable = View.DataTable || (View.DataTable = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="TextInput" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Input;
        (function (Input) {
            var TextField = (function (_super) {
                __extends(TextField, _super);
                function TextField() {
                    _super.call(this, document.createElement("input"));
                    this.htmlElement.type = "text";
                }
                return TextField;
            })(Input.TextInput);
            Input.TextField = TextField;
        })(Input = View.Input || (View.Input = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="TextInput" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Input;
        (function (Input) {
            var PasswordField = (function (_super) {
                __extends(PasswordField, _super);
                function PasswordField() {
                    _super.call(this, document.createElement("input"));
                    this.htmlElement.type = "password";
                }
                return PasswordField;
            })(Input.TextInput);
            Input.PasswordField = PasswordField;
        })(Input = View.Input || (View.Input = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="Method.ts" />
var JPV;
(function (JPV) {
    var Ajax;
    (function (Ajax) {
        var AjaxService = (function () {
            function AjaxService() {
            }
            AjaxService.prototype.callServerFunction = function (controllerName, actionName, actionParameters, method, callback) {
                var successCallback = function (data, textStatus, jqXHR) {
                    var response = null;
                    try {
                        response = JSON.parse(data);
                    }
                    catch (error) {
                        throw new Error("Could not parse data \"" + data + "\". " + error.message);
                    }
                    if (response.exception != null) {
                        throw new Error(response.exception.message);
                    }
                    if (response.buffer != null && response.buffer.length != 0) {
                        throw new Error(response.buffer);
                    }
                    callback(response.data);
                };
                var errorCallback = function (jqXHR, textStatus, errorThrown) {
                    console.error(errorThrown);
                };
                var settings = {
                    url: "",
                    method: method,
                    data: {
                        c: controllerName,
                        a: actionName,
                        p: JSON.stringify(actionParameters)
                    },
                    success: successCallback,
                    error: errorCallback
                };
                return $.ajax("", settings);
            };
            return AjaxService;
        })();
        Ajax.AjaxService = AjaxService;
    })(Ajax = JPV.Ajax || (JPV.Ajax = {}));
})(JPV || (JPV = {}));
/// <reference path="Method.ts" />
/// <reference path="AjaxService.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var Factory;
        (function (Factory) {
            var ValidationElementType = (function () {
                function ValidationElementType() {
                }
                ValidationElementType.FILTER = "filter";
                ValidationElementType.VALIDATOR = "validator";
                return ValidationElementType;
            })();
            Factory.ValidationElementType = ValidationElementType;
        })(Factory = Validation.Factory || (Validation.Factory = {}));
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="Column.ts" />
/// <reference path="SortMode.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var DataTable;
        (function (DataTable_1) {
            var DataTableRow = (function () {
                function DataTableRow(tableRow, entry, columns, columnWidths) {
                    var _this = this;
                    this.clickedEvent = new JPV.Event.Event();
                    this._entry = entry;
                    var tr = this._tableRow = tableRow;
                    for (var i = 0, len = columns.length; i < len; i++) {
                        var td = document.createElement("td");
                        columns[i].customizeTD(td, entry);
                        td.style.width = columnWidths[i];
                        tr.appendChild(td);
                    }
                    tr.onclick = function (event) { return _this.clickedEvent.trigger(_this, null); };
                }
                Object.defineProperty(DataTableRow.prototype, "entry", {
                    get: function () { return this._entry; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataTableRow.prototype, "tableRow", {
                    get: function () { return this._tableRow; },
                    enumerable: true,
                    configurable: true
                });
                return DataTableRow;
            })();
            DataTable_1.DataTableRow = DataTableRow;
            var DataTableHeading = (function () {
                function DataTableHeading(tableHeading, column, width) {
                    var _this = this;
                    this.clickedEvent = new JPV.Event.Event();
                    this.sortMode = null;
                    this._column = column;
                    var th = this._tableHeading = tableHeading;
                    column.customizeTH(th);
                    th.style.width = width;
                    if (column.sortable) {
                        th.classList.add("sortable");
                        th.title = "Click to sort";
                    }
                    th.onclick = function () { return _this.clickedEvent.trigger(_this, null); };
                }
                Object.defineProperty(DataTableHeading.prototype, "column", {
                    get: function () { return this._column; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataTableHeading.prototype, "tableHeading", {
                    get: function () { return this._tableHeading; },
                    enumerable: true,
                    configurable: true
                });
                DataTableHeading.prototype.getSort = function () {
                    return this.sortMode;
                };
                DataTableHeading.prototype.setSort = function (mode) {
                    this.sortMode = mode;
                    var th = this.tableHeading;
                    // Update style
                    if (mode == null) {
                        th.classList.remove("sort-asc");
                        th.classList.remove("sort-desc");
                    }
                    else if (mode == DataTable_1.SortMode.ASC) {
                        th.classList.remove("sort-desc");
                        th.classList.add("sort-asc");
                    }
                    else if (mode == DataTable_1.SortMode.DESC) {
                        th.classList.remove("sort-asc");
                        th.classList.add("sort-desc");
                    }
                };
                return DataTableHeading;
            })();
            /**
             * A simple but powerful table class.
             */
            var DataTable = (function () {
                function DataTable(parentElement) {
                    /**
                     * Is triggered when the user clicked a table row.
                     */
                    this.rowClickedEvent = new JPV.Event.Event();
                    this.columns = [];
                    this.entries = [];
                    this.headings = [];
                    this.sortHeading = null;
                    // Create HTML elements	
                    this.containerDiv = document.createElement("div");
                    this.containerHeadDiv = document.createElement("div");
                    this.containerCaptionSpan = document.createElement("span");
                    this.containerButtonsDiv = document.createElement("div");
                    this.table = document.createElement("table");
                    this.tableHead = document.createElement("thead");
                    this.tableHeadRow = document.createElement("tr");
                    this.tableBody = document.createElement("tbody");
                    // cutomize HTML elements
                    this.containerDiv.classList.add("data-table-container");
                    this.containerHeadDiv.classList.add("data-table-container-head");
                    this.containerCaptionSpan.classList.add("data-table-caption");
                    this.containerButtonsDiv.classList.add("data-table-buttons");
                    this.table.classList.add("data-table");
                    // Append HTML elements
                    this.tableHead.appendChild(this.tableHeadRow);
                    this.table.appendChild(this.tableHead);
                    this.table.appendChild(this.tableBody);
                    this.containerHeadDiv.appendChild(this.containerCaptionSpan);
                    this.containerHeadDiv.appendChild(this.containerButtonsDiv);
                    this.containerDiv.appendChild(this.containerHeadDiv);
                    this.containerDiv.appendChild(this.table);
                    parentElement.appendChild(this.containerDiv);
                }
                /**
                 * Sets the columns.
                 */
                DataTable.prototype.setColumns = function (columns) {
                    this.columns = columns;
                    this.updateHead();
                    this.updateBody();
                };
                /**
                 * Sets the entries.
                 */
                DataTable.prototype.setEntries = function (entries) {
                    if (this.sortHeading != null) {
                        this.sortHeading.column.sort(entries, this.sortHeading.getSort());
                    }
                    this.entries = entries;
                    this.updateBody();
                };
                /**
                 * Sets the sort.
                 */
                DataTable.prototype.setSort = function (column, mode) {
                    var heading = this.getHeadingByColumn(column);
                    this.setSortHeading(heading, mode);
                };
                /**
                 * Sets the caption.
                 */
                DataTable.prototype.setCaption = function (caption) {
                    this.containerCaptionSpan.textContent = caption;
                };
                /**
                 * Adds the given buttons to the table head.
                 */
                DataTable.prototype.addButtons = function (buttons) {
                    for (var _i = 0; _i < buttons.length; _i++) {
                        var button = buttons[_i];
                        button.appendTo(this.containerButtonsDiv);
                    }
                };
                /**
                 * Is executed when the user clicked a table heading.
                 */
                DataTable.prototype.onHeadingClicked = function (heading) {
                    if (heading.column.sortable) {
                        this.setSortHeading(heading, this.getNextSortMode(heading.getSort()));
                    }
                };
                /**
                 * Is executed when the user clicked a table row.
                 */
                DataTable.prototype.onRowClicked = function (row) {
                    this.rowClickedEvent.trigger(this, row);
                };
                /**
                 * Sets the heading for which the table should be sorted.
                 */
                DataTable.prototype.setSortHeading = function (heading, mode) {
                    if (mode == null) {
                        throw new Error("Could not set sort heading. Sort mode can't be null.");
                    }
                    if (this.sortHeading != null) {
                        this.sortHeading.setSort(null);
                    }
                    this.sortHeading = heading;
                    if (heading != null) {
                        if (!heading.column.sortable) {
                            throw new Error("Could not set sort heading. The given column is not sortable.");
                        }
                        heading.setSort(mode);
                        heading.column.sort(this.entries, mode);
                    }
                    this.sortHeading = heading;
                    if (heading != null) {
                        this.updateBody();
                    }
                };
                /**
                 * Updates the table head recreating the table heading elements.
                 */
                DataTable.prototype.updateHead = function () {
                    var tr = this.tableHeadRow;
                    var columns = this.columns;
                    // Clean table headings
                    var childNode = null;
                    while ((childNode = tr.lastChild) != null) {
                        tr.removeChild(childNode);
                    }
                    this.sortHeading = null;
                    this.headings.length = 0;
                    var columnWidths = this.getColumnWidths(columns);
                    // Create new table headings
                    for (var i = 0, len = columns.length; i < len; i++) {
                        var th = document.createElement("th");
                        var heading = new DataTableHeading(th, columns[i], columnWidths[i]);
                        heading.clickedEvent.add(this, this.onHeadingClicked);
                        this.headings.push(heading);
                        tr.appendChild(th);
                    }
                };
                /**
                 * Updates the table body recreating the table row elements.
                 */
                DataTable.prototype.updateBody = function () {
                    var tbody = this.tableBody;
                    var columns = this.columns;
                    // Clean table rows
                    var childNode = null;
                    while ((childNode = tbody.lastChild) != null) {
                        tbody.removeChild(childNode);
                    }
                    var columnWidths = this.getColumnWidths(this.columns);
                    // Create new table rows
                    for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
                        var entry = _a[_i];
                        var row = new DataTableRow(document.createElement("tr"), entry, columns, columnWidths);
                        row.clickedEvent.add(this, this.onRowClicked);
                        tbody.appendChild(row.tableRow);
                    }
                };
                /**
                 * Gets the sort mode which should be used as nest sort mode
                 * when the given sort mode is currently used.
                 */
                DataTable.prototype.getNextSortMode = function (currentMode) {
                    if (currentMode == DataTable_1.SortMode.ASC)
                        return DataTable_1.SortMode.DESC;
                    return DataTable_1.SortMode.ASC;
                };
                /**
                 * Gets the heading for the given column.
                 */
                DataTable.prototype.getHeadingByColumn = function (column) {
                    for (var _i = 0, _a = this.headings; _i < _a.length; _i++) {
                        var heading = _a[_i];
                        if (heading.column == column)
                            return heading;
                    }
                    throw new Error("Could not get heading for columns. No heading found for the given column.");
                };
                /**
                 * Gets the columns widhts as strings.
                 */
                DataTable.prototype.getColumnWidths = function (columns) {
                    var sum = 0;
                    for (var _i = 0; _i < columns.length; _i++) {
                        var column = columns[_i];
                        sum += column.width;
                    }
                    var widths = [];
                    for (var _a = 0; _a < columns.length; _a++) {
                        var column = columns[_a];
                        widths.push(column.width / sum + "%");
                    }
                    return widths;
                };
                return DataTable;
            })();
            DataTable_1.DataTable = DataTable;
        })(DataTable = View.DataTable || (View.DataTable = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var Collection;
    (function (Collection) {
        var KeyValuePair = (function () {
            function KeyValuePair(key, value) {
                this._key = key;
                this._value = value;
            }
            Object.defineProperty(KeyValuePair.prototype, "key", {
                get: function () { return this._key; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(KeyValuePair.prototype, "value", {
                get: function () { return this._value; },
                enumerable: true,
                configurable: true
            });
            return KeyValuePair;
        })();
        var Dict = (function () {
            function Dict() {
                this.pairs = [];
            }
            Dict.prototype.getValue = function (key) {
                for (var _i = 0, _a = this.pairs; _i < _a.length; _i++) {
                    var pair = _a[_i];
                    if (pair.key == key)
                        return pair.value;
                }
                return undefined;
            };
            Dict.prototype.addValue = function (key, value) {
                var value = this.getValue(key);
                if (value != undefined)
                    throw new Error("Key '" + String(key) + "' is already defined.");
                this.pairs.push(new KeyValuePair(key, value));
            };
            Dict.prototype.setValue = function (key, value) {
                var pair = new KeyValuePair(key, value);
                var index = this.getValueIndex(key);
                if (index == -1) {
                    this.pairs.push(pair);
                }
                else {
                    this.pairs[index] = pair;
                }
            };
            Dict.prototype.removeValue = function (key) {
                var index = this.getValueIndex(key);
                if (index == -1)
                    return false;
                this.pairs.splice(index, 1);
                return true;
            };
            Dict.prototype.getValueIndex = function (key) {
                var pairs = this.pairs;
                for (var i = 0, len = pairs.length; i < len; i++) {
                    var pair = pairs[i];
                    if (pair.key == key)
                        return i;
                }
                return -1;
            };
            return Dict;
        })();
        Collection.Dict = Dict;
    })(Collection = JPV.Collection || (JPV.Collection = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var ValidationState = (function () {
            function ValidationState(value) {
                this.value = null;
                this.filtered = false;
                this.valid = true;
                this.interrupted = false;
                this.value = value;
            }
            return ValidationState;
        })();
        Validation.ValidationState = ValidationState;
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var Geometry;
    (function (Geometry) {
        var Range = (function () {
            function Range(value1, value2) {
                this._value1 = value1;
                this._value2 = value2;
            }
            Object.defineProperty(Range.prototype, "value1", {
                get: function () { return this._value1; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Range.prototype, "value2", {
                get: function () { return this._value2; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Range.prototype, "min", {
                get: function () { return Math.min(this._value1, this._value2); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Range.prototype, "max", {
                get: function () { return Math.max(this._value1, this._value2); },
                enumerable: true,
                configurable: true
            });
            Range.prototype.equals = function (range) {
                if (range == null)
                    return false;
                return range._value1 == this._value1 && range._value2 == this._value2;
            };
            Range.prototype.toString = function () {
                return "Range(" + this._value1 + ", " + this._value2 + ")";
            };
            return Range;
        })();
        Geometry.Range = Range;
    })(Geometry = JPV.Geometry || (JPV.Geometry = {}));
})(JPV || (JPV = {}));
/// <reference path="SynchroneFilterFactory.ts" />
/// <reference path="SynchroneValidatorFactory.ts" />
/// <reference path="ValidationFactory.ts" />
var JPV;
(function (JPV) {
    var Culture;
    (function (Culture) {
        var BasicNumberFormatter = (function () {
            function BasicNumberFormatter() {
            }
            BasicNumberFormatter.prototype.formatNumber = function (value, decimalPlaces) {
                if (decimalPlaces === void 0) { decimalPlaces = null; }
                return value.toFixed(decimalPlaces);
            };
            return BasicNumberFormatter;
        })();
        Culture.BasicNumberFormatter = BasicNumberFormatter;
    })(Culture = JPV.Culture || (JPV.Culture = {}));
})(JPV || (JPV = {}));
/// <reference path="ValidityItemBase.ts" />
/// <reference path="SynchroneFilter.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var SynchroneFilterItem = (function (_super) {
            __extends(SynchroneFilterItem, _super);
            function SynchroneFilterItem(filter) {
                _super.call(this, filter.text, true);
                this.filter = filter;
            }
            SynchroneFilterItem.prototype.update = function (validationState, callback) {
                if (validationState.interrupted) {
                    this.setState(Validation.ValidityItemState.NOT_CHECKED);
                    callback(validationState);
                    return;
                }
                var filteredValue = this.filter.filter(validationState.value);
                var filtered = filteredValue != validationState.value;
                var state;
                if (filtered) {
                    state = Validation.ValidityItemState.WILL_FILTER;
                    validationState.value = filteredValue;
                    validationState.filtered = filtered;
                }
                else {
                    state = Validation.ValidityItemState.WILL_NOT_FILTER;
                }
                this.setState(state);
                callback(validationState);
            };
            SynchroneFilterItem.prototype.cancelUpdate = function () {
                // Do nothing because this filter is not asynchrone	
            };
            SynchroneFilterItem.prototype.reset = function () {
                this.setState(Validation.ValidityItemState.NOT_CHECKED);
            };
            return SynchroneFilterItem;
        })(Validation.ValidityItemBase);
        Validation.SynchroneFilterItem = SynchroneFilterItem;
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="ValidityItemBase.ts" />
/// <reference path="AsynchroneValidator.ts" />
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var AsynchroneValidatorItem = (function (_super) {
            __extends(AsynchroneValidatorItem, _super);
            function AsynchroneValidatorItem(validator) {
                _super.call(this, validator.text, false);
                this.interruptIfInvalid = false;
                this.validator = validator;
            }
            AsynchroneValidatorItem.prototype.update = function (validationState, callback) {
                var _this = this;
                this.cancelUpdate();
                if (validationState.interrupted) {
                    this.setState(Validation.ValidityItemState.NOT_CHECKED);
                    callback(validationState);
                    return;
                }
                this.setState(Validation.ValidityItemState.IN_PROGRESS);
                this.validator.validate(validationState.value, function (valid) {
                    var state;
                    if (valid) {
                        state = Validation.ValidityItemState.VALID;
                    }
                    else {
                        state = Validation.ValidityItemState.IVALID;
                        validationState.valid = false;
                        if (_this.interruptIfInvalid)
                            validationState.interrupted = true;
                    }
                    _this.setState(state);
                    callback(validationState);
                });
            };
            AsynchroneValidatorItem.prototype.cancelUpdate = function () {
                this.validator.cancelValidation();
            };
            AsynchroneValidatorItem.prototype.reset = function () {
                // Cancel update, just for safety
                this.cancelUpdate();
                this.setState(Validation.ValidityItemState.NOT_CHECKED);
            };
            return AsynchroneValidatorItem;
        })(Validation.ValidityItemBase);
        Validation.AsynchroneValidatorItem = AsynchroneValidatorItem;
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var Color;
    (function (Color_1) {
        var Color = (function () {
            function Color() {
            }
            Color.createFromHexString = function (hexString) {
                var color = new Color();
                color.hexString = hexString;
                return color;
            };
            Color.prototype.toHexString = function () {
                return this.hexString;
            };
            Color.prototype.equals = function (color) {
                return this.hexString == color.hexString;
            };
            return Color;
        })();
        Color_1.Color = Color;
    })(Color = JPV.Color || (JPV.Color = {}));
})(JPV || (JPV = {}));
var JPV;
(function (JPV) {
    var Validation;
    (function (Validation) {
        var AsynchroneValidatorBase = (function () {
            function AsynchroneValidatorBase(text) {
                this._text = text;
            }
            Object.defineProperty(AsynchroneValidatorBase.prototype, "text", {
                get: function () { return this._text; },
                enumerable: true,
                configurable: true
            });
            AsynchroneValidatorBase.prototype.isAsynchroneValidator = function () {
                return true;
            };
            AsynchroneValidatorBase.prototype.isValidationElement = function () {
                return true;
            };
            return AsynchroneValidatorBase;
        })();
        Validation.AsynchroneValidatorBase = AsynchroneValidatorBase;
    })(Validation = JPV.Validation || (JPV.Validation = {}));
})(JPV || (JPV = {}));
/// <reference path="../View.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Text;
        (function (Text_1) {
            var Text = (function (_super) {
                __extends(Text, _super);
                function Text(content, css) {
                    if (css === void 0) { css = null; }
                    _super.call(this, document.createElement("span"));
                    this.htmlElement.textContent = content;
                    if (css != null) {
                        this.htmlElement.classList.add(css);
                    }
                }
                Text.prototype.setContent = function (content) {
                    this.htmlElement.textContent = content;
                };
                Text.prototype.setDisplayed = function (displayed) {
                    this.htmlElement.style.display = displayed ? "" : "none";
                };
                return Text;
            })(View.View);
            Text_1.Text = Text;
        })(Text = View.Text || (View.Text = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="SortMode.ts" />
/// <reference path="Button.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Button;
        (function (Button) {
            var TextButton = (function (_super) {
                __extends(TextButton, _super);
                function TextButton(title, cssClass) {
                    if (cssClass === void 0) { cssClass = null; }
                    _super.call(this);
                    // Create HTML elements
                    this.span = document.createElement("span");
                    // Customize HTML elements
                    this.classes.add("text-button");
                    if (cssClass != null) {
                        this.classes.add(cssClass);
                    }
                    this.span.textContent = title;
                    // Append HTML elements
                    this.append(this.span);
                }
                return TextButton;
            })(Button.Button);
            Button.TextButton = TextButton;
        })(Button = View.Button || (View.Button = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="SynchroneFilter.ts" />
/// <reference path="SynchroneFilterBase.ts" />
/// <reference path="SynchroneValidator.ts" />
/// <reference path="SynchroneValidatorBase.ts" />
/// <reference path="AsynchroneValidator.ts" />
/// <reference path="AsynchroneValidatorBase.ts" />
/// <reference path="filter/_references.ts" />
/// <reference path="validator/_references.ts" />
/// <reference path="factory/_references.ts" />
/// <reference path="ValidityItemState.ts" />
/// <reference path="ValidationState.ts" />
/// <reference path="ValidityItem.ts" />
/// <reference path="ValidityItemBase.ts" />
/// <reference path="SynchroneFilterItem.ts" />
/// <reference path="SynchroneValidatorItem.ts" />
/// <reference path="AsynchroneValidatorItem.ts" />
/// <reference path="ValidationProgress.ts" />
/// <reference path="ValidationChain.ts" />
/// <reference path="Column.ts" />
/// <reference path="SortMode.ts" />
/// <reference path="../TextAlign.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var DataTable;
        (function (DataTable) {
            var TextColumn = (function () {
                function TextColumn(heading, width, getValue, sortable) {
                    if (sortable === void 0) { sortable = true; }
                    this.heading = heading;
                    this._width = width;
                    this.getValue = getValue;
                    this._sortable = sortable;
                }
                Object.defineProperty(TextColumn.prototype, "sortable", {
                    get: function () { return this._sortable; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextColumn.prototype, "width", {
                    get: function () { return this._width; },
                    enumerable: true,
                    configurable: true
                });
                TextColumn.prototype.customizeTH = function (th) {
                    th.textContent = this.heading;
                    th.appendChild(document.createElement("span"));
                };
                TextColumn.prototype.customizeTD = function (td, entry) {
                    td.textContent = this.getValue(entry);
                    td.style.textAlign = View.TextAlign.LEFT;
                };
                TextColumn.prototype.sort = function (entries, mode) {
                    var _this = this;
                    entries.sort(function (a, b) { return mode.sign * (_this.getValue(a) > _this.getValue(b) ? 1 : -1); });
                };
                return TextColumn;
            })();
            DataTable.TextColumn = TextColumn;
        })(DataTable = View.DataTable || (View.DataTable = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="event/_references.ts" />
/// <reference path="ajax/_references.ts" />
/// <reference path="geometry/_references.ts" />
/// <reference path="mathematics/_references.ts" />
/// <reference path="../View.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Structure;
        (function (Structure) {
            var FieldSet = (function (_super) {
                __extends(FieldSet, _super);
                function FieldSet(caption, cssClass) {
                    if (caption === void 0) { caption = null; }
                    if (cssClass === void 0) { cssClass = null; }
                    _super.call(this, document.createElement("div"));
                    this.classes.add("field-set");
                    // Create caption
                    if (caption != null) {
                        var captionSpan = document.createElement("div");
                        captionSpan.classList.add("field-set-caption");
                        captionSpan.textContent = caption;
                        this.append(captionSpan);
                    }
                    // Create table
                    var table = document.createElement("table");
                    var tableBody = this.tableBody = document.createElement("tbody");
                    table.appendChild(tableBody);
                    this.append(table);
                    // Add css
                    if (cssClass != null) {
                        this.classes.add(cssClass);
                    }
                }
                FieldSet.prototype.addField = function (name, element) {
                    // Create HTML elements
                    var tr = document.createElement("tr");
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    // Customize HTML elements
                    td1.textContent = name;
                    element.appendTo(td2);
                    // Append HTML elements
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    this.tableBody.appendChild(tr);
                };
                FieldSet.prototype.clear = function () {
                    _super.prototype.clear.call(this);
                };
                return FieldSet;
            })(View.View);
            Structure.FieldSet = FieldSet;
        })(Structure = View.Structure || (View.Structure = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="../View" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Input;
        (function (Input) {
            var Slider = (function (_super) {
                __extends(Slider, _super);
                function Slider() {
                    var _this = this;
                    _super.call(this, document.createElement("input"));
                    this.valueChangedEvent = new JPV.Event.Event();
                    this.htmlElement.type = "range";
                    this.htmlElement.onchange = function () {
                        _this.valueChangedEvent.trigger(_this, true);
                    };
                }
                Object.defineProperty(Slider.prototype, "htmlElement", {
                    get: function () { return this._htmlElement; },
                    enumerable: true,
                    configurable: true
                });
                Slider.prototype.setRange = function (range) {
                    this.htmlElement.min = range.min.toString();
                    this.htmlElement.max = range.max.toString();
                    this.valueChangedEvent.trigger(this, false);
                };
                Slider.prototype.setStep = function (step) {
                    this.htmlElement.step = step.toString();
                    this.valueChangedEvent.trigger(this, false);
                };
                Slider.prototype.getValue = function () {
                    return parseFloat(this.htmlElement.value);
                };
                Slider.prototype.setValue = function (value) {
                    var prevValue = parseFloat(this.htmlElement.value);
                    if (value == prevValue)
                        return;
                    this.htmlElement.value = value.toString();
                    this.valueChangedEvent.trigger(this, false);
                };
                return Slider;
            })(View.View);
            Input.Slider = Slider;
        })(Input = View.Input || (View.Input = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="../View.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Structure;
        (function (Structure) {
            var DescriptionList = (function (_super) {
                __extends(DescriptionList, _super);
                function DescriptionList(cssClass) {
                    if (cssClass === void 0) { cssClass = null; }
                    _super.call(this, document.createElement("dl"));
                    if (cssClass != null) {
                        this.classes.add(cssClass);
                    }
                }
                DescriptionList.prototype.addRow = function (name, value) {
                    var dt = document.createElement("dt");
                    var dd = document.createElement("dd");
                    dt.textContent = name;
                    value.appendTo(dd);
                    this.append(dt);
                    this.append(dd);
                };
                DescriptionList.prototype.clear = function () {
                    _super.prototype.clear.call(this);
                };
                return DescriptionList;
            })(View.View);
            Structure.DescriptionList = DescriptionList;
        })(Structure = View.Structure || (View.Structure = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="Column.ts" />
/// <reference path="SortMode.ts" />
/// <reference path="../TextAlign.ts" />
/// <reference path="../../culture/BasicNumberFormatter.ts" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var DataTable;
        (function (DataTable) {
            var NumberColumn = (function () {
                function NumberColumn(heading, width, getValue, numberFormatter, decimalPlaces, sortable) {
                    if (numberFormatter === void 0) { numberFormatter = null; }
                    if (decimalPlaces === void 0) { decimalPlaces = 2; }
                    if (sortable === void 0) { sortable = true; }
                    if (numberFormatter == null)
                        numberFormatter = new JPV.Culture.BasicNumberFormatter();
                    this.heading = heading;
                    this._width = width;
                    this.getValue = getValue;
                    this.numberFormatter = numberFormatter;
                    this.decimalPlaces = decimalPlaces;
                    this._sortable = sortable;
                }
                Object.defineProperty(NumberColumn.prototype, "sortable", {
                    get: function () { return this._sortable; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NumberColumn.prototype, "width", {
                    get: function () { return this._width; },
                    enumerable: true,
                    configurable: true
                });
                NumberColumn.prototype.customizeTH = function (th) {
                    th.textContent = this.heading;
                    th.appendChild(document.createElement("span"));
                };
                NumberColumn.prototype.customizeTD = function (td, entry) {
                    td.textContent = this.numberFormatter.formatNumber(this.getValue(entry), this.decimalPlaces);
                    td.style.textAlign = View.TextAlign.RIGHT;
                };
                NumberColumn.prototype.sort = function (entries, mode) {
                    var _this = this;
                    entries.sort(function (a, b) { return mode.sign * (_this.getValue(a) - _this.getValue(b)); });
                };
                return NumberColumn;
            })();
            DataTable.NumberColumn = NumberColumn;
        })(DataTable = View.DataTable || (View.DataTable = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
/// <reference path="Map.ts" />
/// <reference path="Dict.ts" />
/// <reference path="../View" />
/// <reference path="../../color/Color" />
var JPV;
(function (JPV) {
    var View;
    (function (View) {
        var Input;
        (function (Input) {
            var ColorField = (function (_super) {
                __extends(ColorField, _super);
                function ColorField() {
                    var _this = this;
                    _super.call(this, document.createElement("input"));
                    this.valueChangedEvent = new JPV.Event.Event();
                    this.htmlElement.type = "color";
                    this.htmlElement.onchange = function () {
                        _this.valueChangedEvent.trigger(_this, true);
                    };
                }
                Object.defineProperty(ColorField.prototype, "htmlElement", {
                    get: function () { return this._htmlElement; },
                    enumerable: true,
                    configurable: true
                });
                ColorField.prototype.getValue = function () {
                    return JPV.Color.Color.createFromHexString(this.htmlElement.value);
                };
                ColorField.prototype.setValue = function (value) {
                    var prevValue = JPV.Color.Color.createFromHexString(this.htmlElement.value);
                    if (value.equals(prevValue))
                        return;
                    this.htmlElement.value = value.toHexString();
                    this.valueChangedEvent.trigger(this, false);
                };
                return ColorField;
            })(View.View);
            Input.ColorField = ColorField;
        })(Input = View.Input || (View.Input = {}));
    })(View = JPV.View || (JPV.View = {}));
})(JPV || (JPV = {}));
