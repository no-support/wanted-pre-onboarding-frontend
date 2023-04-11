import http from "./http";

export const createTodo = async (todo) => {
  return http.post("/todos", todo, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
};

export const getTodos = async (cancelToken) => {
  return http.get("/todos", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    cancelToken: cancelToken?.token,
  });
};

export const updateTodo = async ({ id, todo, isCompleted, userId }) => {
  return http.put(
    "/todos/" + id,
    {
      todo,
      isCompleted,
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    }
  );
};

export const deleteTodo = async (id) => {
  return http.delete("/todos/" + id, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
};
