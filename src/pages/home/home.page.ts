import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ApiService } from '../../services/api.service';
import { LoadingHelper } from '../../helpers/loading.helper';
import { map } from 'rxjs/operators';
import { PokemonListPage } from '../pokemon-list/pokemon-list.page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html'
})
export class HomePage {

  pokemonTypesList: any;

  constructor(private navCtrl: NavController, private apiService: ApiService,
    private loadingHelper: LoadingHelper, private alertCtrl: AlertController) { }

  ionViewDidEnter() {
    this.loadingHelper.show();

    this.apiService.getAllPokemonTypes().then((pokemons: any) => {
      this.pokemonTypesList = JSON.parse(pokemons._body).results;
      this.loadingHelper.hide();
    }).catch((error) => {
      console.error(error);
      this.alertCtrl.create({ message: 'There was a connection error, please try again later!' })
      this.loadingHelper.hide();
    });
  }

  goToPokemonsType(type: string) {
    this.navCtrl.push(PokemonListPage, { type: type });
  }

}
