import { Observable, from } from 'rxjs';
import wx = require("../lib/jweixin-1.3.2");

export function launchMiniProgram(
    targetAppId: string,
    path: string,
    envVersion: string
): Observable<any> {
    return from(new Promise<any>((resolve, reject)=>{
        wx.launchMiniProgram({
            targetAppId: targetAppId,
            path: path,
            envVersion: envVersion,
            success: (res)=>{
                resolve(res);
            }
        })
    }))
}