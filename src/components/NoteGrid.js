import React from 'react'
import Note from './Note';
//import { Container, Col, Row } from 'react-bootstrap';
import { Container, Flex, Spinner, VStack } from "@chakra-ui/core";

const NoteGrid = ({ items, hashtags, tags, getNotes, setFilteredItems, pfad }) => {

    const filterByTagNote = (tagFilter) => {
        return hashtags.filter((item) => item.tagname.toLowerCase().includes(tagFilter.toLowerCase()))
    }

    return(
       /*  <Container fluid="md">
            <Row>
                {items.map(item=>(
                    <Col lg={6} md={6} xs={12} key={item.noteid} >
                        <Note item={item} hashtags={hashtags} tags={tags} pfad={pfad} filterByTagNote={filterByTagNote} setFilteredItems={setFilteredItems} getNotes={getNotes}></Note>
                    </Col>
            ))}
            </Row>
        </Container> */
        <Container maxW="md" centerContent p={8}>
        <VStack spacing={8} w="100%">
          {items.map((item) => (
              <Note item={item} key={item.noteid} hashtags={hashtags} tags={tags} pfad={pfad} filterByTagNote={filterByTagNote} setFilteredItems={setFilteredItems} getNotes={getNotes}/>
          ))}
        </VStack>
      </Container>
    )
}
export default NoteGrid
