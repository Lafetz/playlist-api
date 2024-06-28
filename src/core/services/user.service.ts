import * as userRepository from "../../repository/impl/user.repository";
import { CreateUser, UpdateUser } from "../use-cases/user";

export const createUser = async (user: CreateUser) => {
    return userRepository.createUser(user);
};

export const getUser = async (email:string) => {
    return userRepository.getUser(email);
};