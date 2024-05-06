import React, {useEffect, useState} from 'react';

export const WorkspaceComponent: React.FC<{ workspaceId: string }> = (({workspaceId}) => {
    const elemId = workspaceId + "-container";
    const [created, setCreated] = useState<boolean>(false);

    useEffect(() => {
        window.SE?.ready(() => {
            if (!created) {
                window.SE?.workspace(elemId);
                setCreated(true);
                console.log(workspaceId, "workspace created")
            }
        })

        return () => {
            if (created) {
                const ws = window.SE.workspace(elemId);
                ws?.destroy();
                setCreated(false)
                console.log(workspaceId, "workspace destroyed")
            }
        }
    }, [created]);


    return (
        <div style={{width: '100%', height: '100%'}}>
            <div data-id={elemId} data-workspace={workspaceId}></div>
        </div>
    );
});
