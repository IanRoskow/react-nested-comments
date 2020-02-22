import React from 'react';
import Comment from './Comment';

export default function CommentList({
  comments,
  submitComment,
  deleteComment,
  submitEdit
}) {
  const displayComments = comments.map(comment => {
    return (
      <Comment
        deleteComment={deleteComment}
        submitComment={submitComment}
        submitEdit={submitEdit}
        key={comment.id}
        comment={comment}
      />
    );
  });
  return <div>{displayComments}</div>;
}
