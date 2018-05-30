import { Observable, from } from 'rxjs';
import wx = require("../lib/jweixin-1.3.2");


/**
 * (obsolete) 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
 * @deprecated
 * @param title 分享标题
 * @param link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 * @param imgUrl 分享图标
 */
export function onMenuShareTimeline(
    title: string,
    link: string,
    imgUrl: string
): Observable<void> {
    return from(new Promise<void>((resolve, reject)=>{
        wx.onMenuShareTimeline({
            title: title,
            link: link,
            imgUrl: imgUrl,
            success: ()=>{
                resolve();
            },
            fail: (err)=>{
                reject(err);
            }
        });
    }));
}


export enum ShareType {
    music = "music",
    video = "video",
    link = "link"
}

/**
 * (obsolete) 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
 * @deprecated
 * @param title 分享标题
 * @param description 分享描述
 * @param link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 * @param imgUrl 分享图标
 * @param type 分享类型,music、video或link
 * @param dataUrl 如果type是music或video，则要提供数据链接，默认为空
 */
export function onMenuShareAppMessage(
    title: string,
    description: string,
    link: string,
    imgUrl: string,
    type = ShareType.link,
    dataUrl = ''
): Observable<void> {
    return from(new Promise<void>((resolve, reject)=>{
        wx.onMenuShareAppMessage({
            title: title,
            desc: description,
            link: link,
            imgUrl: imgUrl,
            type: type,
            dataUrl: dataUrl,
            success: ()=>{
                resolve();
            },
            fail: (err)=>{
                reject(err);
            }
        });
    }));
}


/**
 * 获取“分享到QQ”按钮点击状态及自定义分享内容
 * @param title 分享标题
 * @param description 分享描述
 * @param link 分享链接
 * @param imgUrl 分享图标
 */
export function onMenuShareQQ(
    title: string,
    description: string,
    link: string,
    imgUrl: string
): Observable<void> {
    return from(new Promise<void>((resolve,reject)=>{
        wx.onMenuShareQQ({
            title:title,
            desc: description,
            link: link,
            imgUrl: imgUrl,
            success: ()=>{
                resolve();
            },
            cancel: ()=>{
                reject({errcode:-1, errmsg:"User cancelled"})
            },
            fail: (err)=>{
                reject(err);
            }
        });
    }));
}

/**
 * 获取“分享到QQ空间”按钮点击状态及自定义分享内容
 * @param title 分享标题
 * @param description 分享描述
 * @param link 分享链接
 * @param imgUrl 分享图标
 */
export function onMenuShareQZone(
    title: string,
    description: string,
    link: string,
    imgUrl: string
): Observable<void> {
    return from(new Promise<void>((resolve,reject)=>{
        wx.onMenuShareQZone({
            title:title,
            desc: description,
            link: link,
            imgUrl: imgUrl,
            success: ()=>{
                resolve();
            },
            cancel: ()=>{
                reject({errcode:-1, errmsg:"User cancelled"})
            },
            fail: (err)=>{
                reject(err);
            }
        });
    }));
}

/**
 * 获取“分享到腾讯微博”按钮点击状态及自定义分享内容
 * @param title 分享标题
 * @param description 分享描述
 * @param link 分享链接
 * @param imgUrl 分享图标
 */
export function onMenuShareWeibo(
    title: string,
    description: string,
    link: string,
    imgUrl: string
): Observable<void> {
    return from(new Promise<void>((resolve,reject)=>{
        wx.onMenuShareWeibo({
            title:title,
            desc: description,
            link: link,
            imgUrl: imgUrl,
            success: ()=>{
                resolve();
            },
            cancel: ()=>{
                reject({errcode:-1, errmsg:"User cancelled"})
            },
            fail: (err)=>{
                reject(err);
            }
        });
    }));
}
