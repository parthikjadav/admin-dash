import { persist } from 'zustand/middleware';
import { AddressFormSchemaType } from './../components/pages/event/steps/AddressStep';
import { create } from "zustand";

export interface AddressState {
  address: AddressFormSchemaType | null,
  setAddress: (address: AddressFormSchemaType | null) => void
}

const useAddressStore = create<AddressState>()(persist((set)=> ({
    address: null,
    setAddress: (address) => set({ address })
}),{
    name: "address-storage"
}))

export default useAddressStore;