import { useContext, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { MainContext } from "@/context";
import { firestore } from "@/utils/firebase";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ConfirmationPopup from "@/components/DashboardComponents/ConfirmationPopup";

type TaskDetailsType = {
  details: ProjectDataType;
  projectId: string;
};

const Projects = () => {
  const [allProjects, setAllProjects] = useState<TaskDetailsType[]>([]);
  const [toDeleteID, setToDeleteID] = useState<string>("");
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const context = useContext(MainContext);

  const getProjects = async () => {
    try {
      if (context && context.userData && context.userData.group) {
        const groupDocRef = doc(firestore, "groups", context.userData.group);
        const projectCollection = collection(groupDocRef, "projects");
        const projectData = await getDocs(projectCollection);

        const projects: TaskDetailsType[] = [];

        projectData.forEach((doc) => {
          projects.push({
            details: doc.data() as ProjectDataType,
            projectId: doc.id,
          });
        });

        setAllProjects(projects);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

   const handleDeleteButtonClick = (taskId: string) => {
     setShowConfirmationPopup(true);
     setToDeleteID(taskId);
   };

   const handleDeleteConfirm = async (projectId: string) => {
     try {
       if (context && context.userData.group) {
         const groupDocRef = doc(firestore, "groups", context.userData.group);

         const projectDoc = doc(groupDocRef, "projects", projectId);

         await deleteDoc(projectDoc);

         setShowConfirmationPopup(false);

         setAllProjects((prevProjects) =>
           prevProjects.filter((project) => project.projectId !== projectId)
         );
       }
     } catch (error) {
       console.error("Error deleting task:", error);
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
      <ConfirmationPopup
        onConfirm={() => handleDeleteConfirm(toDeleteID)}
        onCancel={() => setShowConfirmationPopup(false)}
        visibility={showConfirmationPopup}
      />
      <div className="white-card p-0">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="sno-td">S.No</th>
                <th>Project Name</th>
                <th>Project Url</th>
                <th>Project Details</th>
                <th className="action-td">Action</th>
              </tr>
            </thead>
            <tbody>
              {allProjects.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.details.name}</td>
                  <td>{item.details.projectUrl}</td>
                  <td>{item.details.details}</td>
                  <td className="action-td">
                    <button className="btn btn-primary">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteButtonClick(item.projectId)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Projects;
