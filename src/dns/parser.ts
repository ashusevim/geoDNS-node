import { DNSQuery } from "./types";

function parseDomain(buffer: Buffer, offset: number){
    // Collect each domain label from the DNS-encoded name.
    const labels: string[] = [];

    // DNS labels are length-prefixed and end with a zero-length byte.
    while(buffer[offset] !== 0){
        const length  = buffer[offset++]
        // Read the current label as ASCII text.
        labels.push(buffer.toString('ascii', offset, offset + length))
        // Advance to the next label.
        offset += length
    }

    return {
        // Return the dotted domain and the next unread buffer position.
        name: labels.join('.'),
        offset: offset + 1
    }
}

export function parseQuery(msg: Buffer): DNSQuery {
    const id = msg.readUInt16BE(0)

    let offset = 12 // Skip the DNS header (12 bytes)

    const domain = parseDomain(msg, offset)
    offset = domain.offset

    const queryType = msg.readUInt16BE(offset)
    offset += 2

    const queryClass = msg.readUInt16BE(offset)

    return {
        id,
        name: domain.name,
        queryType,
        queryClass
    }
}