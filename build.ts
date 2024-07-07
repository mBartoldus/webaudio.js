import {bakeScript} from "@mbartoldus/stringworker"

async function bundle(path: string) {
    const cmd = new Deno.Command(Deno.execPath(), {
        args: [
            'deno', 'run', '-A', 'jsr:@kt3k/pack@^0.1.10', path
        ],
        stdout: 'piped'
    })
    return new TextDecoder().decode((await cmd.output()).stdout)
}

const workletBundle = await bundle('src/workletMod.ts')
const workletScript = new TextEncoder().encode(bakeScript(workletBundle))
await Deno.writeFile('src/_workletScript.js', workletScript)

// const fullBundle = await bundle('src/mod.ts')
// const fullBundleData = new TextEncoder().encode(fullBundle)
// await Deno.writeFile('dist/webaudio.js', fullBundleData)