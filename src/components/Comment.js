import React, { useState } from 'react';
import styled from 'styled-components';
import CommentList from './CommentList';
import CommmentBox from './CommentBox';

const StyledCommentBox = styled.div`
  border-left: 1px solid black;
  margin-left: 10px;
  padding: 10px;

  & .options {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 20px 0px;
  }
`;
const ParentComment = styled.div`
  width: 350px;
  & > .options {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 20px 0px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export default function Comment({
  comment,
  submitComment,
  deleteComment,
  submitEdit
}) {
  const { user, description, time, replies, id } = comment;
  const [editing, setEditing] = useState(false);
  const [editComment, setEditComment] = useState(description);

  const comments = replies.length ? (
    <CommentList
      deleteComment={deleteComment}
      submitComment={submitComment}
      submitEdit={submitEdit}
      comments={replies}
    />
  ) : null;

  const onSubmit = e => {
    e.preventDefault();
    submitEdit(id, editComment);
    setEditing(false);
  };

  const commentView = editing ? (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        value={editComment}
        onChange={e => setEditComment(e.target.value)}
        style={{ width: '100%' }}
      />
      <button style={{ float: 'right', margin: '10px' }} type='submit'>
        Save
      </button>
    </form>
  ) : (
    <p>{description}</p>
  );

  return (
    <StyledCommentBox className='comment-box'>
      <ParentComment>
        <Header>
          <h4>{user}</h4>
          <small>{time}</small>
        </Header>
        {commentView}
        <div className='options'>
          <button
            onClick={() => {
              setEditing(!editing);
              setEditComment(description);
            }}
          >
            Edit
          </button>
          <button onClick={() => deleteComment(id)}>Delete</button>
        </div>
        <CommmentBox user={user} id={id} submitComment={submitComment} />
      </ParentComment>
      {comments}
    </StyledCommentBox>
  );
}
