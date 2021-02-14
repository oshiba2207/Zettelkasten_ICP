import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OwnNavbar from './components/OwnNavbar.js';
import './App.css';
import NoteGrid from './components/NoteGrid';
/* import LoginButton from './components/LoginButton';
import LogoutButton from './components/LoginButton';
import { useAuth0 } from '@auth0/auth0-react'; */


function App() {
  const [items, setItems] = useState([]);
  //const [query, setQuery] = useState('')
  const [tags, setTags] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [tagsNotes, setTagsNotes] = useState([]);
  const pfad = "http://ec2-3-249-53-237.eu-west-1.compute.amazonaws.com/";
  const [load, setLoad] = useState(false);
 /*  const { isLoading } = useAuth0(); */
 
  

  const getNotes = () => {
    fetch(pfad + ':3001')
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


  
  //Group item-Array

  const groupItemsByID = (data, noteid) => {
    const unique = data.map(e => e[noteid])
      .map((e,i,final) => final.indexOf(e) === i && i)
      .filter((e) => data[e]).map(e=> data[e]);
    return unique;
  };
  useEffect(() => {
    function getTags() {
      fetch(pfad + ':3001/tags')
      //fetch('http://192.198.1.99:3001/tags')
        .then(response => {
          return response.json();
        })
        .then(data => {
          setTags(data)
        });
    }
    getTags();
  }, [tagList]);

  /* if (isLoading) return <div>Loading...</div> */

  return (
    <div className="App">
     {/*  <LoginButton /> */}
     
      <OwnNavbar pfad={pfad} load={load} setLoad={setLoad} tags={tags} filteredItems={filteredItems} reloadItems={getNotes} items={items} setFilteredItems={setFilteredItems} getNotes={getNotes} hashtags={tagsNotes}/>
      <div>
        {/* {(load) ? (  */}
        <NoteGrid pfad={pfad} className="NoteGrid" getNotes={getNotes} items={filteredItems} setFilteredItems={setFilteredItems} hashtags={tagsNotes} tags={tags}/>
     {/*    ) : (<h1>nothing to see</h1>
          )
        } */}
        </div>
    </div>
  );
}

export default App;
