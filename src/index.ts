import fetch from 'node-fetch'
import {Asset, WorldAsset} from "../@types";

const host = 'https://api.topia.io/api'
let apiKey: string | undefined
const headers = {Authorization: "", 'Content-Type': 'application/json'}

const topiaApi = {
    setApiKey: (key: string) => {
        apiKey = key
        headers.Authorization = apiKey
    },

    assets: {
        get: async (library: 'my' | 'topia', email: string): Promise<Asset[]> => {
            const response = await (fetch(`${host}/assets/${library}-assets?email=${email}`, {headers}).then(r => r.json()))
            return response as Asset[]
        }
    },

    world: {
        getAssets: async (worldSlug: string, email: string): Promise<WorldAsset[]> => {
            const response = await (fetch(`${host}/world/${worldSlug}/assets?email=${email}`, {headers}).then(r => r.json()))
            return response as WorldAsset[]
        }
    }
}

export default topiaApi
