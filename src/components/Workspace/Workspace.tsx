import React, {ReactNode, useEffect, useRef} from "react";
import ScriptLoader from "../SDKLoader/SDKLoader";
import {WorkspaceComponent} from "../WorkspacecComponent/WorkspaceComponent";

interface WorkspaceProps {
    workspaceId: string;
    subscriptions?: { [event: string]: ((e: any) => void) },
    visible?: boolean
    width?: string
    height?: string
}

const Workspace: React.FC<WorkspaceProps> = ({workspaceId, subscriptions, visible, width, height}) => {
    const [scriptLoaded, setScriptLoaded] = React.useState<boolean>(false);
    const currentSubscriptions = useRef<{ [event: string]: ((e: any) => void) }>({});
    const cssValueRegex = /^(auto|inherit|\d+(\.\d+)?(px|em|%|vw|vh)?|\d+(\.\d+)?(cm|mm|in|pt|pc))$/;
    const workspaceRegEx = /^[0-9a-fA-F]{32}$/;
    const [workspace, setWorkspace] = React.useState<ReactNode | null>(null);

    useEffect(() => {
        if (width && !cssValueRegex.test(width)) {
            console.error("Invalid width value")
        }
        if (height && !cssValueRegex.test(height)) {
            console.error("Invalid height value")
        }
        if (workspaceId && !workspaceRegEx.test(workspaceId)) {
            console.error("Invalid workspaceId value")
        }
        if (subscriptions) {
            for (const event in subscriptions) {
                if (typeof subscriptions[event] !== 'function') {
                    console.error("Invalid subscription callback for event", event, "expected function got", typeof subscriptions[event] === 'function' ? typeof subscriptions[event] : "undefined")
                }
            }
        }
    }, []);


    useEffect(() => {
        setWorkspace(<WorkspaceComponent workspaceId={workspaceId}/>)

        return () => {
            setWorkspace(null)
        }
    }, []);


    const onScriptLoaded = () => {
        setScriptLoaded(true)
    }


    useEffect(() => {
        ScriptLoader(onScriptLoaded)
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && scriptLoaded) {
            window.SE.ready(() => {
                if (currentSubscriptions.current) {
                    for (const event in currentSubscriptions.current) {
                        if (
                            currentSubscriptions.current.hasOwnProperty(event) &&
                            !subscriptions?.hasOwnProperty(event)
                        ) {
                            console.log(workspaceId, "- unsubscribing from event: ", event);
                            window.SE?.workspace(workspaceId + "-container").events.unsubscribe(event, currentSubscriptions.current[event]);
                            delete currentSubscriptions.current[event];
                        }
                    }
                }

                if (subscriptions) {
                    for (const event in subscriptions) {
                        if (
                            subscriptions.hasOwnProperty(event) &&
                            (!currentSubscriptions?.current?.hasOwnProperty(event)) && typeof subscriptions[event] === 'function'
                        ) {
                            console.log(workspaceId, "- subscribing to event: ", event);
                            window.SE?.workspace(workspaceId + "-container").events.subscribe(event, subscriptions[event]);
                            currentSubscriptions.current[event] = subscriptions[event];
                        }
                    }
                }
            });
        }
    }, [subscriptions, scriptLoaded]);


    return (
        <div style={{
            width: cssValueRegex.test(width || '') ? width : "100%",
            height: cssValueRegex.test(height || '') ? height : "100%",
        }}>
            <div style={{
                width: "100%",
                height: "100%",
                display: typeof visible !== 'undefined' ? (visible ? 'block' : 'none') : 'block',
            }}>
                {scriptLoaded && workspace}
            </div>
            {typeof visible !== 'undefined' && !visible && <div style={{
                fontSize: "1.5rem",
                width: "100%",
                height: "100%",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>Workspace Hidden</div>}
        </div>
    );
}


export default Workspace;



