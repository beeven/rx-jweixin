import { Observable, from } from 'rxjs';
import wx = require("../lib/jweixin-1.3.2");


export enum ImageSizeType {
    original = 'original',
    compressed = 'compressed'
}

export enum ImageSourceType {
    album = 'album',
    camera = 'camera'
}

/**
 * 拍照或从手机相册中选图接口
 * @param count 数量 1-9
 * @param allowedSizeType 允许原图还是压缩图，默认二者都有
 * @param allowedSourceType 允许来源是相册还是相机，默认二者都有
 * 
 * @returns 选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
 */
export function chooseImage(
    count = 9,
    allowedSizeType = [ImageSizeType.original, ImageSizeType.compressed],
    allowedSourceType = [ImageSourceType.album, ImageSourceType.camera]
): Observable<string[]> {
    return from(new Promise<string[]>((resolve, reject) => {
        wx.chooseImage({
            count: count,
            sizeType: allowedSizeType,
            sourceType: allowedSourceType,
            success: (res) => {
                resolve(res.localIds);
            },
            cancel: () => {
                reject({ errcode: -1, errmsg: "User cancelled" });
            },
            fail: (err) => {
                reject(err);
            }
        });
    }));
}


/**
 * 预览图片
 * @param url 当前显示图片的http链接
 * @param others 需要预览的图片http链接列表
 */
export function previewImage(
    url: string,
    others?: string[]
): void {
    wx.previewImage({
        current: url,
        urls: others
    });
}


/**
 * 上传图片
 * @param localId 需要上传的图片的本地ID，由chooseImage接口获得
 * @param showProgressTips 显示进度提示
 * 
 * @returns 图片的服务器端ID
 */
export function uploadImage(
    localId: string,
    showProgressTips = true
): Observable<string> {
    return from(new Promise<string>((resolve,reject)=>{
        wx.uploadImage({
            localId: localId,
            isShowProgressTips: showProgressTips?1:0,
            success: (res)=>{
                resolve(res.serverId);
            },
            fail: (err)=> {
                reject(err);
            }
        })
    }))
}


/**
 * 下载图片
 * @param serverId 需要下载的图片的服务器端ID，由uploadImage接口获得
 * @param showProgressTips 显示进度提示
 * 
 * @returns 图片下载后的本地ID
 */
export function downloadImage(
    serverId: string,
    showProgressTips = true
): Observable<string> {
    return from(new Promise<string>((resolve,reject)=>{
        wx.downloadImage({
            serverId: serverId,
            isShowProgressTips: showProgressTips?1:0,
            success: (res)=>{
                resolve(res.localId);
            },
            fail: (err)=> {
                reject(err);
            }
        });
    }));
}

/**
 * 获取本地图片
 * @param localId  图片的localID
 * @returns 图片的base64数据，可以用img标签显示
 */
export function getLocalImgData(
    localId: string
): Observable<string> {
    return from(new Promise<string>((resolve,reject)=>{
        wx.getLocalImgData({
            localId: localId,
            success: (res)=> {
                resolve(res.localData);
            },
            fail: (err) => {
                reject(err);
            }
        });
    }));
}