import { MainContext } from "@/context";
import { firestore } from "@/utils/firebase";
import {
  faCheck,
  faEye,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, isValid } from "date-fns";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Badge } from "react-bootstrap";

type SingleTaskType = {
  projectId: string;
};

type TaskDetailsType = {
  details: TaskDataType;
  taskId: string;
};

const SingleProjectTask: React.FC<SingleTaskType> = ({ projectId }) => {
  const [allTasks, setAllTasks] = useState<TaskDetailsType[]>([]);

  const context = useContext(MainContext);

  const getProjects = async () => {
    try {
      if (context && context.userData.group) {
        const groupDocRef = doc(firestore, "groups", context.userData.group);

        const projectDoc = doc(groupDocRef, "projects", projectId);

        const taskDocs = await getDocs(collection(projectDoc, "tasks"));

        const tasks: TaskDetailsType[] = [];

        taskDocs.forEach((doc) => {
          tasks.push({
            details: doc.data() as TaskDataType,
            taskId: doc.id,
          });
        });

        setAllTasks(tasks);
      }
    } catch (error) {
      console.error("Error Geting data to Task collection:", error);
    }
  };

  const handleCompleteButtonClick = async (taskId: string) => {
    try {
      if (context && context.userData.group) {
        const groupDocRef = doc(firestore, "groups", context.userData.group);

        const projectDoc = doc(groupDocRef, "projects", projectId);

        const taskDocRef = doc(projectDoc, "tasks", taskId);

        await updateDoc(taskDocRef, { isCompleted: true });

        setAllTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.taskId === taskId
              ? { ...task, details: { ...task.details, isCompleted: true } }
              : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleIncompleteButtonClick = async (taskId: string) => {
    try {
      if (context && context.userData.group) {
        const groupDocRef = doc(firestore, "groups", context.userData.group);

        const projectDoc = doc(groupDocRef, "projects", projectId);

        const taskDocRef = doc(projectDoc, "tasks", taskId);

        await updateDoc(taskDocRef, { isCompleted: false });

        setAllTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.taskId === taskId
              ? { ...task, details: { ...task.details, isCompleted: false } }
              : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteButtonClick = async (taskId: string) => {
    try {
      if (context && context.userData.group) {
        const groupDocRef = doc(firestore, "groups", context.userData.group);

        const projectDoc = doc(groupDocRef, "projects", projectId);

        const taskDocRef = doc(projectDoc, "tasks", taskId);

        await deleteDoc(taskDocRef);

        setAllTasks((prevTasks) =>
          prevTasks.filter((task) => task.taskId !== taskId)
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
      {allTasks.map((item, index) => {
        const data = item.details.createdAt.toDate();
        const formattedDate = isValid(data)
          ? format(data, "h:mm a '-' MMMM d, yy")
          : "Invalid Date";

        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.details.name}</td>
            <td>{item.details.details}</td>
            <td style={{ width: 150, minWidth: 130 }}>
              {item.details.isCompleted ? (
                <Badge bg="success">Completed</Badge>
              ) : (
                <Badge bg="warning">Pending</Badge>
              )}
            </td>
            <td className="action-td">{formattedDate}</td>
            <td className="action-td">
              {!item.details.isCompleted && (
                <button
                  className="btn btn-success"
                  onClick={() => handleCompleteButtonClick(item.taskId)}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              )}
              {item.details.isCompleted && (
                <button
                  className="btn btn-danger"
                  onClick={() => handleIncompleteButtonClick(item.taskId)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
              <button className="btn btn-primary">
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteButtonClick(item.taskId)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default SingleProjectTask;
