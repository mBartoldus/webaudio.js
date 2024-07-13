import type { AudioBufferMsg } from "../audio_buffer/messages.ts";
import type { AutomationMsg } from "../audio_param/messages.ts";

export interface ControlMsg {
    audioBuffer?: AudioBufferMsg
    automation?: AutomationMsg
}