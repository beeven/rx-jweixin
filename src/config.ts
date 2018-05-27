import { Observable, from } from 'rxjs';
import wx = require("../lib/jweixin-1.3.2");
import { JsApi } from './jsApi';

/**
     * Configure wx
     * @param appId AppId
     * @param nonceStr Random string
     * @param timestamp Timestamp in seconds
     * @param signature Signature returned by server
     * @param jsApiList APIs to check
     * @param debug Enable debug mode
     * @param beta Enable invoke method
     */
export function config(
        appId: string, 
        nonceStr: string, 
        timestamp: number|Date,
        signature: string,
        jsApiList: JsApi[],
        debug = false,
        beta = false
    ): Observable<null> {
        return from(new Promise<null>((resolve,reject)=>{
                    wx.config({
                        appId: appId,
                        nonceStr: nonceStr,
                        timestamp: timestamp,
                        signature: signature,
                        jsApiList: jsApiList,
                        debug: debug,
                        beta: beta
                    });
                    wx.ready(()=> resolve());
                    wx.error((err)=> reject(err));
                })
        );
    }