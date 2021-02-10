import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function ModalLaunchHook({noteid}) {
  const [show, setShow] = useState(false);
  //const [nets,setNets] = useState([]);
  const [noteid2, setNoteid2] = useState([]);
  const handleClose = () => {
    setShow(false);
  }
  
  const handleShow = () => { 
    getNets(noteid);
    setShow(true);
    console.log(noteid2)
  }
    /* useEffect(() => {
        getNets(noteid1);
    }, []);*/

    const getNets = (noteid) => {
        fetch('http://192.168.1.99:3001/nets', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ noteid }),
        })
            .then(response => {
                //console.log(response)
                setNoteid2(response)
            })
    }

  return (
    <>

          <small 
            className="rounded-circle" 
            style={{ 
              padding: "4px", 
              color: "black", 
              backgroundColor: "white", 
              position: "absolute", 
              right: "30px" 
              }} 
              onClick={handleShow}
              value = {noteid} 
             >
              {noteid}
          </small>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
             
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
      
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalLaunchHook;