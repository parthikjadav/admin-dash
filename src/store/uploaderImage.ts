import { create } from "zustand";

interface UploaderStore {
    url: string | null,
    isError: boolean,
    setUrl: (url: string) => void,
    setIsError: (isError: boolean) => void,
}

const useUploaderStore = create<UploaderStore>((set)=>({
    url: null,
    isError: false,
    setUrl: (url: string) => set({url}),
    setIsError: (isError: boolean) => set({isError})
}))

export default useUploaderStore