import { Component } from "@angular/core";
import { NavParams, NavController, AlertController } from "ionic-angular";
import { ApiService } from "../../services/api.service";
import { PokemonDetailPage } from "../pokemon-detail/pokemon-detail.page";
import { LoadingHelper } from "../../helpers/loading.helper";

@Component({
    selector: 'pokemon-list-page',
    templateUrl: 'pokemon-list.page.html'
})
export class PokemonListPage {

    pokemonList: any;

    constructor(private navParams: NavParams, private navCtrl: NavController,
        private apiService: ApiService, private alertCtrl: AlertController,
        private loadingHelper: LoadingHelper) { }

    ionViewDidEnter() {
        let type = this.navParams.get('type');
        this.loadingHelper.show();

        this.apiService.getPokemonsByTypeName(type).then((pokemons: any) => {
            this.pokemonList = JSON.parse(pokemons._body).pokemon;
            this.loadingHelper.hide();
        }).catch((error) => {
            this.alertCtrl.create({ message: 'There was a connection error, please try again later!' })
            console.error(error)
            this.loadingHelper.hide();
        })
    }

    goToPokemonDetail(name: string) {
        this.navCtrl.push(PokemonDetailPage, { name: name });
    }

}