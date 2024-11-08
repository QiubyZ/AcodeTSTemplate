import plugin from '../plugin.json';
let AppSettings = acode.require("settings");

class AcodePlugin {
    public baseUrl: string | undefined;

    async init($page: WCPage, cacheFile: any, cacheFileUrl: string): Promise<void> {
        // Add your initialization code here
    }

    async destroy() {
        // Add your cleanup code here
        if (AppSettings.value[plugin.id]){
            delete AppSettings.value[plugin.id];
            AppSettings.update();
        }
    }
}

if(window.acode) {
    const acodePlugin = new AcodePlugin();
    acode.setPluginInit(plugin.id, async (baseUrl: string, $page: WCPage, { cacheFileUrl, cacheFile }: any) => {
        if(!baseUrl.endsWith('/')) {
            baseUrl += '/';
        }
        acodePlugin.baseUrl = baseUrl;
        await acodePlugin.init($page, cacheFile, cacheFileUrl);
    });
    acode.setPluginUnmount(plugin.id, () => {
        acodePlugin.destroy();
    });
}
