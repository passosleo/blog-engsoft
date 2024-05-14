const hosts = {
  authService: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL as string,
  postService: process.env.NEXT_PUBLIC_POST_SERVICE_URL as string,
} as const;

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
  getCategories: {
    method: "GET",
    uri: "/api/v1/categories",
  },
  createPost: {
    method: "POST",
    uri: "/api/v1/posts",
    listenHeaders: ["Authorization"],
  },
  getPosts: {
    method: "GET",
    uri: "/api/v1/posts",
    listenHeaders: ["Authorization"],
  },
} as const;

export { hosts, routes };
