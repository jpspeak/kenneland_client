export interface IKennel {
  _id: string;
  name: string;
  displayPicture: string;
  banner: string;
  description: string;
  location: string;
  breeds: string[];
  email: string;
  mobileNumber: string;
  createdAt: string;
  user: IUser;
}
export interface IStud {
  _id: string;
  name: string;
  breed: string;
  description: string;
  studFee: number;
  location: string;
  likesCount: number;
  images: string[];
  kennel: IKennel;
  createdAt: Date;
}
export interface IForSalePet {
  _id: string;
  name: string;
  breed: string;
  sex: string;
  dateOfBirth: string;
  description: string;
  location: string;
  likesCount: number;
  price: number;
  images: string[];
  sold: boolean;
  kennel: IKennel;
  createdAt: Date;
}
export enum AuthProvider {
  local,
  google,
  facebook
}
export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  displayPicture: string;
  kennel?: IKennel;
  provider: AuthProvider;
}
export interface IAccessToken {
  accessToken: string;
  refreshToken: string;
}
export interface IConversation {
  _id: string;
  members: { data: any; type: string }[];
  membersSeen: string[];
  latestMessage: { _id: string; messageBody: string; senderId: string };
  updatedAt: string;
}
export interface IMessage {
  _id: string;
  conversation: IConversation;
  sender: IUser | IKennel;
  messageBody: string;
  createdAt: string;
}
// export interface IPaginated<T> {
//   docs: T;
//   totalDocs: number;
//   limit: number;
//   totalPages: number;
//   page: number;
//   pagingCounter: number;
//   hasPrevPage: boolean;
//   hasNextPage: boolean;
//   prevPage: number | null;
//   nextPage: number | null;
// }
export interface IPaginatedCursor<T> {
  results: T;
  previous: string;
  hasPrevious: boolean;
  next: string;
  hasNext: boolean;
}

export interface ICursorPagination<T> {
  results: T;
  cursor: string;
  hasNext: boolean;
}
