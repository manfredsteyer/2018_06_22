import { AuthInterceptor } from './auth/auth.interceptor';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ModuleWithProviders} from '@angular/core/src/metadata/ng_module';
import {CityPipe} from './pipes/city.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExitWithWarningDirective } from './exit/exit-with-warning.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CityPipe,
    ExitWithWarningDirective
  ],
  exports: [
    CityPipe,
    ExitWithWarningDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }]
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }

}
