// import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';

// is it needed? https://blog.ninja-squad.com/2022/11/16/angular-cli-15.0/
// if (environment.production) {
//   enableProdMode(); // disable Angular’s development mode (turns off assertions and other checks) (This function was turning off a flag 'isDevMode')
// }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
