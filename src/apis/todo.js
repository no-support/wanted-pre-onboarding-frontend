import http from "./http";

// 질문:
// Authorization의 값을 수행 시마다 가져오지 않고 http.js에서 설정해두면,
// 페이지를 초기 로딩했을 때 토큰이 없다면 Authorization의 값에 null이 들어가서
// 계속 요청 실패하더라구요. 그래서
// 수행 시마다 localSorage에서 토큰을 가져오는 방식으로 짜긴 했지만
// headers와 같이 반복되고 있는 부분을 어떻게 줄일 수 있을까요?

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
