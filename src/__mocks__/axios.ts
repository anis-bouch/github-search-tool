import { Repository } from './../feature/search/state/models/repos.model';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../api/api.types';
import { User } from '../feature/search/state/models/users.model';

export default {
  get: jest.fn(() =>
    Promise.resolve<AxiosResponse<ApiResponse<User | Repository>>>(
      {
        config: {},
        headers: '',
        status: 200,
        statusText: 'cool',
        request: '',
        data: {
          incomplete_results: false,
          total_count: 1,
          items: [
            {
              login: 'anis',
              id: 1801091,
              node_id: 'MDQ6VXNlcjE4MDEwOTE=',
              avatar_url: 'https://avatars.githubusercontent.com/u/1801091?v=4',
              gravatar_id: '',
              url: 'https://api.github.com/users/anis',
              html_url: 'https://github.com/anis',
              followers_url: 'https://api.github.com/users/anis/followers',
              following_url:
                'https://api.github.com/users/anis/following{/other_user}',
              gists_url: 'https://api.github.com/users/anis/gists{/gist_id}',
              starred_url:
                'https://api.github.com/users/anis/starred{/owner}{/repo}',
              subscriptions_url: 'https://api.github.com/users/anis/subscriptions',
              organizations_url: 'https://api.github.com/users/anis/orgs',
              repos_url: 'https://api.github.com/users/anis/repos',
              events_url: 'https://api.github.com/users/anis/events{/privacy}',
              received_events_url:
                'https://api.github.com/users/anis/received_events',
              type: 'User',
              site_admin: false,
              score: 1,
            },
          ],
        }
      }
    )
  ),
};
