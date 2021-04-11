import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

function ModalLaunch({ tags, setFilteredItems, getNotes, pfad, appUser }) {
  const [tagList, setTagList] = useState(tags);
  const [show, setShow] = useState(false);
  const [noteName, setNoteName] = useState("");
  const [noteText, setNoteText] = useState("");
  const [tag, setTag] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  React.useEffect(() => {
    setTagList(tags)
  },[tags],[tagList])

  const handleSave = (e) => {
    setNoteName(noteName);
    setNoteText(noteText);
    setTag(tag);
    createNote(noteName, noteText, tag);
  }
  function createNote() {
    fetch(pfad + ':3001/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ noteName, noteText, tag, appUser }),
    })
      .then(response => {
        getNotes();
        setShow(false);
      })
      .then(
        setShow(false)
      )
  }


  const addTag = (e) => {
    addAdditionalTag(tag)
  }

  function addAdditionalTag(tag){
    fetch(pfad + ':3001/addTag', {
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tag, noteName}),
    })
    .then(response => {
      getNotes();
    })
  }

  



  function noteTextChange(e){
    e.preventDefault();
    setNoteText(e.target.value)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        New Note
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Form inline>
            <FormControl type="text" placeholder="Note Title" className="mr-sm-2" value={noteName} onChange={e => setNoteName(e.target.value)}/>
          </Form>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <textarea rows={10} cols={40} placeholder="Note Text" className="mr-sm-2" value={noteText} onChange={noteTextChange}/>
          </Form>
          
            {/* <TagDropdown tags={tags} value={tag} onChange={e => setTag(e.target.value)}/> */}
          <select onChange={e => setTag(e.target.value)}>
            <option key="" value="">Select Tag</option>
            {tagList.map(tag => (
              <option key={tag.tagid} value={tag.tagid} >#{tag.tagname}</option>
            ))}            
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Note
          </Button>
          <Button variant="primary" onClick={addTag}>
            Add another tag
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalLaunch;