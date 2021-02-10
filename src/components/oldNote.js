import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import HashTag from './HashTag'
//import Moment from 'moment';
import Button from 'react-bootstrap/Button';
import ModalLaunchEdit from './ModalLaunchEdit';
import ModalLaunchHook from './ModalLaunchHook';
import { Container, Col, Row } from 'react-bootstrap';


const Note = ({ item, hashtags, tags, getNotes, setFilteredItems, filterByTagNote, pfad }) => {
    /*   const formatedDate = Moment(item.notecreated).format('DD-MM-YYYY'); */
    const [noteid, setNoteid] = useState(item.noteid);
    const noteHashTags = [...hashtags];
    const [imgSource, setImgSource] = useState(pfad + "/zettelkasten/uploads/" + item.fileurl);
    //const [imgSource, setImgSource] = useState("http://simian.sytes.net/zettelkasten/files/zettelkasten/uploads/" + item.fileurl);
    /*   if (imgSource == 'http://simian.sytes.net/zettelkasten/uploads/null'){
          setImgSource('http://simian.sytes.net:3001/zettelkasten/uploads/canvas2.png');
      }  */
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

    return (
        <Card className="card" bg="light" >
            <div className="card-inner">
            <div className="card-front">
                <Card.Header bg="dark">
                    {item.notename}
                        <small className="rounded-circle" style={{ backgroundColor: "white", padding: "5px", color: "black", position: "absolute", right: "30px" }}>{noteid}</small>        
                </Card.Header>
                <Card.Body>
                    <Row>
                    <Col xs lg={8}>                                                                                                                                                
                    <Card.Text>{item.notetext}</Card.Text>
                    </Col>
                    <Col xs lg={4}>
                                <a 
                                    href={imgSource} 
                                    target="_blank">
                                        <img 
                                            src={imgSource} 
                                            loading="lazy" 
                                            alt="">
                                        </img>
                                    </a>
                    </Col>
                    </Row>
                </Card.Body>
                <Card.Footer className="card-footer">
                    <Row>
                        <Col xs lg={8}>
                                {relHashtags.map((hashtag, i) => (
                                    <HashTag hashtag={relHashtags[i]} filterByTagNote={filterByTagNote} key={hashtag.linkid} />
                                ))}
                        </Col>
                        <Col xs lg={4}>
                          {/*   <small className="text-muted">{formatedDate} </small> */}
                            <ModalLaunchEdit tags={tags} item={item} getNotes={getNotes} pfad={pfad}/>
                            <Button size="sm" style={{ margin: 10 }} variant="danger" onClick={deleteHandle} value={item.noteid}>Del</Button>
                        </Col>
                    </Row>
                </Card.Footer>
            </div>
           <div className="card-back">
                <Card.Header bg="dark">
                    {item.notename}
                    {/* <small className="rounded-circle" style={{ backgroundColor: "white", padding: "5px", color: "black", position: "absolute", right: "30px" }} onClick={noteidOnClickHandler} value={noteid}>{noteid}</small>  */}
                    <ModalLaunchHook noteid={item.noteid}/>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                    </Card.Text>
                   {relHashtags.map((hashtag,i) =>(
                       <HashTag hashtag={relHashtags[i]} setFilteredItems={setFilteredItems} key={hashtag.linkid}/>
                    ))}
                    <Card.Text>
                            
                    </Card.Text>
                </Card.Body>  
                <Card.Footer>
                        
                       
                </Card.Footer>
            </div>
            </div>
        </Card>
    )
}

export default Note;