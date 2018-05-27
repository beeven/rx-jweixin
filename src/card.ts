/** TODO: 确认返回类型，微信文档没有注解  */
import { Observable, from } from 'rxjs';
import wx = require("../lib/jweixin-1.3.2");



/**
 * 拉取适用卡券列表并获取用户选择信息
 * 拉取列表仅与用户本地卡券有关，拉起列表异常为空的情况通常有三种：签名错误、时间戳无效、筛选机制有误。请开发者依次排查定位原因。
 * 
 * @param timestamp 卡券签名时间戳
 * @param nonceStr 卡券签名随机串
 * @param cardSign 卡券签名
 * @param signType 签名方式，默认'SHA1'
 * @param shopId 门店Id, shopID用于筛选出拉起带有指定location_list(shopID)的卡券列表
 * @param cardType 卡券类型, 用于拉起指定卡券类型的卡券列表。当cardType为空时，默认拉起所有卡券的列表.
 * @param cardId 卡券Id, 用于拉起指定cardId的卡券列表，当cardId为空时，默认拉起所有卡券的列表
 * 
 * @returns 用户选中的卡券列表信息
 * 
 * @link https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
export function chooseCard(
    timestamp: number,
    nonceStr: string,
    cardSign: string,
    signType: string = 'SHA1',
    shopId?: string,
    cardType?: string,
    cardId?: string
): Observable<any> {
    return from(new Promise<any>((resolve, reject) => {
        wx.chooseCard({
            shopId: shopId,
            cardType: cardType,
            timestamp: timestamp,
            nonceStr: nonceStr,
            signType: signType,
            cardSign: cardSign,
            success: (res) => {
                resolve(res.cardList);
            },
            fail: (err) => {
                reject(err);
            }
        })
    }))
}


/** 商户为该张卡券分配的唯一性信息 */
export class CardExt {

    constructor(
        /** 时间戳
         *  商户生成从1970年1月1日00:00:00至今的秒数,即当前的时间,且最终需要转换为字符串形式;由商户生成后传入,不同添加请求的时间戳须动态生成，若重复将会导致领取失败！。 
        */
        public timestamp: number,

        /** 签名，商户将接口列表中的参数按照指定方式进行签名,签名方式使用SHA1 */
        public signature: string,

        /** 指定的卡券code码，只能被领一次。
         *  自定义code模式的卡券必须填写，非自定义code和预存code模式的卡券不必填写。详情见： 是否自定义code码 
        */
        public code?: string,
        /** 指定领取者的openid只有该用户能领取。
         * bind_openid字段为true的卡券必须填写，bind_openid字段为false不必填写。 
        */
        public openid?: string,

        /** 随机字符串，由开发者设置传入， 加强安全性（若不填写可能被重放请求） 。
         * 随机字符串，不长于32位。推荐使用大小写字母和数字，不同添加请求的nonce须动态生成，若重复将会导致领取失败。 */
        public nonce_str?: string,
        /** 卡券在第三方系统的实际领取时间，为东八区时间戳（UTC+8,精确到秒）。
         * 当卡券的有效期类型为 DAT E_TYPE_FIX_TERM时专用，标识卡券的实际生效时间，用于解决商户系统内起始时间和领取时间不同步的问题。 */
        public fixed_begintimestamp?: number,
        /** 领取渠道参数，用于标识本次领取的渠道值。 */
        public outer_str?: string,

        ...args: any[]
    ) { }
}

export class CardInfo {
    constructor(public cardId: string, public cardExt: CardExt) { }
}

/**
 * 批量添加卡券接口
 * @param cardList 需要添加的卡券列表
 * @returns 添加的卡券列表信息
 */
export function addCard(
    cardList: CardInfo[]
): Observable<any> {
    return from(new Promise<any>((resolve, reject) => {
        wx.addCard({
            cardList: cardList,
            success: (res) => {
                resolve(res.cardList);
            }
        });
    }));
}


export class Card {
    constructor(public cardId: string, public code: string) { }
}

/** 查看微信卡包中的卡券 */
export function openCard(
    cardList: Card[]
): void {
    wx.openCard({
        cardList: cardList
    });
}
