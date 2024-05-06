## se-containers-react

[![npm version](https://badge.fury.io/js/se-containers-react.svg)](https://badge.fury.io/js/se-containers-react)
[![License: MIT](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

The Workspace SDK is a React-based library that provides a simple and efficient way to
integrate a [sphere-engine Container](https://docs.sphere-engine.com/containers/overview) component into your
application. It handles script loading,
subscription management, and rendering of the workspace component.

## Table of contents

- [Documentation](#documentation)
- [Installation](#installation)
- [Usage in App](#usage-in-app)
- [Props](#props)


## Documentation

[sphere-engine Containers Documentation](https://docs.sphere-engine.com/containers/workspace/integration)

### Installation

```bash
npm i se-containers-react
```

### Usage in App

To render the Workspace component you need workspaceId from API.

```jsx
import React from 'react';
import {Workspace} from 'se-containers-react';

const App = () => {
    return (
        <Workspace
            workspaceId="your-workspace-id"
            subscriptions={'afterScenarioExecution: callback'}
            visible={true}
            width="100px"
            height="200px"
        />
    );
}

export default App;
```

### Props

The Workspace component accepts the following props:

| Prop          |            Type            | Description                        | Required |
|---------------|:--------------------------:|------------------------------------|----------|
| workspaceId   |           string           | The workspaceId from the API       | Yes      |
| subscriptions | {string: callbackFunction} | The list of events to subscribe to | No       |
| visible       |          boolean           | The visibility of the component    | No       |
| width         |           string           | The width of the component         | No       |
| height        |           string           | The height of the component        | No       |

Note: The width and height of the component can be set in any CSS unit (px, em, rem, %, etc.).

### Possible subscriptions

- afterScenarioExecution
- afterScenarioExecutionExt
- fileContent
- stageStream

Each subscription requires a callback function that will be called when the event is triggered 
e.g. 
```jsx
<Workspace
    workspaceId="your-workspace-id"
    subscriptions={{
        'afterScenarioExecution': (data) => {
            console.log(data);
        }
    }}
/>
```
All subscriptions are described in
the [event documentation](https://docs.sphere-engine.com/containers/workspace/integration#javascript-sdk-events)

### Requirements

Before using se-containers-react, ensure your project meets these prerequisites:

- Node.js and npm: Install Node.js along with npm.
- React and ReactDOM: Ensure compatible versions of React and ReactDOM are installed:














