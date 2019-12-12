import jwt from "jsonwebtoken";

const middleware = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      message: "토큰 인증이 거부되었습니다."
    });
  }
  try {
    const decode = jwt.verify(token, "secret");
    req.user = decode.user.id;
    console.log(decode.user.id, "useriddd", req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: "유효한 토큰이 아닙니다." });
  }
};
export default middleware;
