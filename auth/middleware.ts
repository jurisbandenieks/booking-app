import { Response, NextFunction } from "express";
import admin from "firebase-admin";
import * as serviceConfig from "./config/serviceAccountKey.json";
import { RequestWithUser } from "./types";
admin.initializeApp({
  credential: admin.credential.cert(serviceConfig as admin.ServiceAccount)
});

export const verifyToken = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const idToken = req.headers.authorization as string;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (!decodedToken) {
      res.status(401).send("Unauthorized");
    }

    req.user = decodedToken;
    return next();
  } catch (error) {
    res.status(401).send("Failed to Authorize user token");
  }
};
