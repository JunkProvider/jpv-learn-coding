declare module JPV.Validation {
    class SynchroneValidatorBase {
        private _stopIfInvalid;
        private _text;
        stopIfInvalid: boolean;
        text: string;
        constructor(stopIfInvalid: boolean, text: string);
        isSynchroneValidator(): boolean;
        isValidationElement(): boolean;
    }
}
declare module JPV.Validation.Validator {
    class NumberInteger extends SynchroneValidatorBase implements SynchroneValidator<number> {
        isValid(value: number): boolean;
    }
}
declare module JPV.Validation.Validator {
    class NumberIntegerFactory implements Factory.SynchroneValidatorFactory {
        produce(json: NumberIntegerJson): NumberInteger;
    }
}
declare module JPV.View {
    class ClassList {
        private classList;
        constructor(classList: DOMTokenList);
        add(cssClass: string): void;
        remove(cssClass: string): void;
        toggle(cssClass: string): void;
        swich(cssClass: string, enabled: boolean): void;
    }
}
declare module JPV.View {
    class View implements IView {
        private _classes;
        private parent;
        private children;
        protected _htmlElement: HTMLElement;
        htmlElement: HTMLElement;
        classes: ClassList;
        constructor(htmlElement: HTMLElement);
        dispose(): void;
        appendTo(parent: View | HTMLElement): void;
        remove(): void;
        addClass(cssClass: string): void;
        protected append(child: View | HTMLElement): void;
        protected clear(): void;
        private appendView(child);
        private removeView(child);
    }
}
declare module JPV.View.Input {
    abstract class TextInput extends View implements IInput<string> {
        valueChangedEvent: Event.Event<boolean>;
        private maxLength;
        private allowedCharacters;
        htmlElement: HTMLInputElement;
        constructor(htmlElement: HTMLInputElement);
        setMaxLength(maxLength: number): void;
        setAllowedCharacters(allowedCharacters: string): void;
        getValue(): string;
        setValue(value: string): void;
        protected onUserInput(): void;
        protected validateCurrentValue(): void;
        protected validateValue(value: string): string;
    }
}
declare module JPV.View.Input {
    class TextArea extends TextInput {
        constructor();
    }
}
declare module JPV.View {
    class TextAlign {
        static LEFT: string;
        static RIGHT: string;
        static CENTER: string;
    }
}
declare module JPV.View.DataTable {
    class SortMode {
        static ASC: SortMode;
        static DESC: SortMode;
        private _sign;
        sign: number;
        constructor(sign: number);
    }
}
declare module JPV.Validation.Validator {
    class StringLength extends SynchroneValidatorBase implements SynchroneValidator<string> {
        private _min;
        private _max;
        min: number;
        max: number;
        constructor(min?: number, max?: number, stopIfInvalid?: boolean, text?: string);
        isValid(value: string): boolean;
    }
}
declare module JPV.Validation.Validator {
    interface StringLengthJson extends Factory.SynchroneValidatorJson {
        min: number;
        max: number;
    }
}
declare module JPV.Validation.Validator {
    class StringLengthFactory implements Factory.SynchroneValidatorFactory {
        produce(json: StringLengthJson): StringLength;
    }
}
declare module JPV.Validation.Validator {
    class StringPattern extends SynchroneValidatorBase implements SynchroneValidator<string> {
        private _pattern;
        pattern: string;
        constructor(pattern: string, stopIfInvalid?: boolean, text?: string);
        isValid(value: string): boolean;
    }
}
declare module JPV.Validation.Validator {
    interface StringPatternJson extends Factory.SynchroneValidatorJson {
        pattern: string;
    }
}
declare module JPV.Validation.Validator {
    class StringPatternFactory implements Factory.SynchroneValidatorFactory {
        produce(json: StringPatternJson): StringPattern;
    }
}
declare module JPV.Validation.Validator {
    class EMailAddressLength extends StringLength {
        static MAX_LENGTH: number;
        constructor(stopIfInvalid?: boolean);
    }
}
declare module JPV.Validation.Validator {
    class EMailAddressPattern extends StringPattern {
        static PATTERN: string;
        constructor(stopIfInvalid?: boolean);
    }
}
declare module JPV.Validation.Validator {
    interface NumberIntegerJson extends Factory.SynchroneValidatorJson {
    }
}
declare module JPV.Validation.Validator {
    class NumberRange extends SynchroneValidatorBase implements SynchroneValidator<number> {
        private _min;
        private _minInclusive;
        private _max;
        private _maxInclusive;
        min: number;
        minInclusive: boolean;
        max: number;
        maxInclusive: boolean;
        constructor(min?: number, minInclusive?: boolean, max?: number, maxInclusive?: boolean, stopIfInvalid?: boolean, text?: string);
        isValid(value: number): boolean;
    }
}
declare module JPV.Validation.Validator {
    interface NumberRangeJson extends Factory.SynchroneValidatorJson {
        min: number;
        minInclusive: boolean;
        max: number;
        maxInclusive: boolean;
    }
}
declare module JPV.Validation.Validator {
    class NumberRangeFactory implements Factory.SynchroneValidatorFactory {
        produce(json: NumberRangeJson): NumberRange;
    }
}
declare module JPV.View.Window {
    import Button = JPV.View.Button.Button;
    class WindowHead extends View {
        private caption;
        private buttonList;
        constructor(caption: string, buttons?: Button[]);
        /**
         * Adds a button to the button list.
         */
        addButton(button: Button): void;
    }
}
declare module JPV.Validation {
    interface SynchroneFilter<T> extends ValidationElement {
        text: string;
        filter(value: T): T;
        isSynchroneFilter(): boolean;
    }
}
declare module JPV.Event {
    class Delegate<T extends Function> {
        private context;
        private handler;
        constructor(context: Object, handler: T);
        call(...parameters: any[]): void;
    }
}
declare module JPV.Geometry {
    class Point {
        private _x;
        private _y;
        x: number;
        y: number;
        constructor(x: number, y: number);
        add(point: Point): Point;
        move(x: number, y: number): Point;
        equals(point: Point): boolean;
        toString(): string;
    }
}
declare module JPV.Geometry {
    class Size {
        private _width;
        private _height;
        width: number;
        height: number;
        constructor(width: number, height: number);
        toString(): string;
    }
}
declare module JPV.Geometry {
    class Rectangle {
        private _x;
        private _y;
        private _width;
        private _height;
        x: number;
        y: number;
        width: number;
        height: number;
        position: Point;
        constructor(x: number, y: number, width: number, height: number);
        move(x: number, y: number): Rectangle;
        toString(): string;
    }
}
declare module JPV.View.Dialog {
    class DialogBackground extends View {
        constructor();
    }
}
declare module JPV.View.Dialog {
    class DialogManager extends View {
        private background;
        private dialogs;
        constructor();
        openDialog(dialog: Dialog): void;
        closeDialog(dialog: Dialog): void;
        private onDialogCloseButtonClicked(dialog);
    }
}
declare module JPV.View.Structure {
    class Container extends View {
        htmlElement: HTMLElement;
        constructor(cssClass?: string);
        append(child: View | HTMLElement): void;
        clear(): void;
    }
}
declare module JPV.View.Button {
    class Button extends View {
        clickedEvent: Event.Event<void>;
        private displayed;
        private enabled;
        private pressed;
        constructor();
        isDisplayed(): boolean;
        setDisplayed(displayed: boolean): void;
        isEnabled(): boolean;
        setEnabled(enabled: boolean): void;
        isPressed(): boolean;
        setPressed(pressed: boolean): void;
        protected onClicked(): void;
    }
}
declare module JPV.View.Button {
    class ImageButton extends Button {
        private image;
        constructor(src: string, title?: string, cssClass?: string);
    }
}
declare module JPV.View.Dialog {
    class DialogButtonList extends View {
        private leftContainer;
        private rightContainer;
        constructor();
        addButtonLeft(button: Button.Button): void;
        addButtonRight(button: Button.Button): void;
    }
}
declare module JPV.View.Dialog {
    class Dialog extends View {
        closeButtonClickedEvent: Event.Event<void>;
        protected head: Window.WindowHead;
        protected content: Structure.Container;
        protected buttonList: DialogButtonList;
        protected overlay: View;
        protected closeButton: Button.Button;
        private enabled;
        constructor(caption: string, closeButton?: boolean);
        setSize(width: string, height: string): void;
        setPosition(x: string, y: string): void;
        setEnabled(enabled: boolean): void;
        setCloseButtonDisplayed(displayed: boolean): void;
        protected onCloseButtonClicked(): void;
    }
}
declare module JPV.Validation.Factory {
    interface SynchroneValidatorJson extends ValidationElementJson {
        stopIfInvalid: boolean;
    }
}
declare module JPV.View.Input {
    interface IInput<Value> extends IView {
        valueChangedEvent: Event.Event<boolean>;
        getValue(): Value;
        setValue(value: Value): void;
    }
}
declare module JPV.Collection {
    class Map<Value> {
        static createFromArray<Value>(values: Value[], getKey: (value: Value) => string): Map<Value>;
        private values;
        constructor(values?: IndexedObject<Value>);
        contains(key: any): boolean;
        get(key: any): Value;
        add(key: any, value: Value): void;
        set(key: any, value: Value): void;
        remove(key: any): void;
        merge(map: Map<Value>): void;
        forEach(callback: (value: Value, key: string) => void): void;
        toArray(): Value[];
    }
}
declare module JPV.Mathematics {
    interface CompareFunction {
        (a: number, b: number): boolean;
    }
    class NumberComparison {
        private static all;
        private static allById;
        static getAll(): NumberComparison[];
        static getById(id: number): NumberComparison;
        static EQUAL: NumberComparison;
        static NOT_EQUAL: NumberComparison;
        static GEATER: NumberComparison;
        static GEATER_OR_EQUAL: NumberComparison;
        static LESS: NumberComparison;
        static LESS_OR_EQUAL: NumberComparison;
        private _id;
        private compareFunction;
        id: number;
        constructor(id: number, compareFunction: CompareFunction);
        compare(a: number, b: number): boolean;
    }
}
declare module JPV.Validation.Factory {
    interface SynchroneFilterJson extends ValidationElementJson {
    }
}
declare module JPV.Validation.Factory {
    interface ValidationElementJson {
        type: string;
        class: string;
        infoText: string;
    }
}
declare module JPV.View {
    interface IView {
        htmlElement: HTMLElement;
        dispose(): void;
    }
}
declare module JPV.Ajax {
    class Method {
        static GET: string;
        static POST: string;
    }
}
declare module JPV.Validation.Factory {
    interface SynchroneValidatorFactory {
        produce(json: any): SynchroneValidator<any>;
    }
}
declare module JPV.Collection {
    interface IndexedObject<T> {
        [index: string]: T;
    }
}
declare module JPV.Validation {
    class SynchroneFilterBase {
        private _text;
        text: string;
        constructor(text: string);
        isSynchroneFilter(): boolean;
        isValidationElement(): boolean;
    }
}
declare module JPV.Validation.Filter {
    class StringTrim extends SynchroneFilterBase implements SynchroneFilter<string> {
        filter(value: string): string;
    }
}
declare module JPV.Validation.Filter {
    interface StringTrimJson extends Factory.SynchroneFilterJson {
    }
}
declare module JPV.Validation.Filter {
    class StringTrimFactory implements Factory.SynchroneFilterFactory {
        produce(json: StringTrimJson): StringTrim;
    }
}
declare module JPV.Culture {
    interface NumberFormatter {
        formatNumber(value: number, decimalPlaces: number): string;
    }
}
declare module JPV.Validation.Factory {
    class ValidationFactory {
        private synchroneValidatorFactories;
        private synchroneFilterFactories;
        constructor(synchroneFilterFactories?: Collection.Map<SynchroneFilterFactory>, synchroneValidatorFactories?: Collection.Map<SynchroneValidatorFactory>);
        produceValidationElements(elementsJson: ValidationElementJson[]): ValidationElement[];
        produceValidationElement<T>(elementJson: ValidationElementJson): ValidationElement;
        produceSynchroneFilters<T>(filtersJson: SynchroneFilterJson[]): SynchroneFilter<T>[];
        produceSynchroneFilter<T>(filterJson: SynchroneFilterJson): SynchroneFilter<T>;
        produceSynchroneValidators<T>(validatorsJson: SynchroneValidatorJson[]): SynchroneValidator<T>[];
        produceSynchroneValidator<T>(validatorJson: SynchroneValidatorJson): SynchroneValidator<T>;
    }
}
declare module JPV.Validation {
    class ValidationProgress<Value> {
        private items;
        private callback;
        private running;
        private state;
        private currentItemIndex;
        constructor(items: ValidityItem<Value>[], callback: (state: ValidationState<Value>) => void);
        start(state: ValidationState<Value>): void;
        stop(): void;
        private updateNextItem();
    }
}
declare module JPV.Ajax {
    class Request<ResponseDataType> {
        private controller;
        private action;
        private parameters;
        private method;
        private callback;
        private jqRequest;
        private wasSend;
        constructor(controller: string, action: string, parameters: any[], method: string, callback: (data: ResponseDataType) => void);
        send(): Request<ResponseDataType>;
        abort(): Request<ResponseDataType>;
    }
}
declare module JPV.Timing {
    interface TimerCallback {
        (): void;
    }
    class Timer {
        private timeout;
        private periodic;
        private callback;
        private intervalId;
        constructor(timeout: number, periodic: boolean, callback: TimerCallback);
        start(): void;
        stop(): void;
        private elapsed();
    }
}
declare module JPV.Culture {
}
declare module JPV.Event {
    class EventListener<T> {
        context: Object;
        handler: EventHandler<T>;
        constructor(context: Object, handler: EventHandler<T>);
    }
    interface EventHandler<T> {
        (sender: Object, data: T): void;
    }
    class Event<T> {
        private listeners;
        add(context: Object, handler: EventHandler<T>): void;
        trigger(sender: Object, data: T): void;
        remove(context: Object, handler: EventHandler<T>): boolean;
    }
}
declare module JPV.View.Input {
    class Checkbox extends View implements IInput<boolean> {
        valueChangedEvent: Event.Event<boolean>;
        htmlElement: HTMLInputElement;
        constructor();
        getValue(): boolean;
        setValue(value: boolean): void;
    }
}
declare module JPV.View.DataTable {
    interface Column<EntryType> {
        width: number;
        sortable: boolean;
        customizeTH(th: HTMLTableHeaderCellElement): void;
        customizeTD(td: HTMLTableCellElement, entry: EntryType): void;
        sort?(entries: EntryType[], mode: SortMode): void;
    }
}
declare module JPV.Exception {
    class AbstractMethodCallError {
        message: string;
    }
}
declare module JPV.Validation {
    class ValidityItemState {
        static IN_PROGRESS: ValidityItemState;
        static NOT_CHECKED: ValidityItemState;
        static VALID: ValidityItemState;
        static IVALID: ValidityItemState;
        static WILL_FILTER: ValidityItemState;
        static WILL_NOT_FILTER: ValidityItemState;
        private _valid;
        private _css;
        private _iconSrc;
        valid: boolean;
        css: string;
        iconSrc: string;
        constructor(valid: boolean, css: string);
    }
}
declare module JPV.Validation {
    class ValidityItemBase<T> {
        stateChangedEvent: Event.Event<void>;
        private _text;
        private _filtersValue;
        private _state;
        text: string;
        filtersValue: boolean;
        state: ValidityItemState;
        constructor(text: string, filtersValue: boolean);
        protected setState(state: ValidityItemState): void;
    }
}
declare module JPV.Culture {
    interface Culture extends NumberFormatter {
        translate(label: string): string;
        getNumberCharacters(float: boolean, negative: boolean): string;
        parseNumber(value: string): number;
    }
}
declare module JPV.Validation {
    interface SynchroneValidator<T> extends ValidationElement {
        stopIfInvalid: boolean;
        text: string;
        isValid(value: T): boolean;
        isSynchroneValidator(): boolean;
    }
}
declare module JPV.Validation {
    interface ValidityItem<T> {
        stateChangedEvent: Event.Event<void>;
        text: string;
        filtersValue: boolean;
        state: ValidityItemState;
        update(state: ValidationState<T>, callback: (state: ValidationState<T>) => void): void;
        cancelUpdate(): void;
        reset(): void;
    }
}
declare module JPV.Validation {
    class SynchroneValidatorItem<T> extends ValidityItemBase<T> implements ValidityItem<T> {
        private validator;
        constructor(validator: SynchroneValidator<T>);
        update(validationState: ValidationState<T>, callback: (state: ValidationState<T>) => void): void;
        cancelUpdate(): void;
        reset(): void;
    }
}
declare module JPV.Validation {
    class ValidationChain<T> {
        changedEvent: Event.Event<void>;
        private _items;
        items: ValidityItem<T>[];
        constructor(items?: ValidityItem<T>[]);
        getFilteredItems(filter: (item: ValidityItem<T>) => boolean): ValidityItem<T>[];
        addSynchroneFilter(filter: SynchroneFilter<T>): void;
        addSynchroneValidator(validator: SynchroneValidator<T>): void;
        addItem(item: ValidityItem<T>): void;
    }
}
declare module JPV.View.DataTable {
    interface GetStringValueFunction<T> {
        (entry: T): string;
    }
    interface SortFunction<T> {
        (a: T, b: T): number;
    }
    class StringColumn<EntryType> implements Column<EntryType> {
        private heading;
        private textAlign;
        private getValue;
        private sortFunction;
        private _width;
        sortable: boolean;
        width: number;
        constructor(heading: string, textAlign: string, width: number, getValue: GetStringValueFunction<EntryType>, sort?: SortFunction<EntryType>);
        customizeTH(th: HTMLTableHeaderCellElement): void;
        customizeTD(td: HTMLTableCellElement, entry: EntryType): void;
        sort(entries: EntryType[], mode: SortMode): void;
    }
}
declare module JPV.View.Input {
    class TextField extends TextInput {
        constructor();
    }
}
declare module JPV.View.Input {
    class PasswordField extends TextInput {
        constructor();
    }
}
declare module JPV.Ajax {
    class AjaxService {
        callServerFunction<ReturnType>(controllerName: string, actionName: string, actionParameters: any[], method: string, callback: (returnValue: ReturnType) => void): JQueryXHR;
    }
}
declare module JPV.Validation.Factory {
    class ValidationElementType {
        static FILTER: string;
        static VALIDATOR: string;
    }
}
declare module JPV.View.DataTable {
    class DataTableRow<T> implements Row<T> {
        clickedEvent: Event.Event<void>;
        private _entry;
        private _tableRow;
        entry: T;
        tableRow: HTMLTableRowElement;
        constructor(tableRow: HTMLTableRowElement, entry: T, columns: Column<T>[], columnWidths: string[]);
    }
    /**
     * A simple but powerful table class.
     */
    class DataTable<EntryType> {
        /**
         * Is triggered when the user clicked a table row.
         */
        rowClickedEvent: Event.Event<Row<EntryType>>;
        private containerDiv;
        private containerHeadDiv;
        private containerCaptionSpan;
        private containerButtonsDiv;
        private table;
        private tableHead;
        private tableHeadRow;
        private tableBody;
        private columns;
        private entries;
        private headings;
        private sortHeading;
        constructor(parentElement: HTMLElement);
        /**
         * Sets the columns.
         */
        setColumns(columns: Column<EntryType>[]): void;
        /**
         * Sets the entries.
         */
        setEntries(entries: EntryType[]): void;
        /**
         * Sets the sort.
         */
        setSort(column: Column<EntryType>, mode: SortMode): void;
        /**
         * Sets the caption.
         */
        setCaption(caption: string): void;
        /**
         * Adds the given buttons to the table head.
         */
        addButtons(buttons: Button.Button[]): void;
        /**
         * Is executed when the user clicked a table heading.
         */
        private onHeadingClicked(heading);
        /**
         * Is executed when the user clicked a table row.
         */
        private onRowClicked(row);
        /**
         * Sets the heading for which the table should be sorted.
         */
        private setSortHeading(heading, mode);
        /**
         * Updates the table head recreating the table heading elements.
         */
        private updateHead();
        /**
         * Updates the table body recreating the table row elements.
         */
        private updateBody();
        /**
         * Gets the sort mode which should be used as nest sort mode
         * when the given sort mode is currently used.
         */
        private getNextSortMode(currentMode);
        /**
         * Gets the heading for the given column.
         */
        private getHeadingByColumn(column);
        /**
         * Gets the columns widhts as strings.
         */
        private getColumnWidths(columns);
    }
}
declare module JPV.Collection {
    class Dict<K, V> {
        private pairs;
        getValue(key: K): V;
        addValue(key: K, value: V): void;
        setValue(key: K, value: V): void;
        removeValue(key: K): boolean;
        private getValueIndex(key);
    }
}
declare module JPV.Validation {
    class ValidationState<T> {
        value: T;
        filtered: boolean;
        valid: boolean;
        interrupted: boolean;
        constructor(value: T);
    }
}
declare module JPV.Geometry {
    class Range {
        private _value1;
        private _value2;
        value1: number;
        value2: number;
        min: number;
        max: number;
        constructor(value1: number, value2: number);
        equals(range: Range): boolean;
        toString(): string;
    }
}
declare module JPV.Validation {
    interface ValidationElement {
        isValidationElement(): boolean;
    }
}
declare module JPV.Validation.Factory {
    interface SynchroneFilterFactory {
        produce(json: any): SynchroneFilter<any>;
    }
}
declare module JPV.Culture {
    class BasicNumberFormatter {
        formatNumber(value: number, decimalPlaces?: number): string;
    }
}
declare module JPV.Validation {
    interface AsynchroneValidator<T> extends ValidationElement {
        text: string;
        validate(value: T, callback: (valid: boolean) => void): void;
        cancelValidation(): void;
        isAsynchroneValidator(): boolean;
    }
}
declare module JPV.Validation {
    class SynchroneFilterItem<T> extends ValidityItemBase<T> implements ValidityItem<T> {
        private filter;
        constructor(filter: SynchroneFilter<T>);
        update(validationState: ValidationState<T>, callback: (state: ValidationState<T>) => void): void;
        cancelUpdate(): void;
        reset(): void;
    }
}
declare module JPV.Validation {
    class AsynchroneValidatorItem<T> extends ValidityItemBase<T> implements ValidityItem<T> {
        private interruptIfInvalid;
        private validator;
        constructor(validator: AsynchroneValidator<T>);
        update(validationState: ValidationState<T>, callback: (state: ValidationState<T>) => void): void;
        cancelUpdate(): void;
        reset(): void;
    }
}
declare module JPV.Color {
    class Color {
        static createFromHexString(hexString: string): Color;
        private hexString;
        toHexString(): string;
        equals(color: Color): boolean;
    }
}
declare module JPV.Validation {
    class AsynchroneValidatorBase {
        private _text;
        text: string;
        constructor(text: string);
        isAsynchroneValidator(): boolean;
        isValidationElement(): boolean;
    }
}
declare module JPV.View.Text {
    class Text extends View {
        constructor(content: string, css?: string);
        setContent(content: string): void;
        setDisplayed(displayed: boolean): void;
    }
}
declare module JPV.View.DataTable {
    interface Row<EntryType> {
        entry: EntryType;
    }
}
declare module JPV.View.Button {
    class TextButton extends Button {
        private span;
        constructor(title: string, cssClass?: string);
    }
}
declare module JPV.View.DataTable {
    class TextColumn<EntryType> implements Column<EntryType> {
        private heading;
        private getValue;
        private _sortable;
        private _width;
        sortable: boolean;
        width: number;
        constructor(heading: string, width: number, getValue: GetStringValueFunction<EntryType>, sortable?: boolean);
        customizeTH(th: HTMLTableHeaderCellElement): void;
        customizeTD(td: HTMLTableCellElement, entry: EntryType): void;
        sort(entries: EntryType[], mode: SortMode): void;
    }
}
declare module JPV.View.Structure {
    class FieldSet extends View {
        private tableBody;
        constructor(caption?: string, cssClass?: string);
        addField(name: string, element: View): void;
        clear(): void;
    }
}
declare module JPV.View.Input {
    class Slider extends View implements IInput<number> {
        valueChangedEvent: Event.Event<boolean>;
        htmlElement: HTMLInputElement;
        constructor();
        setRange(range: Geometry.Range): void;
        setStep(step: number): void;
        getValue(): number;
        setValue(value: number): void;
    }
}
declare module JPV.View.Structure {
    class DescriptionList extends View {
        constructor(cssClass?: string);
        addRow(name: string, value: View): void;
        clear(): void;
    }
}
declare module JPV.View.DataTable {
    interface GetNumberValueFunction<T> {
        (entry: T): number;
    }
    class NumberColumn<EntryType> implements Column<EntryType> {
        private heading;
        private getValue;
        private numberFormatter;
        private decimalPlaces;
        private _sortable;
        private _width;
        sortable: boolean;
        width: number;
        constructor(heading: string, width: number, getValue: GetNumberValueFunction<EntryType>, numberFormatter?: Culture.NumberFormatter, decimalPlaces?: number, sortable?: boolean);
        customizeTH(th: HTMLTableHeaderCellElement): void;
        customizeTD(td: HTMLTableCellElement, entry: EntryType): void;
        sort(entries: EntryType[], mode: SortMode): void;
    }
}
declare module JPV.View.Input {
    class ColorField extends View implements IInput<Color.Color> {
        valueChangedEvent: Event.Event<boolean>;
        htmlElement: HTMLInputElement;
        constructor();
        getValue(): Color.Color;
        setValue(value: Color.Color): void;
    }
}
