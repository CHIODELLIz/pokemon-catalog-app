import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { ApiService } from "../../services/api.service";
import { LoadingHelper } from "../../helpers/loading.helper";
import { SocialSharing } from "@ionic-native/social-sharing";

@Component({
    selector: 'pokemon-detail-page',
    templateUrl: 'pokemon-detail.page.html'
})
export class PokemonDetailPage {

    pokemon: any = {}
    avatar: any = {};
    types: any = [];
    abilities: any = [];
    showContent: boolean = false;

    constructor(private navParams: NavParams, private apiService: ApiService,
        private loadingHelper: LoadingHelper, private socialSharing: SocialSharing) { }

    ionViewDidEnter() {
        let name = this.navParams.get('name');

        this.showContent = false;
        this.loadingHelper.show();

        this.apiService.getPokemonByName(name).then((pokemon: any) => {
            this.pokemon = JSON.parse(pokemon._body);
            this.avatar = { front: this.pokemon.sprites.front_default, back: this.pokemon.sprites.back_default };
            this.pokemon.types.forEach((value) => {
                this.types.push(value.type.name);
            })
            this.pokemon.abilities.forEach((value) => {
                this.abilities.push(value.ability.name);
            })
            this.showContent = true;
            this.loadingHelper.hide();

        }).catch((error) => {
            console.error(error);
            this.loadingHelper.hide();
        })

    }

    shareInfo() {
        let types, abilities;

        this.loadingHelper.show();

        this.types.forEach((value) => {
            types = types ? types + `- ${value}\n` : `- ${value}\n`;
        })
        this.abilities.forEach((value) => {
            abilities = abilities ? abilities + `- ${value}\n` : `- ${value}\n`;
        })

        let message = `name: ${this.pokemon.name}\nheight: ${this.pokemon.height}\n weight: ${this.pokemon.weight}\n\n types:\n ${types}\n abilities:\n ${abilities}`;
        this.socialSharing.share(message, 'Pokémon Catalog')
            .then(() => this.loadingHelper.hide())
            .catch(() => this.loadingHelper.hide())
    }

}