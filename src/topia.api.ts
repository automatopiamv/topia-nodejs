import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
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
            (await instance.get<Asset[]>(`/assets/${library}-assets`, {..._config, ...{params: {email}}})).data
    },

    world: {
        getAssets: async (worldSlug: string, email: string): Promise<WorldAsset[]> =>
            (await instance.get<WorldAsset[]>(`/world/${worldSlug}/assets`, {..._config, ...{params: {email}}})).data,

        dropAsset: async (worldSlug: string, assetDrop: DropAssetRequest) =>
            (await instance.post<WorldAsset, AxiosResponse<WorldAsset, DropAssetRequest>, DropAssetRequest>(`/world/${worldSlug}/assets`, assetDrop, _config)).data
    }
}

export default topiaApi
