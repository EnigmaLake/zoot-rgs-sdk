# Zoot - RGS SDK

The Zoot Game RGS SDK is a TypeScript library designed for game servers to seamlessly integrate with the Zoot RGS (Remote Game Service) server.

Request an API Key & GAME_ID <a href="https://docs.google.com/forms/d/e/1FAIpQLScEo_4jb-I5CHm7WwOlTBhswKbN_UFvJ4xepkWWlX93rNPIMQ/viewform" target="_blank"> by filling this form </a>.

## Features
- **Instantiate a new RGS Service** **```createRgsService({
  rgsGameId: <GAME_ID_PROVIDED_BY_ZOOT>,
  rgsBearerToken: <API_KEY_PROVIDED_BY_ZOOT>,
  rgsAPIHost: "https://rgs.enigmalakecasino.com,
})```**
- 

## Getting Started

To start using the Enigma Lake Zoot Game RGS Service SDK, follow these steps:

1. **Installation**: Install the SDK via npm:
```bash 
npm install @enigma-lake/zoot-rgs-sdk

```

2. **Integration**: You can import the entire package using the syntax
``` js
import * as zootSDK from '@enigma-lake/zoot-rgs-sdk
';
```
or you can import specific types, events, and methods individually, such as:
``` js
 import { createRgsService } from '@enigma-lake/zoot-rgs-sdk
';
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
