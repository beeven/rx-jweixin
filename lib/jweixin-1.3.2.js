! function(e, n) {
    module.exports = n(e)
}
(window, function(window, n) {
    function invoke(funcName, args, handler) {
        window.WeixinJSBridge ? WeixinJSBridge.invoke(funcName, makeDefaultArgument(args), function(res) {
            handleCallback(funcName, res, handler)
        }) : u(funcName, handler)
    }

    function t(n, i, t) {
        window.WeixinJSBridge ? WeixinJSBridge.on(n, function(e) {
            t && t.trigger && t.trigger(e), handleCallback(n, e, i)
        }) : t ? u(n, t) : u(n, i)
    }

    function makeDefaultArgument(e) {
        return e = e || {}, e.appId = Config.appId, e.verifyAppId = Config.appId, e.verifySignType = "sha1", e.verifyTimestamp = Config.timestamp + "", e.verifyNonceStr = Config.nonceStr, e.verifySignature = Config.signature, e
    }

    function r(e) {
        return {
            timeStamp: e.timestamp + "",
            nonceStr: e.nonceStr,
            package: e.package,
            paySign: e.paySign,
            signType: e.signType || "SHA1"
        }
    }

    function a(e) {
        return e.postalCode = e.addressPostalCode, delete e.addressPostalCode, e.provinceName = e.proviceFirstStageName, delete e.proviceFirstStageName, e.cityName = e.addressCitySecondStageName, delete e.addressCitySecondStageName, e.countryName = e.addressCountiesThirdStageName, delete e.addressCountiesThirdStageName, e.detailInfo = e.addressDetailInfo, delete e.addressDetailInfo, e
    }

    function handleCallback(funcName, callbackArgs, handler) {
        "openEnterpriseChat" == funcName && (callbackArgs.errCode = callbackArgs.err_code), delete callbackArgs.err_code, delete callbackArgs.err_desc, delete callbackArgs.err_detail;
        var t = callbackArgs.errMsg;
        t || (t = callbackArgs.err_msg, delete callbackArgs.err_msg, t = s(funcName, t), callbackArgs.errMsg = t), (handler = handler || {})._complete && (handler._complete(callbackArgs), delete handler._complete), t = callbackArgs.errMsg || "", Config.debug && !handler.isInnerInvoke && alert(JSON.stringify(callbackArgs));
        var o = t.indexOf(":");
        switch (t.substring(o + 1)) {
            case "ok":
                handler.success && handler.success(callbackArgs);
                break;
            case "cancel":
                handler.cancel && handler.cancel(callbackArgs);
                break;
            default:
                handler.fail && handler.fail(callbackArgs)
        }
        handler.complete && handler.complete(callbackArgs)
    }

    function s(e, n) {
        var i = e,
            t = v[i];
        t && (i = t);
        var o = "ok";
        if (n) {
            var r = n.indexOf(":");
            "confirm" == (o = n.substring(r + 1)) && (o = "ok"), "failed" == o && (o = "fail"), -1 != o.indexOf("failed_") && (o = o.substring(7)), -1 != o.indexOf("fail_") && (o = o.substring(5)), "access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"), "config" == i && "function not exist" == o && (o = "ok"), "" == o && (o = "fail")
        }
        return n = i + ":" + o
    }

    function d(e) {
        if (e) {
            for (var n = 0, i = e.length; n < i; ++n) {
                var t = e[n],
                    o = h[t];
                o && (e[n] = o)
            }
            return e
        }
    }

    function u(e, n) {
        if (!(!Config.debug || n && n.isInnerInvoke)) {
            var i = v[e];
            i && (e = i), n && n._complete && delete n._complete, console.log('"' + e + '",', n || "")
        }
    }

    function l(e) {
        if (!(w || T || Config.debug || x < "6.0.2" || V.systemType < 0)) {
            var n = new Image;
            V.appId = Config.appId, V.initTime = A.initEndTime - A.initStartTime, V.preVerifyTime = A.preVerifyEndTime - A.preVerifyStartTime, N.getNetworkType({
                isInnerInvoke: !0,
                success: function(e) {
                    V.networkType = e.networkType;
                    var i = "https://open.weixin.qq.com/sdk/report?v=" + V.version + "&o=" + V.isPreVerifyOk + "&s=" + V.systemType + "&c=" + V.clientVersion + "&a=" + V.appId + "&n=" + V.networkType + "&i=" + V.initTime + "&p=" + V.preVerifyTime + "&u=" + V.url;
                    n.src = i
                }
            })
        }
    }

    function p() {
        return (new Date).getTime()
    }

    function f(n) {
        k && (window.WeixinJSBridge ? n() : document.addEventListener && document.addEventListener("WeixinJSBridgeReady", n, !1))
    }

    function m() {
        N.invoke || (N.invoke = function(n, i, t) {
            window.WeixinJSBridge && WeixinJSBridge.invoke(n, makeDefaultArgument(i), t)
        }, N.on = function(n, i) {
            window.WeixinJSBridge && WeixinJSBridge.on(n, i)
        })
    }

    function g(e) {
        if ("string" == typeof e && e.length > 0) {
            var n = e.split("?")[0],
                i = e.split("?")[1];
            return n += ".html", void 0 !== i ? n + "?" + i : n
        }
    }
    if (!window.jWeixin) {
        var h = {
                config: "preVerifyJSAPI",
                onMenuShareTimeline: "menu:share:timeline",
                onMenuShareAppMessage: "menu:share:appmessage",
                onMenuShareQQ: "menu:share:qq",
                onMenuShareWeibo: "menu:share:weiboApp",
                onMenuShareQZone: "menu:share:QZone",
                previewImage: "imagePreview",
                getLocation: "geoLocation",
                openProductSpecificView: "openProductViewWithPid",
                addCard: "batchAddCard",
                openCard: "batchViewCard",
                chooseWXPay: "getBrandWCPayRequest",
                openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
                startSearchBeacons: "startMonitoringBeacons",
                stopSearchBeacons: "stopMonitoringBeacons",
                onSearchBeacons: "onBeaconsInRange",
                consumeAndShareCard: "consumedShareCard",
                openAddress: "editAddress"
            },
            v = function() {
                var e = {};
                for (var n in h) e[h[n]] = n;
                return e
            }(),
            document = window.document,
            DocumentTitle = document.title,
            y = navigator.userAgent.toLowerCase(),
            _ = navigator.platform.toLowerCase(),
            w = !(!_.match("mac") && !_.match("win")),
            T = -1 != y.indexOf("wxdebugger"),
            k = -1 != y.indexOf("micromessenger"),
            isAndroid = -1 != y.indexOf("android"),
            isiOS = -1 != y.indexOf("iphone") || -1 != y.indexOf("ipad"),
            x = function() {
                var e = y.match(/micromessenger\/(\d+\.\d+\.\d+)/) || y.match(/micromessenger\/(\d+\.\d+)/);
                return e ? e[1] : ""
            }(),
            A = {
                initStartTime: p(),
                initEndTime: 0,
                preVerifyStartTime: 0,
                preVerifyEndTime: 0
            },
            V = {
                version: 1,
                appId: "",
                initTime: 0,
                preVerifyTime: 0,
                networkType: "",
                isPreVerifyOk: 1,
                systemType: isiOS ? 1 : isAndroid ? 2 : -1,
                clientVersion: x,
                url: encodeURIComponent(location.href)
            },
            Config = {},
            L = {
                _completes: []
            },
            B = {
                state: 0,
                data: {}
            };
        f(function() {
            A.initEndTime = p()
        });
        var O = !1,
            E = [],
            N = {
                config: function(e) {
                    Config = e, u("config", e);
                    var n = !1 !== Config.check;
                    f(function() {
                        if (n) invoke(h.config, {
                            verifyJsApiList: d(Config.jsApiList)
                        }, function() {
                            L._complete = function(e) {
                                A.preVerifyEndTime = p(), B.state = 1, B.data = e
                            }, L.success = function(e) {
                                V.isPreVerifyOk = 0
                            }, L.fail = function(e) {
                                L._fail ? L._fail(e) : B.state = -1
                            };
                            var e = L._completes;
                            return e.push(function() {
                                l()
                            }), L.complete = function(n) {
                                for (var i = 0, t = e.length; i < t; ++i) e[i]();
                                L._completes = []
                            }, L
                        }()), A.preVerifyStartTime = p();
                        else {
                            B.state = 1;
                            for (var e = L._completes, t = 0, o = e.length; t < o; ++t) e[t]();
                            L._completes = []
                        }
                    }), m()
                },
                ready: function(e) {
                    0 != B.state ? e() : (L._completes.push(e), !k && Config.debug && e())
                },
                error: function(e) {
                    x < "6.0.2" || (-1 == B.state ? e(B.data) : L._fail = e)
                },
                checkJsApi: function(e) {
                    var n = function(e) {
                        var n = e.checkResult;
                        for (var i in n) {
                            var t = v[i];
                            t && (n[t] = n[i], delete n[i])
                        }
                        return e
                    };
                    invoke("checkJsApi", {
                        jsApiList: d(e.jsApiList)
                    }, (e._complete = function(e) {
                        if (isAndroid) {
                            var i = e.checkResult;
                            i && (e.checkResult = JSON.parse(i))
                        }
                        e = n(e)
                    }, e))
                },
                onMenuShareTimeline: function(e) {
                    t(h.onMenuShareTimeline, {
                        complete: function() {
                            invoke("shareTimeline", {
                                title: e.title || DocumentTitle,
                                desc: e.title || DocumentTitle,
                                img_url: e.imgUrl || "",
                                link: e.link || location.href,
                                type: e.type || "link",
                                data_url: e.dataUrl || ""
                            }, e)
                        }
                    }, e)
                },
                onMenuShareAppMessage: function(e) {
                    t(h.onMenuShareAppMessage, {
                        complete: function(n) {
                            "favorite" === n.scene ? invoke("sendAppMessage", {
                                title: e.title || DocumentTitle,
                                desc: e.desc || "",
                                link: e.link || location.href,
                                img_url: e.imgUrl || "",
                                type: e.type || "link",
                                data_url: e.dataUrl || ""
                            }) : invoke("sendAppMessage", {
                                title: e.title || DocumentTitle,
                                desc: e.desc || "",
                                link: e.link || location.href,
                                img_url: e.imgUrl || "",
                                type: e.type || "link",
                                data_url: e.dataUrl || ""
                            }, e)
                        }
                    }, e)
                },
                onMenuShareQQ: function(e) {
                    t(h.onMenuShareQQ, {
                        complete: function() {
                            invoke("shareQQ", {
                                title: e.title || DocumentTitle,
                                desc: e.desc || "",
                                img_url: e.imgUrl || "",
                                link: e.link || location.href
                            }, e)
                        }
                    }, e)
                },
                onMenuShareWeibo: function(e) {
                    t(h.onMenuShareWeibo, {
                        complete: function() {
                            invoke("shareWeiboApp", {
                                title: e.title || DocumentTitle,
                                desc: e.desc || "",
                                img_url: e.imgUrl || "",
                                link: e.link || location.href
                            }, e)
                        }
                    }, e)
                },
                onMenuShareQZone: function(e) {
                    t(h.onMenuShareQZone, {
                        complete: function() {
                            invoke("shareQZone", {
                                title: e.title || DocumentTitle,
                                desc: e.desc || "",
                                img_url: e.imgUrl || "",
                                link: e.link || location.href
                            }, e)
                        }
                    }, e)
                },
                startRecord: function(e) {
                    invoke("startRecord", {}, e)
                },
                stopRecord: function(e) {
                    invoke("stopRecord", {}, e)
                },
                onVoiceRecordEnd: function(e) {
                    t("onVoiceRecordEnd", e)
                },
                playVoice: function(e) {
                    invoke("playVoice", {
                        localId: e.localId
                    }, e)
                },
                pauseVoice: function(e) {
                    invoke("pauseVoice", {
                        localId: e.localId
                    }, e)
                },
                stopVoice: function(e) {
                    invoke("stopVoice", {
                        localId: e.localId
                    }, e)
                },
                onVoicePlayEnd: function(e) {
                    t("onVoicePlayEnd", e)
                },
                uploadVoice: function(e) {
                    invoke("uploadVoice", {
                        localId: e.localId,
                        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                    }, e)
                },
                downloadVoice: function(e) {
                    invoke("downloadVoice", {
                        serverId: e.serverId,
                        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                    }, e)
                },
                translateVoice: function(e) {
                    invoke("translateVoice", {
                        localId: e.localId,
                        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                    }, e)
                },
                chooseImage: function(e) {
                    invoke("chooseImage", {
                        scene: "1|2",
                        count: e.count || 9,
                        sizeType: e.sizeType || ["original", "compressed"],
                        sourceType: e.sourceType || ["album", "camera"]
                    }, (e._complete = function(e) {
                        if (isAndroid) {
                            var n = e.localIds;
                            n && (e.localIds = JSON.parse(n))
                        }
                    }, e))
                },
                getLocation: function(e) {},
                previewImage: function(e) {
                    invoke(h.previewImage, {
                        current: e.current,
                        urls: e.urls
                    }, e)
                },
                uploadImage: function(e) {
                    invoke("uploadImage", {
                        localId: e.localId,
                        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                    }, e)
                },
                downloadImage: function(e) {
                    invoke("downloadImage", {
                        serverId: e.serverId,
                        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                    }, e)
                },
                getLocalImgData: function(e) {
                    !1 === O ? (O = !0, invoke("getLocalImgData", {
                        localId: e.localId
                    }, (e._complete = function(e) {
                        if (O = !1, E.length > 0) {
                            var n = E.shift();
                            wx.getLocalImgData(n)
                        }
                    }, e))) : E.push(e)
                },
                getNetworkType: function(e) {
                    var n = function(e) {
                        var n = e.errMsg;
                        e.errMsg = "getNetworkType:ok";
                        var i = e.subtype;
                        if (delete e.subtype, i) e.networkType = i;
                        else {
                            var t = n.indexOf(":"),
                                o = n.substring(t + 1);
                            switch (o) {
                                case "wifi":
                                case "edge":
                                case "wwan":
                                    e.networkType = o;
                                    break;
                                default:
                                    e.errMsg = "getNetworkType:fail"
                            }
                        }
                        return e
                    };
                    invoke("getNetworkType", {}, (e._complete = function(e) {
                        e = n(e)
                    }, e))
                },
                openLocation: function(e) {
                    invoke("openLocation", {
                        latitude: e.latitude,
                        longitude: e.longitude,
                        name: e.name || "",
                        address: e.address || "",
                        scale: e.scale || 28,
                        infoUrl: e.infoUrl || ""
                    }, e)
                },
                getLocation: function(e) {
                    e = e || {}, invoke(h.getLocation, {
                        type: e.type || "wgs84"
                    }, (e._complete = function(e) {
                        delete e.type
                    }, e))
                },
                hideOptionMenu: function(e) {
                    invoke("hideOptionMenu", {}, e)
                },
                showOptionMenu: function(e) {
                    invoke("showOptionMenu", {}, e)
                },
                closeWindow: function(e) {
                    invoke("closeWindow", {}, e = e || {})
                },
                hideMenuItems: function(e) {
                    invoke("hideMenuItems", {
                        menuList: e.menuList
                    }, e)
                },
                showMenuItems: function(e) {
                    invoke("showMenuItems", {
                        menuList: e.menuList
                    }, e)
                },
                hideAllNonBaseMenuItem: function(e) {
                    invoke("hideAllNonBaseMenuItem", {}, e)
                },
                showAllNonBaseMenuItem: function(e) {
                    invoke("showAllNonBaseMenuItem", {}, e)
                },
                scanQRCode: function(e) {
                    invoke("scanQRCode", {
                        needResult: (e = e || {}).needResult || 0,
                        scanType: e.scanType || ["qrCode", "barCode"]
                    }, (e._complete = function(e) {
                        if (isiOS) {
                            var n = e.resultStr;
                            if (n) {
                                var i = JSON.parse(n);
                                e.resultStr = i && i.scan_code && i.scan_code.scan_result
                            }
                        }
                    }, e))
                },
                openAddress: function(e) {
                    invoke(h.openAddress, {}, (e._complete = function(e) {
                        e = a(e)
                    }, e))
                },
                openProductSpecificView: function(e) {
                    invoke(h.openProductSpecificView, {
                        pid: e.productId,
                        view_type: e.viewType || 0,
                        ext_info: e.extInfo
                    }, e)
                },
                addCard: function(e) {
                    for (var n = e.cardList, t = [], o = 0, r = n.length; o < r; ++o) {
                        var a = n[o],
                            c = {
                                card_id: a.cardId,
                                card_ext: a.cardExt
                            };
                        t.push(c)
                    }
                    invoke(h.addCard, {
                        card_list: t
                    }, (e._complete = function(e) {
                        var n = e.card_list;
                        if (n) {
                            for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {
                                var o = n[i];
                                o.cardId = o.card_id, o.cardExt = o.card_ext, o.isSuccess = !!o.is_succ, delete o.card_id, delete o.card_ext, delete o.is_succ
                            }
                            e.cardList = n, delete e.card_list
                        }
                    }, e))
                },
                chooseCard: function(e) {
                    invoke("chooseCard", {
                        app_id: Config.appId,
                        location_id: e.shopId || "",
                        sign_type: e.signType || "SHA1",
                        card_id: e.cardId || "",
                        card_type: e.cardType || "",
                        card_sign: e.cardSign,
                        time_stamp: e.timestamp + "",
                        nonce_str: e.nonceStr
                    }, (e._complete = function(e) {
                        e.cardList = e.choose_card_info, delete e.choose_card_info
                    }, e))
                },
                openCard: function(e) {
                    for (var n = e.cardList, t = [], o = 0, r = n.length; o < r; ++o) {
                        var a = n[o],
                            c = {
                                card_id: a.cardId,
                                code: a.code
                            };
                        t.push(c)
                    }
                    invoke(h.openCard, {
                        card_list: t
                    }, e)
                },
                consumeAndShareCard: function(e) {
                    invoke(h.consumeAndShareCard, {
                        consumedCardId: e.cardId,
                        consumedCode: e.code
                    }, e)
                },
                chooseWXPay: function(e) {
                    invoke(h.chooseWXPay, r(e), e)
                },
                openEnterpriseRedPacket: function(e) {
                    invoke(h.openEnterpriseRedPacket, r(e), e)
                },
                startSearchBeacons: function(e) {
                    invoke(h.startSearchBeacons, {
                        ticket: e.ticket
                    }, e)
                },
                stopSearchBeacons: function(e) {
                    invoke(h.stopSearchBeacons, {}, e)
                },
                onSearchBeacons: function(e) {
                    t(h.onSearchBeacons, e)
                },
                openEnterpriseChat: function(e) {
                    invoke("openEnterpriseChat", {
                        useridlist: e.userIds,
                        chatname: e.groupName
                    }, e)
                },
                launchMiniProgram: function(e) {
                    invoke("launchMiniProgram", {
                        targetAppId: e.targetAppId,
                        path: g(e.path),
                        envVersion: e.envVersion
                    }, e)
                },
                miniProgram: {
                    navigateBack: function(e) {
                        e = e || {}, f(function() {
                            invoke("invokeMiniProgramAPI", {
                                name: "navigateBack",
                                arg: {
                                    delta: e.delta || 1
                                }
                            }, e)
                        })
                    },
                    navigateTo: function(e) {
                        f(function() {
                            invoke("invokeMiniProgramAPI", {
                                name: "navigateTo",
                                arg: {
                                    url: e.url
                                }
                            }, e)
                        })
                    },
                    redirectTo: function(e) {
                        f(function() {
                            invoke("invokeMiniProgramAPI", {
                                name: "redirectTo",
                                arg: {
                                    url: e.url
                                }
                            }, e)
                        })
                    },
                    switchTab: function(e) {
                        f(function() {
                            invoke("invokeMiniProgramAPI", {
                                name: "switchTab",
                                arg: {
                                    url: e.url
                                }
                            }, e)
                        })
                    },
                    reLaunch: function(e) {
                        f(function() {
                            invoke("invokeMiniProgramAPI", {
                                name: "reLaunch",
                                arg: {
                                    url: e.url
                                }
                            }, e)
                        })
                    },
                    postMessage: function(e) {
                        f(function() {
                            invoke("invokeMiniProgramAPI", {
                                name: "postMessage",
                                arg: e.data || {}
                            }, e)
                        })
                    },
                    getEnv: function(n) {
                        f(function() {
                            n({
                                miniprogram: "miniprogram" === window.__wxjs_environment
                            })
                        })
                    }
                }
            },
            b = 1,
            R = {};
        return document.addEventListener("error", function(e) {
            if (!isAndroid) {
                var n = e.target,
                    i = n.tagName,
                    t = n.src;
                if (("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) && -1 != t.indexOf("wxlocalresource://")) {
                    e.preventDefault(), e.stopPropagation();
                    var o = n["wx-id"];
                    if (o || (o = b++, n["wx-id"] = o), R[o]) return;
                    R[o] = !0, wx.ready(function() {
                        wx.getLocalImgData({
                            localId: t,
                            success: function(e) {
                                n.src = e.localData
                            }
                        })
                    })
                }
            }
        }, !0), document.addEventListener("load", function(ev) {
            if (!isAndroid) {
                var elem = ev.target,
                    i = elem.tagName;
                elem.src;
                if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {
                    var t = elem["wx-id"];
                    t && (R[t] = !1)
                }
            }
        }, !0), n && (window.wx = window.jWeixin = N), N
    }
});