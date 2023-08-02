import { firestore } from "@/utils/firebase";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import Head from "next/head";
import { useEffect, useState } from "react";

const Users = () => {
  const [allUsers, setAllUsers] = useState<UserDataType[]>([]);

  const getUsers = async () => {
    try {
      const usersCollection = collection(firestore, "user");
      const userDataDocs = await getDocs(usersCollection);

      const UserData: UserDataType[] = [];

      for (const userDoc of userDataDocs.docs) {
        const groupDataDoc = await getDoc(
          doc(firestore, "groups", userDoc.data().group)
        );

        const groupData = groupDataDoc.data();

        UserData.push({
          designation: userDoc.data().designation,
          email: userDoc.data().email,
          group: groupData?.groupName,
          name: userDoc.data().name,
          rights: userDoc.data().rights,
          uid: userDoc.data().uid,
        });
      }
      setAllUsers(UserData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteButtonClick = async (userId: string) => {
    try {
      const userDoc = doc(firestore, "user", userId);

      await deleteDoc(userDoc);

      setAllUsers((prevUsers) =>
        prevUsers.filter((user) => user.uid !== userId)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <div className="white-card p-0">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="sno-td">S.No</th>
                <th>Username</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Group</th>
                <th className="action-td">Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.designation}</td>
                  <td>{item.email}</td>
                  <td>{item.group}</td>
                  <td className="action-td">
                    <button className="btn btn-primary">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteButtonClick(item.uid)}
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

export default Users;
