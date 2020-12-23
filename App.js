import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { startLoading } from "./src/startLoading";
import { AppNavigation } from "./src/navigation/AppNavigation";
import { Provider } from "react-redux";
import store from './src/redux'

export default function App() {
  const [isReady, setIsReady] = useState(false);
  if (!isReady) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={() => setIsReady(true)}
        onError={(e) => console.log("App Loading Error: ", e)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}