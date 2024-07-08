export type AudioContextState = "suspended" | "running" | "closed"
export type AudioContextLatencyCategory = "balanced" | "interactive" | "playback"
export type ChannelCountMode = "max" | "clamped-max" | "explicit"
export type ChannelInterpretation = "speakers" | "discrete"
export type AutomationRate = "a-rate" | "k-rate"
export type OscillatorType = "sine" | "square" | "sawtooth" | "triangle" | "custom"
export type OverSampleType = "none" | "2x" | "4x"
export type BiquadFilterType = "lowpass" | "highpass" | "bandpass" | "lowshelf" | "highshelf" | "peaking" | "notch" | "allpass"
export type PanningModelType = "suspended" | "running" | "closed"
export type DistanceModelType = "linear" | "inverse" | "exponential"
export type PeriodicWaveConstraints = {
    disableNormalization: boolean
}
export type DecodeSuccessCallback = (decodedData: AudioBuffer) => undefined
export type DecodeErrorCallback = (error: DOMException) => undefined

export interface OfflineAudioCompletionEventInit extends EventInit {
    renderedBuffer: AudioBuffer
}
export interface OfflineAudioCompletionEvent extends Event {
    // constructor (type: DOMString, eventInitDict: OfflineAudioCompletionEventInit)
    readonly renderedBuffer: AudioBuffer
}
export type AudioParamMap = Record<string, AudioParam>

export interface BaseAudioContext extends EventTarget {
    readonly destination: AudioDestinationNode
    readonly sampleRate: number
    readonly currentTime: number
    readonly listener: AudioListener
    readonly state: AudioContextState
    readonly audioWorklet?: AudioWorklet
    onstatechange: ((this: BaseAudioContext, ev: Event) => void) | null

    createAnalyser(): AnalyserNode
    createBiquadFilter(): BiquadFilterNode
    createBuffer(
        numberOfChannels: number,
        length: number,
        sampleRate: number
    ): AudioBuffer
    createBufferSource(): AudioBufferSourceNode
    createChannelMerger(numberOfInputs?: number): ChannelMergerNode
    createChannelSplitter(numberOfOutputs?: number): ChannelSplitterNode
    createConstantSource(): ConstantSourceNode
    createConvolver(): ConvolverNode
    createDelay(maxDelayTime?: number): DelayNode
    createDynamicsCompressor(): DynamicsCompressorNode
    createGain(): GainNode
    createIIRFilter(
        feedforward: Iterable<number>,
        feedback: Iterable<number>
    ): IIRFilterNode
    createOscillator(): OscillatorNode
    createPanner(): PannerNode
    createPeriodicWave(
        real: Iterable<number>,
        imag: Iterable<number>,
        constraints?: PeriodicWaveConstraints
    ): PeriodicWave
    // createScriptProcessor(): never
    createStereoPanner(): StereoPannerNode
    createWaveShaper(): WaveShaperNode

    decodeAudioData(
        audioData: ArrayBuffer,
        successCallback?: DecodeSuccessCallback,
        errorCallback?: DecodeErrorCallback
    ): Promise<AudioBuffer>
}

// export interface AudioTimestamp {
//     contextTime: number
//     performanceTime: number
// }
// export interface AudioContext extends BaseAudioContext {
//     readonly baseLatency: number
//     readonly outputLatency: number
//     getOutputTimestamp(): AudioTimestamp
//     resume(): Promise<void>
//     suspend(): Promise<void>
//     close(): Promise<void>
//     // createMediaElementSource
//     // createMediaStreamSource
//     // createMediaStreamTrackSource
//     // createMediaStreamDestination
// }

export interface OfflineAudioContext extends BaseAudioContext {
    startRendering(): Promise<AudioBuffer>
    resume(): Promise<void>
    suspend(suspendTime: number): Promise<void>
    readonly length: number
    onComplete: ((this: OfflineAudioContext, ev: OfflineAudioCompletionEvent) => void) | null
}

export interface AudioBuffer {
    readonly sampleRate: number
    readonly length: number
    readonly duration: number
    readonly numberOfChannels: number
    getChannelData(channel: number): Float32Array
    copyFromChannel(
        destination: Float32Array,
        channelNumber: number,
        bufferOffset?: number
    ): void
    copyToChannel(
        source: Float32Array,
        channelNumber: number,
        bufferOffset?: number
    ): void
}

export interface AudioNode extends EventTarget {
    connect(
        destinationNode: AudioNode,
        output?: number,
        input?: number
    ): AudioNode
    connect(
        destinationParam: AudioParam,
        output?: number
    ): void

    disconnect(): void
    disconnect(output: number): void
    disconnect(
        destination: AudioNode | AudioParam,
        output?: number,
        input?: number
    ): void

