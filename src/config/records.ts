type Region = "IN" | "US" | "DEFAULT"
type DomainRecord = Record<Region, string>

export const DNS_RECORDS: Record<string, DomainRecord> = {
    "example.com": {
        IN: "1.1.1.1",
        US: "2.2.2.2",
        DEFAULT: "3.3.3.3"
    },
}