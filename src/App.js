import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OwnNavbar from './components/OwnNavbar.js';
import './App.css';
import NoteGrid from './components/NoteGrid';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';


function App() {
  const [items, setItems] = useState([]);
  //const [query, setQuery] = useState('')
  const [tags, setTags] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [tagsNotes, setTagsNotes] = useState([]);
  const [appUser, setAppUser] = useState('');
 const pfad = "https://www.simian.link";
 const [load, setLoad] = useState(false);
/*  const { isLoading } = useAuth0(); */
const { isAuthenticated } = useAuth0();



  const getNotes = () => {
    fetch(pfad + ':3001', {
      method: 'POST',
      body: JSON.stringify({appUser}),
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTagsNotes(data);
        const itemsGroupedByNoteID = groupItemsByID(data, "noteid");
        setFilteredItems(itemsGroupedByNoteID);  
        setItems(itemsGroupedByNoteID); 
      })
  }

  const groupItemsByID = (data, noteid) => {
    const unique = data.map(e => e[noteid])
      .map((e,i,final) => final.indexOf(e) === i && i)
      .filter((e) => data[e]).map(e=> data[e]);
    return unique;
  };

  useEffect(() => {
    function getTags() {
      fetch(pfad + ':3001/tags', {
        method: 'POST',
        body: JSON.stringify({ appUser }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          setTags(data)
        });
    }
    getTags();
  }, [appUser]);


  return (
    <div className="App">
      <LoginButton setAppUser={setAppUser}/>
      <LogoutButton />  
      <OwnNavbar appUser={appUser} pfad={pfad} load={load} setLoad={setLoad} tags={tags} filteredItems={filteredItems} reloadItems={getNotes} items={items} setFilteredItems={setFilteredItems} getNotes={getNotes} hashtags={tagsNotes}/>
      <NoteGrid pfad={pfad} className="NoteGrid" getNotes={getNotes} items={filteredItems} setFilteredItems={setFilteredItems} hashtags={tagsNotes} tags={tags}/>
    </div>
  );
}

export default App;
