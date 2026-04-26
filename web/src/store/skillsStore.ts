/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

type SkillState = {
  skillsData: any;
  setSkillsData: (data: any) => void;
};

export const useSkillsStore = create<SkillState>((set) => ({
  skillsData: null,
  setSkillsData: (data) => set({ skillsData: data }),
}));
