import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { determineFileType } from '../../utilities/determineFileType';
import { formDate } from '../../utilities/determineFileType';
import { useToken } from '../../TokenContext';
import './GetComments.css';

export const GetComments = ({ comments }) => {
  const [token] = useToken();

  return (
    <div className='comments'>
      <ul>
        {comments?.map((comment) => {
          return (
            <li key={comment.id}>
              <div className='username'>
                <p className='comment-username'>{comment.username}</p>
              </div>
              <div className='created_at'>
                <p className='comment-created_at'>
                  {formDate(comment.created_at)}
                </p>
              </div>
              <div className='comment'>
                <p className='comment-description'>{comment.comment}</p>
              </div>
              <div className='document'>
                {(comment.file_name && token && (
                  <a target='_blank' href={`http://localhost:4000/${comment?.file_name}`}>
                    <FontAwesomeIcon
                      icon={determineFileType(comment.file_name)}
                    />{' '}
                  </a>
                )) ||
                  (comment?.file_name && (
                    <FontAwesomeIcon
                      icon={determineFileType(comment.file_name)}
                    />
                  ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
