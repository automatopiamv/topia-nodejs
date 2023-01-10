import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {Asset, DropAssetRequest, Media, Scene, TopiaApi, WhitelistItem, WorldAsset} from "../@types";

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
        getById: async (id: string) => (await instance.get<Asset>(`/assets/${id}`, _config)).data,

        get: async (library: 'my' | 'topia', email: string) =>
            (await instance.get<Asset[]>(`/assets/${library}-assets`, {..._config, ...{params: {email}}})).data
    },

    media: {
        get: async (worldSlug: string) => (await instance.get<Media[]>(`/media/${worldSlug}`, _config)).data
    },

    scene: {
        get: async (library: "my" | "topia", email: string) =>
            (await instance.get<Scene[]>(`/scenes/${library}-scenes`, {..._config, ...{params: {email}}})).data
    },

    users: {
        /**
         * Get all the users in the world or by sessionId. _Currently disabled_.
         * @param worldSlug
         * @param sessionId
         */
        get: async (worldSlug: string, sessionId?: string) : Promise<{id: number, username:string}[]> => {
            let url = `/users/${worldSlug}`
            if(sessionId)
                url = `${url}/${sessionId}`
            return (await instance.get(url, _config)).data
        }
    },

    visitors: {},

    webhook: {},

    whitelist: {
        add: async (worldSlug: string, newItems: WhitelistItem[]) =>
            (await instance.put<WhitelistItem[], AxiosResponse<WhitelistItem[], WhitelistItem[]>, WhitelistItem[]>
            (`/whitelist/${worldSlug}/add-to-whitelist`, newItems, _config)).data,

        get: async (worldSlug: string) => (await instance.get<WhitelistItem[]>(`/whitelist/${worldSlug}`, _config)).data,

        replace: async (worldSlug: string, newList: WhitelistItem[]) => (await instance.put<WhitelistItem[],
            AxiosResponse<WhitelistItem[], WhitelistItem[]>, WhitelistItem[]>(`/whitelist/${worldSlug}/replace-whitelist`,
            newList, _config)).data,
    },

    world: {
        list: async () => (await instance.get<string[]>('/user/worlds', _config)).data,

        clear: async (worldSlug, email) => {
            // get all, then delete one-by-one
            const worldAssets = await topiaApi.world.getAssets(worldSlug, email)
            for(let wa of worldAssets)
                await instance.delete(`/world/${worldSlug}/assets/${wa.id}`)
        },

        getAsset: async (worldSlug, email, worldAssetId) =>
            (await instance.get<WorldAsset>(`/world/${worldSlug}/assets/${worldAssetId}`, {..._config, ...{params: {email}}})).data,

        getAssets: async (worldSlug, email) =>
            (await instance.get<WorldAsset[]>(`/world/${worldSlug}/assets`, {..._config, ...{params: {email}}})).data,

        dropAsset: async (worldSlug: string, assetDrop: DropAssetRequest) =>
            (await instance.post<WorldAsset, AxiosResponse<WorldAsset, DropAssetRequest>, DropAssetRequest>(`/world/${worldSlug}/assets`, assetDrop, _config)).data,

        deleteAsset: async (worldSlug, email, worldAssetId) =>
            instance.delete(`/world/${worldSlug}/assets/${worldAssetId}`, {..._config, ...{params: {email}}}),

        moveAsset: async (worldSlug, email, worldAssetId, position) =>
            instance.put(`/world/${worldSlug}/assets/${worldAssetId}/set-position`, position, {..._config, ...{params: {email}}}),

        scaleAsset: async (worldSlug, email, worldAssetId, scale) =>
            instance.put(`/world/${worldSlug}/assets/${worldAssetId}/change-scale`, {assetScale: scale}, {..._config, ...{params: {email}}})
    }
}

export default topiaApi
