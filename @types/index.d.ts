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

export interface TopiaApi {
    setApiKey(key: string): void,

    assets: {
        get(library: 'my' | 'topia', email: string): Promise<Asset[]>
    },

    world: {
        getAssets(worldSlug: string, email: string): Promise<WorldAsset[]>
    }
}

export type {Asset, WorldAsset}
export default topiaApi
