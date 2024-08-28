import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useMetaStore = create(
  persist(
    (set, get) => ({
      meta: {
        channelCreated: false,
      },
      setChannel: flag => {
        set({
          meta: {
            ...get().meta,
            channelCreated: flag,
          },
        });
      },
    }),
    {
      name: 'meta', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useMetaStore;
