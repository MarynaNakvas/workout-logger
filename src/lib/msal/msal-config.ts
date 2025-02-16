import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "8c1d7425-37fe-4e0e-b19e-7557e4df414e",
    authority: "https://login.microsoftonline.com/common",
    // redirectUri: "http://localhost:3000",
    redirectUri: "https://workout-logger-v1.vercel.app",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: [
    "User.Read",
    "Calendars.ReadWrite",
    "email",
    "profile",
    "ProfilePhoto.Read.All",
    "ProfilePhoto.ReadWrite.All",
  ],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
