declare global {
    interface Window {
        SE: {
            ready: (callback: () => void) => void;
            workspace: (containerId: string) => {
                destroy: () => void;
                events: {
                    subscribe: any,
                    unsubscribe: any
                };
            };
        }
        SE_BASE: string;
        SE_HTTPS: boolean;
    }
}

const SE_BASE: string = "containers.sphere-engine.com";
const SE_HTTPS: boolean = true
let alreadyLoaded: boolean = false

const setupSEVariables = () => {
    window.SE_BASE = SE_BASE
    window.SE_HTTPS = SE_HTTPS
}

const ScriptLoader = (onScriptLoaded: () => void) => {
    if(alreadyLoaded) {
        onScriptLoaded()
        return
    }
    setupSEVariables()

    // @ts-ignore
    const SE = window?.SE || (window.SE = [])
    let js, fjs = document.getElementsByTagName('script')[0]

    const scriptExists = document.getElementById('sphere-engine-compilers-jssdk')

    if (!scriptExists) {
        js = document.createElement('script')
        js.id = 'sphere-engine-compilers-jssdk'
        js.src = `https://${SE_BASE}/static/sdk/sdk.min.js`
        js.onload = () => {
            onScriptLoaded()
            alreadyLoaded = true
        }
        fjs.parentNode?.insertBefore(js, fjs)
    }


    SE.ready = function (f) {
        if (document.readyState !== 'loading' && document.readyState !== 'interactive') {
            f()
        } else {
            window.addEventListener('load', f)
        }
    }
}

export default ScriptLoader