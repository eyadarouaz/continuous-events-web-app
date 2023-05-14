import { NgModule } from '@angular/core';
import { SidebarModule } from '../modules/sidebar/sidebar.module';
import { SharedModule } from '../shared/shared.module';
import { ContentLayoutComponent } from './content-layout.component';

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
