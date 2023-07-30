import React from "react";
import Link from "next/link";
import style from "./SideMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faAdd, faListCheck, faFileAlt, faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";

const SideMenu = () => {
  const UserLinks: DashboardMenuType[] = [
    {
      heading: "Tasks",
      links: [
        {
          text: "View Tasks",
          link: "/dashboard",
          icon: faListCheck,
          isActive: true,
        },
        {
          text: "Add Tasks",
          link: "/dashboard/add-task",
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
          link: "/dashboard/add-project",
          icon: faFileCirclePlus,
        },
      ],
    },
  ];

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
          {UserLinks.map((item, index) => (
            <React.Fragment key={index}>
              <h3>{item.heading}</h3>
              <ul>
                {item.links.map((linkitem, linkindex) => (
                  <li key={linkindex}>
                    <Link
                      href={linkitem.link}
                      className={linkitem.isActive ? style.active : ""}
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
