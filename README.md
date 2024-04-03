# Enigma Lake Zoot - Game RGS Service

The Enigma Lake Zoot Game RGS Service SDK is a TypeScript library designed to seamlessly interact with the RGS server from all the games' servers.  

## Features
- **Instantiate a new RGS Service** **```createRgsService(props: RgsServiceProperties)```**

## Getting Started

To start using the Enigma Lake Zoot Game RGS Service SDK, follow these steps:

1. **Installation**: Install the SDK via npm:
```bash 
npm install @enigma-lake/zoot-game-rgs-service-sdk
```

2. **Integration**: You can import the entire package using the syntax
``` js
import * as zootSDK from '@enigma-lake/zoot-game-rgs-service-sdk';
```
or you can import specific types, events, and methods individually, such as:
``` js
 import { createRgsService } from '@enigma-lake/zoot-game-rgs-service-sdk';
```

3. **Usage**: Utilize SDK methods to access RGS methods and integrate Enigma Lake Zoot's features into your game.
#### Game Round
- Initiate a new game round **```initiateGameRound()```**
- Start a game round **```startGameRound()```**
- Complete a game round **```completeGameRound()```**
- Cancel a game round **```cancelGameRound()```**
- Get a game round **```getGameRound()```**

#### User Play
- Register a user play **```registerUserPlay()```**
- Deregister a user play **```deregisterUserPlay()```**
- Register a user play win **```registerPlayWin()```**
- Register a user play lose **```registerPlayLose()```**
- Get register user plays **```getRegisteredUserPlays()```**
