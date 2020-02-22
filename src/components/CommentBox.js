import React, { useState } from 'react';

export default function CommentBox({ user = null, id, submitComment }) {
  const [comment, setComment] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    submitComment(id, comment);
    setComment('');
  };
  const placeholder = user ? `Respond to ${user}` : 'Start a conversation';
  return (
    <form style={{ overflow: 'hidden' }} onSubmit={onSubmit}>
      <input
        type='text'
        name='commentbox'
        value={comment}
        onChange={e => setComment(e.target.value)}
        style={{ width: '95%' }}
        placeholder={placeholder}
      />
      <div>
        <button style={{ float: 'right', margin: '10px' }} type='submit'>
          Submit
        </button>
      </div>
    </form>
  );
}
