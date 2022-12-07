import topiaApi from "../src/topia.api";

type Asset = {
    id: string,
    assetName: string,
    addedOn: string,
    specialType?: string,
    isVideoPlayer?: boolean,
    topLayerURL?: string,
    bottomLayerURL?: string
}

type WorldAsset = {
    id: string,
    assetId: string,
    assetName: string,
    assetScale: number,
    assetBroadcast: boolean,
    assetBroadcastAll: boolean,
    broadcasterEmail: string,
    audioRadius: number,
    audioVolume: number,
    isPrivateZone: boolean,
    isPrivateZoneChatDisabled: boolean,
    privateZoneUserCap: number,
    topLayerURL: string,
    bottomLayerURL: string,
    clickType: string,
    clickableLink: string,
    clickableLinkTitle: string,
    clickablePortal: string,
    portalCoordsX: number,
    portalCoordsY: number,
    text: string,
    textStyle: {
        textColor: string,
        textFontFamily: string,
        textSize: number,
        textWeight: "normal" | "bold" | "thin",
        textWidth: number
    },
    teleportX: number,
    teleportY: number,
    position: {
        x: number,
        y: number
    },
    mediaType: string,
    mediaLink: string,
    syncUserMedia: {},
    uniqueName: string,
    mediaName: string,
    isMutezone: boolean,
    isVideo: boolean
}

type DropAssetRequest = {
    assetId: string,
    position: {
        x: number,
        y: number
    },
    uniqueName: string
}

type Media = {
    id:	string
    uniqueItems: true
    type:	string
    size: number
    mediaPath:	string
    duration: number
}

type WhitelistItem = {
    email: string
    firstName?: string
    lastName?: string
    displayName?: string
}

type Scene =  {
    id: string,
    height: number,
    width: number,
    background: string,
    name: string,
    spawnPosition: {
        x: number,
        y: number,
        radius: number
    },
    timesUsed: number,
    description: string,
    urlSlug: string,
    created: {
        _seconds: number,
        _nanoseconds: number
    },
    worldCenteredAtZero: boolean
}

export interface TopiaApi {
    config(config: {key: string, timeout?:number}): void,

    assets: {
        getById(id: string): Promise<Asset>
        get(library: 'my' | 'topia', email: string): Promise<Asset[]>
    },

    media: {
        get(worldSlug:string): Promise<Media[]>
    },

    whitelist: {
        get(worldSlug:string) : Promise<WhitelistItem[]>,
        replace(worldSlug:string, newList : WhitelistItem[]) : Promise<WhitelistItem[]>,
        add(worldSlug:string, newItems: WhitelistItem[]) : Promise<WhitelistItem[]>,
    },

    /**
     * Currently disabled
     */
    users: {

    },
    scene: {
        get(library: "my"|"topia", email:string): Promise<Scene[]>
    },
    webhook:{},
    visitors:{},

    world: {
        getAssets(worldSlug: string, email: string): Promise<WorldAsset[]>
        /**
         * Drop an asset in the world
         *
         * @param worldSlug
         * @param assetDrop
         */
        dropAsset(worldSlug: string, assetDrop: DropAssetRequest): Promise<WorldAsset>

        /**
         * Remove a placed asset
         *
         * @param worldSlug
         * @param email         Email address of the world-owner
         * @param worldAssetId
         * @param assetId
         */
        deleteAsset(worldSlug: string, email: string, worldAssetId: string, assetId: string)


        moveAsset(worldSlug: string, email: string, worldAssetId: string, assetId: string, position: {x:number, y:number})

        /**
         *
         * @param worldSlug
         * @param email         Email address of the world-owner
         * @param worldAssetId
         * @param assetId
         * @param scale         Number between 0 and 1
         */
        scaleAsset(worldSlug:string, email:string, worldAssetId: string, assetId: string, scale:number)

        /**
         * Remove all the assets from a world
         */
        clear(worldSlug: string, email: string): Promise<void>
    }
}

export type {Asset, WorldAsset, DropAssetRequest, Media, WhitelistItem, Scene}
export default topiaApi
