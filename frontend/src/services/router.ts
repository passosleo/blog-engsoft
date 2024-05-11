const hosts = {
  authService: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL as string,
  postService: process.env.NEXT_PUBLIC_POST_SERVICE_URL as string,
}

const routes = {
  signIn: {
    method: "POST",
    uri: "/api/v1/authenticate ",
  },
  createUser: {
    method: "POST",
    uri: "/api/v1/account",
  },
  getUser: {
    method: "GET",
    uri: "/api/v1/account",
  },
} as const;

export { hosts, routes };
