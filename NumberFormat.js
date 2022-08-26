var nf = function (e, P) {
    var puls = "";
    P && e > 0 && (puls = "+")
    return puls + numberFormat(e)
},
    numberFormat = function (num) {
        if (num == undefined) return "?";
        if (Math.abs(num) < 10) return Math.round(num * 100) / 100;
        if (Math.abs(num) < 1e3) return Math.round(num * 10) / 10;
        if (Math.abs(num) < 1e6) return Number(num).toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$& ");
        num = num.toString().split("e+", 2);
        var t = num[0],
            r = 3 * Math.floor((Number(t).toFixed(0).length - (t < 0 ? 2 : 1)) / 3),
            i = r + (num[1] ? Number(num[1]) : 0),
            s = i % 3;
        t *= Math.pow(10, s - r),
            i -= s
        return Math.round(t * 100) / 100 + (" *10^" + i)
    }