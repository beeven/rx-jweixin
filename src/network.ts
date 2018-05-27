import { Observable, from } from 'rxjs';
import wx = require("../lib/jweixin-1.3.2");

/**
 * 网络状态
 */
export enum NetworkType {
    /** GPRS/EDGE */
    EDGE = "edge",
    /** 3G/4G*/
    WWAN = "wwan",
    /** WIFI */
    WIFI = "wifi"
}

/**
 * 获取网络状态
 */
export function getNetworkType(): Observable<NetworkType> {
    return from(new Promise<NetworkType>((resolve,reject)=>{
        wx.getNetworkType({
            success: (res)=> {
                resolve(res.networkType);
            },
            fail: (err)=> {
                reject(err);
            }
        });
    }));
}
