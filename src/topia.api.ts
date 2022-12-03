import axios, {AxiosRequestConfig} from 'axios'
import {Asset, DropAssetRequest, TopiaApi, WorldAsset} from "../@types";

const instance = axios.create({
    baseURL: 'https://api.topia.io/api',
    timeout: 5000,
    responseType: "json"
});

const _config: AxiosRequestConfig = {headers: {Authorization: "", 'Content-Type': 'application/json'}}

const topiaApi: TopiaApi = {
    config: (config) => {
        if (config.key)
            _config.headers!.Authorization = config.key

        if (config.timeout)
            _config.timeout = config.timeout
    },

    assets: {
        get: async (library: 'my' | 'topia', email: string): Promise<Asset[]> =>
            instance.get<any, Asset[]>(`/assets/${library}-assets`, {..._config, ...{params: {email}}})
    },

    world: {
        getAssets: async (worldSlug: string, email: string): Promise<WorldAsset[]> =>
            instance.get<any, WorldAsset[]>(`/world/${worldSlug}/assets`, {..._config, ...{params: {email}}}),

        dropAsset: async (worldSlug: string, assetDrop: DropAssetRequest) =>
            instance.post<DropAssetRequest, WorldAsset>(`/world/${worldSlug}/assets`, assetDrop, _config)
    }
}

export default topiaApi
