export interface FetchUserSuccessResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Item[];
}

interface Item {
  login: string;
  id: number;
  avatar_url: string;
  repos_url: string;
}

export interface FetchRepoSuccessResponse {
  id: number;
  name: string;
  stargazers_count: number;
  description?: string;
  owner: Item;
}
