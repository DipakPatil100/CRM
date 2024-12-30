import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './features/Users/user'
import sidebarSlice  from './features/Sidebar/sidebarSlice'
import leadSlice from './features/Leads/getLeadSlice'
import propertySlice from './features/Properties/PropertySlice'
// import  getLoginUserSlice  from './features/getUser/getLoggedInUser'

export const makeStore = () => {
  return configureStore({
    reducer: {
      users: userSlice,
      sidebar: sidebarSlice,
      leads: leadSlice,
      // properties: propertySlice,
      // loginUser: getLoginUserSlice
    },
  } as any)
}


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']