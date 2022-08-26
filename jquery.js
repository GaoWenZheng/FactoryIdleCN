!
        function(e, t) {
            "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
                if (!e.document) throw new Error("jQuery requires a window with a document");
                return t(e)
            } : t(e)
        }("undefined" != typeof window ? window : this,
            function(e, t) {
                function g(e) {
                    var t = "length" in e && e.length,
                        n = h.type(e);
                    return "function" === n || h.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
                }

                function S(e, t, n) {
                    if (h.isFunction(t)) return h.grep(e,
                        function(e, r) {
                            return !!t.call(e, r, e) !== n
                        });
                    if (t.nodeType) return h.grep(e,
                        function(e) {
                            return e === t !== n
                        });
                    if ("string" == typeof t) {
                        if (E.test(t)) return h.filter(t, e, n);
                        t = h.filter(t, e)
                    }
                    return h.grep(e,
                        function(e) {
                            return h.inArray(e, t) >= 0 !== n
                        })
                }

                function A(e, t) {
                    do e = e[t];
                    while (e && 1 !== e.nodeType);
                    return e
                }

                function _(e) {
                    var t = M[e] = {};
                    return h.each(e.match(O) || [],
                            function(e, n) {
                                t[n] = !0
                            }),
                        t
                }

                function P() {
                    T.addEventListener ? (T.removeEventListener("DOMContentLoaded", H, !1), e.removeEventListener("load", H, !1)) : (T.detachEvent("onreadystatechange", H), e.detachEvent("onload", H))
                }

                function H() {
                    (T.addEventListener || "load" === event.type || "complete" === T.readyState) && (P(), h.ready())
                }

                function q(e, t, n) {
                    if (void 0 === n && 1 === e.nodeType) {
                        var r = "data-" + t.replace(I, "-$1").toLowerCase();
                        if (n = e.getAttribute(r), "string" == typeof n) {
                            try {
                                n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : F.test(n) ? h.parseJSON(n) : n
                            } catch (i) {}
                            h.data(e, t, n)
                        } else n = void 0
                    }
                    return n
                }

                function R(e) {
                    var t;
                    for (t in e)
                        if (("data" !== t || !h.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
                    return !0
                }

                function U(e, t, r, i) {
                    if (h.acceptData(e)) {
                        var s, o, u = h.expando,
                            a = e.nodeType,
                            f = a ? h.cache : e,
                            l = a ? e[u] : e[u] && u;
                        if (l && f[l] && (i || f[l].data) || void 0 !== r || "string" != typeof t) return l || (l = a ? e[u] = n.pop() || h.guid++ : u),
                            f[l] || (f[l] = a ? {} : {
                                toJSON: h.noop
                            }),
                            ("object" == typeof t || "function" == typeof t) && (i ? f[l] = h.extend(f[l], t) : f[l].data = h.extend(f[l].data, t)),
                            o = f[l],
                            i || (o.data || (o.data = {}), o = o.data),
                            void 0 !== r && (o[h.camelCase(t)] = r),
                            "string" == typeof t ? (s = o[t], null == s && (s = o[h.camelCase(t)])) : s = o,
                            s
                    }
                }

                function z(e, t, n) {
                    if (h.acceptData(e)) {
                        var r, i, s = e.nodeType,
                            o = s ? h.cache : e,
                            u = s ? e[h.expando] : h.expando;
                        if (o[u]) {
                            if (t && (r = n ? o[u] : o[u].data)) {
                                h.isArray(t) ? t = t.concat(h.map(t, h.camelCase)) : t in r ? t = [t] : (t = h.camelCase(t), t = t in r ? [t] : t.split(" ")),
                                    i = t.length;
                                while (i--) delete r[t[i]];
                                if (n ? !R(r) : !h.isEmptyObject(r)) return
                            }(n || (delete o[u].data, R(o[u]))) && (s ? h.cleanData([e], !0) : l.deleteExpando || o != o.window ? delete o[u] : o[u] = null)
                        }
                    }
                }

                function et() {
                    return !0
                }

                function tt() {
                    return !1
                }

                function nt() {
                    try {
                        return T.activeElement
                    } catch (e) {}
                }

                function rt(e) {
                    var t = it.split("|"),
                        n = e.createDocumentFragment();
                    if (n.createElement)
                        while (t.length) n.createElement(t.pop());
                    return n
                }

                function wt(e, t) {
                    var n, r, i = 0,
                        s = typeof e.getElementsByTagName !== B ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== B ? e.querySelectorAll(t || "*") : void 0;
                    if (!s)
                        for (s = [], n = e.childNodes || e; null != (r = n[i]); i++) !t || h.nodeName(r, t) ? s.push(r) : h.merge(s, wt(r, t));
                    return void 0 === t || t && h.nodeName(e, t) ? h.merge([e], s) : s
                }

                function Et(e) {
                    J.test(e.type) && (e.defaultChecked = e.checked)
                }

                function St(e, t) {
                    return h.nodeName(e, "table") && h.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
                }

                function xt(e) {
                    return e.type = (null !== h.find.attr(e, "type")) + "/" + e.type,
                        e
                }

                function Tt(e) {
                    var t = vt.exec(e.type);
                    return t ? e.type = t[1] : e.removeAttribute("type"),
                        e
                }

                function Nt(e, t) {
                    for (var n, r = 0; null != (n = e[r]); r++) h._data(n, "globalEval", !t || h._data(t[r], "globalEval"))
                }

                function Ct(e, t) {
                    if (1 === t.nodeType && h.hasData(e)) {
                        var n, r, i, s = h._data(e),
                            o = h._data(t, s),
                            u = s.events;
                        if (u) {
                            delete o.handle,
                                o.events = {};
                            for (n in u)
                                for (r = 0, i = u[n].length; i > r; r++) h.event.add(t, n, u[n][r])
                        }
                        o.data && (o.data = h.extend({},
                            o.data))
                    }
                }

                function kt(e, t) {
                    var n, r, i;
                    if (1 === t.nodeType) {
                        if (n = t.nodeName.toLowerCase(), !l.noCloneEvent && t[h.expando]) {
                            i = h._data(t);
                            for (r in i.events) h.removeEvent(t, r, i.handle);
                            t.removeAttribute(h.expando)
                        }
                        "script" === n && t.text !== e.text ? (xt(t).text = e.text, Tt(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), l.html5Clone && e.innerHTML && !h.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && J.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
                    }
                }

                function Ot(t, n) {
                    var r, i = h(n.createElement(t)).appendTo(n.body),
                        s = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : h.css(i[0], "display");
                    return i.detach(),
                        s
                }

                function Mt(e) {
                    var t = T,
                        n = At[e];
                    return n || (n = Ot(e, t), "none" !== n && n || (Lt = (Lt || h("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Lt[0].contentWindow || Lt[0].contentDocument).document, t.write(), t.close(), n = Ot(e, t), Lt.detach()), At[e] = n),
                        n
                }

                function jt(e, t) {
                    return {
                        get: function() {
                            var n = e();
                            if (null != n) return n ? void delete this.get : (this.get = t).apply(this, arguments)
                        }
                    }
                }

                function Vt(e, t) {
                    if (t in e) return t;
                    var n = t.charAt(0).toUpperCase() + t.slice(1),
                        r = t,
                        i = Xt.length;
                    while (i--)
                        if (t = Xt[i] + n, t in e) return t;
                    return r
                }

                function $t(e, t) {
                    for (var n, r, i, s = [], o = 0, u = e.length; u > o; o++) r = e[o],
                        r.style && (s[o] = h._data(r, "olddisplay"), n = r.style.display, t ? (s[o] || "none" !== n || (r.style.display = ""), "" === r.style.display && V(r) && (s[o] = h._data(r, "olddisplay", Mt(r.nodeName)))) : (i = V(r), (n && "none" !== n || !i) && h._data(r, "olddisplay", i ? n : h.css(r, "display"))));
                    for (o = 0; u > o; o++) r = e[o],
                        r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? s[o] || "" : "none"));
                    return e
                }

                function Jt(e, t, n) {
                    var r = Rt.exec(t);
                    return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
                }

                function Kt(e, t, n, r, i) {
                    for (var s = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > s; s += 2) "margin" === n && (o += h.css(e, n + X[s], !0, i)),
                        r ? ("content" === n && (o -= h.css(e, "padding" + X[s], !0, i)), "margin" !== n && (o -= h.css(e, "border" + X[s] + "Width", !0, i))) : (o += h.css(e, "padding" + X[s], !0, i), "padding" !== n && (o += h.css(e, "border" + X[s] + "Width", !0, i)));
                    return o
                }

                function Qt(e, t, n) {
                    var r = !0,
                        i = "width" === t ? e.offsetWidth : e.offsetHeight,
                        s = Pt(e),
                        o = l.boxSizing && "border-box" === h.css(e, "boxSizing", !1, s);
                    if (0 >= i || null == i) {
                        if (i = Ht(e, t, s), (0 > i || null == i) && (i = e.style[t]), Dt.test(i)) return i;
                        r = o && (l.boxSizingReliable() || i === e.style[t]),
                            i = parseFloat(i) || 0
                    }
                    return i + Kt(e, t, n || (o ? "border" : "content"), r, s) + "px"
                }

                function Gt(e, t, n, r, i) {
                    return new Gt.prototype.init(e, t, n, r, i)
                }

                function on() {
                    return setTimeout(function() {
                            Yt = void 0
                        }),
                        Yt = h.now()
                }

                function un(e, t) {
                    var n, r = {
                            height: e
                        },
                        i = 0;
                    for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = X[i],
                        r["margin" + n] = r["padding" + n] = e;
                    return t && (r.opacity = r.width = e),
                        r
                }

                function an(e, t, n) {
                    for (var r, i = (sn[t] || []).concat(sn["*"]), s = 0, o = i.length; o > s; s++)
                        if (r = i[s].call(n, t, e)) return r
                }

                function fn(e, t, n) {
                    var r, i, s, o, u, a, f, c, p = this,
                        d = {},
                        v = e.style,
                        m = e.nodeType && V(e),
                        g = h._data(e, "fxshow");
                    n.queue || (u = h._queueHooks(e, "fx"), null == u.unqueued && (u.unqueued = 0, a = u.empty.fire, u.empty.fire = function() {
                            u.unqueued || a()
                        }), u.unqueued++, p.always(function() {
                            p.always(function() {
                                u.unqueued--,
                                    h.queue(e, "fx").length || u.empty.fire()
                            })
                        })),
                        1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [v.overflow, v.overflowX, v.overflowY], f = h.css(e, "display"), c = "none" === f ? h._data(e, "olddisplay") || Mt(e.nodeName) : f, "inline" === c && "none" === h.css(e, "float") && (l.inlineBlockNeedsLayout && "inline" !== Mt(e.nodeName) ? v.zoom = 1 : v.display = "inline-block")),
                        n.overflow && (v.overflow = "hidden", l.shrinkWrapBlocks() || p.always(function() {
                            v.overflow = n.overflow[0],
                                v.overflowX = n.overflow[1],
                                v.overflowY = n.overflow[2]
                        }));
                    for (r in t)
                        if (i = t[r], en.exec(i)) {
                            if (delete t[r], s = s || "toggle" === i, i === (m ? "hide" : "show")) {
                                if ("show" !== i || !g || void 0 === g[r]) continue;
                                m = !0
                            }
                            d[r] = g && g[r] || h.style(e, r)
                        } else f = void 0;
                    if (h.isEmptyObject(d)) "inline" === ("none" === f ? Mt(e.nodeName) : f) && (v.display = f);
                    else {
                        g ? "hidden" in g && (m = g.hidden) : g = h._data(e, "fxshow", {}),
                            s && (g.hidden = !m),
                            m ? h(e).show() : p.done(function() {
                                h(e).hide()
                            }),
                            p.done(function() {
                                var t;
                                h._removeData(e, "fxshow");
                                for (t in d) h.style(e, t, d[t])
                            });
                        for (r in d) o = an(m ? g[r] : 0, r, p),
                            r in g || (g[r] = o.start, m && (o.end = o.start, o.start = "width" === r || "height" === r ? 1 : 0))
                    }
                }

                function ln(e, t) {
                    var n, r, i, s, o;
                    for (n in e)
                        if (r = h.camelCase(n), i = t[r], s = e[n], h.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = h.cssHooks[r], o && "expand" in o) {
                            s = o.expand(s),
                                delete e[r];
                            for (n in s) n in e || (e[n] = s[n], t[n] = i)
                        } else t[r] = i
                }

                function cn(e, t, n) {
                    var r, i, s = 0,
                        o = rn.length,
                        u = h.Deferred().always(function() {
                            delete a.elem
                        }),
                        a = function() {
                            if (i) return !1;
                            for (var t = Yt || on(), n = Math.max(0, f.startTime + f.duration - t), r = n / f.duration || 0, s = 1 - r, o = 0, a = f.tweens.length; a > o; o++) f.tweens[o].run(s);
                            return u.notifyWith(e, [f, s, n]),
                                1 > s && a ? n : (u.resolveWith(e, [f]), !1)
                        },
                        f = u.promise({
                            elem: e,
                            props: h.extend({},
                                t),
                            opts: h.extend(!0, {
                                    specialEasing: {}
                                },
                                n),
                            originalProperties: t,
                            originalOptions: n,
                            startTime: Yt || on(),
                            duration: n.duration,
                            tweens: [],
                            createTween: function(t, n) {
                                var r = h.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                                return f.tweens.push(r),
                                    r
                            },
                            stop: function(t) {
                                var n = 0,
                                    r = t ? f.tweens.length : 0;
                                if (i) return this;
                                for (i = !0; r > n; n++) f.tweens[n].run(1);
                                return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]),
                                    this
                            }
                        }),
                        l = f.props;
                    for (ln(l, f.opts.specialEasing); o > s; s++)
                        if (r = rn[s].call(f, e, l, f.opts)) return r;
                    return h.map(l, an, f),
                        h.isFunction(f.opts.start) && f.opts.start.call(e, f),
                        h.fx.timer(h.extend(a, {
                            elem: e,
                            anim: f,
                            queue: f.opts.queue
                        })),
                        f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
                }

                function Fn(e) {
                    return function(t, n) {
                        "string" != typeof t && (n = t, t = "*");
                        var r, i = 0,
                            s = t.toLowerCase().match(O) || [];
                        if (h.isFunction(n))
                            while (r = s[i++]) "+" === r.charAt(0) ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
                    }
                }

                function In(e, t, n, r) {
                    function o(u) {
                        var a;
                        return i[u] = !0,
                            h.each(e[u] || [],
                                function(e, u) {
                                    var f = u(t, n, r);
                                    return "string" != typeof f || s || i[f] ? s ? !(a = f) : void 0 : (t.dataTypes.unshift(f), o(f), !1)
                                }),
                            a
                    }
                    var i = {},
                        s = e === Hn;
                    return o(t.dataTypes[0]) || !i["*"] && o("*")
                }

                function qn(e, t) {
                    var n, r, i = h.ajaxSettings.flatOptions || {};
                    for (r in t) void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r]);
                    return n && h.extend(!0, e, n),
                        e
                }

                function Rn(e, t, n) {
                    var r, i, s, o, u = e.contents,
                        a = e.dataTypes;
                    while ("*" === a[0]) a.shift(),
                        void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (i)
                        for (o in u)
                            if (u[o] && u[o].test(i)) {
                                a.unshift(o);
                                break
                            }
                    if (a[0] in n) s = a[0];
                    else {
                        for (o in n) {
                            if (!a[0] || e.converters[o + " " + a[0]]) {
                                s = o;
                                break
                            }
                            r || (r = o)
                        }
                        s = s || r
                    }
                    return s ? (s !== a[0] && a.unshift(s), n[s]) : void 0
                }

                function Un(e, t, n, r) {
                    var i, s, o, u, a, f = {},
                        l = e.dataTypes.slice();
                    if (l[1])
                        for (o in e.converters) f[o.toLowerCase()] = e.converters[o];
                    s = l.shift();
                    while (s)
                        if (e.responseFields[s] && (n[e.responseFields[s]] = t), !a && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = s, s = l.shift())
                            if ("*" === s) s = a;
                            else if ("*" !== a && a !== s) {
                        if (o = f[a + " " + s] || f["* " + s], !o)
                            for (i in f)
                                if (u = i.split(" "), u[1] === s && (o = f[a + " " + u[0]] || f["* " + u[0]])) {
                                    o === !0 ? o = f[i] : f[i] !== !0 && (s = u[0], l.unshift(u[1]));
                                    break
                                }
                        if (o !== !0)
                            if (o && e["throws"]) t = o(t);
                            else try {
                                t = o(t)
                            } catch (c) {
                                return {
                                    state: "parsererror",
                                    error: o ? c : "No conversion from " + a + " to " + s
                                }
                            }
                    }
                    return {
                        state: "success",
                        data: t
                    }
                }

                function Jn(e, t, n, r) {
                    var i;
                    if (h.isArray(t)) h.each(t,
                        function(t, i) {
                            n || Wn.test(e) ? r(e, i) : Jn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
                        });
                    else if (n || "object" !== h.type(t)) r(e, t);
                    else
                        for (i in t) Jn(e + "[" + i + "]", t[i], n, r)
                }

                function Yn() {
                    try {
                        return new e.XMLHttpRequest
                    } catch (t) {}
                }

                function Zn() {
                    try {
                        return new e.ActiveXObject("Microsoft.XMLHTTP")
                    } catch (t) {}
                }

                function ir(e) {
                    return h.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
                }
                var n = [],
                    r = n.slice,
                    i = n.concat,
                    s = n.push,
                    o = n.indexOf,
                    u = {},
                    a = u.toString,
                    f = u.hasOwnProperty,
                    l = {},
                    c = "1.11.3",
                    h = function(e, t) {
                        return new h.fn.init(e, t)
                    },
                    p = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                    d = /^-ms-/,
                    v = /-([\da-z])/gi,
                    m = function(e, t) {
                        return t.toUpperCase()
                    };
                h.fn = h.prototype = {
                        jquery: c,
                        constructor: h,
                        selector: "",
                        length: 0,
                        toArray: function() {
                            return r.call(this)
                        },
                        get: function(e) {
                            return null != e ? 0 > e ? this[e + this.length] : this[e] : r.call(this)
                        },
                        pushStack: function(e) {
                            var t = h.merge(this.constructor(), e);
                            return t.prevObject = this,
                                t.context = this.context,
                                t
                        },
                        each: function(e, t) {
                            return h.each(this, e, t)
                        },
                        map: function(e) {
                            return this.pushStack(h.map(this,
                                function(t, n) {
                                    return e.call(t, n, t)
                                }))
                        },
                        slice: function() {
                            return this.pushStack(r.apply(this, arguments))
                        },
                        first: function() {
                            return this.eq(0)
                        },
                        last: function() {
                            return this.eq(-1)
                        },
                        eq: function(e) {
                            var t = this.length,
                                n = +e + (0 > e ? t : 0);
                            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
                        },
                        end: function() {
                            return this.prevObject || this.constructor(null)
                        },
                        push: s,
                        sort: n.sort,
                        splice: n.splice
                    },
                    h.extend = h.fn.extend = function() {
                        var e, t, n, r, i, s, o = arguments[0] || {},
                            u = 1,
                            a = arguments.length,
                            f = !1;
                        for ("boolean" == typeof o && (f = o, o = arguments[u] || {},
                                u++), "object" == typeof o || h.isFunction(o) || (o = {}), u === a && (o = this, u--); a > u; u++)
                            if (null != (i = arguments[u]))
                                for (r in i) e = o[r],
                                    n = i[r],
                                    o !== n && (f && n && (h.isPlainObject(n) || (t = h.isArray(n))) ? (t ? (t = !1, s = e && h.isArray(e) ? e : []) : s = e && h.isPlainObject(e) ? e : {},
                                        o[r] = h.extend(f, s, n)) : void 0 !== n && (o[r] = n));
                        return o
                    },
                    h.extend({
                        expando: "jQuery" + (c + Math.random()).replace(/\D/g, ""),
                        isReady: !0,
                        error: function(e) {
                            throw new Error(e)
                        },
                        noop: function() {},
                        isFunction: function(e) {
                            return "function" === h.type(e)
                        },
                        isArray: Array.isArray ||
                            function(e) {
                                return "array" === h.type(e)
                            },
                        isWindow: function(e) {
                            return null != e && e == e.window
                        },
                        isNumeric: function(e) {
                            return !h.isArray(e) && e - parseFloat(e) + 1 >= 0
                        },
                        isEmptyObject: function(e) {
                            var t;
                            for (t in e) return !1;
                            return !0
                        },
                        isPlainObject: function(e) {
                            var t;
                            if (!e || "object" !== h.type(e) || e.nodeType || h.isWindow(e)) return !1;
                            try {
                                if (e.constructor && !f.call(e, "constructor") && !f.call(e.constructor.prototype, "isPrototypeOf")) return !1
                            } catch (n) {
                                return !1
                            }
                            if (l.ownLast)
                                for (t in e) return f.call(e, t);
                            for (t in e);
                            return void 0 === t || f.call(e, t)
                        },
                        type: function(e) {
                            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? u[a.call(e)] || "object" : typeof e
                        },
                        globalEval: function(t) {
                            t && h.trim(t) && (e.execScript ||
                                function(t) {
                                    e.eval.call(e, t)
                                })(t)
                        },
                        camelCase: function(e) {
                            return e.replace(d, "ms-").replace(v, m)
                        },
                        nodeName: function(e, t) {
                            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                        },
                        each: function(e, t, n) {
                            var r, i = 0,
                                s = e.length,
                                o = g(e);
                            if (n) {
                                if (o) {
                                    for (; s > i; i++)
                                        if (r = t.apply(e[i], n), r === !1) break
                                } else
                                    for (i in e)
                                        if (r = t.apply(e[i], n), r === !1) break
                            } else if (o) {
                                for (; s > i; i++)
                                    if (r = t.call(e[i], i, e[i]), r === !1) break
                            } else
                                for (i in e)
                                    if (r = t.call(e[i], i, e[i]), r === !1) break;
                            return e
                        },
                        trim: function(e) {
                            return null == e ? "" : (e + "").replace(p, "")
                        },
                        makeArray: function(e, t) {
                            var n = t || [];
                            return null != e && (g(Object(e)) ? h.merge(n, "string" == typeof e ? [e] : e) : s.call(n, e)),
                                n
                        },
                        inArray: function(e, t, n) {
                            var r;
                            if (t) {
                                if (o) return o.call(t, e, n);
                                for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)
                                    if (n in t && t[n] === e) return n
                            }
                            return -1
                        },
                        merge: function(e, t) {
                            var n = +t.length,
                                r = 0,
                                i = e.length;
                            while (n > r) e[i++] = t[r++];
                            if (n !== n)
                                while (void 0 !== t[r]) e[i++] = t[r++];
                            return e.length = i,
                                e
                        },
                        grep: function(e, t, n) {
                            for (var r, i = [], s = 0, o = e.length, u = !n; o > s; s++) r = !t(e[s], s),
                                r !== u && i.push(e[s]);
                            return i
                        },
                        map: function(e, t, n) {
                            var r, s = 0,
                                o = e.length,
                                u = g(e),
                                a = [];
                            if (u)
                                for (; o > s; s++) r = t(e[s], s, n),
                                    null != r && a.push(r);
                            else
                                for (s in e) r = t(e[s], s, n),
                                    null != r && a.push(r);
                            return i.apply([], a)
                        },
                        guid: 1,
                        proxy: function(e, t) {
                            var n, i, s;
                            return "string" == typeof t && (s = e[t], t = e, e = s),
                                h.isFunction(e) ? (n = r.call(arguments, 2), i = function() {
                                        return e.apply(t || this, n.concat(r.call(arguments)))
                                    },
                                    i.guid = e.guid = e.guid || h.guid++, i) : void 0
                        },
                        now: function() {
                            return +(new Date)
                        },
                        support: l
                    }),
                    h.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
                        function(e, t) {
                            u["[object " + t + "]"] = t.toLowerCase()
                        });
                var y = function(e) {
                    function ot(e, t, r, i) {
                        var s, u, f, l, c, d, g, y, S, x;
                        if ((t ? t.ownerDocument || t : E) !== p && h(t), t = t || p, r = r || [], l = t.nodeType, "string" != typeof e || !e || 1 !== l && 9 !== l && 11 !== l) return r;
                        if (!i && v) {
                            if (11 !== l && (s = Z.exec(e)))
                                if (f = s[1]) {
                                    if (9 === l) {
                                        if (u = t.getElementById(f), !u || !u.parentNode) return r;
                                        if (u.id === f) return r.push(u),
                                            r
                                    } else if (t.ownerDocument && (u = t.ownerDocument.getElementById(f)) && b(t, u) && u.id === f) return r.push(u),
                                        r
                                } else {
                                    if (s[2]) return D.apply(r, t.getElementsByTagName(e)),
                                        r;
                                    if ((f = s[3]) && n.getElementsByClassName) return D.apply(r, t.getElementsByClassName(f)),
                                        r
                                }
                            if (n.qsa && (!m || !m.test(e))) {
                                if (y = g = w, S = t, x = 1 !== l && e, 1 === l && "object" !== t.nodeName.toLowerCase()) {
                                    d = o(e),
                                        (g = t.getAttribute("id")) ? y = g.replace(tt, "\\$&") : t.setAttribute("id", y),
                                        y = "[id='" + y + "'] ",
                                        c = d.length;
                                    while (c--) d[c] = y + gt(d[c]);
                                    S = et.test(e) && vt(t.parentNode) || t,
                                        x = d.join(",")
                                }
                                if (x) try {
                                    return D.apply(r, S.querySelectorAll(x)),
                                        r
                                } catch (T) {} finally {
                                    g || t.removeAttribute("id")
                                }
                            }
                        }
                        return a(e.replace(z, "$1"), t, r, i)
                    }

                    function ut() {
                        function t(n, i) {
                            return e.push(n + " ") > r.cacheLength && delete t[e.shift()],
                                t[n + " "] = i
                        }
                        var e = [];
                        return t
                    }

                    function at(e) {
                        return e[w] = !0,
                            e
                    }

                    function ft(e) {
                        var t = p.createElement("div");
                        try {
                            return !!e(t)
                        } catch (n) {
                            return !1
                        } finally {
                            t.parentNode && t.parentNode.removeChild(t),
                                t = null
                        }
                    }

                    function lt(e, t) {
                        var n = e.split("|"),
                            i = e.length;
                        while (i--) r.attrHandle[n[i]] = t
                    }

                    function ct(e, t) {
                        var n = t && e,
                            r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || L) - (~e.sourceIndex || L);
                        if (r) return r;
                        if (n)
                            while (n = n.nextSibling)
                                if (n === t) return -1;
                        return e ? 1 : -1
                    }

                    function ht(e) {
                        return function(t) {
                            var n = t.nodeName.toLowerCase();
                            return "input" === n && t.type === e
                        }
                    }

                    function pt(e) {
                        return function(t) {
                            var n = t.nodeName.toLowerCase();
                            return ("input" === n || "button" === n) && t.type === e
                        }
                    }

                    function dt(e) {
                        return at(function(t) {
                            return t = +t,
                                at(function(n, r) {
                                    var i, s = e([], n.length, t),
                                        o = s.length;
                                    while (o--) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                                })
                        })
                    }

                    function vt(e) {
                        return e && "undefined" != typeof e.getElementsByTagName && e
                    }

                    function mt() {}

                    function gt(e) {
                        for (var t = 0,
                                n = e.length,
                                r = ""; n > t; t++) r += e[t].value;
                        return r
                    }

                    function yt(e, t, n) {
                        var r = t.dir,
                            i = n && "parentNode" === r,
                            s = x++;
                        return t.first ?
                            function(t, n, s) {
                                while (t = t[r])
                                    if (1 === t.nodeType || i) return e(t, n, s)
                            } : function(t, n, o) {
                                var u, a, f = [S, s];
                                if (o) {
                                    while (t = t[r])
                                        if ((1 === t.nodeType || i) && e(t, n, o)) return !0
                                } else
                                    while (t = t[r])
                                        if (1 === t.nodeType || i) {
                                            if (a = t[w] || (t[w] = {}), (u = a[r]) && u[0] === S && u[1] === s) return f[2] = u[2];
                                            if (a[r] = f, f[2] = e(t, n, o)) return !0
                                        }
                            }
                    }

                    function bt(e) {
                        return e.length > 1 ?
                            function(t, n, r) {
                                var i = e.length;
                                while (i--)
                                    if (!e[i](t, n, r)) return !1;
                                return !0
                            } : e[0]
                    }

                    function wt(e, t, n) {
                        for (var r = 0,
                                i = t.length; i > r; r++) ot(e, t[r], n);
                        return n
                    }

                    function Et(e, t, n, r, i) {
                        for (var s, o = [], u = 0, a = e.length, f = null != t; a > u; u++)(s = e[u]) && (!n || n(s, r, i)) && (o.push(s), f && t.push(u));
                        return o
                    }

                    function St(e, t, n, r, i, s) {
                        return r && !r[w] && (r = St(r)),
                            i && !i[w] && (i = St(i, s)),
                            at(function(s, o, u, a) {
                                var f, l, c, h = [],
                                    p = [],
                                    d = o.length,
                                    v = s || wt(t || "*", u.nodeType ? [u] : u, []),
                                    m = !e || !s && t ? v : Et(v, h, e, u, a),
                                    g = n ? i || (s ? e : d || r) ? [] : o : m;
                                if (n && n(m, g, u, a), r) {
                                    f = Et(g, p),
                                        r(f, [], u, a),
                                        l = f.length;
                                    while (l--)(c = f[l]) && (g[p[l]] = !(m[p[l]] = c))
                                }
                                if (s) {
                                    if (i || e) {
                                        if (i) {
                                            f = [],
                                                l = g.length;
                                            while (l--)(c = g[l]) && f.push(m[l] = c);
                                            i(null, g = [], f, a)
                                        }
                                        l = g.length;
                                        while (l--)(c = g[l]) && (f = i ? H(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                                    }
                                } else g = Et(g === o ? g.splice(d, g.length) : g),
                                    i ? i(null, o, g, a) : D.apply(o, g)
                            })
                    }

                    function xt(e) {
                        for (var t, n, i, s = e.length,
                                o = r.relative[e[0].type], u = o || r.relative[" "], a = o ? 1 : 0, l = yt(function(e) {
                                        return e === t
                                    },
                                    u, !0), c = yt(function(e) {
                                        return H(t, e) > -1
                                    },
                                    u, !0), h = [function(e, n, r) {
                                    var i = !o && (r || n !== f) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r));
                                    return t = null,
                                        i
                                }]; s > a; a++)
                            if (n = r.relative[e[a].type]) h = [yt(bt(h), n)];
                            else {
                                if (n = r.filter[e[a].type].apply(null, e[a].matches), n[w]) {
                                    for (i = ++a; s > i; i++)
                                        if (r.relative[e[i].type]) break;
                                    return St(a > 1 && bt(h), a > 1 && gt(e.slice(0, a - 1).concat({
                                        value: " " === e[a - 2].type ? "*" : ""
                                    })).replace(z, "$1"), n, i > a && xt(e.slice(a, i)), s > i && xt(e = e.slice(i)), s > i && gt(e))
                                }
                                h.push(n)
                            }
                        return bt(h)
                    }

                    function Tt(e, t) {
                        var n = t.length > 0,
                            i = e.length > 0,
                            s = function(s, o, u, a, l) {
                                var c, h, d, v = 0,
                                    m = "0",
                                    g = s && [],
                                    y = [],
                                    b = f,
                                    w = s || i && r.find.TAG("*", l),
                                    E = S += null == b ? 1 : Math.random() || .1,
                                    x = w.length;
                                for (l && (f = o !== p && o); m !== x && null != (c = w[m]); m++) {
                                    if (i && c) {
                                        h = 0;
                                        while (d = e[h++])
                                            if (d(c, o, u)) {
                                                a.push(c);
                                                break
                                            }
                                        l && (S = E)
                                    }
                                    n && ((c = !d && c) && v--, s && g.push(c))
                                }
                                if (v += m, n && m !== v) {
                                    h = 0;
                                    while (d = t[h++]) d(g, y, o, u);
                                    if (s) {
                                        if (v > 0)
                                            while (m--) g[m] || y[m] || (y[m] = M.call(a));
                                        y = Et(y)
                                    }
                                    D.apply(a, y),
                                        l && !s && y.length > 0 && v + t.length > 1 && ot.uniqueSort(a)
                                }
                                return l && (S = E, f = b),
                                    g
                            };
                        return n ? at(s) : s
                    }
                    var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w = "sizzle" + 1 * new Date,
                        E = e.document,
                        S = 0,
                        x = 0,
                        T = ut(),
                        N = ut(),
                        C = ut(),
                        k = function(e, t) {
                            return e === t && (c = !0),
                                0
                        },
                        L = 1 << 31,
                        A = {}.hasOwnProperty,
                        O = [],
                        M = O.pop,
                        _ = O.push,
                        D = O.push,
                        P = O.slice,
                        H = function(e, t) {
                            for (var n = 0,
                                    r = e.length; r > n; n++)
                                if (e[n] === t) return n;
                            return -1
                        },
                        B = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                        j = "[\\x20\\t\\r\\n\\f]",
                        F = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                        I = F.replace("w", "w#"),
                        q = "\\[" + j + "*(" + F + ")(?:" + j + "*([*^$|!~]?=)" + j + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + j + "*\\]",
                        R = ":(" + F + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + q + ")*)|.*)\\)|)",
                        U = new RegExp(j + "+", "g"),
                        z = new RegExp("^" + j + "+|((?:^|[^\\\\])(?:\\\\.)*)" + j + "+$", "g"),
                        W = new RegExp("^" + j + "*," + j + "*"),
                        X = new RegExp("^" + j + "*([>+~]|" + j + ")" + j + "*"),
                        V = new RegExp("=" + j + "*([^\\]'\"]*?)" + j + "*\\]", "g"),
                        $ = new RegExp(R),
                        J = new RegExp("^" + I + "$"),
                        K = {
                            ID: new RegExp("^#(" + F + ")"),
                            CLASS: new RegExp("^\\.(" + F + ")"),
                            TAG: new RegExp("^(" + F.replace("w", "w*") + ")"),
                            ATTR: new RegExp("^" + q),
                            PSEUDO: new RegExp("^" + R),
                            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + j + "*(even|odd|(([+-]|)(\\d*)n|)" + j + "*(?:([+-]|)" + j + "*(\\d+)|))" + j + "*\\)|)", "i"),
                            bool: new RegExp("^(?:" + B + ")$", "i"),
                            needsContext: new RegExp("^" + j + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + j + "*((?:-\\d)?\\d*)" + j + "*\\)|)(?=[^-]|$)", "i")
                        },
                        Q = /^(?:input|select|textarea|button)$/i,
                        G = /^h\d$/i,
                        Y = /^[^{]+\{\s*\[native \w/,
                        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                        et = /[+~]/,
                        tt = /'|\\/g,
                        nt = new RegExp("\\\\([\\da-f]{1,6}" + j + "?|(" + j + ")|.)", "ig"),
                        rt = function(e, t, n) {
                            var r = "0x" + t - 65536;
                            return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                        },
                        it = function() {
                            h()
                        };
                    try {
                        D.apply(O = P.call(E.childNodes), E.childNodes),
                            O[E.childNodes.length].nodeType
                    } catch (st) {
                        D = {
                            apply: O.length ?
                                function(e, t) {
                                    _.apply(e, P.call(t))
                                } : function(e, t) {
                                    var n = e.length,
                                        r = 0;
                                    while (e[n++] = t[r++]);
                                    e.length = n - 1
                                }
                        }
                    }
                    n = ot.support = {},
                        s = ot.isXML = function(e) {
                            var t = e && (e.ownerDocument || e).documentElement;
                            return t ? "HTML" !== t.nodeName : !1
                        },
                        h = ot.setDocument = function(e) {
                            var t, i, o = e ? e.ownerDocument || e : E;
                            return o !== p && 9 === o.nodeType && o.documentElement ? (p = o, d = o.documentElement, i = o.defaultView, i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", it, !1) : i.attachEvent && i.attachEvent("onunload", it)), v = !s(o), n.attributes = ft(function(e) {
                                    return e.className = "i", !e.getAttribute("className")
                                }), n.getElementsByTagName = ft(function(e) {
                                    return e.appendChild(o.createComment("")), !e.getElementsByTagName("*").length
                                }), n.getElementsByClassName = Y.test(o.getElementsByClassName), n.getById = ft(function(e) {
                                    return d.appendChild(e).id = w, !o.getElementsByName || !o.getElementsByName(w).length
                                }), n.getById ? (r.find.ID = function(e, t) {
                                        if ("undefined" != typeof t.getElementById && v) {
                                            var n = t.getElementById(e);
                                            return n && n.parentNode ? [n] : []
                                        }
                                    },
                                    r.filter.ID = function(e) {
                                        var t = e.replace(nt, rt);
                                        return function(e) {
                                            return e.getAttribute("id") === t
                                        }
                                    }) : (delete r.find.ID, r.filter.ID = function(e) {
                                    var t = e.replace(nt, rt);
                                    return function(e) {
                                        var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                                        return n && n.value === t
                                    }
                                }), r.find.TAG = n.getElementsByTagName ?
                                function(e, t) {
                                    return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
                                } : function(e, t) {
                                    var n, r = [],
                                        i = 0,
                                        s = t.getElementsByTagName(e);
                                    if ("*" === e) {
                                        while (n = s[i++]) 1 === n.nodeType && r.push(n);
                                        return r
                                    }
                                    return s
                                },
                                r.find.CLASS = n.getElementsByClassName &&
                                function(e, t) {
                                    return v ? t.getElementsByClassName(e) : void 0
                                },
                                g = [], m = [], (n.qsa = Y.test(o.querySelectorAll)) && (ft(function(e) {
                                    d.appendChild(e).innerHTML = "<a id='" + w + "'></a><select id='" + w + "-\f]' msallowcapture=''><option selected=''></option></select>",
                                        e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + j + "*(?:''|\"\")"),
                                        e.querySelectorAll("[selected]").length || m.push("\\[" + j + "*(?:value|" + B + ")"),
                                        e.querySelectorAll("[id~=" + w + "-]").length || m.push("~="),
                                        e.querySelectorAll(":checked").length || m.push(":checked"),
                                        e.querySelectorAll("a#" + w + "+*").length || m.push(".#.+[+~]")
                                }), ft(function(e) {
                                    var t = o.createElement("input");
                                    t.setAttribute("type", "hidden"),
                                        e.appendChild(t).setAttribute("name", "D"),
                                        e.querySelectorAll("[name=d]").length && m.push("name" + j + "*[*^$|!~]?="),
                                        e.querySelectorAll(":enabled").length || m.push(":enabled", ":disabled"),
                                        e.querySelectorAll("*,:x"),
                                        m.push(",.*:")
                                })), (n.matchesSelector = Y.test(y = d.matches || d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && ft(function(e) {
                                    n.disconnectedMatch = y.call(e, "div"),
                                        y.call(e, "[s!='']:x"),
                                        g.push("!=", R)
                                }), m = m.length && new RegExp(m.join("|")), g = g.length && new RegExp(g.join("|")), t = Y.test(d.compareDocumentPosition), b = t || Y.test(d.contains) ?
                                function(e, t) {
                                    var n = 9 === e.nodeType ? e.documentElement : e,
                                        r = t && t.parentNode;
                                    return e === r || !!r && 1 === r.nodeType && !!(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r))
                                } : function(e, t) {
                                    if (t)
                                        while (t = t.parentNode)
                                            if (t === e) return !0;
                                    return !1
                                },
                                k = t ?
                                function(e, t) {
                                    if (e === t) return c = !0,
                                        0;
                                    var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                                    return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & r || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === o || e.ownerDocument === E && b(E, e) ? -1 : t === o || t.ownerDocument === E && b(E, t) ? 1 : l ? H(l, e) - H(l, t) : 0 : 4 & r ? -1 : 1)
                                } : function(e, t) {
                                    if (e === t) return c = !0,
                                        0;
                                    var n, r = 0,
                                        i = e.parentNode,
                                        s = t.parentNode,
                                        u = [e],
                                        a = [t];
                                    if (!i || !s) return e === o ? -1 : t === o ? 1 : i ? -1 : s ? 1 : l ? H(l, e) - H(l, t) : 0;
                                    if (i === s) return ct(e, t);
                                    n = e;
                                    while (n = n.parentNode) u.unshift(n);
                                    n = t;
                                    while (n = n.parentNode) a.unshift(n);
                                    while (u[r] === a[r]) r++;
                                    return r ? ct(u[r], a[r]) : u[r] === E ? -1 : a[r] === E ? 1 : 0
                                },
                                o) : p
                        },
                        ot.matches = function(e, t) {
                            return ot(e, null, null, t)
                        },
                        ot.matchesSelector = function(e, t) {
                            if ((e.ownerDocument || e) !== p && h(e), t = t.replace(V, "='$1']"), !(!n.matchesSelector || !v || g && g.test(t) || m && m.test(t))) try {
                                var r = y.call(e, t);
                                if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
                            } catch (i) {}
                            return ot(t, p, null, [e]).length > 0
                        },
                        ot.contains = function(e, t) {
                            return (e.ownerDocument || e) !== p && h(e),
                                b(e, t)
                        },
                        ot.attr = function(e, t) {
                            (e.ownerDocument || e) !== p && h(e);
                            var i = r.attrHandle[t.toLowerCase()],
                                s = i && A.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !v) : void 0;
                            return void 0 !== s ? s : n.attributes || !v ? e.getAttribute(t) : (s = e.getAttributeNode(t)) && s.specified ? s.value : null
                        },
                        ot.error = function(e) {
                            throw new Error("Syntax error, unrecognized expression: " + e)
                        },
                        ot.uniqueSort = function(e) {
                            var t, r = [],
                                i = 0,
                                s = 0;
                            if (c = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(k), c) {
                                while (t = e[s++]) t === e[s] && (i = r.push(s));
                                while (i--) e.splice(r[i], 1)
                            }
                            return l = null,
                                e
                        },
                        i = ot.getText = function(e) {
                            var t, n = "",
                                r = 0,
                                s = e.nodeType;
                            if (s) {
                                if (1 === s || 9 === s || 11 === s) {
                                    if ("string" == typeof e.textContent) return e.textContent;
                                    for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
                                } else if (3 === s || 4 === s) return e.nodeValue
                            } else
                                while (t = e[r++]) n += i(t);
                            return n
                        },
                        r = ot.selectors = {
                            cacheLength: 50,
                            createPseudo: at,
                            match: K,
                            attrHandle: {},
                            find: {},
                            relative: {
                                ">": {
                                    dir: "parentNode",
                                    first: !0
                                },
                                " ": {
                                    dir: "parentNode"
                                },
                                "+": {
                                    dir: "previousSibling",
                                    first: !0
                                },
                                "~": {
                                    dir: "previousSibling"
                                }
                            },
                            preFilter: {
                                ATTR: function(e) {
                                    return e[1] = e[1].replace(nt, rt),
                                        e[3] = (e[3] || e[4] || e[5] || "").replace(nt, rt),
                                        "~=" === e[2] && (e[3] = " " + e[3] + " "),
                                        e.slice(0, 4)
                                },
                                CHILD: function(e) {
                                    return e[1] = e[1].toLowerCase(),
                                        "nth" === e[1].slice(0, 3) ? (e[3] || ot.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ot.error(e[0]),
                                        e
                                },
                                PSEUDO: function(e) {
                                    var t, n = !e[6] && e[2];
                                    return K.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && $.test(n) && (t = o(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                                }
                            },
                            filter: {
                                TAG: function(e) {
                                    var t = e.replace(nt, rt).toLowerCase();
                                    return "*" === e ?
                                        function() {
                                            return !0
                                        } : function(e) {
                                            return e.nodeName && e.nodeName.toLowerCase() === t
                                        }
                                },
                                CLASS: function(e) {
                                    var t = T[e + " "];
                                    return t || (t = new RegExp("(^|" + j + ")" + e + "(" + j + "|$)")) && T(e,
                                        function(e) {
                                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                                        })
                                },
                                ATTR: function(e, t, n) {
                                    return function(r) {
                                        var i = ot.attr(r, e);
                                        return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace(U, " ") + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                                    }
                                },
                                CHILD: function(e, t, n, r, i) {
                                    var s = "nth" !== e.slice(0, 3),
                                        o = "last" !== e.slice(-4),
                                        u = "of-type" === t;
                                    return 1 === r && 0 === i ?
                                        function(e) {
                                            return !!e.parentNode
                                        } : function(t, n, a) {
                                            var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling",
                                                m = t.parentNode,
                                                g = u && t.nodeName.toLowerCase(),
                                                y = !a && !u;
                                            if (m) {
                                                if (s) {
                                                    while (v) {
                                                        c = t;
                                                        while (c = c[v])
                                                            if (u ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) return !1;
                                                        d = v = "only" === e && !d && "nextSibling"
                                                    }
                                                    return !0
                                                }
                                                if (d = [o ? m.firstChild : m.lastChild], o && y) {
                                                    l = m[w] || (m[w] = {}),
                                                        f = l[e] || [],
                                                        p = f[0] === S && f[1],
                                                        h = f[0] === S && f[2],
                                                        c = p && m.childNodes[p];
                                                    while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                                        if (1 === c.nodeType && ++h && c === t) {
                                                            l[e] = [S, p, h];
                                                            break
                                                        }
                                                } else if (y && (f = (t[w] || (t[w] = {}))[e]) && f[0] === S) h = f[1];
                                                else
                                                    while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                                        if ((u ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) && ++h && (y && ((c[w] || (c[w] = {}))[e] = [S, h]), c === t)) break;
                                                return h -= i,
                                                    h === r || h % r === 0 && h / r >= 0
                                            }
                                        }
                                },
                                PSEUDO: function(e, t) {
                                    var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || ot.error("unsupported pseudo: " + e);
                                    return i[w] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? at(function(e, n) {
                                        var r, s = i(e, t),
                                            o = s.length;
                                        while (o--) r = H(e, s[o]),
                                            e[r] = !(n[r] = s[o])
                                    }) : function(e) {
                                        return i(e, 0, n)
                                    }) : i
                                }
                            },
                            pseudos: {
                                not: at(function(e) {
                                    var t = [],
                                        n = [],
                                        r = u(e.replace(z, "$1"));
                                    return r[w] ? at(function(e, t, n, i) {
                                        var s, o = r(e, null, i, []),
                                            u = e.length;
                                        while (u--)(s = o[u]) && (e[u] = !(t[u] = s))
                                    }) : function(e, i, s) {
                                        return t[0] = e,
                                            r(t, null, s, n),
                                            t[0] = null, !n.pop()
                                    }
                                }),
                                has: at(function(e) {
                                    return function(t) {
                                        return ot(e, t).length > 0
                                    }
                                }),
                                contains: at(function(e) {
                                    return e = e.replace(nt, rt),
                                        function(t) {
                                            return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                                        }
                                }),
                                lang: at(function(e) {
                                    return J.test(e || "") || ot.error("unsupported lang: " + e),
                                        e = e.replace(nt, rt).toLowerCase(),
                                        function(t) {
                                            var n;
                                            do
                                                if (n = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(),
                                                    n === e || 0 === n.indexOf(e + "-");
                                            while ((t = t.parentNode) && 1 === t.nodeType);
                                            return !1
                                        }
                                }),
                                target: function(t) {
                                    var n = e.location && e.location.hash;
                                    return n && n.slice(1) === t.id
                                },
                                root: function(e) {
                                    return e === d
                                },
                                focus: function(e) {
                                    return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                                },
                                enabled: function(e) {
                                    return e.disabled === !1
                                },
                                disabled: function(e) {
                                    return e.disabled === !0
                                },
                                checked: function(e) {
                                    var t = e.nodeName.toLowerCase();
                                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                                },
                                selected: function(e) {
                                    return e.parentNode && e.parentNode.selectedIndex,
                                        e.selected === !0
                                },
                                empty: function(e) {
                                    for (e = e.firstChild; e; e = e.nextSibling)
                                        if (e.nodeType < 6) return !1;
                                    return !0
                                },
                                parent: function(e) {
                                    return !r.pseudos.empty(e)
                                },
                                header: function(e) {
                                    return G.test(e.nodeName)
                                },
                                input: function(e) {
                                    return Q.test(e.nodeName)
                                },
                                button: function(e) {
                                    var t = e.nodeName.toLowerCase();
                                    return "input" === t && "button" === e.type || "button" === t
                                },
                                text: function(e) {
                                    var t;
                                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                                },
                                first: dt(function() {
                                    return [0]
                                }),
                                last: dt(function(e, t) {
                                    return [t - 1]
                                }),
                                eq: dt(function(e, t, n) {
                                    return [0 > n ? n + t : n]
                                }),
                                even: dt(function(e, t) {
                                    for (var n = 0; t > n; n += 2) e.push(n);
                                    return e
                                }),
                                odd: dt(function(e, t) {
                                    for (var n = 1; t > n; n += 2) e.push(n);
                                    return e
                                }),
                                lt: dt(function(e, t, n) {
                                    for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
                                    return e
                                }),
                                gt: dt(function(e, t, n) {
                                    for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
                                    return e
                                })
                            }
                        },
                        r.pseudos.nth = r.pseudos.eq;
                    for (t in {
                            radio: !0,
                            checkbox: !0,
                            file: !0,
                            password: !0,
                            image: !0
                        }) r.pseudos[t] = ht(t);
                    for (t in {
                            submit: !0,
                            reset: !0
                        }) r.pseudos[t] = pt(t);
                    return mt.prototype = r.filters = r.pseudos,
                        r.setFilters = new mt,
                        o = ot.tokenize = function(e, t) {
                            var n, i, s, o, u, a, f, l = N[e + " "];
                            if (l) return t ? 0 : l.slice(0);
                            u = e,
                                a = [],
                                f = r.preFilter;
                            while (u) {
                                (!n || (i = W.exec(u))) && (i && (u = u.slice(i[0].length) || u), a.push(s = [])),
                                n = !1,
                                    (i = X.exec(u)) && (n = i.shift(), s.push({
                                        value: n,
                                        type: i[0].replace(z, " ")
                                    }), u = u.slice(n.length));
                                for (o in r.filter) !(i = K[o].exec(u)) || f[o] && !(i = f[o](i)) || (n = i.shift(), s.push({
                                    value: n,
                                    type: o,
                                    matches: i
                                }), u = u.slice(n.length));
                                if (!n) break
                            }
                            return t ? u.length : u ? ot.error(e) : N(e, a).slice(0)
                        },
                        u = ot.compile = function(e, t) {
                            var n, r = [],
                                i = [],
                                s = C[e + " "];
                            if (!s) {
                                t || (t = o(e)),
                                    n = t.length;
                                while (n--) s = xt(t[n]),
                                    s[w] ? r.push(s) : i.push(s);
                                s = C(e, Tt(i, r)),
                                    s.selector = e
                            }
                            return s
                        },
                        a = ot.select = function(e, t, i, s) {
                            var a, f, l, c, h, p = "function" == typeof e && e,
                                d = !s && o(e = p.selector || e);
                            if (i = i || [], 1 === d.length) {
                                if (f = d[0] = d[0].slice(0), f.length > 2 && "ID" === (l = f[0]).type && n.getById && 9 === t.nodeType && v && r.relative[f[1].type]) {
                                    if (t = (r.find.ID(l.matches[0].replace(nt, rt), t) || [])[0], !t) return i;
                                    p && (t = t.parentNode),
                                        e = e.slice(f.shift().value.length)
                                }
                                a = K.needsContext.test(e) ? 0 : f.length;
                                while (a--) {
                                    if (l = f[a], r.relative[c = l.type]) break;
                                    if ((h = r.find[c]) && (s = h(l.matches[0].replace(nt, rt), et.test(f[0].type) && vt(t.parentNode) || t))) {
                                        if (f.splice(a, 1), e = s.length && gt(f), !e) return D.apply(i, s),
                                            i;
                                        break
                                    }
                                }
                            }
                            return (p || u(e, d))(s, t, !v, i, et.test(e) && vt(t.parentNode) || t),
                                i
                        },
                        n.sortStable = w.split("").sort(k).join("") === w,
                        n.detectDuplicates = !!c,
                        h(),
                        n.sortDetached = ft(function(e) {
                            return 1 & e.compareDocumentPosition(p.createElement("div"))
                        }),
                        ft(function(e) {
                            return e.innerHTML = "<a href='#'></a>",
                                "#" === e.firstChild.getAttribute("href")
                        }) || lt("type|href|height|width",
                            function(e, t, n) {
                                return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                            }),
                        n.attributes && ft(function(e) {
                            return e.innerHTML = "<input/>",
                                e.firstChild.setAttribute("value", ""),
                                "" === e.firstChild.getAttribute("value")
                        }) || lt("value",
                            function(e, t, n) {
                                return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
                            }),
                        ft(function(e) {
                            return null == e.getAttribute("disabled")
                        }) || lt(B,
                            function(e, t, n) {
                                var r;
                                return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                            }),
                        ot
                }(e);
                h.find = y,
                    h.expr = y.selectors,
                    h.expr[":"] = h.expr.pseudos,
                    h.unique = y.uniqueSort,
                    h.text = y.getText,
                    h.isXMLDoc = y.isXML,
                    h.contains = y.contains;
                var b = h.expr.match.needsContext,
                    w = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                    E = /^.[^:#\[\.,]*$/;
                h.filter = function(e, t, n) {
                        var r = t[0];
                        return n && (e = ":not(" + e + ")"),
                            1 === t.length && 1 === r.nodeType ? h.find.matchesSelector(r, e) ? [r] : [] : h.find.matches(e, h.grep(t,
                                function(e) {
                                    return 1 === e.nodeType
                                }))
                    },
                    h.fn.extend({
                        find: function(e) {
                            var t, n = [],
                                r = this,
                                i = r.length;
                            if ("string" != typeof e) return this.pushStack(h(e).filter(function() {
                                for (t = 0; i > t; t++)
                                    if (h.contains(r[t], this)) return !0
                            }));
                            for (t = 0; i > t; t++) h.find(e, r[t], n);
                            return n = this.pushStack(i > 1 ? h.unique(n) : n),
                                n.selector = this.selector ? this.selector + " " + e : e,
                                n
                        },
                        filter: function(e) {
                            return this.pushStack(S(this, e || [], !1))
                        },
                        not: function(e) {
                            return this.pushStack(S(this, e || [], !0))
                        },
                        is: function(e) {
                            return !!S(this, "string" == typeof e && b.test(e) ? h(e) : e || [], !1).length
                        }
                    });
                var x, T = e.document,
                    N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                    C = h.fn.init = function(e, t) {
                        var n, r;
                        if (!e) return this;
                        if ("string" == typeof e) {
                            if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : N.exec(e), !n || !n[1] && t) return !t || t.jquery ? (t || x).find(e) : this.constructor(t).find(e);
                            if (n[1]) {
                                if (t = t instanceof h ? t[0] : t, h.merge(this, h.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : T, !0)), w.test(n[1]) && h.isPlainObject(t))
                                    for (n in t) h.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                                return this
                            }
                            if (r = T.getElementById(n[2]), r && r.parentNode) {
                                if (r.id !== n[2]) return x.find(e);
                                this.length = 1,
                                    this[0] = r
                            }
                            return this.context = T,
                                this.selector = e,
                                this
                        }
                        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : h.isFunction(e) ? "undefined" != typeof x.ready ? x.ready(e) : e(h) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), h.makeArray(e, this))
                    };
                C.prototype = h.fn,
                    x = h(T);
                var k = /^(?:parents|prev(?:Until|All))/,
                    L = {
                        children: !0,
                        contents: !0,
                        next: !0,
                        prev: !0
                    };
                h.extend({
                        dir: function(e, t, n) {
                            var r = [],
                                i = e[t];
                            while (i && 9 !== i.nodeType && (void 0 === n || 1 !== i.nodeType || !h(i).is(n))) 1 === i.nodeType && r.push(i),
                                i = i[t];
                            return r
                        },
                        sibling: function(e, t) {
                            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                            return n
                        }
                    }),
                    h.fn.extend({
                        has: function(e) {
                            var t, n = h(e, this),
                                r = n.length;
                            return this.filter(function() {
                                for (t = 0; r > t; t++)
                                    if (h.contains(this, n[t])) return !0
                            })
                        },
                        closest: function(e, t) {
                            for (var n, r = 0,
                                    i = this.length,
                                    s = [], o = b.test(e) || "string" != typeof e ? h(e, t || this.context) : 0; i > r; r++)
                                for (n = this[r]; n && n !== t; n = n.parentNode)
                                    if (n.nodeType < 11 && (o ? o.index(n) > -1 : 1 === n.nodeType && h.find.matchesSelector(n, e))) {
                                        s.push(n);
                                        break
                                    }
                            return this.pushStack(s.length > 1 ? h.unique(s) : s)
                        },
                        index: function(e) {
                            return e ? "string" == typeof e ? h.inArray(this[0], h(e)) : h.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                        },
                        add: function(e, t) {
                            return this.pushStack(h.unique(h.merge(this.get(), h(e, t))))
                        },
                        addBack: function(e) {
                            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                        }
                    }),
                    h.each({
                            parent: function(e) {
                                var t = e.parentNode;
                                return t && 11 !== t.nodeType ? t : null
                            },
                            parents: function(e) {
                                return h.dir(e, "parentNode")
                            },
                            parentsUntil: function(e, t, n) {
                                return h.dir(e, "parentNode", n)
                            },
                            next: function(e) {
                                return A(e, "nextSibling")
                            },
                            prev: function(e) {
                                return A(e, "previousSibling")
                            },
                            nextAll: function(e) {
                                return h.dir(e, "nextSibling")
                            },
                            prevAll: function(e) {
                                return h.dir(e, "previousSibling")
                            },
                            nextUntil: function(e, t, n) {
                                return h.dir(e, "nextSibling", n)
                            },
                            prevUntil: function(e, t, n) {
                                return h.dir(e, "previousSibling", n)
                            },
                            siblings: function(e) {
                                return h.sibling((e.parentNode || {}).firstChild, e)
                            },
                            children: function(e) {
                                return h.sibling(e.firstChild)
                            },
                            contents: function(e) {
                                return h.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : h.merge([], e.childNodes)
                            }
                        },
                        function(e, t) {
                            h.fn[e] = function(n, r) {
                                var i = h.map(this, t, n);
                                return "Until" !== e.slice(-5) && (r = n),
                                    r && "string" == typeof r && (i = h.filter(r, i)),
                                    this.length > 1 && (L[e] || (i = h.unique(i)), k.test(e) && (i = i.reverse())),
                                    this.pushStack(i)
                            }
                        });
                var O = /\S+/g,
                    M = {};
                h.Callbacks = function(e) {
                        e = "string" == typeof e ? M[e] || _(e) : h.extend({},
                            e);
                        var t, n, r, i, s, o, u = [],
                            a = !e.once && [],
                            f = function(c) {
                                for (n = e.memory && c, r = !0, s = o || 0, o = 0, i = u.length, t = !0; u && i > s; s++)
                                    if (u[s].apply(c[0], c[1]) === !1 && e.stopOnFalse) {
                                        n = !1;
                                        break
                                    }
                                t = !1,
                                    u && (a ? a.length && f(a.shift()) : n ? u = [] : l.disable())
                            },
                            l = {
                                add: function() {
                                    if (u) {
                                        var r = u.length;
                                        !
                                        function s(t) {
                                            h.each(t,
                                                function(t, n) {
                                                    var r = h.type(n);
                                                    "function" === r ? e.unique && l.has(n) || u.push(n) : n && n.length && "string" !== r && s(n)
                                                })
                                        }(arguments),
                                        t ? i = u.length : n && (o = r, f(n))
                                    }
                                    return this
                                },
                                remove: function() {
                                    return u && h.each(arguments,
                                            function(e, n) {
                                                var r;
                                                while ((r = h.inArray(n, u, r)) > -1) u.splice(r, 1),
                                                    t && (i >= r && i--, s >= r && s--)
                                            }),
                                        this
                                },
                                has: function(e) {
                                    return e ? h.inArray(e, u) > -1 : !!u && !!u.length
                                },
                                empty: function() {
                                    return u = [],
                                        i = 0,
                                        this
                                },
                                disable: function() {
                                    return u = a = n = void 0,
                                        this
                                },
                                disabled: function() {
                                    return !u
                                },
                                lock: function() {
                                    return a = void 0,
                                        n || l.disable(),
                                        this
                                },
                                locked: function() {
                                    return !a
                                },
                                fireWith: function(e, n) {
                                    return !u || r && !a || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? a.push(n) : f(n)),
                                        this
                                },
                                fire: function() {
                                    return l.fireWith(this, arguments),
                                        this
                                },
                                fired: function() {
                                    return !!r
                                }
                            };
                        return l
                    },
                    h.extend({
                        Deferred: function(e) {
                            var t = [
                                    ["resolve", "done", h.Callbacks("once memory"), "resolved"],
                                    ["reject", "fail", h.Callbacks("once memory"), "rejected"],
                                    ["notify", "progress", h.Callbacks("memory")]
                                ],
                                n = "pending",
                                r = {
                                    state: function() {
                                        return n
                                    },
                                    always: function() {
                                        return i.done(arguments).fail(arguments),
                                            this
                                    },
                                    then: function() {
                                        var e = arguments;
                                        return h.Deferred(function(n) {
                                            h.each(t,
                                                    function(t, s) {
                                                        var o = h.isFunction(e[t]) && e[t];
                                                        i[s[1]](function() {
                                                            var e = o && o.apply(this, arguments);
                                                            e && h.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s[0] + "With"](this === r ? n.promise() : this, o ? [e] : arguments)
                                                        })
                                                    }),
                                                e = null
                                        }).promise()
                                    },
                                    promise: function(e) {
                                        return null != e ? h.extend(e, r) : r
                                    }
                                },
                                i = {};
                            return r.pipe = r.then,
                                h.each(t,
                                    function(e, s) {
                                        var o = s[2],
                                            u = s[3];
                                        r[s[1]] = o.add,
                                            u && o.add(function() {
                                                    n = u
                                                },
                                                t[1 ^ e][2].disable, t[2][2].lock),
                                            i[s[0]] = function() {
                                                return i[s[0] + "With"](this === i ? r : this, arguments),
                                                    this
                                            },
                                            i[s[0] + "With"] = o.fireWith
                                    }),
                                r.promise(i),
                                e && e.call(i, i),
                                i
                        },
                        when: function(e) {
                            var t = 0,
                                n = r.call(arguments),
                                i = n.length,
                                s = 1 !== i || e && h.isFunction(e.promise) ? i : 0,
                                o = 1 === s ? e : h.Deferred(),
                                u = function(e, t, n) {
                                    return function(i) {
                                        t[e] = this,
                                            n[e] = arguments.length > 1 ? r.call(arguments) : i,
                                            n === a ? o.notifyWith(t, n) : --s || o.resolveWith(t, n)
                                    }
                                },
                                a,
                                f,
                                l;
                            if (i > 1)
                                for (a = new Array(i), f = new Array(i), l = new Array(i); i > t; t++) n[t] && h.isFunction(n[t].promise) ? n[t].promise().done(u(t, l, n)).fail(o.reject).progress(u(t, f, a)) : --s;
                            return s || o.resolveWith(l, n),
                                o.promise()
                        }
                    });
                var D;
                h.fn.ready = function(e) {
                        return h.ready.promise().done(e),
                            this
                    },
                    h.extend({
                        isReady: !1,
                        readyWait: 1,
                        holdReady: function(e) {
                            e ? h.readyWait++ : h.ready(!0)
                        },
                        ready: function(e) {
                            if (e === !0 ? !--h.readyWait : !h.isReady) {
                                if (!T.body) return setTimeout(h.ready);
                                h.isReady = !0,
                                    e !== !0 && --h.readyWait > 0 || (D.resolveWith(T, [h]), h.fn.triggerHandler && (h(T).triggerHandler("ready"), h(T).off("ready")))
                            }
                        }
                    }),
                    h.ready.promise = function(t) {
                        if (!D)
                            if (D = h.Deferred(), "complete" === T.readyState) setTimeout(h.ready);
                            else if (T.addEventListener) T.addEventListener("DOMContentLoaded", H, !1),
                            e.addEventListener("load", H, !1);
                        else {
                            T.attachEvent("onreadystatechange", H),
                                e.attachEvent("onload", H);
                            var n = !1;
                            try {
                                n = null == e.frameElement && T.documentElement
                            } catch (r) {}
                            n && n.doScroll && !
                                function i() {
                                    if (!h.isReady) {
                                        try {
                                            n.doScroll("left")
                                        } catch (e) {
                                            return setTimeout(i, 50)
                                        }
                                        P(),
                                            h.ready()
                                    }
                                }()
                        }
                        return D.promise(t)
                    };
                var B = "undefined",
                    j;
                for (j in h(l)) break;
                l.ownLast = "0" !== j,
                    l.inlineBlockNeedsLayout = !1,
                    h(function() {
                        var e, t, n, r;
                        n = T.getElementsByTagName("body")[0],
                            n && n.style && (t = T.createElement("div"), r = T.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== B && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", l.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(r))
                    }),
                    function() {
                        var e = T.createElement("div");
                        if (null == l.deleteExpando) {
                            l.deleteExpando = !0;
                            try {
                                delete e.test
                            } catch (t) {
                                l.deleteExpando = !1
                            }
                        }
                        e = null
                    }(),
                    h.acceptData = function(e) {
                        var t = h.noData[(e.nodeName + " ").toLowerCase()],
                            n = +e.nodeType || 1;
                        return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
                    };
                var F = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                    I = /([A-Z])/g;
                h.extend({
                        cache: {},
                        noData: {
                            "applet ": !0,
                            "embed ": !0,
                            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                        },
                        hasData: function(e) {
                            return e = e.nodeType ? h.cache[e[h.expando]] : e[h.expando], !!e && !R(e)
                        },
                        data: function(e, t, n) {
                            return U(e, t, n)
                        },
                        removeData: function(e, t) {
                            return z(e, t)
                        },
                        _data: function(e, t, n) {
                            return U(e, t, n, !0)
                        },
                        _removeData: function(e, t) {
                            return z(e, t, !0)
                        }
                    }),
                    h.fn.extend({
                        data: function(e, t) {
                            var n, r, i, s = this[0],
                                o = s && s.attributes;
                            if (void 0 === e) {
                                if (this.length && (i = h.data(s), 1 === s.nodeType && !h._data(s, "parsedAttrs"))) {
                                    n = o.length;
                                    while (n--) o[n] && (r = o[n].name, 0 === r.indexOf("data-") && (r = h.camelCase(r.slice(5)), q(s, r, i[r])));
                                    h._data(s, "parsedAttrs", !0)
                                }
                                return i
                            }
                            return "object" == typeof e ? this.each(function() {
                                h.data(this, e)
                            }) : arguments.length > 1 ? this.each(function() {
                                h.data(this, e, t)
                            }) : s ? q(s, e, h.data(s, e)) : void 0
                        },
                        removeData: function(e) {
                            return this.each(function() {
                                h.removeData(this, e)
                            })
                        }
                    }),
                    h.extend({
                        queue: function(e, t, n) {
                            var r;
                            return e ? (t = (t || "fx") + "queue", r = h._data(e, t), n && (!r || h.isArray(n) ? r = h._data(e, t, h.makeArray(n)) : r.push(n)), r || []) : void 0
                        },
                        dequeue: function(e, t) {
                            t = t || "fx";
                            var n = h.queue(e, t),
                                r = n.length,
                                i = n.shift(),
                                s = h._queueHooks(e, t),
                                o = function() {
                                    h.dequeue(e, t)
                                };
                            "inprogress" === i && (i = n.shift(), r--),
                                i && ("fx" === t && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
                        },
                        _queueHooks: function(e, t) {
                            var n = t + "queueHooks";
                            return h._data(e, n) || h._data(e, n, {
                                empty: h.Callbacks("once memory").add(function() {
                                    h._removeData(e, t + "queue"),
                                        h._removeData(e, n)
                                })
                            })
                        }
                    }),
                    h.fn.extend({
                        queue: function(e, t) {
                            var n = 2;
                            return "string" != typeof e && (t = e, e = "fx", n--),
                                arguments.length < n ? h.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                                    var n = h.queue(this, e, t);
                                    h._queueHooks(this, e),
                                        "fx" === e && "inprogress" !== n[0] && h.dequeue(this, e)
                                })
                        },
                        dequeue: function(e) {
                            return this.each(function() {
                                h.dequeue(this, e)
                            })
                        },
                        clearQueue: function(e) {
                            return this.queue(e || "fx", [])
                        },
                        promise: function(e, t) {
                            var n, r = 1,
                                i = h.Deferred(),
                                s = this,
                                o = this.length,
                                u = function() {
                                    --r || i.resolveWith(s, [s])
                                };
                            "string" != typeof e && (t = e, e = void 0),
                                e = e || "fx";
                            while (o--) n = h._data(s[o], e + "queueHooks"),
                                n && n.empty && (r++, n.empty.add(u));
                            return u(),
                                i.promise(t)
                        }
                    });
                var W = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                    X = ["Top", "Right", "Bottom", "Left"],
                    V = function(e, t) {
                        return e = t || e,
                            "none" === h.css(e, "display") || !h.contains(e.ownerDocument, e)
                    },
                    $ = h.access = function(e, t, n, r, i, s, o) {
                        var u = 0,
                            a = e.length,
                            f = null == n;
                        if ("object" === h.type(n)) {
                            i = !0;
                            for (u in n) h.access(e, t, u, n[u], !0, s, o)
                        } else if (void 0 !== r && (i = !0, h.isFunction(r) || (o = !0), f && (o ? (t.call(e, r), t = null) : (f = t, t = function(e, t, n) {
                                return f.call(h(e), n)
                            })), t))
                            for (; a > u; u++) t(e[u], n, o ? r : r.call(e[u], u, t(e[u], n)));
                        return i ? e : f ? t.call(e) : a ? t(e[0], n) : s
                    },
                    J = /^(?:checkbox|radio)$/i;
                !
                function() {
                    var e = T.createElement("input"),
                        t = T.createElement("div"),
                        n = T.createDocumentFragment();
                    if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", l.leadingWhitespace = 3 === t.firstChild.nodeType, l.tbody = !t.getElementsByTagName("tbody").length, l.htmlSerialize = !!t.getElementsByTagName("link").length, l.html5Clone = "<:nav></:nav>" !== T.createElement("nav").cloneNode(!0).outerHTML, e.type = "checkbox", e.checked = !0, n.appendChild(e), l.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", l.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", l.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, l.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick",
                            function() {
                                l.noCloneEvent = !1
                            }), t.cloneNode(!0).click()), null == l.deleteExpando) {
                        l.deleteExpando = !0;
                        try {
                            delete t.test
                        } catch (r) {
                            l.deleteExpando = !1
                        }
                    }
                }(),
                function() {
                    var t, n, r = T.createElement("div");
                    for (t in {
                            submit: !0,
                            change: !0,
                            focusin: !0
                        }) n = "on" + t,
                        (l[t + "Bubbles"] = n in e) || (r.setAttribute(n, "t"), l[t + "Bubbles"] = r.attributes[n].expando === !1);
                    r = null
                }();
                var K = /^(?:input|select|textarea)$/i,
                    Q = /^key/,
                    G = /^(?:mouse|pointer|contextmenu)|click/,
                    Y = /^(?:focusinfocus|focusoutblur)$/,
                    Z = /^([^.]*)(?:\.(.+)|)$/;
                h.event = {
                        global: {},
                        add: function(e, t, n, r, i) {
                            var s, o, u, a, f, l, c, p, d, v, m, g = h._data(e);
                            if (g) {
                                n.handler && (a = n, n = a.handler, i = a.selector),
                                    n.guid || (n.guid = h.guid++),
                                    (o = g.events) || (o = g.events = {}),
                                    (l = g.handle) || (l = g.handle = function(e) {
                                            return typeof h === B || e && h.event.triggered === e.type ? void 0 : h.event.dispatch.apply(l.elem, arguments)
                                        },
                                        l.elem = e),
                                    t = (t || "").match(O) || [""],
                                    u = t.length;
                                while (u--) s = Z.exec(t[u]) || [],
                                    d = m = s[1],
                                    v = (s[2] || "").split(".").sort(),
                                    d && (f = h.event.special[d] || {},
                                        d = (i ? f.delegateType : f.bindType) || d, f = h.event.special[d] || {},
                                        c = h.extend({
                                                type: d,
                                                origType: m,
                                                data: r,
                                                handler: n,
                                                guid: n.guid,
                                                selector: i,
                                                needsContext: i && h.expr.match.needsContext.test(i),
                                                namespace: v.join(".")
                                            },
                                            a), (p = o[d]) || (p = o[d] = [], p.delegateCount = 0, f.setup && f.setup.call(e, r, v, l) !== !1 || (e.addEventListener ? e.addEventListener(d, l, !1) : e.attachEvent && e.attachEvent("on" + d, l))), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), h.event.global[d] = !0);
                                e = null
                            }
                        },
                        remove: function(e, t, n, r, i) {
                            var s, o, u, a, f, l, c, p, d, v, m, g = h.hasData(e) && h._data(e);
                            if (g && (l = g.events)) {
                                t = (t || "").match(O) || [""],
                                    f = t.length;
                                while (f--)
                                    if (u = Z.exec(t[f]) || [], d = m = u[1], v = (u[2] || "").split(".").sort(), d) {
                                        c = h.event.special[d] || {},
                                            d = (r ? c.delegateType : c.bindType) || d,
                                            p = l[d] || [],
                                            u = u[2] && new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                                            a = s = p.length;
                                        while (s--) o = p[s], !i && m !== o.origType || n && n.guid !== o.guid || u && !u.test(o.namespace) || r && r !== o.selector && ("**" !== r || !o.selector) || (p.splice(s, 1), o.selector && p.delegateCount--, c.remove && c.remove.call(e, o));
                                        a && !p.length && (c.teardown && c.teardown.call(e, v, g.handle) !== !1 || h.removeEvent(e, d, g.handle), delete l[d])
                                    } else
                                        for (d in l) h.event.remove(e, d + t[f], n, r, !0);
                                h.isEmptyObject(l) && (delete g.handle, h._removeData(e, "events"))
                            }
                        },
                        trigger: function(t, n, r, i) {
                            var s, o, u, a, l, c, p, d = [r || T],
                                v = f.call(t, "type") ? t.type : t,
                                m = f.call(t, "namespace") ? t.namespace.split(".") : [];
                            if (u = c = r = r || T, 3 !== r.nodeType && 8 !== r.nodeType && !Y.test(v + h.event.triggered) && (v.indexOf(".") >= 0 && (m = v.split("."), v = m.shift(), m.sort()), o = v.indexOf(":") < 0 && "on" + v, t = t[h.expando] ? t : new h.Event(v, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = m.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : h.makeArray(n, [t]), l = h.event.special[v] || {},
                                    i || !l.trigger || l.trigger.apply(r, n) !== !1)) {
                                if (!i && !l.noBubble && !h.isWindow(r)) {
                                    for (a = l.delegateType || v, Y.test(a + v) || (u = u.parentNode); u; u = u.parentNode) d.push(u),
                                        c = u;
                                    c === (r.ownerDocument || T) && d.push(c.defaultView || c.parentWindow || e)
                                }
                                p = 0;
                                while ((u = d[p++]) && !t.isPropagationStopped()) t.type = p > 1 ? a : l.bindType || v,
                                    s = (h._data(u, "events") || {})[t.type] && h._data(u, "handle"),
                                    s && s.apply(u, n),
                                    s = o && u[o],
                                    s && s.apply && h.acceptData(u) && (t.result = s.apply(u, n), t.result === !1 && t.preventDefault());
                                if (t.type = v, !i && !t.isDefaultPrevented() && (!l._default || l._default.apply(d.pop(), n) === !1) && h.acceptData(r) && o && r[v] && !h.isWindow(r)) {
                                    c = r[o],
                                        c && (r[o] = null),
                                        h.event.triggered = v;
                                    try {
                                        r[v]()
                                    } catch (g) {}
                                    h.event.triggered = void 0,
                                        c && (r[o] = c)
                                }
                                return t.result
                            }
                        },
                        dispatch: function(e) {
                            e = h.event.fix(e);
                            var t, n, i, s, o, u = [],
                                a = r.call(arguments),
                                f = (h._data(this, "events") || {})[e.type] || [],
                                l = h.event.special[e.type] || {};
                            if (a[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                                u = h.event.handlers.call(this, e, f),
                                    t = 0;
                                while ((s = u[t++]) && !e.isPropagationStopped()) {
                                    e.currentTarget = s.elem,
                                        o = 0;
                                    while ((i = s.handlers[o++]) && !e.isImmediatePropagationStopped())(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, n = ((h.event.special[i.origType] || {}).handle || i.handler).apply(s.elem, a), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()))
                                }
                                return l.postDispatch && l.postDispatch.call(this, e),
                                    e.result
                            }
                        },
                        handlers: function(e, t) {
                            var n, r, i, s, o = [],
                                u = t.delegateCount,
                                a = e.target;
                            if (u && a.nodeType && (!e.button || "click" !== e.type))
                                for (; a != this; a = a.parentNode || this)
                                    if (1 === a.nodeType && (a.disabled !== !0 || "click" !== e.type)) {
                                        for (i = [], s = 0; u > s; s++) r = t[s],
                                            n = r.selector + " ",
                                            void 0 === i[n] && (i[n] = r.needsContext ? h(n, this).index(a) >= 0 : h.find(n, this, null, [a]).length),
                                            i[n] && i.push(r);
                                        i.length && o.push({
                                            elem: a,
                                            handlers: i
                                        })
                                    }
                            return u < t.length && o.push({
                                    elem: this,
                                    handlers: t.slice(u)
                                }),
                                o
                        },
                        fix: function(e) {
                            if (e[h.expando]) return e;
                            var t, n, r, i = e.type,
                                s = e,
                                o = this.fixHooks[i];
                            o || (this.fixHooks[i] = o = G.test(i) ? this.mouseHooks : Q.test(i) ? this.keyHooks : {}),
                                r = o.props ? this.props.concat(o.props) : this.props,
                                e = new h.Event(s),
                                t = r.length;
                            while (t--) n = r[t],
                                e[n] = s[n];
                            return e.target || (e.target = s.srcElement || T),
                                3 === e.target.nodeType && (e.target = e.target.parentNode),
                                e.metaKey = !!e.metaKey,
                                o.filter ? o.filter(e, s) : e
                        },
                        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                        fixHooks: {},
                        keyHooks: {
                            props: "char charCode key keyCode".split(" "),
                            filter: function(e, t) {
                                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode),
                                    e
                            }
                        },
                        mouseHooks: {
                            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                            filter: function(e, t) {
                                var n, r, i, s = t.button,
                                    o = t.fromElement;
                                return null == e.pageX && null != t.clientX && (r = e.target.ownerDocument || T, i = r.documentElement, n = r.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), !e.relatedTarget && o && (e.relatedTarget = o === e.target ? t.toElement : o),
                                    e.which || void 0 === s || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0),
                                    e
                            }
                        },
                        special: {
                            load: {
                                noBubble: !0
                            },
                            focus: {
                                trigger: function() {
                                    if (this !== nt() && this.focus) try {
                                        return this.focus(), !1
                                    } catch (e) {}
                                },
                                delegateType: "focusin"
                            },
                            blur: {
                                trigger: function() {
                                    return this === nt() && this.blur ? (this.blur(), !1) : void 0
                                },
                                delegateType: "focusout"
                            },
                            click: {
                                trigger: function() {
                                    return h.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                                },
                                _default: function(e) {
                                    return h.nodeName(e.target, "a")
                                }
                            },
                            beforeunload: {
                                postDispatch: function(e) {
                                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                                }
                            }
                        },
                        simulate: function(e, t, n, r) {
                            var i = h.extend(new h.Event, n, {
                                type: e,
                                isSimulated: !0,
                                originalEvent: {}
                            });
                            r ? h.event.trigger(i, null, t) : h.event.dispatch.call(t, i),
                                i.isDefaultPrevented() && n.preventDefault()
                        }
                    },
                    h.removeEvent = T.removeEventListener ?
                    function(e, t, n) {
                        e.removeEventListener && e.removeEventListener(t, n, !1)
                    } : function(e, t, n) {
                        var r = "on" + t;
                        e.detachEvent && (typeof e[r] === B && (e[r] = null), e.detachEvent(r, n))
                    },
                    h.Event = function(e, t) {
                        return this instanceof h.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? et : tt) : this.type = e, t && h.extend(this, t), this.timeStamp = e && e.timeStamp || h.now(), void(this[h.expando] = !0)) : new h.Event(e, t)
                    },
                    h.Event.prototype = {
                        isDefaultPrevented: tt,
                        isPropagationStopped: tt,
                        isImmediatePropagationStopped: tt,
                        preventDefault: function() {
                            var e = this.originalEvent;
                            this.isDefaultPrevented = et,
                                e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
                        },
                        stopPropagation: function() {
                            var e = this.originalEvent;
                            this.isPropagationStopped = et,
                                e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
                        },
                        stopImmediatePropagation: function() {
                            var e = this.originalEvent;
                            this.isImmediatePropagationStopped = et,
                                e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
                                this.stopPropagation()
                        }
                    },
                    h.each({
                            mouseenter: "mouseover",
                            mouseleave: "mouseout",
                            pointerenter: "pointerover",
                            pointerleave: "pointerout"
                        },
                        function(e, t) {
                            h.event.special[e] = {
                                delegateType: t,
                                bindType: t,
                                handle: function(e) {
                                    var n, r = this,
                                        i = e.relatedTarget,
                                        s = e.handleObj;
                                    return (!i || i !== r && !h.contains(r, i)) && (e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t),
                                        n
                                }
                            }
                        }),
                    l.submitBubbles || (h.event.special.submit = {
                        setup: function() {
                            return h.nodeName(this, "form") ? !1 : void h.event.add(this, "click._submit keypress._submit",
                                function(e) {
                                    var t = e.target,
                                        n = h.nodeName(t, "input") || h.nodeName(t, "button") ? t.form : void 0;
                                    n && !h._data(n, "submitBubbles") && (h.event.add(n, "submit._submit",
                                        function(e) {
                                            e._submit_bubble = !0
                                        }), h._data(n, "submitBubbles", !0))
                                })
                        },
                        postDispatch: function(e) {
                            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && h.event.simulate("submit", this.parentNode, e, !0))
                        },
                        teardown: function() {
                            return h.nodeName(this, "form") ? !1 : void h.event.remove(this, "._submit")
                        }
                    }),
                    l.changeBubbles || (h.event.special.change = {
                        setup: function() {
                            return K.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (h.event.add(this, "propertychange._change",
                                function(e) {
                                    "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
                                }), h.event.add(this, "click._change",
                                function(e) {
                                    this._just_changed && !e.isTrigger && (this._just_changed = !1),
                                        h.event.simulate("change", this, e, !0)
                                })), !1) : void h.event.add(this, "beforeactivate._change",
                                function(e) {
                                    var t = e.target;
                                    K.test(t.nodeName) && !h._data(t, "changeBubbles") && (h.event.add(t, "change._change",
                                        function(e) {
                                            !this.parentNode || e.isSimulated || e.isTrigger || h.event.simulate("change", this.parentNode, e, !0)
                                        }), h._data(t, "changeBubbles", !0))
                                })
                        },
                        handle: function(e) {
                            var t = e.target;
                            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
                        },
                        teardown: function() {
                            return h.event.remove(this, "._change"), !K.test(this.nodeName)
                        }
                    }),
                    l.focusinBubbles || h.each({
                            focus: "focusin",
                            blur: "focusout"
                        },
                        function(e, t) {
                            var n = function(e) {
                                h.event.simulate(t, e.target, h.event.fix(e), !0)
                            };
                            h.event.special[t] = {
                                setup: function() {
                                    var r = this.ownerDocument || this,
                                        i = h._data(r, t);
                                    i || r.addEventListener(e, n, !0),
                                        h._data(r, t, (i || 0) + 1)
                                },
                                teardown: function() {
                                    var r = this.ownerDocument || this,
                                        i = h._data(r, t) - 1;
                                    i ? h._data(r, t, i) : (r.removeEventListener(e, n, !0), h._removeData(r, t))
                                }
                            }
                        }),
                    h.fn.extend({
                        on: function(e, t, n, r, i) {
                            var s, o;
                            if ("object" == typeof e) {
                                "string" != typeof t && (n = n || t, t = void 0);
                                for (s in e) this.on(s, t, n, e[s], i);
                                return this
                            }
                            if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1) r = tt;
                            else if (!r) return this;
                            return 1 === i && (o = r, r = function(e) {
                                        return h().off(e),
                                            o.apply(this, arguments)
                                    },
                                    r.guid = o.guid || (o.guid = h.guid++)),
                                this.each(function() {
                                    h.event.add(this, e, r, n, t)
                                })
                        },
                        one: function(e, t, n, r) {
                            return this.on(e, t, n, r, 1)
                        },
                        off: function(e, t, n) {
                            var r, i;
                            if (e && e.preventDefault && e.handleObj) return r = e.handleObj,
                                h(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                                this;
                            if ("object" == typeof e) {
                                for (i in e) this.off(i, t, e[i]);
                                return this
                            }
                            return (t === !1 || "function" == typeof t) && (n = t, t = void 0),
                                n === !1 && (n = tt),
                                this.each(function() {
                                    h.event.remove(this, e, n, t)
                                })
                        },
                        trigger: function(e, t) {
                            return this.each(function() {
                                h.event.trigger(e, t, this)
                            })
                        },
                        triggerHandler: function(e, t) {
                            var n = this[0];
                            return n ? h.event.trigger(e, t, n, !0) : void 0
                        }
                    });
                var it = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
                    st = / jQuery\d+="(?:null|\d+)"/g,
                    ot = new RegExp("<(?:" + it + ")[\\s/>]", "i"),
                    ut = /^\s+/,
                    at = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                    ft = /<([\w:]+)/,
                    lt = /<tbody/i,
                    ct = /<|&#?\w+;/,
                    ht = /<(?:script|style|link)/i,
                    pt = /checked\s*(?:[^=]|=\s*.checked.)/i,
                    dt = /^$|\/(?:java|ecma)script/i,
                    vt = /^true\/(.*)/,
                    mt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
                    gt = {
                        option: [1, "<select multiple='multiple'>", "</select>"],
                        legend: [1, "<fieldset>", "</fieldset>"],
                        area: [1, "<map>", "</map>"],
                        param: [1, "<object>", "</object>"],
                        thead: [1, "<table>", "</table>"],
                        tr: [2, "<table><tbody>", "</tbody></table>"],
                        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                        _default: l.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
                    },
                    yt = rt(T),
                    bt = yt.appendChild(T.createElement("div"));
                gt.optgroup = gt.option,
                    gt.tbody = gt.tfoot = gt.colgroup = gt.caption = gt.thead,
                    gt.th = gt.td,
                    h.extend({
                        clone: function(e, t, n) {
                            var r, i, s, o, u, a = h.contains(e.ownerDocument, e);
                            if (l.html5Clone || h.isXMLDoc(e) || !ot.test("<" + e.nodeName + ">") ? s = e.cloneNode(!0) : (bt.innerHTML = e.outerHTML, bt.removeChild(s = bt.firstChild)), !(l.noCloneEvent && l.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || h.isXMLDoc(e)))
                                for (r = wt(s), u = wt(e), o = 0; null != (i = u[o]); ++o) r[o] && kt(i, r[o]);
                            if (t)
                                if (n)
                                    for (u = u || wt(e), r = r || wt(s), o = 0; null != (i = u[o]); o++) Ct(i, r[o]);
                                else Ct(e, s);
                            return r = wt(s, "script"),
                                r.length > 0 && Nt(r, !a && wt(e, "script")),
                                r = u = i = null,
                                s
                        },
                        buildFragment: function(e, t, n, r) {
                            for (var i, s, o, u, a, f, c, p = e.length,
                                    d = rt(t), v = [], m = 0; p > m; m++)
                                if (s = e[m], s || 0 === s)
                                    if ("object" === h.type(s)) h.merge(v, s.nodeType ? [s] : s);
                                    else if (ct.test(s)) {
                                u = u || d.appendChild(t.createElement("div")),
                                    a = (ft.exec(s) || ["", ""])[1].toLowerCase(),
                                    c = gt[a] || gt._default,
                                    u.innerHTML = c[1] + s.replace(at, "<$1></$2>") + c[2],
                                    i = c[0];
                                while (i--) u = u.lastChild;
                                if (!l.leadingWhitespace && ut.test(s) && v.push(t.createTextNode(ut.exec(s)[0])), !l.tbody) {
                                    s = "table" !== a || lt.test(s) ? "<table>" !== c[1] || lt.test(s) ? 0 : u : u.firstChild,
                                        i = s && s.childNodes.length;
                                    while (i--) h.nodeName(f = s.childNodes[i], "tbody") && !f.childNodes.length && s.removeChild(f)
                                }
                                h.merge(v, u.childNodes),
                                    u.textContent = "";
                                while (u.firstChild) u.removeChild(u.firstChild);
                                u = d.lastChild
                            } else v.push(t.createTextNode(s));
                            u && d.removeChild(u),
                                l.appendChecked || h.grep(wt(v, "input"), Et),
                                m = 0;
                            while (s = v[m++])
                                if ((!r || -1 === h.inArray(s, r)) && (o = h.contains(s.ownerDocument, s), u = wt(d.appendChild(s), "script"), o && Nt(u), n)) {
                                    i = 0;
                                    while (s = u[i++]) dt.test(s.type || "") && n.push(s)
                                }
                            return u = null,
                                d
                        },
                        cleanData: function(e, t) {
                            for (var r, i, s, o, u = 0,
                                    a = h.expando,
                                    f = h.cache,
                                    c = l.deleteExpando,
                                    p = h.event.special; null != (r = e[u]); u++)
                                if ((t || h.acceptData(r)) && (s = r[a], o = s && f[s])) {
                                    if (o.events)
                                        for (i in o.events) p[i] ? h.event.remove(r, i) : h.removeEvent(r, i, o.handle);
                                    f[s] && (delete f[s], c ? delete r[a] : typeof r.removeAttribute !== B ? r.removeAttribute(a) : r[a] = null, n.push(s))
                                }
                        }
                    }),
                    h.fn.extend({
                        text: function(e) {
                            return $(this,
                                function(e) {
                                    return void 0 === e ? h.text(this) : this.empty().append((this[0] && this[0].ownerDocument || T).createTextNode(e))
                                },
                                null, e, arguments.length)
                        },
                        append: function() {
                            return this.domManip(arguments,
                                function(e) {
                                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                        var t = St(this, e);
                                        t.appendChild(e)
                                    }
                                })
                        },
                        prepend: function() {
                            return this.domManip(arguments,
                                function(e) {
                                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                        var t = St(this, e);
                                        t.insertBefore(e, t.firstChild)
                                    }
                                })
                        },
                        before: function() {
                            return this.domManip(arguments,
                                function(e) {
                                    this.parentNode && this.parentNode.insertBefore(e, this)
                                })
                        },
                        after: function() {
                            return this.domManip(arguments,
                                function(e) {
                                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                                })
                        },
                        remove: function(e, t) {
                            for (var n, r = e ? h.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || h.cleanData(wt(n)),
                                n.parentNode && (t && h.contains(n.ownerDocument, n) && Nt(wt(n, "script")), n.parentNode.removeChild(n));
                            return this
                        },
                        empty: function() {
                            for (var e, t = 0; null != (e = this[t]); t++) {
                                1 === e.nodeType && h.cleanData(wt(e, !1));
                                while (e.firstChild) e.removeChild(e.firstChild);
                                e.options && h.nodeName(e, "select") && (e.options.length = 0)
                            }
                            return this
                        },
                        clone: function(e, t) {
                            return e = null == e ? !1 : e,
                                t = null == t ? e : t,
                                this.map(function() {
                                    return h.clone(this, e, t)
                                })
                        },
                        html: function(e) {
                            return $(this,
                                function(e) {
                                    var t = this[0] || {},
                                        n = 0,
                                        r = this.length;
                                    if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(st, "") : void 0;
                                    if (!("string" != typeof e || ht.test(e) || !l.htmlSerialize && ot.test(e) || !l.leadingWhitespace && ut.test(e) || gt[(ft.exec(e) || ["", ""])[1].toLowerCase()])) {
                                        e = e.replace(at, "<$1></$2>");
                                        try {
                                            for (; r > n; n++) t = this[n] || {},
                                                1 === t.nodeType && (h.cleanData(wt(t, !1)), t.innerHTML = e);
                                            t = 0
                                        } catch (i) {}
                                    }
                                    t && this.empty().append(e)
                                },
                                null, e, arguments.length)
                        },
                        replaceWith: function() {
                            var e = arguments[0];
                            return this.domManip(arguments,
                                    function(t) {
                                        e = this.parentNode,
                                            h.cleanData(wt(this)),
                                            e && e.replaceChild(t, this)
                                    }),
                                e && (e.length || e.nodeType) ? this : this.remove()
                        },
                        detach: function(e) {
                            return this.remove(e, !0)
                        },
                        domManip: function(e, t) {
                            e = i.apply([], e);
                            var n, r, s, o, u, a, f = 0,
                                c = this.length,
                                p = this,
                                d = c - 1,
                                v = e[0],
                                m = h.isFunction(v);
                            if (m || c > 1 && "string" == typeof v && !l.checkClone && pt.test(v)) return this.each(function(n) {
                                var r = p.eq(n);
                                m && (e[0] = v.call(this, n, r.html())),
                                    r.domManip(e, t)
                            });
                            if (c && (a = h.buildFragment(e, this[0].ownerDocument, !1, this), n = a.firstChild, 1 === a.childNodes.length && (a = n), n)) {
                                for (o = h.map(wt(a, "script"), xt), s = o.length; c > f; f++) r = a,
                                    f !== d && (r = h.clone(r, !0, !0), s && h.merge(o, wt(r, "script"))),
                                    t.call(this[f], r, f);
                                if (s)
                                    for (u = o[o.length - 1].ownerDocument, h.map(o, Tt), f = 0; s > f; f++) r = o[f],
                                        dt.test(r.type || "") && !h._data(r, "globalEval") && h.contains(u, r) && (r.src ? h._evalUrl && h._evalUrl(r.src) : h.globalEval((r.text || r.textContent || r.innerHTML || "").replace(mt, "")));
                                a = n = null
                            }
                            return this
                        }
                    }),
                    h.each({
                            appendTo: "append",
                            prependTo: "prepend",
                            insertBefore: "before",
                            insertAfter: "after",
                            replaceAll: "replaceWith"
                        },
                        function(e, t) {
                            h.fn[e] = function(e) {
                                for (var n, r = 0,
                                        i = [], o = h(e), u = o.length - 1; u >= r; r++) n = r === u ? this : this.clone(!0),
                                    h(o[r])[t](n),
                                    s.apply(i, n.get());
                                return this.pushStack(i)
                            }
                        });
                var Lt, At = {};
                !
                function() {
                    var e;
                    l.shrinkWrapBlocks = function() {
                        if (null != e) return e;
                        e = !1;
                        var t, n, r;
                        return n = T.getElementsByTagName("body")[0],
                            n && n.style ? (t = T.createElement("div"), r = T.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== B && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(T.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(r), e) : void 0
                    }
                }();
                var _t = /^margin/,
                    Dt = new RegExp("^(" + W + ")(?!px)[a-z%]+$", "i"),
                    Pt,
                    Ht,
                    Bt = /^(top|right|bottom|left)$/;
                e.getComputedStyle ? (Pt = function(t) {
                            return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
                        },
                        Ht = function(e, t, n) {
                            var r, i, s, o, u = e.style;
                            return n = n || Pt(e),
                                o = n ? n.getPropertyValue(t) || n[t] : void 0,
                                n && ("" !== o || h.contains(e.ownerDocument, e) || (o = h.style(e, t)), Dt.test(o) && _t.test(t) && (r = u.width, i = u.minWidth, s = u.maxWidth, u.minWidth = u.maxWidth = u.width = o, o = n.width, u.width = r, u.minWidth = i, u.maxWidth = s)),
                                void 0 === o ? o : o + ""
                        }) : T.documentElement.currentStyle && (Pt = function(e) {
                            return e.currentStyle
                        },
                        Ht = function(e, t, n) {
                            var r, i, s, o, u = e.style;
                            return n = n || Pt(e),
                                o = n ? n[t] : void 0,
                                null == o && u && u[t] && (o = u[t]),
                                Dt.test(o) && !Bt.test(t) && (r = u.left, i = e.runtimeStyle, s = i && i.left, s && (i.left = e.currentStyle.left), u.left = "fontSize" === t ? "1em" : o, o = u.pixelLeft + "px", u.left = r, s && (i.left = s)),
                                void 0 === o ? o : o + "" || "auto"
                        }), !
                    function() {
                        var t, n, r, i, s, o, u;
                        if (t = T.createElement("div"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = t.getElementsByTagName("a")[0], n = r && r.style) {
                            n.cssText = "float:left;opacity:.5",
                                l.opacity = "0.5" === n.opacity,
                                l.cssFloat = !!n.cssFloat,
                                t.style.backgroundClip = "content-box",
                                t.cloneNode(!0).style.backgroundClip = "",
                                l.clearCloneStyle = "content-box" === t.style.backgroundClip,
                                l.boxSizing = "" === n.boxSizing || "" === n.MozBoxSizing || "" === n.WebkitBoxSizing,
                                h.extend(l, {
                                    reliableHiddenOffsets: function() {
                                        return null == o && a(),
                                            o
                                    },
                                    boxSizingReliable: function() {
                                        return null == s && a(),
                                            s
                                    },
                                    pixelPosition: function() {
                                        return null == i && a(),
                                            i
                                    },
                                    reliableMarginRight: function() {
                                        return null == u && a(),
                                            u
                                    }
                                });

                            function a() {
                                var t, n, r, a;
                                n = T.getElementsByTagName("body")[0],
                                    n && n.style && (t = T.createElement("div"), r = T.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", i = s = !1, u = !0, e.getComputedStyle && (i = "1%" !== (e.getComputedStyle(t, null) || {}).top, s = "4px" === (e.getComputedStyle(t, null) || {
                                        width: "4px"
                                    }).width, a = t.appendChild(T.createElement("div")), a.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", a.style.marginRight = a.style.width = "0", t.style.width = "1px", u = !parseFloat((e.getComputedStyle(a, null) || {}).marginRight), t.removeChild(a)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", a = t.getElementsByTagName("td"), a[0].style.cssText = "margin:0;border:0;padding:0;display:none", o = 0 === a[0].offsetHeight, o && (a[0].style.display = "", a[1].style.display = "none", o = 0 === a[0].offsetHeight), n.removeChild(r))
                            }
                        }
                    }(),
                    h.swap = function(e, t, n, r) {
                        var i, s, o = {};
                        for (s in t) o[s] = e.style[s],
                            e.style[s] = t[s];
                        i = n.apply(e, r || []);
                        for (s in t) e.style[s] = o[s];
                        return i
                    };
                var Ft = /alpha\([^)]*\)/i,
                    It = /opacity\s*=\s*([^)]*)/,
                    qt = /^(none|table(?!-c[ea]).+)/,
                    Rt = new RegExp("^(" + W + ")(.*)$", "i"),
                    Ut = new RegExp("^([+-])=(" + W + ")", "i"),
                    zt = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    Wt = {
                        letterSpacing: "0",
                        fontWeight: "400"
                    },
                    Xt = ["Webkit", "O", "Moz", "ms"];
                h.extend({
                        cssHooks: {
                            opacity: {
                                get: function(e, t) {
                                    if (t) {
                                        var n = Ht(e, "opacity");
                                        return "" === n ? "1" : n
                                    }
                                }
                            }
                        },
                        cssNumber: {
                            columnCount: !0,
                            fillOpacity: !0,
                            flexGrow: !0,
                            flexShrink: !0,
                            fontWeight: !0,
                            lineHeight: !0,
                            opacity: !0,
                            order: !0,
                            orphans: !0,
                            widows: !0,
                            zIndex: !0,
                            zoom: !0
                        },
                        cssProps: {
                            "float": l.cssFloat ? "cssFloat" : "styleFloat"
                        },
                        style: function(e, t, n, r) {
                            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                                var i, s, o, u = h.camelCase(t),
                                    a = e.style;
                                if (t = h.cssProps[u] || (h.cssProps[u] = Vt(a, u)), o = h.cssHooks[t] || h.cssHooks[u], void 0 === n) return o && "get" in o && void 0 !== (i = o.get(e, !1, r)) ? i : a[t];
                                if (s = typeof n, "string" === s && (i = Ut.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(h.css(e, t)), s = "number"), null != n && n === n && ("number" !== s || h.cssNumber[u] || (n += "px"), l.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (a[t] = "inherit"), !(o && "set" in o && void 0 === (n = o.set(e, n, r))))) try {
                                    a[t] = n
                                } catch (f) {}
                            }
                        },
                        css: function(e, t, n, r) {
                            var i, s, o, u = h.camelCase(t);
                            return t = h.cssProps[u] || (h.cssProps[u] = Vt(e.style, u)),
                                o = h.cssHooks[t] || h.cssHooks[u],
                                o && "get" in o && (s = o.get(e, !0, n)),
                                void 0 === s && (s = Ht(e, t, r)),
                                "normal" === s && t in Wt && (s = Wt[t]),
                                "" === n || n ? (i = parseFloat(s), n === !0 || h.isNumeric(i) ? i || 0 : s) : s
                        }
                    }),
                    h.each(["height", "width"],
                        function(e, t) {
                            h.cssHooks[t] = {
                                get: function(e, n, r) {
                                    return n ? qt.test(h.css(e, "display")) && 0 === e.offsetWidth ? h.swap(e, zt,
                                        function() {
                                            return Qt(e, t, r)
                                        }) : Qt(e, t, r) : void 0
                                },
                                set: function(e, n, r) {
                                    var i = r && Pt(e);
                                    return Jt(e, n, r ? Kt(e, t, r, l.boxSizing && "border-box" === h.css(e, "boxSizing", !1, i), i) : 0)
                                }
                            }
                        }),
                    l.opacity || (h.cssHooks.opacity = {
                        get: function(e, t) {
                            return It.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
                        },
                        set: function(e, t) {
                            var n = e.style,
                                r = e.currentStyle,
                                i = h.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                                s = r && r.filter || n.filter || "";
                            n.zoom = 1,
                                (t >= 1 || "" === t) && "" === h.trim(s.replace(Ft, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = Ft.test(s) ? s.replace(Ft, i) : s + " " + i)
                        }
                    }),
                    h.cssHooks.marginRight = jt(l.reliableMarginRight,
                        function(e, t) {
                            return t ? h.swap(e, {
                                    display: "inline-block"
                                },
                                Ht, [e, "marginRight"]) : void 0
                        }),
                    h.each({
                            margin: "",
                            padding: "",
                            border: "Width"
                        },
                        function(e, t) {
                            h.cssHooks[e + t] = {
                                    expand: function(n) {
                                        for (var r = 0,
                                                i = {},
                                                s = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + X[r] + t] = s[r] || s[r - 2] || s[0];
                                        return i
                                    }
                                },
                                _t.test(e) || (h.cssHooks[e + t].set = Jt)
                        }),
                    h.fn.extend({
                        css: function(e, t) {
                            return $(this,
                                function(e, t, n) {
                                    var r, i, s = {},
                                        o = 0;
                                    if (h.isArray(t)) {
                                        for (r = Pt(e), i = t.length; i > o; o++) s[t[o]] = h.css(e, t[o], !1, r);
                                        return s
                                    }
                                    return void 0 !== n ? h.style(e, t, n) : h.css(e, t)
                                },
                                e, t, arguments.length > 1)
                        },
                        show: function() {
                            return $t(this, !0)
                        },
                        hide: function() {
                            return $t(this)
                        },
                        toggle: function(e) {
                            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                                V(this) ? h(this).show() : h(this).hide()
                            })
                        }
                    }),
                    h.Tween = Gt,
                    Gt.prototype = {
                        constructor: Gt,
                        init: function(e, t, n, r, i, s) {
                            this.elem = e,
                                this.prop = n,
                                this.easing = i || "swing",
                                this.options = t,
                                this.start = this.now = this.cur(),
                                this.end = r,
                                this.unit = s || (h.cssNumber[n] ? "" : "px")
                        },
                        cur: function() {
                            var e = Gt.propHooks[this.prop];
                            return e && e.get ? e.get(this) : Gt.propHooks._default.get(this)
                        },
                        run: function(e) {
                            var t, n = Gt.propHooks[this.prop];
                            return this.options.duration ? this.pos = t = h.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
                                this.now = (this.end - this.start) * t + this.start,
                                this.options.step && this.options.step.call(this.elem, this.now, this),
                                n && n.set ? n.set(this) : Gt.propHooks._default.set(this),
                                this
                        }
                    },
                    Gt.prototype.init.prototype = Gt.prototype,
                    Gt.propHooks = {
                        _default: {
                            get: function(e) {
                                var t;
                                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = h.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
                            },
                            set: function(e) {
                                h.fx.step[e.prop] ? h.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[h.cssProps[e.prop]] || h.cssHooks[e.prop]) ? h.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                            }
                        }
                    },
                    Gt.propHooks.scrollTop = Gt.propHooks.scrollLeft = {
                        set: function(e) {
                            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                        }
                    },
                    h.easing = {
                        linear: function(e) {
                            return e
                        },
                        swing: function(e) {
                            return .5 - Math.cos(e * Math.PI) / 2
                        }
                    },
                    h.fx = Gt.prototype.init,
                    h.fx.step = {};
                var Yt, Zt, en = /^(?:toggle|show|hide)$/,
                    tn = new RegExp("^(?:([+-])=|)(" + W + ")([a-z%]*)$", "i"),
                    nn = /queueHooks$/,
                    rn = [fn],
                    sn = {
                        "*": [function(e, t) {
                            var n = this.createTween(e, t),
                                r = n.cur(),
                                i = tn.exec(t),
                                s = i && i[3] || (h.cssNumber[e] ? "" : "px"),
                                o = (h.cssNumber[e] || "px" !== s && +r) && tn.exec(h.css(n.elem, e)),
                                u = 1,
                                a = 20;
                            if (o && o[3] !== s) {
                                s = s || o[3],
                                    i = i || [],
                                    o = +r || 1;
                                do u = u || ".5",
                                    o /= u,
                                    h.style(n.elem, e, o + s);
                                while (u !== (u = n.cur() / r) && 1 !== u && --a)
                            }
                            return i && (o = n.start = +o || +r || 0, n.unit = s, n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]),
                                n
                        }]
                    };
                h.Animation = h.extend(cn, {
                        tweener: function(e, t) {
                            h.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                            for (var n, r = 0,
                                    i = e.length; i > r; r++) n = e[r],
                                sn[n] = sn[n] || [],
                                sn[n].unshift(t)
                        },
                        prefilter: function(e, t) {
                            t ? rn.unshift(e) : rn.push(e)
                        }
                    }),
                    h.speed = function(e, t, n) {
                        var r = e && "object" == typeof e ? h.extend({},
                            e) : {
                            complete: n || !n && t || h.isFunction(e) && e,
                            duration: e,
                            easing: n && t || t && !h.isFunction(t) && t
                        };
                        return r.duration = h.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in h.fx.speeds ? h.fx.speeds[r.duration] : h.fx.speeds._default,
                            (null == r.queue || r.queue === !0) && (r.queue = "fx"),
                            r.old = r.complete,
                            r.complete = function() {
                                h.isFunction(r.old) && r.old.call(this),
                                    r.queue && h.dequeue(this, r.queue)
                            },
                            r
                    },
                    h.fn.extend({
                        fadeTo: function(e, t, n, r) {
                            return this.filter(V).css("opacity", 0).show().end().animate({
                                    opacity: t
                                },
                                e, n, r)
                        },
                        animate: function(e, t, n, r) {
                            var i = h.isEmptyObject(e),
                                s = h.speed(t, n, r),
                                o = function() {
                                    var t = cn(this, h.extend({},
                                        e), s);
                                    (i || h._data(this, "finish")) && t.stop(!0)
                                };
                            return o.finish = o,
                                i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
                        },
                        stop: function(e, t, n) {
                            var r = function(e) {
                                var t = e.stop;
                                delete e.stop,
                                    t(n)
                            };
                            return "string" != typeof e && (n = t, t = e, e = void 0),
                                t && e !== !1 && this.queue(e || "fx", []),
                                this.each(function() {
                                    var t = !0,
                                        i = null != e && e + "queueHooks",
                                        s = h.timers,
                                        o = h._data(this);
                                    if (i) o[i] && o[i].stop && r(o[i]);
                                    else
                                        for (i in o) o[i] && o[i].stop && nn.test(i) && r(o[i]);
                                    for (i = s.length; i--;) s[i].elem !== this || null != e && s[i].queue !== e || (s[i].anim.stop(n), t = !1, s.splice(i, 1));
                                    (t || !n) && h.dequeue(this, e)
                                })
                        },
                        finish: function(e) {
                            return e !== !1 && (e = e || "fx"),
                                this.each(function() {
                                    var t, n = h._data(this),
                                        r = n[e + "queue"],
                                        i = n[e + "queueHooks"],
                                        s = h.timers,
                                        o = r ? r.length : 0;
                                    for (n.finish = !0, h.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = s.length; t--;) s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
                                    for (t = 0; o > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                                    delete n.finish
                                })
                        }
                    }),
                    h.each(["toggle", "show", "hide"],
                        function(e, t) {
                            var n = h.fn[t];
                            h.fn[t] = function(e, r, i) {
                                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(un(t, !0), e, r, i)
                            }
                        }),
                    h.each({
                            slideDown: un("show"),
                            slideUp: un("hide"),
                            slideToggle: un("toggle"),
                            fadeIn: {
                                opacity: "show"
                            },
                            fadeOut: {
                                opacity: "hide"
                            },
                            fadeToggle: {
                                opacity: "toggle"
                            }
                        },
                        function(e, t) {
                            h.fn[e] = function(e, n, r) {
                                return this.animate(t, e, n, r)
                            }
                        }),
                    h.timers = [],
                    h.fx.tick = function() {
                        var e, t = h.timers,
                            n = 0;
                        for (Yt = h.now(); n < t.length; n++) e = t[n],
                            e() || t[n] !== e || t.splice(n--, 1);
                        t.length || h.fx.stop(),
                            Yt = void 0
                    },
                    h.fx.timer = function(e) {
                        h.timers.push(e),
                            e() ? h.fx.start() : h.timers.pop()
                    },
                    h.fx.interval = 13,
                    h.fx.start = function() {
                        Zt || (Zt = setInterval(h.fx.tick, h.fx.interval))
                    },
                    h.fx.stop = function() {
                        clearInterval(Zt),
                            Zt = null
                    },
                    h.fx.speeds = {
                        slow: 600,
                        fast: 200,
                        _default: 400
                    },
                    h.fn.delay = function(e, t) {
                        return e = h.fx ? h.fx.speeds[e] || e : e,
                            t = t || "fx",
                            this.queue(t,
                                function(t, n) {
                                    var r = setTimeout(t, e);
                                    n.stop = function() {
                                        clearTimeout(r)
                                    }
                                })
                    },
                    function() {
                        var e, t, n, r, i;
                        t = T.createElement("div"),
                            t.setAttribute("className", "t"),
                            t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
                            r = t.getElementsByTagName("a")[0],
                            n = T.createElement("select"),
                            i = n.appendChild(T.createElement("option")),
                            e = t.getElementsByTagName("input")[0],
                            r.style.cssText = "top:1px",
                            l.getSetAttribute = "t" !== t.className,
                            l.style = /top/.test(r.getAttribute("style")),
                            l.hrefNormalized = "/a" === r.getAttribute("href"),
                            l.checkOn = !!e.value,
                            l.optSelected = i.selected,
                            l.enctype = !!T.createElement("form").enctype,
                            n.disabled = !0,
                            l.optDisabled = !i.disabled,
                            e = T.createElement("input"),
                            e.setAttribute("value", ""),
                            l.input = "" === e.getAttribute("value"),
                            e.value = "t",
                            e.setAttribute("type", "radio"),
                            l.radioValue = "t" === e.value
                    }();
                var hn = /\r/g;
                h.fn.extend({
                        val: function(e) {
                            var t, n, r, i = this[0];
                            if (arguments.length) return r = h.isFunction(e),
                                this.each(function(n) {
                                    var i;
                                    1 === this.nodeType && (i = r ? e.call(this, n, h(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : h.isArray(i) && (i = h.map(i,
                                        function(e) {
                                            return null == e ? "" : e + ""
                                        })), t = h.valHooks[this.type] || h.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                                });
                            if (i) return t = h.valHooks[i.type] || h.valHooks[i.nodeName.toLowerCase()],
                                t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(hn, "") : null == n ? "" : n)
                        }
                    }),
                    h.extend({
                        valHooks: {
                            option: {
                                get: function(e) {
                                    var t = h.find.attr(e, "value");
                                    return null != t ? t : h.trim(h.text(e))
                                }
                            },
                            select: {
                                get: function(e) {
                                    for (var t, n, r = e.options,
                                            i = e.selectedIndex,
                                            s = "select-one" === e.type || 0 > i,
                                            o = s ? null : [], u = s ? i + 1 : r.length, a = 0 > i ? u : s ? i : 0; u > a; a++)
                                        if (n = r[a], !(!n.selected && a !== i || (l.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && h.nodeName(n.parentNode, "optgroup"))) {
                                            if (t = h(n).val(), s) return t;
                                            o.push(t)
                                        }
                                    return o
                                },
                                set: function(e, t) {
                                    var n, r, i = e.options,
                                        s = h.makeArray(t),
                                        o = i.length;
                                    while (o--)
                                        if (r = i[o], h.inArray(h.valHooks.option.get(r), s) >= 0) try {
                                            r.selected = n = !0
                                        } catch (u) {
                                            r.scrollHeight
                                        } else r.selected = !1;
                                    return n || (e.selectedIndex = -1),
                                        i
                                }
                            }
                        }
                    }),
                    h.each(["radio", "checkbox"],
                        function() {
                            h.valHooks[this] = {
                                    set: function(e, t) {
                                        return h.isArray(t) ? e.checked = h.inArray(h(e).val(), t) >= 0 : void 0
                                    }
                                },
                                l.checkOn || (h.valHooks[this].get = function(e) {
                                    return null === e.getAttribute("value") ? "on" : e.value
                                })
                        });
                var pn, dn, vn = h.expr.attrHandle,
                    mn = /^(?:checked|selected)$/i,
                    gn = l.getSetAttribute,
                    yn = l.input;
                h.fn.extend({
                        attr: function(e, t) {
                            return $(this, h.attr, e, t, arguments.length > 1)
                        },
                        removeAttr: function(e) {
                            return this.each(function() {
                                h.removeAttr(this, e)
                            })
                        }
                    }),
                    h.extend({
                        attr: function(e, t, n) {
                            var r, i, s = e.nodeType;
                            if (e && 3 !== s && 8 !== s && 2 !== s) return typeof e.getAttribute === B ? h.prop(e, t, n) : (1 === s && h.isXMLDoc(e) || (t = t.toLowerCase(), r = h.attrHooks[t] || (h.expr.match.bool.test(t) ? dn : pn)), void 0 === n ? r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = h.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : void h.removeAttr(e, t))
                        },
                        removeAttr: function(e, t) {
                            var n, r, i = 0,
                                s = t && t.match(O);
                            if (s && 1 === e.nodeType)
                                while (n = s[i++]) r = h.propFix[n] || n,
                                    h.expr.match.bool.test(n) ? yn && gn || !mn.test(n) ? e[r] = !1 : e[h.camelCase("default-" + n)] = e[r] = !1 : h.attr(e, n, ""),
                                    e.removeAttribute(gn ? n : r)
                        },
                        attrHooks: {
                            type: {
                                set: function(e, t) {
                                    if (!l.radioValue && "radio" === t && h.nodeName(e, "input")) {
                                        var n = e.value;
                                        return e.setAttribute("type", t),
                                            n && (e.value = n),
                                            t
                                    }
                                }
                            }
                        }
                    }),
                    dn = {
                        set: function(e, t, n) {
                            return t === !1 ? h.removeAttr(e, n) : yn && gn || !mn.test(n) ? e.setAttribute(!gn && h.propFix[n] || n, n) : e[h.camelCase("default-" + n)] = e[n] = !0,
                                n
                        }
                    },
                    h.each(h.expr.match.bool.source.match(/\w+/g),
                        function(e, t) {
                            var n = vn[t] || h.find.attr;
                            vn[t] = yn && gn || !mn.test(t) ?
                                function(e, t, r) {
                                    var i, s;
                                    return r || (s = vn[t], vn[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, vn[t] = s),
                                        i
                                } : function(e, t, n) {
                                    return n ? void 0 : e[h.camelCase("default-" + t)] ? t.toLowerCase() : null
                                }
                        }),
                    yn && gn || (h.attrHooks.value = {
                        set: function(e, t, n) {
                            return h.nodeName(e, "input") ? void(e.defaultValue = t) : pn && pn.set(e, t, n)
                        }
                    }),
                    gn || (pn = {
                            set: function(e, t, n) {
                                var r = e.getAttributeNode(n);
                                return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)),
                                    r.value = t += "",
                                    "value" === n || t === e.getAttribute(n) ? t : void 0
                            }
                        },
                        vn.id = vn.name = vn.coords = function(e, t, n) {
                            var r;
                            return n ? void 0 : (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null
                        },
                        h.valHooks.button = {
                            get: function(e, t) {
                                var n = e.getAttributeNode(t);
                                return n && n.specified ? n.value : void 0
                            },
                            set: pn.set
                        },
                        h.attrHooks.contenteditable = {
                            set: function(e, t, n) {
                                pn.set(e, "" === t ? !1 : t, n)
                            }
                        },
                        h.each(["width", "height"],
                            function(e, t) {
                                h.attrHooks[t] = {
                                    set: function(e, n) {
                                        return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
                                    }
                                }
                            })),
                    l.style || (h.attrHooks.style = {
                        get: function(e) {
                            return e.style.cssText || void 0
                        },
                        set: function(e, t) {
                            return e.style.cssText = t + ""
                        }
                    });
                var bn = /^(?:input|select|textarea|button|object)$/i,
                    wn = /^(?:a|area)$/i;
                h.fn.extend({
                        prop: function(e, t) {
                            return $(this, h.prop, e, t, arguments.length > 1)
                        },
                        removeProp: function(e) {
                            return e = h.propFix[e] || e,
                                this.each(function() {
                                    try {
                                        this[e] = void 0,
                                            delete this[e]
                                    } catch (t) {}
                                })
                        }
                    }),
                    h.extend({
                        propFix: {
                            "for": "htmlFor",
                            "class": "className"
                        },
                        prop: function(e, t, n) {
                            var r, i, s, o = e.nodeType;
                            if (e && 3 !== o && 8 !== o && 2 !== o) return s = 1 !== o || !h.isXMLDoc(e),
                                s && (t = h.propFix[t] || t, i = h.propHooks[t]),
                                void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
                        },
                        propHooks: {
                            tabIndex: {
                                get: function(e) {
                                    var t = h.find.attr(e, "tabindex");
                                    return t ? parseInt(t, 10) : bn.test(e.nodeName) || wn.test(e.nodeName) && e.href ? 0 : -1
                                }
                            }
                        }
                    }),
                    l.hrefNormalized || h.each(["href", "src"],
                        function(e, t) {
                            h.propHooks[t] = {
                                get: function(e) {
                                    return e.getAttribute(t, 4)
                                }
                            }
                        }),
                    l.optSelected || (h.propHooks.selected = {
                        get: function(e) {
                            var t = e.parentNode;
                            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
                                null
                        }
                    }),
                    h.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"],
                        function() {
                            h.propFix[this.toLowerCase()] = this
                        }),
                    l.enctype || (h.propFix.enctype = "encoding");
                var En = /[\t\r\n\f]/g;
                h.fn.extend({
                        addClass: function(e) {
                            var t, n, r, i, s, o, u = 0,
                                a = this.length,
                                f = "string" == typeof e && e;
                            if (h.isFunction(e)) return this.each(function(t) {
                                h(this).addClass(e.call(this, t, this.className))
                            });
                            if (f)
                                for (t = (e || "").match(O) || []; a > u; u++)
                                    if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(En, " ") : " ")) {
                                        s = 0;
                                        while (i = t[s++]) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                                        o = h.trim(r),
                                            n.className !== o && (n.className = o)
                                    }
                            return this
                        },
                        removeClass: function(e) {
                            var t, n, r, i, s, o, u = 0,
                                a = this.length,
                                f = 0 === arguments.length || "string" == typeof e && e;
                            if (h.isFunction(e)) return this.each(function(t) {
                                h(this).removeClass(e.call(this, t, this.className))
                            });
                            if (f)
                                for (t = (e || "").match(O) || []; a > u; u++)
                                    if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(En, " ") : "")) {
                                        s = 0;
                                        while (i = t[s++])
                                            while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " ");
                                        o = e ? h.trim(r) : "",
                                            n.className !== o && (n.className = o)
                                    }
                            return this
                        },
                        toggleClass: function(e, t) {
                            var n = typeof e;
                            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(h.isFunction(e) ?
                                function(n) {
                                    h(this).toggleClass(e.call(this, n, this.className, t), t)
                                } : function() {
                                    if ("string" === n) {
                                        var t, r = 0,
                                            i = h(this),
                                            s = e.match(O) || [];
                                        while (t = s[r++]) i.hasClass(t) ? i.removeClass(t) : i.addClass(t)
                                    } else(n === B || "boolean" === n) && (this.className && h._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : h._data(this, "__className__") || "")
                                })
                        },
                        hasClass: function(e) {
                            for (var t = " " + e + " ",
                                    n = 0,
                                    r = this.length; r > n; n++)
                                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(En, " ").indexOf(t) >= 0) return !0;
                            return !1
                        }
                    }),
                    h.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
                        function(e, t) {
                            h.fn[t] = function(e, n) {
                                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                            }
                        }),
                    h.fn.extend({
                        hover: function(e, t) {
                            return this.mouseenter(e).mouseleave(t || e)
                        },
                        bind: function(e, t, n) {
                            return this.on(e, null, t, n)
                        },
                        unbind: function(e, t) {
                            return this.off(e, null, t)
                        },
                        delegate: function(e, t, n, r) {
                            return this.on(t, e, n, r)
                        },
                        undelegate: function(e, t, n) {
                            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                        }
                    });
                var Sn = h.now(),
                    xn = /\?/,
                    Tn = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
                h.parseJSON = function(t) {
                        if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
                        var n, r = null,
                            i = h.trim(t + "");
                        return i && !h.trim(i.replace(Tn,
                            function(e, t, i, s) {
                                return n && t && (r = 0),
                                    0 === r ? e : (n = i || t, r += !s - !i, "")
                            })) ? Function("return " + i)() : h.error("Invalid JSON: " + t)
                    },
                    h.parseXML = function(t) {
                        var n, r;
                        if (!t || "string" != typeof t) return null;
                        try {
                            e.DOMParser ? (r = new DOMParser, n = r.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
                        } catch (i) {
                            n = void 0
                        }
                        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || h.error("Invalid XML: " + t),
                            n
                    };
                var Nn, Cn, kn = /#.*$/,
                    Ln = /([?&])_=[^&]*/,
                    An = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
                    On = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                    Mn = /^(?:GET|HEAD)$/,
                    _n = /^\/\//,
                    Dn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
                    Pn = {},
                    Hn = {},
                    Bn = "*/".concat("*");
                try {
                    Cn = location.href
                } catch (jn) {
                    Cn = T.createElement("a"),
                        Cn.href = "",
                        Cn = Cn.href
                }
                Nn = Dn.exec(Cn.toLowerCase()) || [],
                    h.extend({
                        active: 0,
                        lastModified: {},
                        etag: {},
                        ajaxSettings: {
                            url: Cn,
                            type: "GET",
                            isLocal: On.test(Nn[1]),
                            global: !0,
                            processData: !0,
                            async: !0,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            accepts: {
                                "*": Bn,
                                text: "text/plain",
                                html: "text/html",
                                xml: "application/xml, text/xml",
                                json: "application/json, text/javascript"
                            },
                            contents: {
                                xml: /xml/,
                                html: /html/,
                                json: /json/
                            },
                            responseFields: {
                                xml: "responseXML",
                                text: "responseText",
                                json: "responseJSON"
                            },
                            converters: {
                                "* text": String,
                                "text html": !0,
                                "text json": h.parseJSON,
                                "text xml": h.parseXML
                            },
                            flatOptions: {
                                url: !0,
                                context: !0
                            }
                        },
                        ajaxSetup: function(e, t) {
                            return t ? qn(qn(e, h.ajaxSettings), t) : qn(h.ajaxSettings, e)
                        },
                        ajaxPrefilter: Fn(Pn),
                        ajaxTransport: Fn(Hn),
                        ajax: function(e, t) {
                            function x(e, t, n, r) {
                                var f, g, y, w, S, x = t;
                                2 !== b && (b = 2, o && clearTimeout(o), a = void 0, s = r || "", E.readyState = e > 0 ? 4 : 0, f = e >= 200 && 300 > e || 304 === e, n && (w = Rn(l, E, n)), w = Un(l, w, E, f), f ? (l.ifModified && (S = E.getResponseHeader("Last-Modified"), S && (h.lastModified[i] = S), S = E.getResponseHeader("etag"), S && (h.etag[i] = S)), 204 === e || "HEAD" === l.type ? x = "nocontent" : 304 === e ? x = "notmodified" : (x = w.state, g = w.data, y = w.error, f = !y)) : (y = x, (e || !x) && (x = "error", 0 > e && (e = 0))), E.status = e, E.statusText = (t || x) + "", f ? d.resolveWith(c, [g, x, E]) : d.rejectWith(c, [E, x, y]), E.statusCode(m), m = void 0, u && p.trigger(f ? "ajaxSuccess" : "ajaxError", [E, l, f ? g : y]), v.fireWith(c, [E, x]), u && (p.trigger("ajaxComplete", [E, l]), --h.active || h.event.trigger("ajaxStop")))
                            }
                            "object" == typeof e && (t = e, e = void 0),
                                t = t || {};
                            var n, r, i, s, o, u, a, f, l = h.ajaxSetup({},
                                    t),
                                c = l.context || l,
                                p = l.context && (c.nodeType || c.jquery) ? h(c) : h.event,
                                d = h.Deferred(),
                                v = h.Callbacks("once memory"),
                                m = l.statusCode || {},
                                g = {},
                                y = {},
                                b = 0,
                                w = "canceled",
                                E = {
                                    readyState: 0,
                                    getResponseHeader: function(e) {
                                        var t;
                                        if (2 === b) {
                                            if (!f) {
                                                f = {};
                                                while (t = An.exec(s)) f[t[1].toLowerCase()] = t[2]
                                            }
                                            t = f[e.toLowerCase()]
                                        }
                                        return null == t ? null : t
                                    },
                                    getAllResponseHeaders: function() {
                                        return 2 === b ? s : null
                                    },
                                    setRequestHeader: function(e, t) {
                                        var n = e.toLowerCase();
                                        return b || (e = y[n] = y[n] || e, g[e] = t),
                                            this
                                    },
                                    overrideMimeType: function(e) {
                                        return b || (l.mimeType = e),
                                            this
                                    },
                                    statusCode: function(e) {
                                        var t;
                                        if (e)
                                            if (2 > b)
                                                for (t in e) m[t] = [m[t], e[t]];
                                            else E.always(e[E.status]);
                                        return this
                                    },
                                    abort: function(e) {
                                        var t = e || w;
                                        return a && a.abort(t),
                                            x(0, t),
                                            this
                                    }
                                };
                            if (d.promise(E).complete = v.add, E.success = E.done, E.error = E.fail, l.url = ((e || l.url || Cn) + "").replace(kn, "").replace(_n, Nn[1] + "//"), l.type = t.method || t.type || l.method || l.type, l.dataTypes = h.trim(l.dataType || "*").toLowerCase().match(O) || [""], null == l.crossDomain && (n = Dn.exec(l.url.toLowerCase()), l.crossDomain = !(!n || n[1] === Nn[1] && n[2] === Nn[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === (Nn[3] || ("http:" === Nn[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = h.param(l.data, l.traditional)), In(Pn, l, t, E), 2 === b) return E;
                            u = h.event && l.global,
                                u && 0 === h.active++ && h.event.trigger("ajaxStart"),
                                l.type = l.type.toUpperCase(),
                                l.hasContent = !Mn.test(l.type),
                                i = l.url,
                                l.hasContent || (l.data && (i = l.url += (xn.test(i) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = Ln.test(i) ? i.replace(Ln, "$1_=" + Sn++) : i + (xn.test(i) ? "&" : "?") + "_=" + Sn++)),
                                l.ifModified && (h.lastModified[i] && E.setRequestHeader("If-Modified-Since", h.lastModified[i]), h.etag[i] && E.setRequestHeader("If-None-Match", h.etag[i])),
                                (l.data && l.hasContent && l.contentType !== !1 || t.contentType) && E.setRequestHeader("Content-Type", l.contentType),
                                E.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Bn + "; q=0.01" : "") : l.accepts["*"]);
                            for (r in l.headers) E.setRequestHeader(r, l.headers[r]);
                            if (!l.beforeSend || l.beforeSend.call(c, E, l) !== !1 && 2 !== b) {
                                w = "abort";
                                for (r in {
                                        success: 1,
                                        error: 1,
                                        complete: 1
                                    }) E[r](l[r]);
                                if (a = In(Hn, l, t, E)) {
                                    E.readyState = 1,
                                        u && p.trigger("ajaxSend", [E, l]),
                                        l.async && l.timeout > 0 && (o = setTimeout(function() {
                                                E.abort("timeout")
                                            },
                                            l.timeout));
                                    try {
                                        b = 1,
                                            a.send(g, x)
                                    } catch (S) {
                                        if (!(2 > b)) throw S;
                                        x(-1, S)
                                    }
                                } else x(-1, "No Transport");
                                return E
                            }
                            return E.abort()
                        },
                        getJSON: function(e, t, n) {
                            return h.get(e, t, n, "json")
                        },
                        getScript: function(e, t) {
                            return h.get(e, void 0, t, "script")
                        }
                    }),
                    h.each(["get", "post"],
                        function(e, t) {
                            h[t] = function(e, n, r, i) {
                                return h.isFunction(n) && (i = i || r, r = n, n = void 0),
                                    h.ajax({
                                        url: e,
                                        type: t,
                                        dataType: i,
                                        data: n,
                                        success: r
                                    })
                            }
                        }),
                    h._evalUrl = function(e) {
                        return h.ajax({
                            url: e,
                            type: "GET",
                            dataType: "script",
                            async: !1,
                            global: !1,
                            "throws": !0
                        })
                    },
                    h.fn.extend({
                        wrapAll: function(e) {
                            if (h.isFunction(e)) return this.each(function(t) {
                                h(this).wrapAll(e.call(this, t))
                            });
                            if (this[0]) {
                                var t = h(e, this[0].ownerDocument).eq(0).clone(!0);
                                this[0].parentNode && t.insertBefore(this[0]),
                                    t.map(function() {
                                        var e = this;
                                        while (e.firstChild && 1 === e.firstChild.nodeType) e = e.firstChild;
                                        return e
                                    }).append(this)
                            }
                            return this
                        },
                        wrapInner: function(e) {
                            return this.each(h.isFunction(e) ?
                                function(t) {
                                    h(this).wrapInner(e.call(this, t))
                                } : function() {
                                    var t = h(this),
                                        n = t.contents();
                                    n.length ? n.wrapAll(e) : t.append(e)
                                })
                        },
                        wrap: function(e) {
                            var t = h.isFunction(e);
                            return this.each(function(n) {
                                h(this).wrapAll(t ? e.call(this, n) : e)
                            })
                        },
                        unwrap: function() {
                            return this.parent().each(function() {
                                h.nodeName(this, "body") || h(this).replaceWith(this.childNodes)
                            }).end()
                        }
                    }),
                    h.expr.filters.hidden = function(e) {
                        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !l.reliableHiddenOffsets() && "none" === (e.style && e.style.display || h.css(e, "display"))
                    },
                    h.expr.filters.visible = function(e) {
                        return !h.expr.filters.hidden(e)
                    };
                var zn = /%20/g,
                    Wn = /\[\]$/,
                    Xn = /\r?\n/g,
                    Vn = /^(?:submit|button|image|reset|file)$/i,
                    $n = /^(?:input|select|textarea|keygen)/i;
                h.param = function(e, t) {
                        var n, r = [],
                            i = function(e, t) {
                                t = h.isFunction(t) ? t() : null == t ? "" : t,
                                    r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                            };
                        if (void 0 === t && (t = h.ajaxSettings && h.ajaxSettings.traditional), h.isArray(e) || e.jquery && !h.isPlainObject(e)) h.each(e,
                            function() {
                                i(this.name, this.value)
                            });
                        else
                            for (n in e) Jn(n, e[n], t, i);
                        return r.join("&").replace(zn, "+")
                    },
                    h.fn.extend({
                        serialize: function() {
                            return h.param(this.serializeArray())
                        },
                        serializeArray: function() {
                            return this.map(function() {
                                var e = h.prop(this, "elements");
                                return e ? h.makeArray(e) : this
                            }).filter(function() {
                                var e = this.type;
                                return this.name && !h(this).is(":disabled") && $n.test(this.nodeName) && !Vn.test(e) && (this.checked || !J.test(e))
                            }).map(function(e, t) {
                                var n = h(this).val();
                                return null == n ? null : h.isArray(n) ? h.map(n,
                                    function(e) {
                                        return {
                                            name: t.name,
                                            value: e.replace(Xn, "\r\n")
                                        }
                                    }) : {
                                    name: t.name,
                                    value: n.replace(Xn, "\r\n")
                                }
                            }).get()
                        }
                    }),
                    h.ajaxSettings.xhr = void 0 !== e.ActiveXObject ?
                    function() {
                        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Yn() || Zn()
                    } : Yn;
                var Kn = 0,
                    Qn = {},
                    Gn = h.ajaxSettings.xhr();
                e.attachEvent && e.attachEvent("onunload",
                        function() {
                            for (var e in Qn) Qn[e](void 0, !0)
                        }),
                    l.cors = !!Gn && "withCredentials" in Gn,
                    Gn = l.ajax = !!Gn,
                    Gn && h.ajaxTransport(function(e) {
                        if (!e.crossDomain || l.cors) {
                            var t;
                            return {
                                send: function(n, r) {
                                    var i, s = e.xhr(),
                                        o = ++Kn;
                                    if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                                        for (i in e.xhrFields) s[i] = e.xhrFields[i];
                                    e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType),
                                        e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                                    for (i in n) void 0 !== n[i] && s.setRequestHeader(i, n[i] + "");
                                    s.send(e.hasContent && e.data || null),
                                        t = function(n, i) {
                                            var u, a, f;
                                            if (t && (i || 4 === s.readyState))
                                                if (delete Qn[o], t = void 0, s.onreadystatechange = h.noop, i) 4 !== s.readyState && s.abort();
                                                else {
                                                    f = {},
                                                        u = s.status,
                                                        "string" == typeof s.responseText && (f.text = s.responseText);
                                                    try {
                                                        a = s.statusText
                                                    } catch (l) {
                                                        a = ""
                                                    }
                                                    u || !e.isLocal || e.crossDomain ? 1223 === u && (u = 204) : u = f.text ? 200 : 404
                                                }
                                            f && r(u, a, f, s.getAllResponseHeaders())
                                        },
                                        e.async ? 4 === s.readyState ? setTimeout(t) : s.onreadystatechange = Qn[o] = t : t()
                                },
                                abort: function() {
                                    t && t(void 0, !0)
                                }
                            }
                        }
                    }),
                    h.ajaxSetup({
                        accepts: {
                            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                        },
                        contents: {
                            script: /(?:java|ecma)script/
                        },
                        converters: {
                            "text script": function(e) {
                                return h.globalEval(e),
                                    e
                            }
                        }
                    }),
                    h.ajaxPrefilter("script",
                        function(e) {
                            void 0 === e.cache && (e.cache = !1),
                                e.crossDomain && (e.type = "GET", e.global = !1)
                        }),
                    h.ajaxTransport("script",
                        function(e) {
                            if (e.crossDomain) {
                                var t, n = T.head || h("head")[0] || T.documentElement;
                                return {
                                    send: function(r, i) {
                                        t = T.createElement("script"),
                                            t.async = !0,
                                            e.scriptCharset && (t.charset = e.scriptCharset),
                                            t.src = e.url,
                                            t.onload = t.onreadystatechange = function(e, n) {
                                                (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || i(200, "success"))
                                            },
                                            n.insertBefore(t, n.firstChild)
                                    },
                                    abort: function() {
                                        t && t.onload(void 0, !0)
                                    }
                                }
                            }
                        });
                var er = [],
                    tr = /(=)\?(?=&|$)|\?\?/;
                h.ajaxSetup({
                        jsonp: "callback",
                        jsonpCallback: function() {
                            var e = er.pop() || h.expando + "_" + Sn++;
                            return this[e] = !0,
                                e
                        }
                    }),
                    h.ajaxPrefilter("json jsonp",
                        function(t, n, r) {
                            var i, s, o, u = t.jsonp !== !1 && (tr.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && tr.test(t.data) && "data");
                            return u || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = h.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, u ? t[u] = t[u].replace(tr, "$1" + i) : t.jsonp !== !1 && (t.url += (xn.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
                                    return o || h.error(i + " was not called"),
                                        o[0]
                                },
                                t.dataTypes[0] = "json", s = e[i], e[i] = function() {
                                    o = arguments
                                },
                                r.always(function() {
                                    e[i] = s,
                                        t[i] && (t.jsonpCallback = n.jsonpCallback, er.push(i)),
                                        o && h.isFunction(s) && s(o[0]),
                                        o = s = void 0
                                }), "script") : void 0
                        }),
                    h.parseHTML = function(e, t, n) {
                        if (!e || "string" != typeof e) return null;
                        "boolean" == typeof t && (n = t, t = !1),
                            t = t || T;
                        var r = w.exec(e),
                            i = !n && [];
                        return r ? [t.createElement(r[1])] : (r = h.buildFragment([e], t, i), i && i.length && h(i).remove(), h.merge([], r.childNodes))
                    };
                var nr = h.fn.load;
                h.fn.load = function(e, t, n) {
                        if ("string" != typeof e && nr) return nr.apply(this, arguments);
                        var r, i, s, o = this,
                            u = e.indexOf(" ");
                        return u >= 0 && (r = h.trim(e.slice(u, e.length)), e = e.slice(0, u)),
                            h.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (s = "POST"),
                            o.length > 0 && h.ajax({
                                url: e,
                                type: s,
                                dataType: "html",
                                data: t
                            }).done(function(e) {
                                i = arguments,
                                    o.html(r ? h("<div>").append(h.parseHTML(e)).find(r) : e)
                            }).complete(n &&
                                function(e, t) {
                                    o.each(n, i || [e.responseText, t, e])
                                }),
                            this
                    },
                    h.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"],
                        function(e, t) {
                            h.fn[t] = function(e) {
                                return this.on(t, e)
                            }
                        }),
                    h.expr.filters.animated = function(e) {
                        return h.grep(h.timers,
                            function(t) {
                                return e === t.elem
                            }).length
                    };
                var rr = e.document.documentElement;
                h.offset = {
                        setOffset: function(e, t, n) {
                            var r, i, s, o, u, a, f, l = h.css(e, "position"),
                                c = h(e),
                                p = {};
                            "static" === l && (e.style.position = "relative"),
                                u = c.offset(),
                                s = h.css(e, "top"),
                                a = h.css(e, "left"),
                                f = ("absolute" === l || "fixed" === l) && h.inArray("auto", [s, a]) > -1,
                                f ? (r = c.position(), o = r.top, i = r.left) : (o = parseFloat(s) || 0, i = parseFloat(a) || 0),
                                h.isFunction(t) && (t = t.call(e, n, u)),
                                null != t.top && (p.top = t.top - u.top + o),
                                null != t.left && (p.left = t.left - u.left + i),
                                "using" in t ? t.using.call(e, p) : c.css(p)
                        }
                    },
                    h.fn.extend({
                        offset: function(e) {
                            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                                h.offset.setOffset(this, e, t)
                            });
                            var t, n, r = {
                                    top: 0,
                                    left: 0
                                },
                                i = this[0],
                                s = i && i.ownerDocument;
                            if (s) return t = s.documentElement,
                                h.contains(t, i) ? (typeof i.getBoundingClientRect !== B && (r = i.getBoundingClientRect()), n = ir(s), {
                                    top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                                    left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                                }) : r
                        },
                        position: function() {
                            if (this[0]) {
                                var e, t, n = {
                                        top: 0,
                                        left: 0
                                    },
                                    r = this[0];
                                return "fixed" === h.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), h.nodeName(e[0], "html") || (n = e.offset()), n.top += h.css(e[0], "borderTopWidth", !0), n.left += h.css(e[0], "borderLeftWidth", !0)), {
                                    top: t.top - n.top - h.css(r, "marginTop", !0),
                                    left: t.left - n.left - h.css(r, "marginLeft", !0)
                                }
                            }
                        },
                        offsetParent: function() {
                            return this.map(function() {
                                var e = this.offsetParent || rr;
                                while (e && !h.nodeName(e, "html") && "static" === h.css(e, "position")) e = e.offsetParent;
                                return e || rr
                            })
                        }
                    }),
                    h.each({
                            scrollLeft: "pageXOffset",
                            scrollTop: "pageYOffset"
                        },
                        function(e, t) {
                            var n = /Y/.test(t);
                            h.fn[e] = function(r) {
                                return $(this,
                                    function(e, r, i) {
                                        var s = ir(e);
                                        return void 0 === i ? s ? t in s ? s[t] : s.document.documentElement[r] : e[r] : void(s ? s.scrollTo(n ? h(s).scrollLeft() : i, n ? i : h(s).scrollTop()) : e[r] = i)
                                    },
                                    e, r, arguments.length, null)
                            }
                        }),
                    h.each(["top", "left"],
                        function(e, t) {
                            h.cssHooks[t] = jt(l.pixelPosition,
                                function(e, n) {
                                    return n ? (n = Ht(e, t), Dt.test(n) ? h(e).position()[t] + "px" : n) : void 0
                                })
                        }),
                    h.each({
                            Height: "height",
                            Width: "width"
                        },
                        function(e, t) {
                            h.each({
                                    padding: "inner" + e,
                                    content: t,
                                    "": "outer" + e
                                },
                                function(n, r) {
                                    h.fn[r] = function(r, i) {
                                        var s = arguments.length && (n || "boolean" != typeof r),
                                            o = n || (r === !0 || i === !0 ? "margin" : "border");
                                        return $(this,
                                            function(t, n, r) {
                                                var i;
                                                return h.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? h.css(t, n, o) : h.style(t, n, r, o)
                                            },
                                            t, s ? r : void 0, s, null)
                                    }
                                })
                        }),
                    h.fn.size = function() {
                        return this.length
                    },
                    h.fn.andSelf = h.fn.addBack,
                    "function" == typeof define && define.amd && define("jquery", [],
                        function() {
                            return h
                        });
                var sr = e.jQuery,
                    or = e.$;
                return h.noConflict = function(t) {
                        return e.$ === h && (e.$ = or),
                            t && e.jQuery === h && (e.jQuery = sr),
                            h
                    },
                    typeof t === B && (e.jQuery = e.$ = h),
                    h
            })