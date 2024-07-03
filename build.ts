import {bakeScript} from "@mbartoldus/stringworker"

async function bundle(path: string) {
    return new TextDecoder().decode(await Deno.run({
        stdout: 'piped',
        cmd: ['deno', 'run', '-A', 'jsr:@kt3k/pack', path],
    }).output())
}

const workletBundle = await bundle('src/workletMod.ts')
const workletScript = new TextEncoder().encode(bakeScript(workletBundle))
await Deno.writeFile('src/_workletScript.js', workletScript)

// const fullBundle = await bundle('src/mod.ts')
// const fullBundleData = new TextEncoder().encode(fullBundle)
// await Deno.writeFile('dist/webaudio.js', fullBundleData)