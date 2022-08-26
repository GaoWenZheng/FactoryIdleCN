var PlayFab = typeof PlayFab != "undefined" ? PlayFab : {};
PlayFab.settings || (PlayFab.settings = {
    titleId: null,
    developerSecretKey: null,
    advertisingIdType: null,
    advertisingIdValue: null,
    disableAdvertising: !1,
    AD_TYPE_IDFA: "Idfa",
    AD_TYPE_ANDROID_ID: "Android_Id"
}),
    PlayFab._internalSettings || (PlayFab._internalSettings = {
        sessionTicket: null,
        sdkVersion: "0.9.160201",
        productionServerUrl: ".playfabapi.com",
        logicServerUrl: null,
        GetServerUrl: function () {
            return "https://" + PlayFab.settings.titleId + PlayFab._internalSettings.productionServerUrl
        },
        GetLogicServerUrl: function () {
            return PlayFab._internalSettings.logicServerUrl
        },
        ExecuteRequest: function (e, t, n, r, i) {
            if (i != null && typeof i != "function") throw "Callback must be null of a function";
            t == null && (t = {});
            var s = new Date,
                o = JSON.stringify(t),
                u = new XMLHttpRequest;
            u.open("POST", e, !0),
                u.setRequestHeader("Content-Type", "application/json"),
                n != null && u.setRequestHeader(n, r),
                u.setRequestHeader("X-PlayFabSDK", "JavaScriptSDK-" + PlayFab._internalSettings.sdkVersion),
                u.onloadend = function () {
                    if (i == null) return;
                    var e;
                    try {
                        e = JSON.parse(u.responseText)
                    } catch (t) {
                        e = {
                            code: 503,
                            status: "Service Unavailable",
                            error: "Connection error",
                            errorCode: 2,
                            errorMessage: u.responseText
                        }
                    }
                    e.CallBackTimeMS = new Date - s,
                        e.code === 200 ? i(e, null) : i(null, e)
                },
                u.onerror = function () {
                    if (i == null) return;
                    var e;
                    try {
                        e = JSON.parse(u.responseText)
                    } catch (t) {
                        e = {
                            code: 503,
                            status: "Service Unavailable",
                            error: "Connection error",
                            errorCode: 2,
                            errorMessage: u.responseText
                        }
                    }
                    e.CallBackTimeMS = new Date - s,
                        i(null, e)
                },
                u.send(o)
        }
    }),
    PlayFab.ClientApi = {
        GetPhotonAuthenticationToken: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPhotonAuthenticationToken", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        LoginWithAndroidDeviceID: function (e, t) {
            e.TitleId = PlayFab.settings.titleId != null ? PlayFab.settings.titleId : e.TitleId;
            if (e.TitleId == null) throw "Must be have PlayFab.settings.titleId set to call this method";
            var n = function (e, n) {
                e != null && e.data.SessionTicket != null && (PlayFab._internalSettings.sessionTicket = e.data.SessionTicket, PlayFab.ClientApi._MultiStepClientLogin(e.data.SettingsForUser.NeedsAttribution)),
                    t != null && typeof t == "function" && t(e, n)
            };
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithAndroidDeviceID", e, null, null, n)
        },
        LoginWithCustomID: function (e, t) {
            e.TitleId = PlayFab.settings.titleId != null ? PlayFab.settings.titleId : e.TitleId;
            if (e.TitleId == null) throw "Must be have PlayFab.settings.titleId set to call this method";
            var n = function (e, n) {
                e != null && e.data.SessionTicket != null && (PlayFab._internalSettings.sessionTicket = e.data.SessionTicket, PlayFab.ClientApi._MultiStepClientLogin(e.data.SettingsForUser.NeedsAttribution)),
                    t != null && typeof t == "function" && t(e, n)
            };
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithCustomID", e, null, null, n)
        },
        LoginWithEmailAddress: function (e, t) {
            e.TitleId = PlayFab.settings.titleId != null ? PlayFab.settings.titleId : e.TitleId;
            if (e.TitleId == null) throw "Must be have PlayFab.settings.titleId set to call this method";
            var n = function (e, n) {
                e != null && e.data.SessionTicket != null && (PlayFab._internalSettings.sessionTicket = e.data.SessionTicket, PlayFab.ClientApi._MultiStepClientLogin(e.data.SettingsForUser.NeedsAttribution)),
                    t != null && typeof t == "function" && t(e, n)
            };
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithEmailAddress", e, null, null, n)
        },
        LoginWithFacebook: function (e, t) {
            e.TitleId = PlayFab.settings.titleId != null ? PlayFab.settings.titleId : e.TitleId;
            if (e.TitleId == null) throw "Must be have PlayFab.settings.titleId set to call this method";
            var n = function (e, n) {
                e != null && e.data.SessionTicket != null && (PlayFab._internalSettings.sessionTicket = e.data.SessionTicket, PlayFab.ClientApi._MultiStepClientLogin(e.data.SettingsForUser.NeedsAttribution)),
                    t != null && typeof t == "function" && t(e, n)
            };
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithFacebook", e, null, null, n)
        },
        LoginWithGameCenter: function (e, t) {
            e.TitleId = PlayFab.settings.titleId != null ? PlayFab.settings.titleId : e.TitleId;
            if (e.TitleId == null) throw "Must be have PlayFab.settings.titleId set to call this method";
            var n = function (e, n) {
                e != null && e.data.SessionTicket != null && (PlayFab._internalSettings.sessionTicket = e.data.SessionTicket, PlayFab.ClientApi._MultiStepClientLogin(e.data.SettingsForUser.NeedsAttribution)),
                    t != null && typeof t == "function" && t(e, n)
            };
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithGameCenter", e, null, null, n)
        },
        LoginWithGoogleAccount: function (e, t) {
            e.TitleId = PlayFab.settings.titleId != null ? PlayFab.settings.titleId : e.TitleId;
            if (e.TitleId == null) throw "Must be have PlayFab.settings.titleId set to call this method";
            var n = function (e, n) {
                e != null && e.data.SessionTicket != null && (PlayFab._internalSettings.sessionTicket = e.data.SessionTicket, PlayFab.ClientApi._MultiStepClientLogin(e.data.SettingsForUser.NeedsAttribution)),
                    t != null && typeof t == "function" && t(e, n)
            };
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithGoogleAccount", e, null, null, n)
        },
        LoginWithIOSDeviceID: function (e, t) {
            e.TitleId = PlayFab.settings.titleId != null ? PlayFab.settings.titleId : e.TitleId;
            if (e.TitleId == null) throw "Must be have PlayFab.settings.titleId set to call this method";
            var n = function (e, n) {
                e != null && e.data.SessionTicket != null && (PlayFab._internalSettings.sessionTicket = e.data.SessionTicket, PlayFab.ClientApi._MultiStepClientLogin(e.data.SettingsForUser.NeedsAttribution)),
                    t != null && typeof t == "function" && t(e, n)
            };
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithIOSDeviceID", e, null, null, n)
        },
        LoginWithKongregate: function (e, t) {
            e.TitleId = PlayFab.settings.titleId != null ? PlayFab.settings.titleId : e.TitleId;
            if (e.TitleId == null) throw "Must be have PlayFab.settings.titleId set to call this method";
            var n = function (e, n) {
                e != null && e.data.SessionTicket != null && (PlayFab._internalSettings.sessionTicket = e.data.SessionTicket, PlayFab.ClientApi._MultiStepClientLogin(e.data.SettingsForUser.NeedsAttribution)),
                    t != null && typeof t == "function" && t(e, n)
            };
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithKongregate", e, null, null, n)
        },
        LoginWithPlayFab: function (e, t) {
            e.TitleId = PlayFab.settings.titleId != null ? PlayFab.settings.titleId : e.TitleId;
            if (e.TitleId == null) throw "Must be have PlayFab.settings.titleId set to call this method";
            var n = function (e, n) {
                e != null && e.data.SessionTicket != null && (PlayFab._internalSettings.sessionTicket = e.data.SessionTicket, PlayFab.ClientApi._MultiStepClientLogin(e.data.SettingsForUser.NeedsAttribution)),
                    t != null && typeof t == "function" && t(e, n)
            };
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithPlayFab", e, null, null, n)
        },
        LoginWithPSN: function (e, t) {
            e.TitleId = PlayFab.settings.titleId != null ? PlayFab.settings.titleId : e.TitleId;
            if (e.TitleId == null) throw "Must be have PlayFab.settings.titleId set to call this method";
            var n = function (e, n) {
                e != null && e.data.SessionTicket != null && (PlayFab._internalSettings.sessionTicket = e.data.SessionTicket, PlayFab.ClientApi._MultiStepClientLogin(e.data.SettingsForUser.NeedsAttribution)),
                    t != null && typeof t == "function" && t(e, n)
            };
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithPSN", e, null, null, n)
        },
        LoginWithSteam: function (e, t) {
            e.TitleId = PlayFab.settings.titleId != null ? PlayFab.settings.titleId : e.TitleId;
            if (e.TitleId == null) throw "Must be have PlayFab.settings.titleId set to call this method";
            var n = function (e, n) {
                e != null && e.data.SessionTicket != null && (PlayFab._internalSettings.sessionTicket = e.data.SessionTicket, PlayFab.ClientApi._MultiStepClientLogin(e.data.SettingsForUser.NeedsAttribution)),
                    t != null && typeof t == "function" && t(e, n)
            };
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithSteam", e, null, null, n)
        },
        LoginWithXbox: function (e, t) {
            e.TitleId = PlayFab.settings.titleId != null ? PlayFab.settings.titleId : e.TitleId;
            if (e.TitleId == null) throw "Must be have PlayFab.settings.titleId set to call this method";
            var n = function (e, n) {
                e != null && e.data.SessionTicket != null && (PlayFab._internalSettings.sessionTicket = e.data.SessionTicket, PlayFab.ClientApi._MultiStepClientLogin(e.data.SettingsForUser.NeedsAttribution)),
                    t != null && typeof t == "function" && t(e, n)
            };
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithXbox", e, null, null, n)
        },
        RegisterPlayFabUser: function (e, t) {
            e.TitleId = PlayFab.settings.titleId != null ? PlayFab.settings.titleId : e.TitleId;
            if (e.TitleId == null) throw "Must be have PlayFab.settings.titleId set to call this method";
            var n = function (e, n) {
                e != null && e.data.SessionTicket != null && (PlayFab._internalSettings.sessionTicket = e.data.SessionTicket, PlayFab.ClientApi._MultiStepClientLogin(e.data.SettingsForUser.NeedsAttribution)),
                    t != null && typeof t == "function" && t(e, n)
            };
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/RegisterPlayFabUser", e, null, null, n)
        },
        AddUsernamePassword: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/AddUsernamePassword", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetAccountInfo: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetAccountInfo", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetPlayFabIDsFromFacebookIDs: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayFabIDsFromFacebookIDs", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetPlayFabIDsFromGameCenterIDs: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayFabIDsFromGameCenterIDs", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetPlayFabIDsFromGoogleIDs: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayFabIDsFromGoogleIDs", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetPlayFabIDsFromKongregateIDs: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayFabIDsFromKongregateIDs", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetPlayFabIDsFromPSNAccountIDs: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayFabIDsFromPSNAccountIDs", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetPlayFabIDsFromSteamIDs: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayFabIDsFromSteamIDs", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetUserCombinedInfo: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetUserCombinedInfo", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        LinkAndroidDeviceID: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkAndroidDeviceID", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        LinkCustomID: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkCustomID", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        LinkFacebookAccount: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkFacebookAccount", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        LinkGameCenterAccount: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkGameCenterAccount", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        LinkGoogleAccount: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkGoogleAccount", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        LinkIOSDeviceID: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkIOSDeviceID", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        LinkKongregate: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkKongregate", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        LinkPSNAccount: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkPSNAccount", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        LinkSteamAccount: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkSteamAccount", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        LinkXboxAccount: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkXboxAccount", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        SendAccountRecoveryEmail: function (e, t) {
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/SendAccountRecoveryEmail", e, null, null, t)
        },
        UnlinkAndroidDeviceID: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkAndroidDeviceID", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UnlinkCustomID: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkCustomID", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UnlinkFacebookAccount: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkFacebookAccount", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UnlinkGameCenterAccount: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkGameCenterAccount", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UnlinkGoogleAccount: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkGoogleAccount", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UnlinkIOSDeviceID: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkIOSDeviceID", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UnlinkKongregate: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkKongregate", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UnlinkPSNAccount: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkPSNAccount", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UnlinkSteamAccount: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkSteamAccount", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UnlinkXboxAccount: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkXboxAccount", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UpdateUserTitleDisplayName: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UpdateUserTitleDisplayName", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetFriendLeaderboard: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetFriendLeaderboard", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetFriendLeaderboardAroundCurrentUser: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetFriendLeaderboardAroundCurrentUser", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetFriendLeaderboardAroundPlayer: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetFriendLeaderboardAroundPlayer", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetLeaderboard: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetLeaderboard", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetLeaderboardAroundCurrentUser: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetLeaderboardAroundCurrentUser", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetLeaderboardAroundPlayer: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetLeaderboardAroundPlayer", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetUserData: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetUserData", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetUserPublisherData: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetUserPublisherData", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetUserPublisherReadOnlyData: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetUserPublisherReadOnlyData", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetUserReadOnlyData: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetUserReadOnlyData", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetUserStatistics: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetUserStatistics", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UpdateUserData: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UpdateUserData", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UpdateUserPublisherData: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UpdateUserPublisherData", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UpdateUserStatistics: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UpdateUserStatistics", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetCatalogItems: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetCatalogItems", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetStoreItems: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetStoreItems", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetTitleData: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetTitleData", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetTitleNews: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetTitleNews", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        AddUserVirtualCurrency: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/AddUserVirtualCurrency", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        ConfirmPurchase: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/ConfirmPurchase", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        ConsumeItem: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/ConsumeItem", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetCharacterInventory: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetCharacterInventory", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetPurchase: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPurchase", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetUserInventory: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetUserInventory", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        PayForPurchase: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/PayForPurchase", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        PurchaseItem: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/PurchaseItem", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        RedeemCoupon: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/RedeemCoupon", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        ReportPlayer: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/ReportPlayer", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        StartPurchase: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/StartPurchase", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        SubtractUserVirtualCurrency: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/SubtractUserVirtualCurrency", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UnlockContainerItem: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlockContainerItem", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        AddFriend: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/AddFriend", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetFriendsList: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetFriendsList", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        RemoveFriend: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/RemoveFriend", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        SetFriendTags: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/SetFriendTags", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        RegisterForIOSPushNotification: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/RegisterForIOSPushNotification", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        RestoreIOSPurchases: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/RestoreIOSPurchases", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        ValidateIOSReceipt: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/ValidateIOSReceipt", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetCurrentGames: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetCurrentGames", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetGameServerRegions: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetGameServerRegions", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        Matchmake: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/Matchmake", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        StartGame: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/StartGame", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        AndroidDevicePushNotificationRegistration: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/AndroidDevicePushNotificationRegistration", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        ValidateGooglePlayPurchase: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/ValidateGooglePlayPurchase", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        LogEvent: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LogEvent", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        AddSharedGroupMembers: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/AddSharedGroupMembers", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        CreateSharedGroup: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/CreateSharedGroup", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetPublisherData: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPublisherData", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetSharedGroupData: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetSharedGroupData", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        RemoveSharedGroupMembers: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/RemoveSharedGroupMembers", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UpdateSharedGroupData: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UpdateSharedGroupData", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        ConsumePSNEntitlements: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/ConsumePSNEntitlements", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        RefreshPSNAuthToken: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/RefreshPSNAuthToken", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetCloudScriptUrl: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            var n = function (e, n) {
                PlayFab._internalSettings.logicServerUrl = e.data.Url,
                    t != null && typeof t == "function" && t(e, n)
            };
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetCloudScriptUrl", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, n)
        },
        RunCloudScript: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetLogicServerUrl() + "/Client/RunCloudScript", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetContentDownloadUrl: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetContentDownloadUrl", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetAllUsersCharacters: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetAllUsersCharacters", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetCharacterLeaderboard: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetCharacterLeaderboard", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetCharacterStatistics: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetCharacterStatistics", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetLeaderboardAroundCharacter: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetLeaderboardAroundCharacter", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetLeaderboardForUserCharacters: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetLeaderboardForUserCharacters", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GrantCharacterToUser: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GrantCharacterToUser", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UpdateCharacterStatistics: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UpdateCharacterStatistics", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetCharacterData: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetCharacterData", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetCharacterReadOnlyData: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetCharacterReadOnlyData", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        UpdateCharacterData: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UpdateCharacterData", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        ValidateAmazonIAPReceipt: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/ValidateAmazonIAPReceipt", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        AcceptTrade: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/AcceptTrade", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        CancelTrade: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/CancelTrade", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetPlayerTrades: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayerTrades", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        GetTradeStatus: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetTradeStatus", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        OpenTrade: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/OpenTrade", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, t)
        },
        AttributeInstall: function (e, t) {
            if (PlayFab._internalSettings.sessionTicket == null) throw "Must be logged in to call this method";
            var n = function (e, n) {
                PlayFab.settings.advertisingIdType += "_Successful",
                    t != null && typeof t == "function" && t(e, n)
            };
            PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/AttributeInstall", e, "X-Authorization", PlayFab._internalSettings.sessionTicket, n)
        },
        _MultiStepClientLogin: function (e) {
            if (e && !PlayFab.settings.disableAdvertising && PlayFab.settings.advertisingIdType !== null && PlayFab.settings.advertisingIdValue !== null) {
                var t = {};
                if (PlayFab.settings.advertisingIdType === PlayFab.settings.AD_TYPE_IDFA) t.Idfa = PlayFab.settings.advertisingIdValue;
                else {
                    if (PlayFab.settings.advertisingIdType !== PlayFab.settings.AD_TYPE_ANDROID_ID) return;
                    t.Android_Id = PlayFab.settings.advertisingIdValue
                }
                PlayFab.ClientApi.AttributeInstall(t, null)
            }
        }
    };
var PlayFabClientSDK = PlayFab.ClientApi;