import { firestore } from "@/utils/firebase";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";
import { useEffect, useState } from "react";

const Groups = () => {
  const [groups, setGroups] = useState<GroupDataType[]>([]);

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
                    <button className="btn btn-danger">
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
