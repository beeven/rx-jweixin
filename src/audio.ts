import { Observable, from } from 'rxjs';
import wx = require("../lib/jweixin-1.3.2");

/**
 * 开始录音
 */
export function startRecording(): void {
    wx.startRecord();
}

/**
 * 停止录音
 * @returns 录音文件localId
 */
export function stopRecording(): Observable<string> {
    return from(new Promise<string>((resolve,reject)=>{
        wx.stopRecord({
            success: (res)=>{
                resolve(res.localId);
            },
            fail: (err) => {
                reject(err);
            }
        });
    }));
}

/**
 * 监听录音自动停止，录音时间超过一分钟没有停止的时候会触发
 * @returns 录音文件localId
 */
export function onVoiceRecordEnd(): Observable<string> {
    return from(new Promise<string>((resolve, reject)=>{
        wx.onVoiceRecordEnd({
            complete: (res)=>{
                resolve(res.localId);
            }
        });
    }));
}


/**
 * 播放语音
 * @param localId 需要播放的音频的本地ID，由stopRecord接口获得
 */
export function playVoice(localId: string): void {
    wx.playVoice({localId: localId});
}


/**
 *暂停播放 (WTF?! 难道可以多个同时播放？)
 * @param localId 需要暂停的音频的本地ID，由stopRecord接口获得
 */
export function pauseVoice(localId: string): void {
    wx.pauseVoice({localId: localId});
}



/**
 * 停止播放 (WTF?! 难道可以做语音叠加？)
 * @param localId 需要停止的音频的本地ID，由stopRecord接口获得
 */
export function stopVoice(localId: string): void {
    wx.stopVoice({localId: localId});
}

/**
 * 监听语音播放完毕
 * @returns 录音文件localId
 */
export function onVoicePlayEnd(): Observable<string> {
    return from(new Promise<string>((resolve, reject)=>{
        wx.onVoicePlayEnd({
            complete: (res)=>{
                resolve(res.localId);
            }
        });
    }));
}


/**
 * 上传语音
 * @param localId 需要上传的音频的本地ID，由stopRecord接口获得
 * @param showProgressTips 显示进度提示
 * @returns 音频的服务器端ID
 */
export function uploadVoice(
    localId: string,
    showProgressTips = true
): Observable<string> {
    return from(new Promise<string>((resolve, reject)=>{
        wx.uploadVoice({
            localId: localId,
            isShowProgressTips: showProgressTips? 1:0,
            success: (res)=>{
                resolve(res.serverId);
            },
            fail: (err) => {
                reject(err);
            }
        });
    }));
}


/**
 * 下载语音
 * @param serverId 需要下载的音频的本地ID，由stopRecord接口获得
 * @param showProgressTips 显示进度提示
 * @returns 音频的服务器端ID
 */
export function downloadVoice(
    serverId: string,
    showProgressTips = true
): Observable<string> {
    return from(new Promise<string>((resolve, reject)=>{
        wx.downloadVoice({
            serverId: serverId,
            isShowProgressTips: showProgressTips? 1:0,
            success: (res)=>{
                resolve(res.localId);
            },
            fail: (err) => {
                reject(err);
            }
        });
    }));
}


/**
 * 语音转文字
 * @param localId 需要识别的音频的本地Id，由录音相关接口获得
 * @param showProgressTips 显示进度提示
 */
export function translateVoice(
    localId: string,
    showProgressTips = true
): Observable<string> {
    return from(new Promise<string>((resolve, reject)=>{
        wx.translateVoice({
            localId: localId,
            isShowProgressTips: showProgressTips ? 1: 0,
            success: (res)=>{
                resolve(res.translateResult);
            },
            fail: (err)=>{
                reject(err);
            }
        });
    }));
}
