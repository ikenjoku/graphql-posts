import jwt from 'jsonwebtoken';

const getUserId = (request, requireAuth=true) => {
  const authorization = request.request ? request.request.headers.authorization :
    request.connection.context.Authorization;

  if(authorization) {
    const token = authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, "safesecret");
    return decoded.userId;
  }
  if(requireAuth){
    throw new Error("Authorization required");
  }

  return null;
}

export default getUserId;