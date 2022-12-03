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
    assetBroadcastAll: true,
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
    isVideo: string
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
        dropAsset(worldSlug: string, assetDrop: DropAssetRequest): Promise<WorldAsset>
    }
}

export type {Asset, WorldAsset, DropAssetRequest, Media, WhitelistItem, Scene}
export default topiaApi
