import { Observable, from } from 'rxjs';
import wx = require("../lib/jweixin-1.3.2");

/** 详情页样式 */
export enum ViewType {
    /** 普通商品详情 */
    normal = 0,
    /** 扫一扫商品详情 */
    scan = 1,
    /** 小店商品详情 */
    shop = 2
}

export function openProductSpecificView(
    productId: string,
    viewType: ViewType = ViewType.normal
): void {
    wx.openProductSpecificView({
        productId: productId,
        viewType: viewType
    });
}

/** 收货地址 */
export interface Address {
    /** 收货人姓名 */
    userName: string;
    /** 邮编 */
    postalCode: string;
    /** 国标收货地址第一级地址（省） */
    provinceName: string;
    /** 国标收货地址第二级地址（市） */
    cityName: string;
    /** 国标收货地址第三级地址（国家） */
    countryName: string;
    /** 详细收货地址信息 */
    detailInfo: string;
    /** 收货地址国家码 */
    nationalCode: string;
    /** 收货人手机号码 */
    telNumber: string;
}

/** 共享收货地址接口 */
export function openAddress(): Observable<Address> {
    return from(new Promise<Address>((resolve, reject)=>{
        wx.openAddress({
            success: (res)=> resolve(res)
        });
    }));
}