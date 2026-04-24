import { DNSQuery } from "./types";

function parseDomain(buffer: Buffer, offset: number){
    const labels: string[] = [];

    while(buffer[offset] !== 0){
        const length  = buffer[offset++]
        labels.push(buffer.toString('ascii', offset, offset + length))
        offset += length
    }

    return {
        name: labels.join('.'),
        offset: offset + 1
    }
}