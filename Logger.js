var getDateTime = function() {
    var e = new Date,
        t = e.getHours(),
        n = e.getMinutes(),
        r = e.getSeconds();
    return t = (t < 10 ? "0" : "") + t,
        n = (n < 10 ? "0" : "") + n,
        r = (r < 10 ? "0" : "") + r,
        t + ":" + n + ":" + r
},
output = function(e, t, n, r) {
    var i = [getDateTime(), t, e, n];
    r && i.push(JSON.stringify(r))
     //   console.log(i.join(" | "))
},
log = function(e, t, n, r) {
    output(e, t, n, r)
},
logger = {
    init: function(e) {
        config = e
    },
    debug: function(e, t, n) {
        log(e, "debug", t, n)
    },
    info: function(e, t, n) {
        log(e, "信息", t, n)
    },
    warning: function(e, t, n) {
        log(e, "警告", t, n)
    },
    error: function(e, t, n) {
        log(e, "错误", t, n)
    }
};