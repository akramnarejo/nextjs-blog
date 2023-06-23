import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'


const useStore = create(
    persist(
      (set, get) => ({
        userInfo: {},
        setUserInfo: (data) => set({userInfo: data})
      }),
      {
        name: 'blog-storage', // unique name
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )



export default useStore