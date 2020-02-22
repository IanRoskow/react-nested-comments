import React, { useState } from 'react';
import CommentBox from './components/CommentBox';
import uuid from 'uuid';
import CommentList from './components/CommentList';
import styled from 'styled-components';

const StyledApp = styled.div`
  padding: 30px;
  max-width: 500px;
`;

function App() {
  const [comments, setComments] = useState([]);
  const userName = 'Ian Roskow';

  function findNode(targetId, searchComments) {
    let queue = [...searchComments];
    while (queue.length) {
      const node = queue.shift();
      if (node.id === targetId) {
        return node;
      }
      if (node.replies.length) queue.push(...node.replies);
    }
    return null;
  }

  function deleteNode(targetId, searchComments) {
    for (let i = 0; i < searchComments.length; i++) {
      if (searchComments[i].id === targetId) {
        return searchComments.splice(i, 1);
      } else if (searchComments[i].replies.length) {
        deleteNode(targetId, searchComments[i].replies);
      }
    }
  }

  const submitComment = (targetId, comment) => {
    const newComment = {
      id: uuid.v4(),
      user: userName,
      description: comment,
      time: new Date().toUTCString(),
      replies: []
    };
    if (targetId === null) {
      setComments([newComment, ...comments]);
    } else {
      const node = findNode(targetId, comments);
      node.replies = [...node.replies, newComment];
      setComments([...comments]);
    }
  };

  const submitEdit = (targetId, comment) => {
    const node = findNode(targetId, comments);
    node.description = comment;
    node.time = new Date().toUTCString();
    setComments([...comments]);
  };

  const deleteComment = targetId => {
    deleteNode(targetId, comments);
    setComments([...comments]);
  };

  return (
    <StyledApp>
      <h2>Comment Feed</h2>
      <CommentBox id={null} submitComment={submitComment} />
      <CommentList
        deleteComment={deleteComment}
        submitComment={submitComment}
        submitEdit={submitEdit}
        comments={comments}
      />
    </StyledApp>
  );
}

export default App;
