import { JSX } from "react"

export interface State {
  user: {
    name: string
    email: string
    _id: string
    __v: number
  } | null
  loading: boolean
}

export interface Actions {
  fetchUser: () => Promise<void>
}

export interface sidebarLinksType {
    title: string,
    links: sidebarLinkType[]
}

export interface sidebarLinkType {
    icon: string,
    title: string,
    href: string
}

export interface Step {
    label: string;
    description: string;
    content: JSX.Element;
}

export interface StepStoreType {
    stepCount: number | null;
    isError: boolean;
    canContinue: boolean;
    setStepCount: (num: number) => void;
    setIsError: (bool: boolean) => void;
    setCanContinue: (bool: boolean) => void;
}

