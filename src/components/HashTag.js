import React, { useState, useEffect } from 'react';

const HastTag = ({ hashtag}) => {
    const [tagFilter, setTagFilter] = useState("");

    const handleTagFilter = () => {
       console.log(hashtag.tagname)
       setTagFilter(hashtag.tagname)
    }

    return(
    <div className="hashTag">
            <small onClick={handleTagFilter}>#{hashtag.tagname}</small>
    </div>
    )
}

export default HastTag;
