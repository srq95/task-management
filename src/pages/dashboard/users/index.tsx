import { firestore } from "@/utils/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
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

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <div className="white-card p-0">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Username</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Group</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
