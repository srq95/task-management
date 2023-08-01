import React, { useRef } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { Col, Row } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/utils/firebase";
import { useRouter } from "next/router";

const AddGroup = () => {
  const router = useRouter();

  const groupNameRef = useRef<HTMLInputElement>(null);
  const groupDetailRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const groupName = groupNameRef.current?.value;
    const groupDetail = groupDetailRef.current?.value;

    if (!groupName) {
      alert("Fill All Fields");
      return;
    }

    try {
      const groupCollection = collection(firestore, "groups");

      const newDocRef = await addDoc(groupCollection, {
        groupName: groupName,
        groupDetail: groupDetail,
      });

      groupNameRef.current.value = "";

      if (groupDetail) {
        groupDetailRef.current.value = "";
      }

      router.push("/dashboard/groups");
    } catch (err) {
      console.error(err);
      alert("Something Went Wrong");
    }
  };

  return (
    <>
      <Head>
        <title>Add Group</title>
      </Head>
      <div className="white-card form-box">
        <div className="card-title">
          <h1>Add Group</h1>
        </div>
        <form onSubmit={submitHandler}>
          <Row>
            <Col xs={12}>
              <label>Group Name</label>
              <input
                type="text"
                placeholder="Group Name"
                ref={groupNameRef}
                required
              />
            </Col>
            <Col xs={12}>
              <label>Details</label>
              <textarea placeholder="Details" ref={groupDetailRef}></textarea>
            </Col>
            <Col xs={12}>
              <button type="submit">
                <FontAwesomeIcon icon={faPlus} />
                Add Group
              </button>
            </Col>
          </Row>
        </form>
      </div>
    </>
  );
};

export default AddGroup;
