declare global {
  interface DashboardMenuType {
    heading: string
    links: {
      text: string,
      link: string,
      icon: FontAwesomeIconProps,
      isActive?: boolean,
    }[]
  }
}

export {
  DashboardMenuType,
};
