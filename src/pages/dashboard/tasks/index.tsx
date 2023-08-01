import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { MainContext } from "@/context";
import { firestore } from "@/utils/firebase";
import SingleProjectTask from "@/components/DashboardComponents/SingleProjectTask";

type ProjectDetailsType = {
  details: ProjectDataType;
  projectId: string;
};

const Tasks = () => {
  const [allProjects, setAllProjects] = useState<ProjectDetailsType[]>([]);

  const context = useContext(MainContext);

  const getProjects = async () => {
    try {
      if (context && context.userData && context.userData.group) {
        const groupDocRef = doc(firestore, "groups", context.userData.group);
        const projectsCollections = collection(groupDocRef, "projects");
        const projectsDoc = await getDocs(projectsCollections);

        const projectData: ProjectDetailsType[] = [];

        projectsDoc.forEach((doc) => {
          projectData.push({
            details: doc.data() as ProjectDataType,
            projectId: doc.id,
          });
        });

        setAllProjects(projectData);
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
        <title>Tasks</title>
      </Head>
      {allProjects.map((item, index) => (
        <div className="white-card p-0" key={index}>
          <div className="card-title m-0">
            <h1>{item.details.name}</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th className="sno-td">S.no</th>
                <th>Task</th>
                <th>Detail</th>
                <th>Status</th>
                <th>Assigned At</th>
                <th className="action-td">Action</th>
              </tr>
            </thead>
            <thead>
              <SingleProjectTask projectId={item.projectId} />
            </thead>
          </table>
        </div>
      ))}
    </>
  );
};

export default Tasks;
