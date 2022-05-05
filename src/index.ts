import {InlineProgramArgs} from "@pulumi/pulumi/automation";
import {PluginManager} from 'live-plugin-manager';

// pkg = pulumi npm name https://www.npmjs.com/package/pulumi-cr-platform
// version: latest version of npm module

export async function getPackage(pkg:string, version:string) {
    const manager = new PluginManager();

    await manager.install(pkg, version);
    const app = manager.require(pkg);
    return app;
}
async function main() {
    // it errors here i think
    const kek = await getPackage('pulumi-cr-platform', '7.0.1');

    const args: InlineProgramArgs = {
        stackName: 'henk',
        projectName: 'test',
        program: kek.fixDit(),
    };

    // it does not even come , because error is happening before.
    const stack = await LocalWorkspace.createOrSelectStack(args);
    await stack.workspace.installPlugin('aws', 'v3.38.1');
    await stack.up();
}
main()
