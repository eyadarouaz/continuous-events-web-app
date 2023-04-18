import { NgModule } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { ContentLayoutComponent } from './content-layout.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from '../modules/sidebar/sidebar.component';
import { SidebarModule } from '../modules/sidebar/sidebar.module';

@NgModule({
  declarations: [
    ContentLayoutComponent
  ],
  imports: [
    SharedModule,
    SidebarModule,
  ],
})
export class ContentLayoutModule { }
