import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchActiveReminders } from 'global/database/Database.helper';
import { getFromStorage } from 'global/helpers';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useReminderStore = create(
  persist(
    (set, get) => ({
      reminders: {},
      user: null,
      meta: {
        channelCreated: false,
      },
      setReminderToStore: async r => {
        let currentReminder = get().reminders;
        if (Array.isArray(r)) {
          let newReminder = {};
          r.map(reminder => {
            newReminder[reminder.uuid] = reminder;
          });
          set({
            reminders: newReminder,
          });
        } else {
          let uuid = r.uuid;
          let currentRemindersUUIDs = Object.keys(currentReminder);
          if (currentRemindersUUIDs.length) {
            if (currentRemindersUUIDs.includes(uuid)) {
              currentReminder[uuid] = r;
              set({
                reminders: currentReminder,
              });
            } else {
              set({
                reminders: {
                  ...currentReminder,
                  [uuid]: r,
                },
              });
            }
          } else {
            set({
              reminders: {
                [uuid]: r,
              },
            });
          }
        }
      },
      setToken: token => {
        let user = get().user;
        user.token = token;
        set({
          user,
        });
      },
      setUser: user => {
        set({
          user,
        });
      },
      deleteReminder: uuid => {
        let reminders = get().reminders;
        let newReminder = { ...reminders };
        delete newReminder[uuid];
        set({
          reminders: newReminder,
        });
      },
      pauseReminder: uuid => {
        let reminders = get().reminders;
        let newReminder = { ...reminders };
        newReminder[uuid].status = 'PAUSED';
        set({
          reminders: newReminder,
        });
      },
      resumeReminder: uuid => {
        let reminders = get().reminders;
        let newReminder = { ...reminders };
        newReminder[uuid].status = 'ACTIVE';
        set({
          reminders: newReminder,
        });
      },
    }),
    {
      name: 'reminders', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useReminderStore;
