const endpoints = {
  getUsers: '/search/users',
	getRepos: (username: string) => `/users/{${username}}/repos`
};

export default endpoints;
