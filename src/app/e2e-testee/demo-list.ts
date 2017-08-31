import {NgModule, Component, ElementRef, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from "@angular/common";
import {JigsawCollapseModule} from "jigsaw/component/collapse/collapse";
import {JigsawScrollBarModule} from "jigsaw/directive/scrollbar/scrollbar";
import {AffixUtils} from "jigsaw/core/utils/internal-utils";
import {navInfo} from './nav-info'
import {CustomizeAlertDemoComponent} from "./alert/customized/app.component";
import {AlertInDomDemoComponent} from "./alert/in-dom/app.component";
import {AlertPopupDemoComponent} from "./alert/popup/app.component";
import {AlertInDomDemoModule} from "./alert/in-dom/app.module";
import {AlertPopupDemoModule} from "./alert/popup/app.module";
import {CustomizeAlertDemoModule} from "./alert/customized/app.module";

@Component({
    selector: 'jigsaw-demo-list',
    templateUrl: 'demo-list.html',
    styleUrls: ['demo-list.scss']
})
export class DemoListComponent implements OnInit {
    constructor(private elementRef: ElementRef) {

    }

    navHeight: number;

    navData: Object = navInfo;

    ngOnInit() {
        this.navHeight = (document.body.clientHeight -
            AffixUtils.offset(this.elementRef.nativeElement.querySelector('.left-box')).top) - 10;
    }
}

// 请按照组件的字符序排列
const demoListRoutes = [
    {
        path: '',
        component: DemoListComponent,
        children: [
            {
                path: "alert/customized", component: CustomizeAlertDemoComponent
            }, {
                path: "alert/in-dom", component: AlertInDomDemoComponent
            }, {
                path: "alert/popup", component: AlertPopupDemoComponent
            }, {
                path: "array-collection",
                loadChildren: "./array-collection/demo.module#ArrayCollectionDemoModule"
            }, {
                path: "button", loadChildren: "./button/demo.module#ButtonDemoModule"
            }, {
                path: "checkbox",
                loadChildren: "./checkbox/demo.module#CheckBoxDemoModule"
            }, {
                path: "collapse",
                loadChildren: "./collapse/collapse-module#CollapseDemoModule"
            }, {
                path: "combo-select",
                loadChildren: "./combo-select/combo-select-demo.module#ComboSelectDemoModule"
            }, {
                path: "dialog",
                loadChildren: "./dialog/demo.module#DialogDemoModule"
            }, {
                path: "dragdrop",
                loadChildren: "./dragdrop/demo.module#DragDropDemoModule"
            }, {
                path: "form",
                loadChildren: "./form/demo.module#FormDemoModule"
            }, {
                path: "graph",
                loadChildren: "./graph/graph-demo.module#GraphDemoModule"
            }, {
                path: "i18n",
                loadChildren: "./i18n/demo.module#I18nDemoModule"
            }, {
                path: "input",
                loadChildren: "./input/demo.module#InputDemoModule"
            }, {
                path: "loading",
                loadChildren: "./loading/demo.module#LoadingDemoModule"
            }, {
                path: "misc",
                loadChildren: "./misc/demo.module#MiscDemoModule"
            }, {
                path: "pagination",
                loadChildren: "./pagination/pagination-demo.module#PaginationDemoModule"
            }, {
                path: "popup",
                loadChildren: "./popup/demo.module#PopupDemoModule"
            }, {
                path: "radio",
                loadChildren: "./radio/radio-demo.module#RadioDemoModule"
            }, {
                path: "range-time",
                loadChildren: "./range-time/range-time-demo.module#RangeTimeDemoModule"
            }, {
                path: "scrollbar",
                loadChildren: "./scrollbar/demo.module#ScrollbarDemoModule"
            }, {
                path: "select",
                loadChildren: "./select/demo.module#SelectDemoModule"
            }, {
                path: "slider",
                loadChildren: "./slider/slider-demo.module#SliderDemoModule"
            }, {
                path: "switch",
                loadChildren: "./switch/switch-demo.module#SwitchDemoModule"
            }, {
                path: "table",
                loadChildren: "./table/demo.module#TableDemoModule"
            }, {
                path: "tabs",
                loadChildren: "./tabs/tabs-demo.module#TabsDemoModule"
            }, {
                path: "tag",
                loadChildren: "./tag/tag-demo.module#TagDemoModule"
            }, {
                path: "tileselect",
                loadChildren: "./tileselect/tileselect-demo.module#TileSelectDemoModule"
            }, {
                path: "time",
                loadChildren: "./time/time-demo.module#TimeDemoModule"
            }, {
                path: "tooltip",
                loadChildren: "./tooltip/demo.module#TooltipDemoModule"
            }, {
                path: "tree",
                loadChildren: "./tree/demo.module#ZtreeDemoModule"
            }
        ]
    },
    {
        path: '**', //fallback router must in the last
        component: DemoListComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(demoListRoutes),
        CommonModule,
        JigsawCollapseModule,
        JigsawScrollBarModule,
        AlertInDomDemoModule,
        AlertPopupDemoModule,
        CustomizeAlertDemoModule
    ],
    exports: [],
    declarations: [
        DemoListComponent
    ],
    providers: [],
})
export class DemoListModule {
}
