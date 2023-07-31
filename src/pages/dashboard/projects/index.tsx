import { useContext, useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { MainContext } from "@/context";
import { firestore } from "@/utils/firebase";
import Head from "next/head";

const Projects = () => {
  const [allProjects, setAllProjects] = useState<ProjectDataType[]>([]);

  const context = useContext(MainContext);

  const getProjects = async () => {
    try {
      if (context && context.userData && context.userData.group) {
        const groupDocRef = doc(firestore, "groups", context.userData.group);
        const projectCollection = collection(groupDocRef, "projects");
        const projectData = await getDocs(projectCollection);

        const projects = projectData.docs.map(
          (doc) => doc.data() as ProjectDataType
        );
        setAllProjects(projects);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, [context?.userData?.group]);

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <div className="white-card p-0">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Project Name</th>
              <th>Project Url</th>
              <th>Project Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allProjects.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.projectUrl}</td>
                <td>{item.details}</td>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Projects;
