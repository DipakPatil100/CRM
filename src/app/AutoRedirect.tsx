// "use client";
// import { signOut, useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

// export interface AutoLogoutProviderProps {
//   timeoutMs?: number;
//   timeoutCheckMs?: number;
//   debug?: boolean;
//   requireSession?: boolean;
// }

// type WindowActivityEvent = keyof WindowEventMap;

// export function AutoLogoutProvider({
//   timeoutMs =60,
//   timeoutCheckMs = 1000,
//   debug = false,
//   requireSession = false,
//   children,
// }: React.PropsWithChildren<AutoLogoutProviderProps>) {
//     const _storageKey = "_lastActivity";
//   const [lastActivity, setLastActivity] = useState<number>(initLastActivity());
//   const { data: session, status } = useSession({ required: requireSession });


//   function storage() {
//     return global.window !== undefined ? window.localStorage : null;
//   }

//   function initLastActivity() {
//     const now = activity();

//     const lastActivityStr:any = storage()?.getItem(_storageKey);

//     const lastActivity = parseLastActivityString(lastActivityStr);

//     return lastActivity == null ? now : lastActivity;
//   }

//   function parseLastActivityString(activityStr: string) {
//     const lastActivity = +activityStr;

//     const now = activity();

//     if (
//       lastActivity == null ||
//       lastActivity > now ||
//       lastActivity <= 0 ||
//       isNaN(lastActivity)
//     ) {
//       // note: some of these conditions could actually mean
//       // someone is trying to tamper with your activity timer
//       // use with caution
//       return null;
//     }

//     return lastActivity;
//   }

//   function activity() {
//     return new Date().getTime();
//   }
//   function onUserActivity() {
//     const now = activity();

//     if (debug) console.log("activity - resetting last activity to ", now);
//     storage().setItem(_storageKey, now.toString());
//     setLastActivity(now);
//   }

//   function onStorage({ key, storageArea, newValue }: StorageEvent) {
//     if (key === _storageKey && storageArea === storage()) {
//       // some debugging lines
//       if (debug)
//         console.log(
//           "remote tab activity - resetting last activity to ",
//           newValue
//         );
//       const lastActivity = parseLastActivityString(newValue);

//       if (lastActivity !== null) {
//         setLastActivity(lastActivity);
//       }
//     }
//   }

//   function onTimerElapsed() {
//     // just fire the isUserInactive check
//     isUserInactive();
//   }

//   function isUserInactive() {
//     const now = activity();

//     // maybe verify that they are authenticated?
//     if (status === "authenticated") {
//       const expiry = new Date(session.expires).getTime();

//       if (now > expiry) {
//         if (debug) {
//           console.error("user has expired", expiry, now);
//         }
//         signOut();
//         return true;
//       }
//     }

//     if (lastActivity + timeoutMs < now) {
//       if (debug) console.error("user inactive", lastActivity, now);
//       signOut();
//       return true;
//     }
//     return false;
//   }

//   useEffect(() => {
//     // session is still loading
//     if (status === "loading") {
//       return;
//     }

//     if (status === "unauthenticated") {
//       // maybe you want to do something more here..
//       return;
//     }

//     // no timer has been initialized
//     if (timeoutMs == null) {
//       return;
//     }

//     // if user is already inactive, do not init
//     if (isUserInactive()) {
//       return;
//     }
//     // on mount we will listen to several possible "interactive"
//     // events
//     const windowEvents: WindowActivityEvent[] = ["focus", "scroll", "click"];

//     windowEvents.forEach((eventName) => {
//       window.addEventListener(eventName, onUserActivity, false);
//     });

//     // we will use localStorage to determine activity
//     window.addEventListener("storage", onStorage, false);

//     // initialize an interval to check activity
//     const intervalId = window.setInterval(onTimerElapsed, timeoutCheckMs);

//     return () => {
//       // detach and destroy listeners on deconstructor
//       windowEvents.forEach((eventName) => {
//         window.removeEventListener(eventName, onUserActivity, false);
//       });

//       window.removeEventListener("storage", onStorage, false);

//       // clear the interval
//       window.clearInterval(intervalId);
//     };
//   }, [lastActivity, status]);

//   return <>{children}</>;
// }
