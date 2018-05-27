import { Observable, from } from 'rxjs';
import wx = require("../lib/jweixin-1.3.2");


export enum ScanType {
    qrCode = "qrCode",
    barCode = "barCode"
}

/**
 * 调起微信扫一扫
 * @param needResult 扫描结果由微信处理，true 则直接返回扫描结果
 * @param scanType 可以指定扫二维码还是条码，默认二者都有
 */
export function scanQRCode(
    needResult = false,
    scanType = [ScanType.qrCode, ScanType.barCode]
): Observable<string> {
    return from(new Promise<string>((resolve, reject)=>{
        wx.ScanQRCode({
            needResult: needResult?1:0,
            scanType: scanType,
            success: (res)=>{
                resolve(res.resultStr);
            },
            cancel: ()=>{
                reject({errcode: -1, errmsg: "User cancelled."});
            },
            fail: (err)=>{
                reject(err);
            }
        });
    }));
}
