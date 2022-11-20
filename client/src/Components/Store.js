import create from "zustand";

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () =>
    set((state) => ({
      bears: state.bears - 1,
    })),
}));

export default useBearStore;
