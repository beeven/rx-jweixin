import { Observable, from } from 'rxjs';

import wx = require("../lib/jweixin-1.3.2");

/** 坐标类型 */
export enum LocationType {
    /** wgs84类型GPS坐标 */
    wgs84 = "wgs84",
    /** 供openLocation用的坐标 */
    gcj02 = "gcj02"
}

/** 地理位置类型 */
export interface Location {
    /** 纬度，浮点数，范围为90 ~ -90 */
    latitude: number;
    /** 经度，浮点数，范围为180 ~ -180 */
    longitude: number;
    /** 速度，单位为米/每秒 */
    speed: number;
    /** 位置精度 */
    accuracy: number;
}

/**
* Geographic location
* @param type 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
* 
* @returns 地理位置坐标
*/
export function getLocation(type: LocationType): Observable<Location> {
   return from(new Promise<Location>((resolve,reject)=>{
           wx.getLocation({
               type: type,
               success: (res) => {
                   resolve({
                       latitude: res.latitude,
                       longitude: res.longitude,
                       speed: res.speed,
                       accuracy: res.accuracy
                   });
               },
               fail: (err) => {
                   reject(err);
               }
           });
       }));
}


/**
 * 使用微信内置地图查看位置
 * @param latitude 纬度，浮点数，范围为90 ~ -90
 * @param longitude 经度，浮点数，范围为180 ~ -180
 * @param name 位置名
 * @param address 地址详情说明
 * @param scale 地图缩放级别,整形值,范围从1~28。默认为最大
 * @param infoUrl 在查看位置界面底部显示的超链接,可点击跳转
 */
export function openLocation(
    latitude: number,
    longitude: number,
    name = '',
    address = '',
    scale = 1,
    infoUrl = ''
): void {
    wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        name: name,
        address: address,
        scale: scale,
        infoUrl: infoUrl
    });
}