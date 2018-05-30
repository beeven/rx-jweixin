import { Observable, from } from 'rxjs';
import wx = require("../lib/jweixin-1.3.2");


export enum JsApi {

    onMenuShareTimeline = "onMenuShareTimeLine",

    onMenuShareAppMessage = "onMenuShareAppMessage",

    onMenuShareQQ = "onMenuShareQQ",
    onMenuShareWeibo = "onMenuShareWeibo",

    onMenuShareQZone = "onMenuShareQZone",

    startRecord = "startRecord",

    stopRecord = "stopRecord",

    onVoiceRecordEnd = "onVoiceRecordEnd",

    playVoice = "playVoice",

    pauseVoice = "pauseVoice",

    stopVoice = "stopVoice",

    onVoicePlayEnd = "onVoicePlayEnd",

    uploadVoice = "uploadVoice",

    downloadVoice = "downloadVoice",

    chooseImage = "chooseImage",

    uploadImage = "uploadImage",

    downloadImage = "downloadImage",

    translateVoice = "translateVoice",

    getNetworkType = "getNetworkType",

    openLocation = "openLocation",

    getLocation = "getLocation",

    hideOptionMenu = "hideOptionMenu",

    showOptionMenu = "showOptionMenu",

    hideMenuItems = "hideMenuItems",

    showMenuItems = "showMenuItems",

    hideAllNonBaseMenuItem = "hideAllNonBaseMenuItem",

    showAllNonBaseMenuItem = "showAllNonBaseMenuItem",

    closeWindow = "closeWindow",

    scanQRCode = "scanQRCode",

    openProductSpecificView = "openProductViewWithPid",
    addCard = "addCard",

    chooseCard = "chooseCard",

    // 这部分从sdk中观察得到
    openCard = "batchViewCard",
    startSearchBeacons = "startMonitoringBeacons",
    stopSearchBeacons = "stopMonitoringBeacons",
    onSearchBeacons = "onBeaconsInRange",
    openEnterpriseChat = "openEnterpriseChat",
    openEnterpriseRedPacket = "getRecevieBizHongBaoRequest",
    launchMiniProgram = "launchMiniProgram",
    consumeAndShareCard = "consumedShareCard",
    openAddress = "editAddress",
    previewImage = "imagePreview",
    chooseWXPay = "getBrandWCPayRequest"

}

export interface CheckResult {
    api: JsApi;
    available: boolean;
}

/**
 * 判断当前客户端版本是否支持指定JS接口
 * @param jsApiList 需要检测的JS接口列表
 */
export function checkJsApi(
    jsApiList: JsApi[]
): Observable<CheckResult[]> {
    return from(new Promise<CheckResult[]>((resolve, reject) => {
        wx.checkJsApi({
            jsApiList: jsApiList,
            success: (res) => {
                let ret: CheckResult[] = []
                for (let i in res.checkResult) {
                    let apiString = i as keyof typeof JsApi;
                    let api: JsApi = JsApi[apiString];
                    ret.push({ api: api, available: res.checkResult[i] })
                }
                resolve(ret);
            },
            fail: (err) => {
                reject(err);
            }
        })
    }));
}

/**
 * 调用任意接口
 * 若调用为公开接口，必须在 config 中设置 beta = true
 * @param funcName 接口名称
 * @param args 调用参数
 */
export function invoke(
    funcName: string | JsApi,
    args: any
): Observable<any> {
    return from(new Promise<any>((resolve, reject) => {
        wx.invoke(funcName, arg s, (res) => {
            resolve(res);
        });
    }));
}


/**
 * 监听任意事件
 * @param eventName 事件名称
 */
export function on(
    eventName: string | JsApi
): Observable<any> {
    return from(new Promise<any>((resolve, reject) => {
        wx.on(eventName, (res) => {
            resolve(res);
        });
    }));
}