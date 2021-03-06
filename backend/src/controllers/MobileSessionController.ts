import { Request, Response } from 'express';
import User from '../models/User';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../config/auth';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID_MOBILE);
class MobileSessionController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      idToken: Yup.string().required(),
      oauth_provider: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Invalid fields' });

    const { idToken, oauth_provider } = req.body;
    const userRepo = getRepository(User);

    if (oauth_provider === 'google') {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID_MOBILE || '',
      });
      const payload = ticket.getPayload();
      const user = await userRepo.findOne({
        social_id: `google-${payload?.sub}`,
      });
      if (user) {
        user.email = payload?.email || user.email;
        user.profile_pic = payload?.picture || user.profile_pic;
        user.name = payload?.name || user.name;

        userRepo.save(user);
        return res.json({
          user: {
            name: user.name,
            email: user.email,
          },
          token: jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
          }),
        });
      } else {
        const newUser = userRepo.create({
          email: payload?.email,
          name: payload?.name,
          profile_pic: payload?.picture,
          social_id: `google-${payload?.sub}`,
        });
        userRepo.save(newUser);
        return res.json({
          user: {
            name: newUser.name,
            email: newUser.email,
          },
          token: jwt.sign({ id: newUser.id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
          }),
        });
      }
    }
    if (oauth_provider === 'facebook') {
      const response = await axios.get(
        `https://graph.facebook.com/v7.0/me?fields=id%2Cname%2Cemail%2Cpicture%7Burl%7D&access_token=${idToken}`
      );
      const payload = response.data;
      const user = await userRepo.findOne({
        social_id: `facebook-${payload?.id}`,
      });
      if (user) {
        user.email = payload?.email || user.email;
        user.profile_pic = payload?.picture.data.url || user.profile_pic;
        user.name = payload?.name || user.name;

        userRepo.save(user);
        return res.json({
          user: {
            name: user.name,
            email: user.email,
          },
          token: jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
          }),
        });
      } else {
        const newUser = userRepo.create({
          email: payload?.email,
          name: payload?.name,
          profile_pic: payload?.picture.data.url,
          social_id: `facebook-${payload?.id}`,
        });
        userRepo.save(newUser);
        return res.json({
          user: {
            name: newUser.name,
            email: newUser.email,
          },
          token: jwt.sign({ id: newUser.id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
          }),
        });
      }
    }
  }
}

export default new MobileSessionController();
