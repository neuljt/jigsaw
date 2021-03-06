import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {CheckBoxDisableDemoComponent} from "./disabled/app.component";
import {CheckBoxBasicDemoComponent} from "./basic/app.component";
import {CheckBoxBasicDemoModule} from "./basic/app.module";
import {CheckBoxDisableDemoModule} from "./disabled/app.module";
import {CheckBoxLiveDemoComponent} from "../../live-demo/checkbox/app.component";
import {CheckBoxLiveDemoModule} from "../../live-demo/checkbox/app.module";

const checkboxDemoRoutes = [
    {
        path: '', redirectTo: 'basic', pathMatch: 'full'
    },
    {
        path: 'basic', component: CheckBoxBasicDemoComponent
    },
    {
        path: 'disabled', component: CheckBoxDisableDemoComponent
    },
    {
        path: 'live-demo', component: CheckBoxLiveDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: CheckBoxBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(checkboxDemoRoutes),
        CheckBoxBasicDemoModule,
        CheckBoxDisableDemoModule,
        CheckBoxLiveDemoModule
    ]
})
export class CheckBoxDemoModule {
}
