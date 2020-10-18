import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {SystemComponent} from './system.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import {SystemRoutingModule} from './system-routing.module';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import {DropdownDirective} from '../shared/directives/dropdown.directive';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import {BillService} from './shared/services/bill.service';
import {MomentPipe} from './shared/pipes/moment.pipe';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import {CategoriesService} from './shared/services/categories.service';
import {EventsService} from './shared/services/events.service';
import { AddEventChooseComponent } from './records-page/add-event/add-event-choose/add-event-choose.component';
import { HistoryChartComponent } from './history-page/history-chart/history-chart.component';
import { HistoryEventsComponent } from './history-page/history-events/history-events.component';
import { HistoryDetailComponent } from './history-page/history-detail/history-detail.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import {FilterEventsPipe} from './shared/pipes/Filter.pipe';
import { CreateBillComponent } from './bill-page/create-bill/create-bill.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    SystemComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    RecordsPageComponent,
    BillCardComponent,
    CurrencyCardComponent,
    MomentPipe,
    AddCategoryComponent,
    AddEventComponent,
    EditCategoryComponent,
    AddEventChooseComponent,
    HistoryChartComponent,
    HistoryEventsComponent,
    HistoryDetailComponent,
    HistoryFilterComponent,
    FilterEventsPipe,
    CreateBillComponent,
  ],
  providers: [
    BillService,
    CategoriesService,
    EventsService
    ]
})
export class SystemModule {

}
