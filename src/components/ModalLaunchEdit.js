import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function ModalLaunchEdit({ tags, setFilteredItems, getNotes, item, pfad }) {
  const [tagList, setTagList] = useState(tags);
  const [show, setShow] = useState(false);
  const [noteName, setNoteName] = useState(item.notename);
  const [noteText, setNoteText] = useState(item.notetext);
  const [tag, setTag] = useState("");
  const [noteid, setNoteid] = useState(item.noteid);
  const [selectedFile, setSelectedFile] = useState();
  const [filename, setFilename] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    setTagList(tags)
  },[tags],[tagList])

  const handleSave = (e) => {
    setNoteName(noteName);
    setNoteText(noteText);
    setTag(tag);
    changeNote(noteName, noteText);
  }
  function changeNote() {
    fetch(pfad + ':3001/changeNote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ noteName, noteText, noteid }),
    })
      .then(response => {
        getNotes();
      })
  }

  const addTag = (e) => {
    addAdditionalTag(tag, noteid);
  }

  function addAdditionalTag(tag, noteid){
    //const tagNumber = Number(tag);
    fetch(pfad + ':3001/addTag', {
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tag, noteid}),
    })
    .then(response => {
      getNotes();
    })
  }

  function newTag(){
    let neuesTag = prompt("Enter new Tag:");
    
    fetch(pfad + ':3001/newTag', {
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({neuesTag}),
    })
    .then(response => {
      return response.text()
    })
    .then(response => {
      fetch(pfad + ':3001/tags')
        .then(response => {
          return response.json();
        })
        .then(data => {
          setTagList(data)
        });
    })
  }

  function noteTextChange(e){
    e.preventDefault();
    setNoteText(e.target.value)
  }

  const FileUploadOnChangeHandler = event => {
    const file = event.target.files[0];
    setFilename(file.name);
    console.log(file);
    if (validateSize(event)) {
      // if return true allow to setState
      setSelectedFile(file);
    }
  }
  const fileUploadHandler = () => {
    const data = new FormData()
    console.log(selectedFile);
    data.append('file', selectedFile)
    data.append('noteid', noteid);
    console.log(data);
    axios.post(pfad + ":3001/upload", data)
      .then(res => { // then print response status
        toast.success('upload success')
      })
      .then(res => {
        fetch(pfad + ':3001/uploads/file', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filename, noteid }),
        })
      })
      .then(res => {
        fetch(pfad + ':3001/upload_ipfs/file', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filename, noteid }),
        })
      })
      .catch(err => { // then print response status
        toast.error('upload fail')
      })

  };
  const validateSize = (event) => {
    let file = event.target.files[0];
    let size = 30000;
    let err = '';
    if (file.size > size) {
      err = file.type + 'is too large, please pick a smaller file\n';
      toast.error(err);
    }
    return true
  };

  return (
    <>
      <Button size="sm" variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Form inline>
            <input type="text" value={noteName} className="mr-sm-2" onChange={e => setNoteName(e.target.value)} />
          </Form>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <textarea rows={10} cols={35} className="mr-sm-2" value={noteText} onChange={e => setNoteText(e.target.value)} />
          </Form>
          
            {/* <TagDropdown tags={tags} value={tag} onChange={e => setTag(e.target.value)}/> */}
          <select onChange={e => setTag(e.target.value)} >
            <option key="" value="">Select Tag</option>
            {tagList.map(tag => (
              <option key={tag.tagid} value={tag.tagid} >#{tag.tagname}</option>
            ))}
            <option key="0" value="0" onClick={newTag}>Create new tag</option>
          </select>
          <form method="post" action="#" id="#">
            <div className="form-group files">
              <label>Upload Your File </label>
              <input type="file" name="file" className="form-control" onChange={FileUploadOnChangeHandler} />
            </div>
            <div className="col-md-6 pull-right">
              <button width="100%" type="button" className="btn btn-info" onClick={fileUploadHandler}>Upload File</button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="primary" onClick={addTag}>
            Add another tag
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalLaunchEdit;