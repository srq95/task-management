import { useContext } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import style from "./DashboardHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBoxesStacked,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { MainContext } from "@/context";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";

const DashboardHeader = () => {
  const context = useContext(MainContext);

  const submitHandler = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
      alert("Something Went Wrong");
    }
  };
  return (
    <>
      <header className={style.header}>
        <Row>
          <Col xs={6}>
            {context && context.windowWidth && context.windowWidth <= 576 ? (
              <ul className={`${style.rightMenu} ${style.leftMenu}`}>
                <li>
                  <a
                    href="/menu"
                    onClick={(e) => {
                      e.preventDefault();
                      context.setMenuVisbility(true)
                    }}
                    className={style.roundButton}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </a>
                </li>
              </ul>
            ) : null}
          </Col>

          <Col xs={6}>
            <ul className={style.rightMenu}>
              <li>
                <a
                  href="/team-project-details"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className={style.roundButton}
                >
                  <FontAwesomeIcon icon={faBoxesStacked} />
                </a>

                <div className={style.dropMenu}>
                  <h3>Activity</h3>
                  <div className={style.tabsArea}>
                    <Tabs defaultActiveKey={1} className={style.dropDownTabs}>
                      <Tab eventKey={1} title="Team">
                        <ul className={style.teamsUl}>
                          <li>
                            <div className={style.userDetailArea}>
                              <div className={style.userImage}>
                                <img
                                  src="/assets/dashboard/users/1.jpg"
                                  alt=""
                                />
                              </div>
                              <div className={style.userDetail}>
                                <h4>Mathew Anderson</h4>
                                <p>Designer</p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className={style.userDetailArea}>
                              <div className={style.userImage}>
                                <img
                                  src="/assets/dashboard/users/1.jpg"
                                  alt=""
                                />
                              </div>
                              <div className={style.userDetail}>
                                <h4>Mathew Anderson</h4>
                                <p>Designer</p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className={style.userDetailArea}>
                              <div className={style.userImage}>
                                <img
                                  src="/assets/dashboard/users/1.jpg"
                                  alt=""
                                />
                              </div>
                              <div className={style.userDetail}>
                                <h4>Mathew Anderson</h4>
                                <p>Designer</p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </Tab>
                      <Tab eventKey={2} title="Projects">
                        <ul className={style.teamsUl}>
                          <li>
                            <div className={style.userDetailArea}>
                              <div className={style.userImage}>
                                <img
                                  src="/assets/dashboard/users/1.jpg"
                                  alt=""
                                />
                              </div>
                              <div className={style.userDetail}>
                                <h4>Mathew Anderson</h4>
                                <p>Designer</p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className={style.userDetailArea}>
                              <div className={style.userImage}>
                                <img
                                  src="/assets/dashboard/users/1.jpg"
                                  alt=""
                                />
                              </div>
                              <div className={style.userDetail}>
                                <h4>Mathew Anderson</h4>
                                <p>Designer</p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className={style.userDetailArea}>
                              <div className={style.userImage}>
                                <img
                                  src="/assets/dashboard/users/1.jpg"
                                  alt=""
                                />
                              </div>
                              <div className={style.userDetail}>
                                <h4>Mathew Anderson</h4>
                                <p>Designer</p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="/user-detail"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <img src="/assets/dashboard/users/1.jpg" alt="" />
                </a>
                <div className={style.dropMenu}>
                  <h3>User Profile</h3>
                  <div className={style.userDetailArea}>
                    <div className={style.userImage}>
                      <img src="/assets/dashboard/users/1.jpg" alt="" />
                    </div>
                    <div className={style.userDetail}>
                      <h4>{context?.userData && context?.userData.name}</h4>
                      <p>
                        {context?.userData && context?.userData.designation}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faEnvelope} />
                        {context?.userData && context?.userData.email}
                      </p>
                    </div>
                  </div>

                  <div className={style.logoutArea}>
                    <Link href="/" onClick={submitHandler}>
                      Sign Out
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </Col>
        </Row>
      </header>
    </>
  );
};

export default DashboardHeader;
