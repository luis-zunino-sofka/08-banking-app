import { HTTP_METHODS, localStorageProperties } from "@core/constants";
import { environment } from "@environment/environment";

export interface HTTPOptions {
  url: string;
  method: HTTP_METHODS;
  data?: object;
  params?: object;
  credentials?: "omit" | "same-origin" | "include";
}
const dinHeader = {
  device: "Android 14",
  language: "es",
  uuid: "",
  ip: "",
  transactionTime: new Date().toISOString(),
  symmetricKey: environment.secretKey,
  initializationVector: environment.initializationVector,
};

export const http = async (props: HTTPOptions) => {
  const { url, method, data, credentials = "include" } = props;

  try {
    const response = await fetch(url, {
      method: method.toString(),
      credentials,
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${
          localStorage.getItem(localStorageProperties.token) as string
        }`,
      },
      body: JSON.stringify({
        dinHeader,
        dinBody: data,
      }),
    });

    return response.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error?.message ?? "Something went wrong");
  }
};
