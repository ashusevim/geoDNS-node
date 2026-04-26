import { DNS_FLAGS } from "./constants";

export function buildResponse(query: Buffer, ip: string): Buffer{
    const res = Buffer.alloc(512)

    query.copy(res, 0, 0, 2)

    res.writeUint16BE(DNS_FLAGS.RESPONSE, 2)

    res.writeUint16BE(1, 4)
    res.writeUint16BE(1, 6)
    res.writeUint16BE(0, 8)
    res.writeUint16BE(0, 10)

    query.copy(res, 12, 12)

    let offset = query.length

    res.writeUInt16BE(0xc00c, offset);
    offset += 2;

    res.writeUint16BE(1, offset)
    offset += 2

    res.writeUint16BE(1, offset)
    offset += 2

    res.writeUint32BE(300, offset)
    offset += 4

    res.writeUint16BE(4, offset)
    offset += 2

    ip.split('.').forEach(o => {
        res.writeUint8(parseInt(o), offset++)
    })   

    return res.slice(0, offset)
}