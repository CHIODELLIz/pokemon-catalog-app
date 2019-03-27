import { Injectable } from '@angular/core';
import { LoadingController, Loading, LoadingOptions, Platform, App } from 'ionic-angular';

@Injectable()
export class LoadingHelper {

    private loading: Loading;
    private loadingCounts: number = 0;
    public subscription: any;

    constructor(public loadingCtrl: LoadingController, public app: App, public platform: Platform) { }

    public show(options: LoadingOptions = {}): Loading {
        if (++this.loadingCounts > 1) {
            return;
        }

        options.duration = options.duration ? options.duration : 40000;

        this.loading = this.loadingCtrl.create(options);
        this.loading.willEnter.subscribe(() => {
            this.subscription = this.platform.registerBackButtonAction(() => { }, 10);
        });

        this.loading.present();

        return this.loading;
    }

    public hide() {
        if (--this.loadingCounts > 0) {
            return;
        }

        this.loading.dismiss();
        this.loading.onDidDismiss(() => {
            this.subscription();
        });

    }
}