    readonly context: BaseAudioContext
    readonly numberOfInputs: number
    readonly numberOfOutputs: number
    channelCount: number
    channelCountMode: ChannelCountMode
    channelInterpretation: ChannelInterpretation
}


export interface AudioParam {
    value: number
    automationRate: AutomationRate
    readonly defaultValue: number
    readonly minValue: number
    readonly maxValue: number
    setValueAtTime(value: number, startTime: number): AudioParam
    linearRampToValueAtTime(value: number, endTime: number): AudioParam
    exponentialRampToValueAtTime(value: number, endTime: number): AudioParam
    setTargetAtTime(
        target: number,
        startTime: number,
        timeConstant: number
    ): AudioParam
    setValueCurveTime(
        values: Iterable<number>,
        startTime: number,
        duration: number
    ): AudioParam
    cancelScheduledValues(cancelTime: number): AudioParam
    cancelAndHoldAtTime(cancelTime: number): AudioParam
}


export interface AudioDestinationNode extends AudioNode {
    readonly maxChannelCount: number
}


export interface AudioScheduledSourceNode extends AudioNode {
    onended: ((this: AudioScheduledSourceNode, ev: Event) => void) | null
    start(when?: number): void
    stop(when?: number): void
}

export interface ConstantSourceNode extends AudioScheduledSourceNode {
    readonly offset: AudioParam
}
export interface AudioBufferSourceNode extends AudioScheduledSourceNode {
    buffer: AudioBuffer | null
    readonly playbackRate: AudioParam
    readonly detune: AudioParam
    loop: boolean
    loopStart: number
    loopEnd: number
    start(when?: number, offset?: number, duration?: number): void
}
export interface OscillatorNode extends AudioScheduledSourceNode {
    type: OscillatorType
    readonly frequency: AudioParam
    readonly detune: AudioParam
    setPeriodicWave(periodicWave: PeriodicWave): void
}
export type PeriodicWave = Record<never, never>

export interface AnalyserNode extends AudioNode {
    getFloatFrequencyData(array: Float32Array): void
    getByteFrequencyData(array: Float32Array): void
    getFloatTimeDomainData(array: Float32Array): void
    getByteTimeDomainData(array: Float32Array): void
    fftSize: number
    readonly frequencyBinCount: number
    minDecibels: number
    maxDecibels: number
    smoothingTimeConstant: number
}
export interface DelayNode extends AudioNode {
    readonly delayTime: AudioParam
}
export interface GainNode extends AudioNode {
    readonly gain: AudioParam
}
export interface WaveShaperNode extends AudioNode {
    curve: Float32Array | null
    overSample: OverSampleType
}

export interface BiquadFilterNode extends AudioNode {
    type: BiquadFilterType
    readonly frequency: AudioParam
    readonly detune: AudioParam
    readonly Q: AudioParam
    readonly gain: AudioParam
}
export interface IIRFilterNode extends AudioNode {
    getFrequencyResponse(
        frequencyHz: Float32Array,
        magResponse: Float32Array,
        phaseResponse: Float32Array
    ): void
}
export interface ChannelMergerNode extends AudioNode { }
export interface ChannelSplitterNode extends AudioNode { }
export interface PannerNode extends AudioNode {
    panningModel: PanningModelType
    readonly positionX: AudioParam
    readonly positionY: AudioParam
    readonly positionZ: AudioParam
    readonly orientationX: AudioParam
    readonly orientationY: AudioParam
    readonly orientationZ: AudioParam
    distanceModel: DistanceModelType
    refDistance: number
    maxDistance: number
    rolloffFactor: number
    coneInnerAngle: number
    coneOuterAngle: number
    coneOuterGain: number
    setPosition(
        x: number,
        y: number,
        z: number
    ): void
    setOrientation(
        x: number,
        y: number,
        z: number
    ): void
}
export interface StereoPannerNode extends AudioNode {
    readonly pan: AudioParam
}

export interface ConvolverNode extends AudioNode {
    buffer: AudioBuffer | null
    normalize: boolean
}
export interface DynamicsCompressorNode extends AudioNode {
    readonly threshold: AudioParam
    readonly knee: AudioParam
    readonly ratio: AudioParam
    readonly reduction: number
    readonly attack: AudioParam
    readonly release: AudioParam
}

// export interface MediaElementAudioSourceNode extends AudioNode {
//     readonly mediaElement: HTMLMediaElement
// }
// export interface MediaStreamAudioDestinationNode extends AudioNode {
//     readonly stream: MediaStream
// }
// export interface MediaStreamAudioSourceNode extends AudioNode {
//     readonly stream: MediaStream
// }
// export interface MediaStreamTrackAudioSourceNode extends AudioNode {
//     readonly mediaStreamTrack: MediaStreamTrack
// }

