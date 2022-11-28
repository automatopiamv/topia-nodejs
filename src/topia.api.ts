import axios from 'axios'
import {Asset, DropAssetRequest, TopiaApi, WorldAsset} from "../@types";

let apiKey: string | undefined
const headers = {Authorization: "", 'Content-Type': 'application/json'}

const instance = axios.create({
    baseURL: 'https://api.topia.io/api',
    timeout: 5000,
    responseType: "json"
});

const topiaApi : TopiaApi = {
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
            instance.get<any, WorldAsset[]>(`/world/${worldSlug}/assets`, {headers, params: {email}}),

        dropAsset: async (worldSlug: string, assetDrop: DropAssetRequest) =>
            instance.post<DropAssetRequest, WorldAsset>(`/world/${worldSlug}/assets`, assetDrop, {headers})
    }
}

export default topiaApi
