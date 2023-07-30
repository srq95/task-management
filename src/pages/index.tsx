import Head from "next/head";
import { Poppins } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Row, Col } from "react-bootstrap";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
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
            <form>
              <Row>
                <Col xs={12}>
                  <label>Enter Your Email Address</label>
                  <input type="email" placeholder="name@example.com" required />
                </Col>
                <Col xs={12}>
                  <label>Enter Your Password</label>
                  <input
                    type="password"
                    placeholder="atleast 8 characters"
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
