import { Observable, from } from 'rxjs';
import wx = require("../lib/jweixin-1.3.2");


export enum SignType {
    sha1 = "SHA1",
    md5 = "MD5",
    hmac_sha256 = "HMAC-SHA256"
}



/**
 * 发起一个微信支付请求
 * @param timestamp 当前的时间
 * @param nonceStr 随机字符串，不长于32位。
 * @param prepayId 统一下单接口返回的prepay_id参数值
 * @param paySign paySign 采用统一的微信支付 Sign 签名生成方法，注意这里 appId 也要参与签名，appId 与 config 中传入的 appId 一致，即最后参与签名的参数有appId, timeStamp, nonceStr, package, signType。
 * @param signType 签名方式，默认为MD5，支持HMAC-SHA256和MD5。注意此处需与统一下单的签名类型一致
 */
export function chooseWXPay(
    timestamp: number,
    nonceStr: string,
    prepayId: string,
    paySign: string,
    signType = SignType.md5
): Observable<void> {
    return from(new Promise<void>((resolve,reject)=>{
        wx.chooseWXPay({
            timestamp: timestamp,
            nonceStr: nonceStr,
            package: `prepayId=${prepayId}`,
            signType: signType,
            paySign: paySign,
            success: (res)=>{
                if(res.err_msg == 'get_brand_wcpay_request:ok'){
                    resolve();
                } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                    reject({errcode:-1, errmsg:"User cancelled"});
                } else if (res.err_msg == 'get_brand_wcpay_request:fail') {
                    reject({errcode: res.err_code, errmsg: res.err_msg});
                } else {
                    reject(res);
                }
            },
            fail: (err)=>{
                reject(err);
            }
        })
    }));
}