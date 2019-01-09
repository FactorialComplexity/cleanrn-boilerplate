# Clean React Native Boilerplate

This is a boilerplate for Clean React Native architecture created by [Factorial Complexity](https://www.factorialcomplexity.com).

Clean React Native architecture projects are meant to be modular, reusable, testable and maintanable.

## Running

The project is built on React Native (no Expo). Regular React Native commands work. Xcode and Android Studio projects are included.

First, make sure to execute:

```
npm install
```

(NOTE: The project uses NPM not Yarn).

iOS project uses Cocoa Pods. Before starting, execute this in `ios` directory:

```
pod install
```

You will need [CocoaPods](https://cocoapods.org/) installed.

## About the Architecture

Clean React Native is a loose application of [Clean Architecture](https://medium.freecodecamp.org/a-quick-introduction-to-clean-architecture-990c014448d2) ideas to React/Redux. Application is broken into 3 layers:

1. **data** - contains the code for interacting with the outside world.
2. **presentation** - screens, other components and navigation logic.
3. **domain** - business logic of the application, including Redux state management (actions, reducers and selectors).

Ideally, **domain** layer is not aware of **presentation** and **data**, while the latter are aware of the former. This is not 100% true in real life, but is followed as much as possible.

The code is broken into "modules", bound together by `wireframe.ts`. This approach simplifies writing unit tests as dependencies are easily tracked.
