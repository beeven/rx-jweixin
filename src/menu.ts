import { Observable, from } from 'rxjs';
import wx = require("../lib/jweixin-1.3.2");


export enum Menu {
    
    /** 举报 */
    exposeArticle = "menuItem:exposeArticle",
    /** 调整字体 */
    setFont = "menuItem:setFont",

    /** 日间模式 */
    dayMode = "menuItem:dayMode",

    /** 夜间模式 */
    nightMode = "menuItem:nightMode",

    /** 刷新 */
    refresh = "menuItem:refresh",

    /** 查看公众号（已添加）*/
    profile = "menuItem:profile",

    /** 查看公众号（未添加）*/
    addContact = "menuItem:addContact",



    /** 发送给朋友 */
    addMessage = "menuItem:share:appMessage",

    /** 分享到朋友圈 */
    timeline = "menuItem:share:timeline",

    /** 分享到QQ */
    shareQQ = "menuItem:share:qq",

    /** 分享到Weibo */
    shareWeibo = "menuItem:share:weiboApp",

    /** 收藏 */
    favorite = "menuItem:favorite",

    /** 分享到FB */
    shareFB = "menuItem:share:facebook",

    /** 分享到 QQ 空间 */
    shareQZone = "menuItem:share:QZone",



    /** 编辑标签 */
    editTag = "menuItem:editTag",

    /** 删除 */
    delete = "menuItem:delete",

    /** 复制链接 */
    copyUrl = "menuItem:copyUrl",

    /** 原网页 */
    originalPage = "menuItem:originPage",

    /** 阅读模式 */
    readerMode = "menuItem:readMode",

    /** 在QQ浏览器中打开 */
    openInQQBrowser = "menuItem:openWithQQBrowser",

    /** 在Safari中打开 */
    openInSafari = "menuItem:openWithSafari",

    /** 邮件 */
    mail = "menuItem:share:email",

    /** 一些特殊公众号 */
    brand = "menuItem:share:brand"
}


/** 关闭当前网页窗口 */
export function closeWindow(): void {
    wx.closeWindow();
}

/** 批量隐藏功能按钮 */
export function hideMenu(menuList: Menu[]): void {
    wx.hideMenuItems({
        menuList: menuList
    });
}

/** 批量显示功能按钮接口 */
export function showMenuItems(menuList: Menu[]): void {
    wx.showMenuItems({
        menuList: menuList
    });
}

/** 隐藏所有非基础按钮 */
export function hideAllNonBaseMenuItem(): void {
    wx.hideAllNonBaseMenuItem();
}

/** 显示所有功能按钮接口 */
export function showAllNonBaseMenuItem(): void {
    wx.showAllNonBaseMenuItem();
}