export type Url = {
  longUrl: string;
  shortUrl: string;
  code: string;
  createdDate: number;
  hits: number;
};

export type State = {
  shortUrl: string;
  topUrls: Url[];
  loading: boolean;
  error: string | null;
};

export enum ActionType {
  Shorten = "SHORTEN",
  GetTopUrl = "GET_TOP_URL",
  SetLoading = "SET_LOADING",
  SetError = "SET_ERROR",
}

export type Action = {
  payload: any;
  type: ActionType;
};

export type ActionsFnType = Record<
  string,
  (arg?: string | number) => Promise<void>
>;

export type ResponseData = Url & { id: string };

export type ErrorResponseData = {
  errors: { message: string }[];
};
