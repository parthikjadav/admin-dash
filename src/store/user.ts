import { getUser } from '@/actions/auth'
import { Actions, State } from '@/types';
import { create } from 'zustand'

export const useUserStore = create<State & Actions>((set, get) => ({
  user: null,
  loading: true,
  fetchUser: async () => {
    try {
      const res = await getUser()
      if (!res) return
      set({ user: res })
    } catch (error) {
      console.log("error fetching error", error);
    } finally {
      set({ loading: false })
    }
  }
}))