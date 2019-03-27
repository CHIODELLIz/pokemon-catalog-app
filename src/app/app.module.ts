
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LoadingHelper } from '../helpers/loading.helper';

//Components
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home.page';
import { PokemonDetailPage } from '../pages/pokemon-detail/pokemon-detail.page';
import { PokemonListPage } from '../pages/pokemon-list/pokemon-list.page';

//Services
import { ApiService } from '../services/api.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PokemonListPage,
    PokemonDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PokemonListPage,
    PokemonDetailPage
  ],
  providers: [
    SocialSharing,
    LoadingHelper,
    ApiService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
