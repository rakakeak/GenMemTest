import {create} from 'zustand';

type ActiveTarget = 'canvas' | 'image';

interface TextStore {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;

  activeTarget: ActiveTarget;
  setActiveTarget: (target: ActiveTarget) => void;
}

export const useTextStore = create<TextStore>(set => ({
  selectedId: null,
  setSelectedId: id => set({selectedId: id}),

  activeTarget: 'canvas',
  setActiveTarget: target => set({activeTarget: target}),
}));
