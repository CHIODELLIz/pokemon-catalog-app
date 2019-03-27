import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { API_BASE_URL } from "../constants/app.constant";

@Injectable()
export class ApiService {

    constructor(private http: Http) { }

    async getAllPokemonTypes() {
        return await new Promise((resolve, reject) => {
            this.http.get(`${API_BASE_URL}type/${name}`, {}).subscribe((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            })
        })
    }

    async getPokemonsByTypeName(name: string) {
        return await new Promise((resolve, reject) => {
            this.http.get(`${API_BASE_URL}type/${name}`, {}).subscribe((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            })
        })
    }

    async getPokemonByName(name: string) {
        return await new Promise((resolve, reject) => {
            this.http.get(`${API_BASE_URL}pokemon/${name}`, {}).subscribe((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            })
        })
    }
}