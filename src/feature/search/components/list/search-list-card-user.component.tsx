import { User } from '../../state/models/users';

export function SearchListCardUser(user: User): JSX.Element {
  return (
    <div className='card'>
      <div className='avatar'>
        <img src={user.avatar_url} alt='' />
        <strong>{user.login}</strong>
        <a className='profile-link' href={user.html_url} rel='noreferrer' target='_blank'>
          Go to Profile
        </a>
      </div>
    </div>
  );
}