export interface AudioListener {
    readonly positionX: AudioParam
    readonly positionY: AudioParam
    readonly positionZ: AudioParam
    readonly forwardX: AudioParam
    readonly forwardY: AudioParam
    readonly forwardZ: AudioParam
    readonly upX: AudioParam
    readonly upY: AudioParam
    readonly upZ: AudioParam
    setPosition(x: number, y: number, z: number): void
    setOrientation(
        x: number,
        y: number,
        z: number,
        xUp: number,
        yUp: number,
        zUp: number
    ): void
}

export interface AudioWorklet {
    addModule(
        url: string,
        options?: { credentials?: "omit" | "same-origin" | "include" }
    ): Promise<void>
}
export interface AudioWorkletGlobalScope {
    registerProcessor(
        name: string,
        processorCtor: { new(): AudioWorkletProcessor }
    ): void
    readonly currentFrame: bigint
    readonly currentTime: number
    readonly sampleRate: number
}
export interface AudioWorkletNode extends AudioNode {
    readonly parameters: AudioParamMap
    readonly port: MessagePort
    onprocessorerror: ((this: AudioWorkletNode, ev: Event) => void) | null
}
export interface AudioWorkletProcessor {
    readonly port: MessagePort
}


///////////////////////////////////////////////////////////////////////////

export interface AudioContextOptions {
    latencyHint?: AudioContextLatencyCategory
    sampleRate?: number
}

export interface OfflineAudioContextOptions {
    numberOfChannels?: number
    length: number
    sampleRate: number
}

export interface AudioBufferOptions {
    numberOfChannels?: number
    length: number
    sampleRate: number
}

export interface AudioNodeOptions {
    channelCount?: number
    channelCountMode?: ChannelCountMode
    channelInterpretation?: ChannelInterpretation
}

export interface AnalyserOptions extends AudioNodeOptions {
    fftSize?: number
    maxDecibels?: number
    minDecibels?: number
    smoothingTimeConstant?: number
}

export interface AudioBufferSourceOptions {
    buffer?: AudioBuffer
    detune?: number
    loop?: boolean
    loopEnd?: number
    loopStart?: number
    playbackRate?: number
}

export interface BiquadFilterOptions extends AudioNodeOptions {
    type?: BiquadFilterType
    Q?: number
    detune?: number
    frequency?: number
    gain?: number
}

export interface ChannelMergerOptions extends AudioNodeOptions {
    numberOfInputs?: number
}

export interface ChannelSplitterOptions extends AudioNodeOptions {
    numberOfOutputs?: number
}

export interface ConstantSourceOptions {
    offset?: number
}

export interface ConvolverOptions extends AudioNodeOptions {
    buffer?: AudioBuffer | null
    disableNormalization?: boolean
}

export interface DelayOptions extends AudioNodeOptions {
    maxDelayTime?: number
    delayTime?: number
}

export interface DynamicsCompressorOptions extends AudioNodeOptions {
    attack?: number
    knee?: number
    ratio?: number
    release?: number
    threshold?: number
}


export interface GainOptions extends AudioNodeOptions {
    gain?: number
}


export interface IIRFilterOptions extends AudioNodeOptions {
    feedforward: Iterable<number>
    feedback: Iterable<number>
}

// MediaElementAudioSourceOptions {
//     required HTMLMediaElement mediaElement;
//   };

// MediaStreamAudioSourceOptions {
//     required MediaStream mediaStream;
//   };

// dictionary MediaStreamTrackAudioSourceOptions {
//     required MediaStreamTrack mediaStreamTrack;
//   };

export interface OscillatorOptions extends AudioNodeOptions {
    type?: OscillatorType
    frequency?: number
    detune?: number
    periodicWave: PeriodicWave
}

export interface PannerOptions extends AudioNodeOptions {
    panningModel?: PanningModelType
    distanceModel?: DistanceModelType
    positionX?: number
    positionY?: number
    positionZ?: number
    orientationX?: number
    orientationY?: number
    orientationZ?: number
    refDistance?: number
    maxDistance?: number
    rolloffFactor?: number
    coneInnerAngle?: number
    coneOuterAngle?: number
    coneOuterGain?: number
}

export interface PeriodicWaveOptions extends PeriodicWaveConstraints {
    real: Float32Array
    imag: Float32Array
}

export interface StereoPannerOptions extends AudioNodeOptions {
    pan?: number
}

export interface WaveShaperOptions extends AudioNodeOptions {
    curve: Float32Array
    oversample?: OverSampleType
}

export interface AudioWorkletNodeOptions extends AudioNodeOptions {
    numberOfInputs?: number
    numberOfOutputs?: number
    outputChannelCount?: Array<number>
    parameterData?: Record<string, number>
    processorOptions?: object
}