import { NgModule } from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {GalleriaModule} from 'primeng/galleria';
import {DropdownModule} from 'primeng/dropdown';
import {SidebarModule} from 'primeng/sidebar';
import {StepsModule} from 'primeng/steps';
import {ToastModule} from 'primeng/toast';
@NgModule({

  exports: [
    DialogModule,
    ButtonModule,
    GalleriaModule,
    DropdownModule,
    SidebarModule,
    StepsModule,
    ToastModule
  ],
})
export class PrimeModule { }
