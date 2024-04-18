const HOST = process.env.NEXT_PUBLIC_FRONTEND_URL as string;

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
};

export { HOST, routes };
