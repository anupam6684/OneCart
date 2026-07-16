import api from "./api";

export const userService = {
  getUser: async () => {
    return await api.get(`/api/user/profile`);
  },
};
