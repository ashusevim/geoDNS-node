import { DNS_RECORDS } from "../config/records";

function detectRegion(ip: string): string{
    if(ip.startsWith('49.') || ip.startsWith('103.'))return 'IN'
    if(ip.startsWith('8.'))return 'US'
    return 'DEFAULT'   
}

export function geoRoute(clientIP: string, domain: string): string{
    const region = detectRegion(clientIP)

    const record = DNS_RECORDS[domain]

    if(!record){
        return '9.9.9.9'
    }

    return record[region] || record.DEFAULT
}