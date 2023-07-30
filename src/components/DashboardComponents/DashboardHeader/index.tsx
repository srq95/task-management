import { Col, Row, Tab, Tabs } from "react-bootstrap";
import style from "./DashboardHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesStacked, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const DashboardHeader = () => {
  return (
    <>
      <header className={style.header}>
        <Row>
          <Col md={6}></Col>

          <Col md={6}>
            <ul className={style.rightMenu}>
              <li>
                <div className={style.roundButton}>
                  <FontAwesomeIcon icon={faBoxesStacked} />
                </div>

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
                <img src="/assets/dashboard/users/1.jpg" alt="" />

                <div className={style.dropMenu}>
                  <h3>User Profile</h3>
                  <div className={style.userDetailArea}>
                    <div className={style.userImage}>
                      <img src="/assets/dashboard/users/1.jpg" alt="" />
                    </div>
                    <div className={style.userDetail}>
                      <h4>Mathew Anderson</h4>
                      <p>Designer</p>
                      <p>
                        <FontAwesomeIcon icon={faEnvelope} />
                        info@something.com
                      </p>
                    </div>
                  </div>

                  <div className={style.logoutArea}>
                    <Link href="/">Sign Out</Link>
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
