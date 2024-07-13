export interface AudioNodeMsg {
    id: number
    type: string
    properties: DataView,
    params?: Record<string, DataView>
}
export interface ConnectMsg {
    src: number,
    dst: number,
    inputIndex: number,
    outputIndex: number
}