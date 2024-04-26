# Zoot - RGS SDK

The Zoot Game RGS SDK is a TypeScript library designed for game servers to seamlessly integrate with the Zoot RGS (Remote Game Service) server.

Request an API Key & GAME_ID <a href="https://docs.google.com/forms/d/e/1FAIpQLScEo_4jb-I5CHm7WwOlTBhswKbN_UFvJ4xepkWWlX93rNPIMQ/viewform" target="_blank"> by filling this form </a>.

## Getting Started

To start using the Enigma Lake Zoot Game RGS Service SDK, follow these steps:

1. **Installation**: Install the SDK via npm:
```bash 
npm install @enigma-lake/zoot-rgs-sdk
```

2. **Integration**: You can import the entire package using the syntax
``` js
import * as zootSDK from '@enigma-lake/zoot-rgs-sdk';
```
or you can import specific types, events, and methods individually, such as:
``` js
 import { createRgsService } from '@enigma-lake/zoot-rgs-sdk';
```

3. **Instantiate:**
```
const rgsService = createRgsService({
  rgsGameId: <GAME_ID_PROVIDED_BY_ZOOT>,
  rgsBearerToken: <API_KEY_PROVIDED_BY_ZOOT>,
  rgsAPIHost: "https://rgs.enigmalakecasino.com,
})
```

4. **Usage**: Utilize SDK methods to communicate with the Zoot backend system.

#### Game Round
- Initiate a new game round **```rgsService.initiateGameRound()```**
- Start a game round **```rgsService.startGameRound()```**
- Complete a game round **```rgsService.completeGameRound()```**
- Cancel a game round **```rgsService.cancelGameRound()```**
- Get a game round **```rgsService.getGameRound()```**

#### User Play
- Register a user play **```rgsService.registerUserPlay()```**
- Deregister a user play **```rgsService.deregisterUserPlay()```**
- Register a user play win **```rgsService.registerPlayWin()```**
- Register a user play lose **```rgsService.registerPlayLose()```**
- Get register user plays **```rgsService.getRegisteredUserPlays()```**
