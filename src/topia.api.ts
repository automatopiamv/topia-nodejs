import axios from 'axios'
import {Asset, WorldAsset} from "../@types";

let apiKey: string | undefined
const headers = {Authorization: "", 'Content-Type': 'application/json'}

const instance = axios.create({
    baseURL: 'https://api.topia.io/api',
    timeout: 5000,
    responseType: "json"
});

const topiaApi = {
    setApiKey: (key: string) => {
        apiKey = key
        headers.Authorization = apiKey
    },

    assets: {
        get: async (library: 'my' | 'topia', email: string): Promise<Asset[]> =>
            instance.get<any, Asset[]>(`/assets/${library}-assets`, {headers, params: {email}})
    },

    world: {
        getAssets: async (worldSlug: string, email: string): Promise<WorldAsset[]> =>
            instance.get<any, WorldAsset[]>(`/world/${worldSlug}/assets`, {headers, params: {email}})
    }
}

export default topiaApi
