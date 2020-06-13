import User from '../models/User';
import { getRepository } from 'typeorm';

export default async (id: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({
    relations: ['city_analyser'],
    where: { id },
  });
  return user?.city_analyser.id || -1;
};
