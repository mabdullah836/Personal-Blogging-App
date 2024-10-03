import React, { useState } from 'react'
import PageHeader from '../../Components/PageHeader/PageHeader'
import styles from './Profile.module.css'
import ProfileIcon from "../../assets/person-fill.svg"
import { auth } from '../../Config/firebase/firebaseMethod'
import PencilIcon from "../../assets/pencil-fill.svg"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';




const Profile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const username = auth.currentUser?.displayName

  return (
    <div>
      <PageHeader btnName="< Profile" />
      <div className={styles.container}>
        <div className={styles.profile}>
          <img width={70} src={ProfileIcon} alt="logo" />
          <div style={{ display: "flex", alignItems: "center", gap: '15px' }}>
            <h4 style={{ marginTop: "20px" }}>{username}</h4>

            <Button style={{background:"transparent",border:"none"}} onClick={handleShow}>
              <img width={20} src={PencilIcon} alt="" />

            </Button>
          </div>
          <h5 >Change Password</h5>
          <input type="text" placeholder='Old Password' />
          <input type="text" placeholder='New Password' />
          <input type="text" placeholder='Repeat Password' />
          <button className={styles.profile_btn}>Update Password</button>
        </div>

        <Modal show={show} onHide={handleClose}>
          {/* <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Change UserName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="UserName"
                  autoFocus
                />
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button style={{backgroundColor:"#7749F8"}} onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default Profile