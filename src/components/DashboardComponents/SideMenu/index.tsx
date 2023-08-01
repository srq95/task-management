import React, { useContext } from "react";
import Link from "next/link";
import style from "./SideMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faListCheck,
  faFileAlt,
  faFileCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { MainContext } from "@/context";

const SideMenu = () => {
  const router = useRouter();
  const context = useContext(MainContext);

  const UserLinks: DashboardMenuType[] = [
    {
      heading: "Tasks",
      links: [
        {
          text: "View Tasks",
          link: "/dashboard/tasks",
          icon: faListCheck,
        },
        {
          text: "Add Tasks",
          link: "/dashboard/tasks/add",
          icon: faAdd,
        },
      ],
    },
    {
      heading: "Projects",
      links: [
        {
          text: "View Projects",
          link: "/dashboard/projects",
          icon: faFileAlt,
        },
        {
          text: "Add Projects",
          link: "/dashboard/projects/add",
          icon: faFileCirclePlus,
        },
      ],
    },
  ];

  const AdminLinks: DashboardMenuType[] = [
    {
      heading: "Groups",
      links: [
        {
          text: "View Groups",
          link: "/dashboard/groups",
          icon: faListCheck,
        },
        {
          text: "Add Group",
          link: "/dashboard/groups/add",
          icon: faAdd,
        },
      ],
    },
    {
      heading: "Users",
      links: [
        {
          text: "View Users",
          link: "/dashboard/users",
          icon: faFileAlt,
        },
        {
          text: "Add User",
          link: "/dashboard/users/add",
          icon: faFileCirclePlus,
        },
      ],
    },
  ];

  const navLinks = () => {
    if (context && context.userData && context.userData.rights) {
      const links =
        context?.userData.rights === "admin" ? AdminLinks : UserLinks;
      return links;
    }
    return [];
  };

  return (
    <>
      <div className={style.sideMenu}>
        <div className={style.logo}>
          <Link href={"/dashboard"}>
            <img src="/assets/logo.png" alt="" />
            <h2>Task Management</h2>
          </Link>
        </div>
        <div className={style.menu}>
          {navLinks().map((item, index) => (
            <React.Fragment key={index}>
              <h3>{item.heading}</h3>
              <ul>
                {item.links.map((linkitem, linkindex) => (
                  <li key={linkindex}>
                    <Link
                      href={linkitem.link}
                      className={
                        router.pathname === linkitem.link ? style.active : ""
                      }
                    >
                      <FontAwesomeIcon icon={linkitem.icon} />
                      {linkitem.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
