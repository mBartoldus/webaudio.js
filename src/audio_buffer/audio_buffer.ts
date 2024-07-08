import * as threadables from '@mbartoldus/threadables'
import { audioBufferMetadata } from './threadables.ts'
import type { AudioBufferMsg } from './messaging.ts'
import type { AudioBuffer as IAudioBuffer, AudioBufferOptions } from '../interfaces.ts'

const _pcm = Symbol('pcm data')
export class AudioBuffer implements IAudioBuffer {
    declare readonly duration: number
    declare readonly length: number
    declare readonly numberOfChannels: number
    declare readonly sampleRate: number

    [_pcm]: Float32Array
    constructor(options: AudioBufferOptions) {
        threadables.allocateData(this)
        threadables.assign(this, {
            numberOfChannels: 1,
            ...options,
            duration: options.length / options.sampleRate,
        })
        const pcmLength = this.length * this.numberOfChannels * 4
        const pcmBuffer = new SharedArrayBuffer(pcmLength)
        this[_pcm] = new Float32Array(pcmBuffer)
    }

    copyFromChannel(
        destination: Float32Array,
        channel: number,
        startInChannel = 0
    ) {
        const ch = this.getChannelData(channel)
        for (let i = 0; i < destination.length; i++)
            destination[i] = ch[i + startInChannel]
    }
    copyToChannel(
        source: Float32Array,
        channel: number,
        startInChannel = 0
    ) {
        const ch = this.getChannelData(channel)
        for (let i = 0; i < source.length; i++)
            ch[i + startInChannel] = source[i]
    }
    getChannelData(channel: number): Float32Array {
        const begin = this.length * channel
        const end = this.length * (channel + 1)
        return this[_pcm].subarray(begin, end)
    }
}
threadables.declare(AudioBuffer.prototype, audioBufferMetadata)

export function _shareAudioBuffer(ab: AudioBuffer): AudioBufferMsg {
    return {
        properties: threadables.share(ab),
        pcm: ab[_pcm]
    }
}

export function _acceptAudioBuffer(msg: AudioBufferMsg): AudioBuffer {
    const ab = threadables.accept(AudioBuffer.prototype, msg.properties)
    ab[_pcm] = msg.pcm
    return ab
}