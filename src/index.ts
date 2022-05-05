import {InlineProgramArgs, LocalWorkspace} from "@pulumi/pulumi/automation";
import {PluginManager} from 'live-plugin-manager';

// pkg = pulumi npm name https://www.npmjs.com/package/pulumi-cr-platform
// version: latest version of npm module

async function getPackage(pkg:string, version:string) {
    const manager = new PluginManager();

    await manager.install(pkg, version);
    const app = manager.require(pkg);
    return app;
}
async function main() {
    // it errors in this const, in the function: line 7 till line 12
     const app = await getPackage('pulumi-cr-platform', '7.0.1');

    const args: InlineProgramArgs = {
        stackName: 'henk',
        projectName: 'test',
        program: app.fixDit(),
    };

    // it never comes here , because error is happening in lines above.
    const stack = await LocalWorkspace.createOrSelectStack(args);
    await stack.workspace.installPlugin('aws', 'v3.38.1');
    await stack.up();
}
main();
