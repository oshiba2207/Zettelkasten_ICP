import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import HashTag from './HashTag'
//import Moment from 'moment';
import Button from 'react-bootstrap/Button';
import ModalLaunchEdit from './ModalLaunchEdit';
import ModalLaunchHook from './ModalLaunchHook';
//import { Container, Col, Row } from 'react-bootstrap';
import { Box, HStack, Text } from "@chakra-ui/core";

const Note = ({ item, hashtags, tags, getNotes, setFilteredItems, filterByTagNote, pfad}) => {
  /*   const formatedDate = Moment(item.notecreated).format('DD-MM-YYYY'); */
    const [noteid, setNoteid] = useState(item.noteid);
    const noteHashTags = [...hashtags];
    //const [imgSource, setImgSource] = useState("https://oshiba2207-team-bucket.storage.fleek.co/" + item.ipfshash);
    const [imgSource, setImgSource] = useState("https://storageapi.fleek.co/oshiba2207-team-bucket/" + item.ipfshash);
    
    const relHashtags = noteHashTags.filter(hashs => hashs.noteid === item.noteid);
    const deleteHandle = (e) => {
        deleteNote(noteid);
    }

    const filterByTag = (tagFilter) => {
        return hashtags.filter((item) => item.tagname.toLowerCase().includes(tagFilter.toLowerCase()))
    }

    const deleteNote = (noteid) => {
        
        fetch(pfad + ':3001/deleteNote/' + noteid, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ noteid }),
        })
            .then(response => {
                getNotes();                
            })
    }

    return(
    <HStack key={item.noteid} w="100%" alignItems="flex-start">
      <Box bg="gray.100" p={4} rounded="md" w="100%">
                <Text 
                    fontSize="3xl"
                    fontWeight="extrabold">{item.notename}</Text>
        <Text>{item.notetext}</Text>
                <a href={imgSource}
                    target="_blank">
                    <img
                        src={imgSource}
                        loading="lazy"
                        alt="">
                    </img>
                </a>
                <ModalLaunchEdit tags={tags} item={item} getNotes={getNotes} pfad={pfad} />
                <Button size="sm" style={{ margin: 10 }} variant="danger" onClick={deleteHandle} value={item.noteid}>Del</Button>
                {relHashtags.map((hashtag, i) => (
                    <HashTag hashtag={relHashtags[i]} filterByTagNote={filterByTagNote} key={hashtag.linkid} />
                ))}
      </Box>
    </HStack>
   
    )
}

export default Note;