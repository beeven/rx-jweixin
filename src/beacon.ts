import { Observable, from } from 'rxjs';
import wx = require("../lib/jweixin-1.3.2");


/**
 * 开启查找周边ibeacon设备
 * @param ticket 摇周边的业务ticket, 从url获得
 */
export function startSearchBeacons(
    ticket: string
): Observable<null> {
    return from(new Promise<null>((resolve,reject)=>{
        wx.startSearchBeacons({
            complete: (res)=>{
                resolve();
            }
        });
    }));
}

/**
 * 关闭查找周边ibeacon设备
 */
export function stopSearchBeacons(): Observable<null> {
    return from(new Promise<null>((resolve,reject)=>{
        wx.stopSearchBeacons({
            complete: (res)=>{
                resolve();
            }
        });
    }));
}

/**
 * 不知道怎么用，见开发文档
 */
export function onSearchBeacons(): Observable<any> {
    return from(new Promise<any>((resolve,reject)=>{
        wx.onSearchBeacons({
            complete: (res)=> {
                resolve(res);
            }
        });
    }));
}