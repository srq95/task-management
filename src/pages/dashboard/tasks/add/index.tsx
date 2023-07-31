import { useContext, useEffect, useState, useRef } from "react";
import { addDoc, collection, doc, getDocs, serverTimestamp } from "firebase/firestore";
import { MainContext } from "@/context";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { Col, Row } from "react-bootstrap";
import { firestore } from "@/utils/firebase";

const AddTask = () => {
  const [allProjects, setAllProjects] = useState<ProjectDataType[]>([]);

  const nameRef = useRef<HTMLInputElement>(null);
  const projectRef = useRef<HTMLSelectElement>(null);
  const detailsRef = useRef<HTMLTextAreaElement>(null);

  const context = useContext(MainContext);

  const getProjects = async () => {
    try {
      if (context && context.userData && context.userData.group) {
        const groupDocRef = doc(firestore, "groups", context.userData.group);
        const projectCollection = collection(groupDocRef, "projects");
        const projectData = await getDocs(projectCollection);

        const projectNames: ProjectDataType[] = [];

        projectData.forEach((doc) => {
          projectNames.push({ name: doc.data().name, projectId: doc.id });
        });
        setAllProjects(projectNames);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, [context?.userData?.group]);



  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const project = projectRef.current?.value;
    const details = detailsRef.current?.value;

    if(!name || !project || !details) {
      alert("Fill All Fields")
      return
    }

    try {
      if (context && context.userData.group) {
        const groupDocRef = doc(firestore, "groups", context.userData.group);

        const projectDoc = doc(groupDocRef, "projects", project)

        await addDoc(collection(projectDoc, "tasks"), {
          name: name,
          project: project,
          details: details,
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error adding data to Projects collection:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Add Task</title>
      </Head>
      <div className="white-card form-box">
        <div className="card-title">
          <h1>Add Task</h1>
        </div>
        <form onSubmit={submitHandler}>
          <Row>
            <Col md={6}>
              <label>Task Name</label>
              <input
                type="text"
                placeholder="Task Name"
                ref={nameRef}
                required
              />
            </Col>
            <Col md={6}>
              <label>Project</label>
              <select defaultValue={""} ref={projectRef} required>
                <option value="" disabled>
                  Select Project
                </option>
                {allProjects.map((item, index) => (
                  <option value={item.projectId} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col xs={12}>
              <label>Details</label>
              <textarea
                placeholder="Details"
                ref={detailsRef}
                required
              ></textarea>
            </Col>
            {/* <Col xs={12}>
              <label>Task Points</label>
              <input type="text" placeholder="Task Point 1" />
            </Col> */}
            <Col xs={12}>
              <button type="submit">
                <FontAwesomeIcon icon={faPlus} />
                Add Task
              </button>
            </Col>
          </Row>
        </form>
      </div>
    </>
  );
};

export default AddTask;
