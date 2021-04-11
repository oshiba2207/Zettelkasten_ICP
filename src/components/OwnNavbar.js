import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ModalLaunch from './ModalLaunch';
import Modal from 'react-bootstrap/Modal';
import { useAuth0 } from "@auth0/auth0-react"; 


const OwnNavbar = ({ tags, getNotes, load, setLoad, items, setFilteredItems, hashtags, pfad, appUser}) => {
  const [searchInput, setSearchInput] = useState("");
  const [showNewTag, setShowNewTag] = useState(false);
  const [neuesTag, setNeuesTag] = useState("");
  const [tagList, setTagList] = useState(tags);
  const [tagFilter, setTagFilter] = useState("");
  const handleModal2Close = () => setShowNewTag(false);
  const handleModal2Show = () => setShowNewTag(true);
  const { user, isAuthenticated } = useAuth0();

  const loadHandler = () => {
    setLoad(!load);
    console.log(load);
  }

 useEffect(() => {
    getNotes(user);
  }, [appUser]); 

  React.useEffect(() => {
    setTagList(tags)
  }, [tags], [tagList])

  useEffect(() => {
    setFilteredItems(items.filter((item)=>item.notetext.toLowerCase().includes(searchInput.toLowerCase()) || item.notename.toLowerCase().includes(searchInput.toLowerCase())))
   /*  if(!load){
      setLoad(true)
    } */
  },[searchInput]);

  useEffect(() => {
    setFilteredItems(filterByTag(tagFilter))
  }, [tagFilter])

  const filterByTag = (tagFilter) => {
    return hashtags.filter((item) => item.tagname.toLowerCase().includes(tagFilter.toLowerCase()))
  }

  const dropdownFilterHandler = (filter) => {
    setTagFilter(filter.target.text.substring(1))
    if(!load){
      setLoad(true)
    }
  }

  const searchFilterHandler = (e) => {
    setSearchInput(e.target.value)
    if (!load) {
      setLoad(true)
    }
  }
  
  function newTag() {
    fetch(pfad + ':3001/newTag', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ neuesTag, appUser }),
    })
      .then(response => {
        return response.text()
        //setTagList(response)
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

    return(
       isAuthenticated && ( 
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Zettelkasten</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <ModalLaunch appUser={appUser} tags={tags} setFilteredItems={setFilteredItems} getNotes={getNotes} pfad={pfad}/>
              <NavDropdown title="Tags" id="basic-nav-dropdown">
              {tagList.map(tag => (
                <NavDropdown.Item key={tag.tagid} value={tag.tagid} onClick={dropdownFilterHandler}>#{tag.tagname}</NavDropdown.Item>
               /*  <NavDropdown.Item key={tag.tagid} value={tag.tagid} onClick={e => setTagFilter(tag.tagname)}>#{tag.tagname}</NavDropdown.Item> */
              ))} 
                    <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" onClick={handleModal2Show}>New Tag</NavDropdown.Item>
              <Modal show={showNewTag} onHide={handleModal2Close}>
                <Modal.Header>
                  <Form inline>
                    <FormControl type="text" placeholder="new Tag" value={neuesTag} onChange={e => setNeuesTag(e.target.value)} />
                  </Form>
                </Modal.Header>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleModal2Close}>
                    Close
                </Button>
                  <Button variant="primary" onClick={newTag}>
                    Save new Tag
                </Button>
                </Modal.Footer>
              </Modal>
              </NavDropdown>
            <Button onClick={loadHandler}>Show all</Button>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={searchFilterHandler} value={searchInput}/>
            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => setSearchInput(e.target.value)} value={searchInput} /> */}
            </Form>
            </Navbar.Collapse>
        </Navbar>
     )     
    )
}

export default OwnNavbar;