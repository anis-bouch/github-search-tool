import { Repository } from '../../state/models/repos.model';
import GitHubButton from 'react-github-btn';
/**
 * @returns Jsx Element which will be rendered by react Engine
 * @param repo a repository object as props
 */
export function SearchListCardRepo(repo: Repository): JSX.Element {
  return (
    <div className='base-card'>
      <div className='card-body'>
        <div className='picture'>
          <img className='img-fluid' src={repo.owner.avatar_url} alt='repo owner avatar' />
        </div>
        <div className='rep-content'>
          <h3 className='name'>{repo.name}</h3>
          <h4 className='more'>{repo.owner.login}</h4>
          <div className='github-links'>
            <GitHubButton
              href={repo.html_url}
              data-size='large'
              aria-label={`Star ${repo.name}`}
            >
              Follow Repo ({repo.stargazers_count})
            </GitHubButton>
            <GitHubButton
              href={repo.owner.html_url}
              data-size='large'
              aria-label={`Follow ${repo.owner.login}`}
            >
              Follow Owner
            </GitHubButton>
            <GitHubButton
              href=''
              data-icon='octicon-repo-forked'
              data-size='large'
              aria-label='Fork ntkme/github-buttons on GitHub'
            >
              Fork ({repo.forks_count})
            </GitHubButton>
          </div>
        </div>
      </div>
    </div>
  );
}
