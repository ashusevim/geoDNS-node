import dgram from "dgram"
import { handleRequest } from "./handler"

export function startUDPServer(port: number){
    const server = dgram.createSocket('udp4')

    server.on('message', (msg, rInfo) => {
        handleRequest(server, msg, rInfo)        
    })

    server.bind(port, () => {
        console.log(`DNS server running on port: ${port}`)
    })
}