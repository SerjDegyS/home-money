import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {RouterModule} from '@angular/router';

import {LoaderComponent} from './components/loader/loader.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {DropdownDirective} from './directives/dropdown.directive';
import {SidebarComponent} from './components/sidebar/sidebar.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    RouterModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    LoaderComponent,
    HomePageComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DropdownDirective
  ],
  declarations: [
    LoaderComponent,
    HomePageComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DropdownDirective
  ]
})
export class SharedModule {}
