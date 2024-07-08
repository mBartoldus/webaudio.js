import { AudioBuffer, _shareAudioBuffer, _acceptAudioBuffer } from './audio_buffer.ts'
import { assertStrictEquals, assertEquals } from '@std/assert'
import { assertSubset } from "../utils/assertSubset.ts"

function getPCM(audioBuffer: AudioBuffer) {
    return _shareAudioBuffer(audioBuffer).pcm
}

Deno.test('AudioBuffer: should initialize properties', () => {
    const options = {
        sampleRate: 48000,
        numberOfChannels: 3,
        length: 256,
        duration: 256 / 48000
    }
    assertSubset(new AudioBuffer(options), options)
})

Deno.test('AudioBuffer: should generate pcm with appropriate length', () => {
    const audioBuffer = new AudioBuffer({
        sampleRate: 48000,
        numberOfChannels: 5,
        length: 10,
    })
    const pcm = getPCM(audioBuffer)
    assertStrictEquals(50, pcm.length)
})

Deno.test('AudioBuffer.getChannelData: should provide view to pcm array', () => {
    const audioBuffer = new AudioBuffer({
        sampleRate: 48000,
        numberOfChannels: 2,
        length: 2,
    })
    const pcm = getPCM(audioBuffer)
    const ch0 = audioBuffer.getChannelData(0)
    const ch1 = audioBuffer.getChannelData(1)
    assertStrictEquals(pcm.buffer, ch0.buffer)

    ch0[0] = 0
    ch0[1] = 1
    ch1[0] = 2
    ch1[1] = 3
    assertEquals(new Float32Array([0, 1, 2, 3]), pcm)
})


Deno.test('AudioBuffer: should generate pcm with appropriate length', () => {
    const audioBuffer = new AudioBuffer({
        sampleRate: 48000,
        numberOfChannels: 5,
        length: 10,
    })
    const pcm = getPCM(audioBuffer)
    assertStrictEquals(50, pcm.length)
})
Deno.test('AudioBuffer.copyToChannel: should copy to audiobuffer at appropriate offset', () => {
    const audioBuffer = new AudioBuffer({
        sampleRate: 48000,
        numberOfChannels: 2,
        length: 5,
    })
    const srcBuffer = new Float32Array([1, 2, 3, 4])
    audioBuffer.copyToChannel(srcBuffer, 1, 1)
    const expected = new Float32Array([0, 0, 0, 0, 0, 0, 1, 2, 3, 4])
    assertEquals(expected, getPCM(audioBuffer))
})

Deno.test('AudioBuffer.copyFromChannel: should copy from audiobuffer at appropriate offset', () => {
    const audioBuffer = new AudioBuffer({
        sampleRate: 48000,
        numberOfChannels: 2,
        length: 4,
    })

    const ch1 = audioBuffer.getChannelData(1)
    ch1[1] = 100
    ch1[2] = 200
    ch1[3] = 300

    const dstArray = new Float32Array(3)
    audioBuffer.copyFromChannel(dstArray, 1, 1)

    assertEquals(new Float32Array([100, 200, 300]), dstArray)
})


Deno.test('AudioBuffer: should be able to share data', () => {
    const opt = {
        sampleRate: 48000,
        numberOfChannels: 3,
        length: 256,
        duration: 256 / 48000
    }
    const audioBuffer = new AudioBuffer(opt)
    const mirror = _acceptAudioBuffer(_shareAudioBuffer(audioBuffer))
    assertEquals(audioBuffer, mirror)
})