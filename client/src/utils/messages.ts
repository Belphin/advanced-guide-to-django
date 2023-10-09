import { message } from "antd";

export const successMessage = (str: String) => {
  message.open({
    type: "success",
    content: str,
  });
};

export const errorMessage = (str: String) => {
  message.open({
    type: "error",
    content: str,
  });
};
