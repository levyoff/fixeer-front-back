import { useState } from 'react';
import { useToken } from '../../TokenContext';
import { useParams } from 'react-router-dom';
import './CreateComment.css';

export const CreateComment = ({
  isolatedService,
  setIsolatedService,
  updateComments,
}) => {
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token] = useToken();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('comment', comment);
      formData.append('file', file);

      const res = await fetch(`http://localhost:4000/services/${id}/comments`, {
        method: 'post',
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const body = await res.json();

      if (body.status === 'error') {
        alert(body.message);
      } else {
        setIsolatedService({
          ...isolatedService,
          comments: [body.data.comment, ...isolatedService.comments],
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setComment('');
      setFile(null);
      updateComments();
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className='create-comment'>
        <h2>Start to fix</h2>
        <br />
        <textarea
          className='create-comment-input'
          placeholder='Write here'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          minLength='10'
          required
        />
        <div className='file-button-comment'>
          <input
            className='create-comment-input-file'
            type='file'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button disabled={loading}>Send</button>
        </div>
      </form>
    </main>
  );
};