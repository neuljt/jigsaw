import {
    NgModule, Component, EventEmitter, Input, Output, ContentChildren, Directive, QueryList,
    ElementRef, ViewChild, AfterContentInit, Renderer2, AfterViewChecked, ChangeDetectorRef, forwardRef
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawComponent} from "../common";
import {Observable} from "rxjs/Observable";

@Directive({selector: '[jigsaw-prefix-icon]'})
export class JigsawPrefixIcon {
}

@Component({
    selector: 'jigsaw-input',
    templateUrl: 'input.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height',
        '(click)': '_stopPropagation($event)',
        '[class.jigsaw-input]': 'true'
    },
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawInput), multi: true },
    ]
})
export class JigsawInput extends AbstractJigsawComponent implements ControlValueAccessor, AfterContentInit, AfterViewChecked {
    private _value: string | number; //input表单值
    private _focused: boolean;
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    /**
     * @internal
     */
    public _$longIndent: boolean = false;

    constructor(private _render2: Renderer2,
                private _elementRef: ElementRef,
                private _changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    private _propagateChange:any = () => {};

    public writeValue(value: any): void {
        if (value === undefined || value === null) {
            return;
        }
        this._value = value.toString();
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    //input form表单值
    @Input()
    public get value(): string | number {
        return this._value;
    }

    public set value(newValue: string | number) {
        if (this._value != newValue) {
            this._value = newValue;
            this.valueChange.emit(newValue);
            this._propagateChange(newValue)
        }
    }

    @Output() public valueChange: EventEmitter<string | number> = new EventEmitter<string | number>();

    @Input() public clearable: boolean = true;
    @Input() public disabled: boolean = false;

    private _placeholder:string='';
    @Input()
    public set placeholder(txt:string) {
        this._placeholder = txt;
    }

    public get placeholder() {
        return this._placeholder;
    }

    @Output('blur')
    get onBlur(): Observable<FocusEvent> {
        return this._blurEmitter.asObservable();
    }

    @Output('focus')
    get onFocus(): Observable<FocusEvent> {
        return this._focusEmitter.asObservable();
    }

    @ContentChildren(JigsawPrefixIcon)
    private _iconFront: QueryList<JigsawPrefixIcon> = null;

    @ViewChild('input')
    private _inputElement: ElementRef;

    public focus() {
        this._inputElement.nativeElement.focus();
    }

    private _clearValue(event): void {
        this.value = null;
    }

    /**
     * @internal
     */
    public _$handleFocus(event: FocusEvent) {
        this._focused = true;
        this._focusEmitter.emit(event);
    }

    /**
     * @internal
     */
    public _$handleBlur(event: FocusEvent) {
        this._focused = false;
        this._blurEmitter.emit(event);
    }

    private _stopPropagation(event){
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * @internal
     */
    public _$inputPaddingStyle: {};

    /**
     * 动态计算 input的padding-left 和padding-right (不确定图标的个数, 好空出对应的位置.)
     * 当前计算方法根据图标的个数计算, 默认图标大小为12px , dom大小获取的不准确.
     * @private
     */
    private _setInputPaddingStyle() {
        let prefixIconWidth = this._elementRef.nativeElement.querySelector(".jigsaw-input-icon-front").offsetWidth;
        let endIconWidth = this._elementRef.nativeElement.querySelector(".jigsaw-input-icon-end").offsetWidth;

        let prefixIconPadding = prefixIconWidth + 10;
        if(prefixIconWidth !== 0) {
            prefixIconPadding = prefixIconPadding + 8;
        }

        let endPadding = endIconWidth + 8;

        this._$inputPaddingStyle = {
            "padding-left": prefixIconPadding + "px",
            "padding-right": endPadding + "px"
        };

        this._changeDetectorRef.detectChanges();
    }

    ngAfterContentInit() {
        this._iconFront && this._iconFront.length ? this._$longIndent = true : null;
        setTimeout(() => {
            this._render2.setStyle(this._elementRef.nativeElement, 'opacity', 1);
        }, 0);
    }

    ngAfterViewChecked() {
        this._setInputPaddingStyle();
    }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [JigsawInput, JigsawPrefixIcon],
    exports: [JigsawInput, JigsawPrefixIcon],
})
export class JigsawInputModule {

}


