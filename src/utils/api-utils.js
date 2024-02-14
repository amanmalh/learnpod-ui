import axios from "axios";

const URL = "http://localhost:1337/api";

export const setDefaultAuthToken = () => {
  const loggedInUser = localStorage.getItem("user");
  if (loggedInUser) {
    const token = JSON.parse(loggedInUser).token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export const removeDefaultAuthToken = () => {
  if (axios.defaults.headers.common["Authorization"]) {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const postLogin = async ({ id, password }) => {
  const response = await axios.post(`${URL}/auth/local`, {
    identifier: id,
    password,
  });
  setDefaultAuthToken();
  return response;
};

export const getGoal = async ({ queryKey }) => {
  const [key, goalId, includeTopics] = queryKey;
  let url = `${URL}/goals/${goalId}`;
  if (includeTopics) {
    url =
      url +
      "?populate[topics][populate][0]=tasks&populate[topics][populate][1]=owner";
  }
  const goal = await axios.get(url);

  return goal.data.data;
};

export const getGoals = async () => {
  const goals = await axios.get(`${URL}/goals`);
  return goals.data.data;
};

export const getGroups = async ({ queryKey }) => {
  const [populateUsers] = [queryKey];
  let url = `${URL}/groups`;
  if (populateUsers) {
    url = url + "?populate=*";
  }
  const groups = await axios.get(url);

  return groups.data.data;
};

export const getTasks = async (topicId) => {
  return [
    {
      title: "Understand knapsack problem",
      description: "",
      status: "complete",
    },
    {
      title: "Watch youtube video",
      description: "https://youtube.com/ire384ls",
      status: "in_progress",
    },
    {
      title: "Solve leetcode problem",
      description: "Solve this problem: https://leetcode.com/ire384ls",
      status: "not_started",
    },
  ];
};

export const postGoal = async (body) => {
  const goal = await axios.post(`${URL}/goals`, { data: body });
  return goal.data.data;
};

export const deleteGoal = async (id) => {
  const goal = await axios.delete(`${URL}/goals/${id}`);
  return goal.data.data;
};
export const putGoal = async ({ id, body }) => {
  const goal = await axios.put(`${URL}/goals/${id}`, { data: body });
  return goal.data.data;
};

export const postTopic = async ({ goalId, topic }) => {
  const newTopic = await axios.post(`${URL}/goals/${goalId}/topics`, {
    data: topic,
  });
  return newTopic.data.data;
};

export const deleteTopic = async (topicId) => {
  const topic = await axios.delete(`${URL}/topics/${topicId}`);
  return topic.data.data;
};

export const putTopic = async ({ id, body }) => {
  const topic = await axios.put(`${URL}/topics/${id}`, { data: body });
  return topic.data.data;
};

export const postTask = async ({ topicId, title }) => {
  const newTask = await axios.post(`${URL}/tasks`, {
    data: { topicId, title },
  });
  return newTask;
};
