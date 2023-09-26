export type UserModel = {
  id?: number;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  phoneNumber?: string;
  email: string;
};

export type UserResponse = {
  user: {
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    phoneNumber?: string;
    email: string;
  };
  companies: Array<{
    name: string;
    country: string;
    region: string;
    address: string;
    phoneNumber: string;
  }>;
};
