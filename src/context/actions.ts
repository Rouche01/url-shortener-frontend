import axios, { AxiosResponse, AxiosError } from "axios";
import React from "react";
import { Action, ActionType, ErrorResponseData, ResponseData } from "./types";
import dotenv from "dotenv";

dotenv.config();

const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

const shortenUrl =
  (dispatch: React.Dispatch<Action>) => async (longUrl: string) => {
    dispatch({ type: ActionType.SetLoading, payload: true });
    try {
      const response: AxiosResponse<ResponseData> = await client.post(
        "/api/url/shorten",
        { longUrl }
      );
      //   console.log(response);
      dispatch({ type: ActionType.Shorten, payload: response.data.shortUrl });
      dispatch({ type: ActionType.SetLoading, payload: false });
    } catch (err) {
      const error = err as AxiosError<ErrorResponseData>;
      if (error.response) {
        // dispatch({
        //   type: ActionType.SetError,
        //   payload: error.response.data.errors[0].message,
        // });
        console.log(err)
      } else {
        dispatch({
          type: ActionType.SetError,
          payload: "Something went wrong",
        });
      }

      dispatch({ type: ActionType.SetLoading, payload: false });
    }
  };

const fetchTopUrls =
  (dispatch: React.Dispatch<Action>) => async (limit: number) => {
    dispatch({ type: ActionType.SetLoading, payload: true });
    try {
      const response: AxiosResponse<ResponseData[]> = await client.get(
        "/api/url",
        {
          params: {
            limit,
          },
        }
      );
      dispatch({ type: ActionType.GetTopUrl, payload: response.data });
      dispatch({ type: ActionType.SetLoading, payload: false });
    } catch (err) {
      const error = err as AxiosError<ErrorResponseData>;

      if (error.response) {
        dispatch({
          type: ActionType.SetError,
          payload: error.response.data.errors[0].message,
        });
      } else {
        dispatch({
          type: ActionType.SetError,
          payload: "Something went wrong",
        });
      }

      dispatch({ type: ActionType.SetLoading, payload: false });
    }
  };

const clearError = (dispatch: React.Dispatch<Action>) => () => {
  dispatch({
    type: ActionType.SetError,
    payload: null,
  });
};

const actions: Record<string, any> = {
  shortenUrl,
  fetchTopUrls,
  clearError,
};

export default actions;
