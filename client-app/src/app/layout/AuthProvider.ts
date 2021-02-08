import { MsalAuthProvider, LoginType } from "react-aad-msal";
import { LogLevel, Logger } from "msal";

const logger = new Logger(
  (logLevel, message, containsPii) => {
    console.log("[MSAL]", message);
  },
  {
    level: LogLevel.Verbose,
    piiLoggingEnabled: false
  }
);

const httpsroot = window.location.origin.replace(window.location.protocol, 'https:');

// The auth provider should be a singleton. Best practice is to only have it ever instantiated once.
// Avoid creating an instance inside the component it will be recreated on each render.
// If two providers are created on the same page it will cause authentication errors.
export const AuthProvider = new MsalAuthProvider(
  {
    auth: {
      //authority: "https://login.microsoftonline.com/common",
      //clientId: "0f2c6253-3928-4fea-b131-bf6ef8f69e9c",

      authority: "https://login.microsoftonline.com/e36e2432-b327-457a-bb91-2c778cfcb631",
      clientId: "42aaf93d-803a-4ae4-af90-73523c225144",

      //postLogoutRedirectUri: window.location.origin,
      postLogoutRedirectUri: process.env.NODE_ENV === 'development' ? window.location.origin : httpsroot,
      //redirectUri: window.location.origin,
			redirectUri: process.env.NODE_ENV === 'development' ? window.location.origin : httpsroot,
      validateAuthority: true,

      // After being redirected to the "redirectUri" page, should user
      // be redirected back to the Url where their login originated from?
      //navigateToLoginRequestUrl: false
    },
    // Enable logging of MSAL events for easier troubleshooting.
    // This should be disabled in production builds.
    system: {
      logger: logger as any
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false
    }
  },
  {
    scopes: ["api://42aaf93d-803a-4ae4-af90-73523c225144/access_as_user"]
  },
  {
    loginType: LoginType.Redirect,
    // When a token is refreshed it will be done by loading a page in an iframe.
    // Rather than reloading the same page, we can point to an empty html file which will prevent
    // site resources from being loaded twice.

    //tokenRefreshUri: window.location.origin + "/auth.html"
		tokenRefreshUri: (process.env.NODE_ENV === 'development' ? window.location.origin : httpsroot) + '/auth.html'
  }
);
