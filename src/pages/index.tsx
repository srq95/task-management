import React, { useRef, useContext } from "react";
import Head from "next/head";
import { Poppins } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Row, Col } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { MainContext } from "@/context";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const context = useContext(MainContext);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert("Fill All Fields");
      return;
    }

    try {
      const userAccess = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      context?.fetchUserData(userAccess.user.uid);
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <>
      <Head>
        <title>Login To Task Management</title>
        <meta name="description" content="Login To Task Management" />
      </Head>
      <main className={`${styles.main} ${poppins.className}`}>
        <div className={styles.loginFormArea}>
          <div className={styles.leftLoginArea}>
            <h1>Log in.</h1>
            <p>Login to the panel to start task Management</p>
            <form onSubmit={submitHandler}>
              <Row>
                <Col xs={12}>
                  <label>Enter Your Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    ref={emailRef}
                    required
                  />
                </Col>
                <Col xs={12}>
                  <label>Enter Your Password</label>
                  <input
                    type="password"
                    placeholder="atleast 8 characters"
                    ref={passwordRef}
                    required
                  />
                </Col>
                <Col xs={12}>
                  <button type="submit">Log in</button>
                </Col>
              </Row>
            </form>
          </div>
          <div className={styles.rightLoginArea}>
            <h4>Nice To See You Again</h4>
            <h5>Welcome Back</h5>
            <img src="assets/login/right-image.png" alt="" />
          </div>
        </div>
      </main>
    </>
  );
}
