import ConfirmationPopup from "@/components/DashboardComponents/ConfirmationPopup";
import { firestore } from "@/utils/firebase";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import Head from "next/head";
import { useEffect, useState } from "react";

const Groups = () => {
  const [groups, setGroups] = useState<GroupDataType[]>([]);
  const [toDeleteID, setToDeleteID] = useState<string>("");
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const getGroups = async () => {
    const groupCollection = collection(firestore, "groups");
    const groupData = await getDocs(groupCollection);
    const groupNames: GroupDataType[] = [];

    groupData.forEach((doc) => {
      groupNames.push({
        groupName: doc.data().groupName,
        groupDetail: doc.data().groupDetail,
        groupId: doc.id,
      });
    });

    setGroups(groupNames);
  };

  useEffect(() => {
    getGroups();
  }, []);

  const handleDeleteButtonClick = (taskId: string) => {
    setShowConfirmationPopup(true);
    setToDeleteID(taskId);
  };

  const handleDeleteConfirm = async (groupId: string) => {
    try {
      const groupsDoc = doc(firestore, "groups", groupId);

      await deleteDoc(groupsDoc);

      setShowConfirmationPopup(false);

      setGroups((prevGroups) =>
        prevGroups.filter((group) => group.groupId !== groupId)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Users</title>
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
                <th>Group Name</th>
                <th>Detail</th>
                <th className="action-td">Action</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.groupName}</td>
                  <td>{item.groupDetail}</td>

                  <td className="action-td">
                    <button className="btn btn-primary">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteButtonClick(item.groupId)}
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

export default Groups;
