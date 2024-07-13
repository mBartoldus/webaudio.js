import type { AudioBufferMsg } from "../audio_buffer/messages.ts";

export interface ControlMsg {
    audioBuffer?: AudioBufferMsg
}