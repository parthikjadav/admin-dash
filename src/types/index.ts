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