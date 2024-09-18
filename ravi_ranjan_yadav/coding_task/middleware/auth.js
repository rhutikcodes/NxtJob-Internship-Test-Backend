const authMiddleware = async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (authHeader) {
    console.log("Authorization header:", authHeader);
    await next();
  } else {
    return new Response("Unauthorized", { status: 401 });
  }
};

export { authMiddleware };
