import { Response, NextFunction } from "express";
import admin from "firebase-admin";
import * as serviceConfig from "../config/serviceAccountKey.json";
import { RequestWithUser } from "../types";
import pgClient from "../config/db";
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

export const checkRoot = async (
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
    const rootUser = await pgClient.query(
      `SELECT id FROM admins JOIN users ON admin.user_id=user.id WHERE users.email=$1 LIMIT 1`
    );
    if (rootUser.rows[0]) {
      return next();
    }
    return res.status(401).send("Failed to Authorize admin permisions");
  } catch (error) {
    res.status(401).send("Failed to Authorize admin permisions");
  }
};

export const getScopes = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const idToken = req.headers.authorization as string;
  const companyId = req.headers.companyId;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (!decodedToken) {
      res.status(401).send("Unauthorized");
    }

    const scopes = await pgClient.query(
      `SELECT scopes FROM owners WHERE user_id=(SELECT id FROM users WHERE email=$1) AND company_id=$2`,
      [decodedToken.email, companyId]
    );

    req.scopes = scopes.rows[0];
    return next();
  } catch (error) {
    res.status(401).send("Failed to Authorize scopes");
  }
};
