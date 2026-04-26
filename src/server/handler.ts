import { Socket, RemoteInfo } from "dgram";
import { parseQuery } from "../dns/parser";
import { buildResponse } from "../dns/builder";
import { geoRoute } from "../geo/geoRouter";

export function handleRequest(server: Socket, msg: Buffer, rInfo: RemoteInfo) {
    const query = parseQuery(msg);

    console.log(`[msg] ${query.name} from ${rInfo.address}`);

    const ip = geoRoute(rInfo.address, query.name);

    const response = buildResponse(msg, ip);

    server.send(response, rInfo.port, rInfo.address)
}
