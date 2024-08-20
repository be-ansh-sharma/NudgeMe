import { fetchActiveReminders } from 'global/database/Database.helper';
import { getFromStorage } from 'global/helpers';
import { create } from 'zustand';

const useReminderStore = create((set, get) => ({
  reminders: {},
  user: null,
  getAllReminders: async () => {
    let active = await fetchActiveReminders();
    set({
      reminders: {
        ...get().reminders,
        active,
      },
    });
  },

  getUser: async () => {},
  setUser: user => {
    set({
      user,
    });
  },
  setUserInfo: async () => {
    let user = null;
    user = get().user;
    if (!user) {
      user = await getFromStorage('user');
    }
    set({
      user,
    });
  },
}));

export default useReminderStore;
