import GitHubButton from 'react-github-btn';
import { User } from '../../state/models/users.model';

/**
 * @returns Jsx Element which will be rendered by react Engine
 * @param user a user object as props
 */
export function SearchListCardUser(user: User): JSX.Element {
  return (
    <div className='user-card'>
       <div className='card-body'>
        <div className='picture'>
          <img className='img-fluid' src={user.avatar_url} alt='user avatar' />
        </div>
        <div className='rep-content'>
          <h3 className='name'>{user.login}</h3>
          <h4 className='more'>{user.type}</h4>
          <div className='github-links'>
            <GitHubButton
              href={user.html_url}
              data-size='large'
              aria-label={`Follow ${user.login}`}
            >
              Follow Owner
            </GitHubButton>
          </div>
        </div>
      </div>
    </div>
  );
}
