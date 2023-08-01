import { auth, firestore } from "@/utils/firebase";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";

const AddUser = () => {
  const [groups, setGroups] = useState<GroupDataType[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const designationRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const groupRef = useRef<HTMLSelectElement>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const designation = designationRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const groupSelected = groupRef.current?.value;

    if (!name || !designation || !email || !password || !groupSelected) {
      alert("Fill all fields");
      return;
    }

    try {
      const authResult = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userCollection = collection(firestore, "user");
      const userDocRef = doc(userCollection, authResult.user.uid);

      

      await setDoc(userDocRef, {
        uid: authResult.user.uid,
        name: name,
        designation: designation,
        email: email,
        rights: "user",
        group: groupSelected,
      });

      const adminEmail = "admin@gmail.com";
      const adminPassword = "admin123"

      await signInWithEmailAndPassword(auth, adminEmail, adminPassword);

      nameRef.current.value = "";
      designationRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      groupRef.current.value = "";
    } catch (err) {
      console.log(err);
      // alert("Something Went Wrong");
    }
  };

  const getGroups = async () => {
    const groupCollection = collection(firestore, "groups");
    const groupData = await getDocs(groupCollection);
    const groupNames: GroupDataType[] = [];

    groupData.forEach((doc) => {
      groupNames.push({ groupName: doc.data().groupName, groupId: doc.id });
    });

    setGroups(groupNames);
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <>
      <Head>
        <title>Add User</title>
      </Head>
      <div className="white-card form-box">
        <div className="card-title">
          <h1>Add User</h1>
        </div>
        <form onSubmit={submitHandler}>
          <Row>
            <Col md={6}>
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                ref={nameRef}
                required
              />
            </Col>
            <Col md={6}>
              <label>Designation</label>
              <input
                type="text"
                placeholder="Designation"
                ref={designationRef}
                required
              />
            </Col>
            <Col md={6}>
              <label>Email</label>
              <input type="email" placeholder="Email" ref={emailRef} required />
            </Col>
            <Col md={6}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                ref={passwordRef}
                required
              />
            </Col>
            <Col xs={12}>
              <label>Group</label>
              <select required defaultValue={""} ref={groupRef}>
                <option value="" disabled>
                  Select Group
                </option>
                {groups.map((item, index) => (
                  <option value={item.groupId} key={index}>
                    {item.groupName}
                  </option>
                ))}
              </select>
            </Col>
            <Col xs={12}>
              <button type="submit">
                <FontAwesomeIcon icon={faPlus} />
                Add User
              </button>
            </Col>
          </Row>
        </form>
      </div>
    </>
  );
};

export default AddUser;
