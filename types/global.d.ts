declare global {
  interface DashboardMenuType {
    heading: string;
    links: {
      text: string;
      link: string;
      icon: FontAwesomeIconProps;
      isActive?: boolean;
    }[];
  }
  interface UserDataType {
    designation: string;
    email: string;
    group: string;
    name: string;
    rights: string;
    uid: string;
  }

  interface GroupDataType {
    groupName: string;
    groupId: string;
    groupDetail?: string;
  }

  interface ProjectDataType {
    name: string;
    details?: string;
    password?: string;
    projectUrl?: string;
    userId?: string;
    projectId?: string;
  }

  interface TaskDataType {
    name: string;
    project: string;
    details: string;
    createdAt: string;
  }
}

export { DashboardMenuType };
