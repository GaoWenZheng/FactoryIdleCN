class BinaryArrayReader {
    constructor(e) {
        this.buffer = e,
            this.dataView = new DataView(e),
            this.offset = 0;
    }
    _read(e, t) {
        var n = this.dataView[t](this.offset);
        return this.offset += e,
            n;
    }
    readBooleanMap() {
        return (new BinaryBoolean(this.readUint8())).reverse();
    }
    readChar() {
        return String.fromCharCode(this.readInt8());
    }
    readInt8() {
        return this._read(1, "getInt8");
    }
    readInt16() {
        return this._read(2, "getInt16");
    }
    readInt32() {
        return this._read(4, "getInt32");
    }
    readUint8() {
        return this._read(1, "getUint8");
    }
    readUint16() {
        return this._read(2, "getUint16");
    }
    readUint32() {
        return this._read(4, "getUint32");
    }
    readFloat64() {
        return this._read(8, "getFloat64");
    }
    readReader() {
        var e = this.readInt32(), t = new ArrayBuffer(e), n = new Int8Array(t, 0, e);
        for (var r = 0; r < e; r++)
            n[r] = this.readInt8();
        return new BinaryArrayReader(t);
    }
    readBooleanArrayFunc(e, t) {
        var n = null;
        for (var r = 0; r < e; r++)
            r % 8 == 0 && (n = this.readBooleanMap()),
                t(r, n.readBoolean());
    }
    getBuffer() {
        return this.buffer;
    }
    getLength() {
        return this.buffer.byteLength;
    }
    getOffset() {
        return this.offset;
    }
}

class BinaryArrayWriter {
    constructor() {
        this.totalLength = 0,
            this.data = [];
    }
    _write(e, t, n) {
        return this.data.push({
            length: t,
            value: e,
            method: n
        }),
            this.totalLength += t,
            this;
    }
    writeBooleanMap(e) {
        return this.writeUint8(e.getValue());
    }
    writeChar(e) {
        return this.writeUint8(e.charCodeAt(0));
    }
    writeInt8(e) {
        return this._write(e, 1, "setInt8");
    }
    writeInt16(e) {
        return this._write(e, 2, "setInt16");
    }
    writeInt32(e) {
        return this._write(e, 4, "setInt32");
    }
    writeUint8(e) {
        return this._write(e, 1, "setUint8");
    }
    writeUint16(e) {
        return this._write(e, 2, "setUint16");
    }
    writeUint32(e) {
        return this._write(e, 4, "setUint32");
    }
    writeFloat64(e) {
        return this._write(e, 8, "setFloat64");
    }
    writeWriter(e) {
        if (!e)
            this.writeInt32(0);
        else {
            this.writeInt32(e.getTotalLength());
            var t = e.getData();
            for (var n = 0; n < t.length; n++)
                this._write(t[n].value, t[n].length, t[n].method);
        }
        return this;
    }
    writeBooleansArrayFunc(e, t) {
        var n = null;
        for (var r = 0; r < e.length; r++)
            n == null && (n = new BinaryBoolean),
                n.writeBoolean(t(e[r]) ? 1 : 0),
                (r + 1) % 8 == 0 && (this.writeBooleanMap(n), n = null);
        return n && (n.fillZero(), this.writeBooleanMap(n)),
            this;
    }
    getData() {
        return this.data;
    }
    getTotalLength() {
        return this.totalLength;
    }
    getBuffer() {
        var e = new ArrayBuffer(this.totalLength), t = new DataView(e, 0), n = 0;
        for (var r = 0; r < this.data.length; r++) {
            var i = this.data[r];
            t[i.method](n, i.value),
                n += i.length;
        }
        return e;
    }
}
var Base64ArrayBuffer = function() {};
Base64ArrayBuffer.setup = function() {
        this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            this.lookup = new Uint8Array(256);
        for (var e = 0; e < this.chars.length; e++) this.lookup[this.chars.charCodeAt(e)] = e
    },
    Base64ArrayBuffer.setup(),
    Base64ArrayBuffer.encode = function(e) {
        var t = new Uint8Array(e),
            n,
            r = t.length,
            i = "";
        for (n = 0; n < r; n += 3) i += this.chars[t[n] >> 2],
            i += this.chars[(t[n] & 3) << 4 | t[n + 1] >> 4],
            i += this.chars[(t[n + 1] & 15) << 2 | t[n + 2] >> 6],
            i += this.chars[t[n + 2] & 63];
        return r % 3 === 2 ? i = i.substring(0, i.length - 1) + "=" : r % 3 === 1 && (i = i.substring(0, i.length - 2) + "=="),
            i
    },
    Base64ArrayBuffer.decode = function(e) {
        var t = e.length * .75,
            n = e.length,
            r, i = 0,
            s, o, u, a;
        e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
        var f = new ArrayBuffer(t),
            l = new Uint8Array(f);
        for (r = 0; r < n; r += 4) s = this.lookup[e.charCodeAt(r)],
            o = this.lookup[e.charCodeAt(r + 1)],
            u = this.lookup[e.charCodeAt(r + 2)],
            a = this.lookup[e.charCodeAt(r + 3)],
            l[i++] = s << 2 | o >> 4,
            l[i++] = (o & 15) << 4 | u >> 2,
            l[i++] = (u & 3) << 6 | a & 63;
        return f
    }

class BinaryBoolean {
    constructor(e) {
        this.buffer = e,
            this.length = 0;
    }
    writeAll(e) {
        for (var t = 0; t < 8; t++)
            this.writeBoolean(arguments[t]);
        return this;
    }
    writeBoolean(e) {
        return this.buffer <<= 1,
            this.buffer |= e ? 1 : 0,
            this.length++,
            this;
    }
    fillZero() {
        var e = this.length;
        for (var t = 0; t < 8 - e; t++)
            this.writeBoolean(0);
        return this;
    }
    readBoolean() {
        var e = 1, t = this.buffer & e;
        return this.buffer >>= 1,
            t ? !0 : !1;
    }
    getValue() {
        return this.buffer;
    }
    reverse() {
        var e = [];
        for (var t = 0; t < 8; t++)
            e.push(this.readBoolean());
        for (var t = 0; t < 8; t++)
            this.writeBoolean(e[t]);
        return this;
    }
    toString() {
        return this.buffer;
    }
}