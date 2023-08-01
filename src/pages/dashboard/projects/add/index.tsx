import { useRef, useContext } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { Col, Row } from "react-bootstrap";
import { addDoc, collection, doc } from "firebase/firestore";
import { firestore } from "@/utils/firebase";
import { MainContext } from "@/context";
import { useRouter } from "next/router";

const AddProject = () => {
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const projectUrlRef = useRef<HTMLInputElement>(null);
  const userIdRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLTextAreaElement>(null);

  const context = useContext(MainContext);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const projectUrl = projectUrlRef.current?.value;
    const userId = userIdRef.current?.value;
    const password = passwordRef.current?.value;
    const details = detailsRef.current?.value;

    try {
      if (context && context.userData.group) {
        const groupDocRef = doc(firestore, "groups", context.userData.group);

        await addDoc(collection(groupDocRef, "projects"), {
          name: name,
          projectUrl: projectUrl,
          userId: userId,
          password: password,
          details: details,
        });

        router.push("/dashboard/projects");
      }
    } catch (error) {
      console.error("Error adding data to Projects collection:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Add Project</title>
      </Head>
      <div className="white-card form-box">
        <div className="card-title">
          <h1>Add Project</h1>
        </div>
        <form onSubmit={submitHandler}>
          <Row>
            <Col md={6}>
              <label>Project Name</label>
              <input
                type="text"
                placeholder="Project Name"
                ref={nameRef}
                required
              />
            </Col>
            <Col md={6}>
              <label>Project Url</label>
              <input
                type="text"
                placeholder="Project Url"
                ref={projectUrlRef}
              />
            </Col>
            <Col md={6}>
              <label>User ID</label>
              <input type="text" placeholder="User ID" ref={userIdRef} />
            </Col>
            <Col md={6}>
              <label>Password</label>
              <input type="text" placeholder="Password" ref={passwordRef} />
            </Col>
            <Col xs={12}>
              <label>Project Details</label>
              <textarea
                placeholder="Project Details"
                ref={detailsRef}
              ></textarea>
            </Col>
            <Col xs={12}>
              <button type="submit">
                <FontAwesomeIcon icon={faPlus} />
                Add Project
              </button>
            </Col>
          </Row>
        </form>
      </div>
    </>
  );
};

export default AddProject;
