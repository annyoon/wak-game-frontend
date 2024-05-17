import { create } from 'zustand';
import { ResultTypes } from '../types/GameTypes';

interface Store {
  resultData: ResultTypes;
  setResultData: (userData: ResultTypes) => void;
}

const useResultStore = create<Store>((set) => ({
  resultData: { userId: -1, killCount: -1, rank: -1 } as ResultTypes,
  setResultData: (resultData: ResultTypes) =>
    set(() => ({ resultData: { ...resultData } })),
}));

export default useResultStore;
