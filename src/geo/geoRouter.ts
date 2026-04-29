import { DNS_RECORDS } from "../config/records";

type Region = "IN" | "US" | "DEFAULT"

function detectRegion(ip: string): Region{
    if(ip.startsWith('49.') || ip.startsWith('103.'))return 'IN'
    if(ip.startsWith('8.'))return 'US'
    return 'DEFAULT'   
}

export function geoRoute(clientIP: string, domain: string): string{
    const region = detectRegion(clientIP)
    const record = DNS_RECORDS[domain]

    if(!record) return '9.9.9.9'
    return record[region] || record.DEFAULT
}