import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { MainContext } from "@/context";
import { firestore } from "@/utils/firebase";


const Tasks = () => {
  // const [allTasks, setAllTasks] = useState<TaskDataType[]>([])

  // const context = useContext(MainContext);

  // const getProjects = async () => {
  //   try {
  //     if (context && context.userData && context.userData.group) {
  //       const groupDocRef = doc(firestore, "groups", context.userData.group);
  //       const projectDoc = doc(groupDocRef, "projects", project)
  //       const projectData = await getDocs(projectCollection);

  //       const projectNames: ProjectDataType[] = [];

  //       projectData.forEach((doc) => {
  //         projectNames.push({ name: doc.data().name, projectId: doc.id });
  //       });
  //       setAllTasks(projectNames);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching projects:", error);
  //   }
  // };

  // useEffect(() => {
  //   getProjects();
  // }, [context?.userData?.group]);



  return (
    <>
      <Head>
        <title>Tasks</title>
      </Head>
      <div className="white-card p-0">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Task</th>
              <th>Project</th>
              <th>Assigned At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default Tasks;
