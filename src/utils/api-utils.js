import axios from 'axios'

const URL = 'http://localhost:1337/api'

export const getGoal = async ({queryKey}) => {
  const [key, goalId, includeTopics] = queryKey
  let url = `${URL}/goals/${goalId}`
  if(includeTopics) {
    url = url+"?populate[topics][populate][0]=owner"
  }
  const goal = await axios.get(url)
  
  return goal.data.data
}

export const getGoals = async () => {
  const goals = await axios.get(`${URL}/goals`)
  return goals.data.data;
}


export const getGroups = async ({queryKey}) => {
  const [populateUsers] = [queryKey]
  let url = `${URL}/groups`
  if(populateUsers) {
    url = url + "?populate=*"
  }
  const groups = await axios.get(url)

  return groups.data.data
}

export const getTasks = async (topicId) => {
  return [
    {
      title: "Understand knapsack problem",
      description: "",
      status: "complete"
    },
    {
      title: "Watch youtube video",
      description: "https://youtube.com/ire384ls",
      status: "in_progress"
    },
    {
      title: "Solve leetcode problem",
      description: "Solve this problem: https://leetcode.com/ire384ls",
      status: "not_started"
    }
  ]
}

export const postGoal = async (body) => {
  const goal = await axios.post(`${URL}/goals`, {data: body})
  return goal.data.data
}

export const deleteGoal = async (id) => {
  const goal = await axios.delete(`${URL}/goals/${id}`)
  return goal.data.data
}
export const putGoal = async ({id, body}) => {
  const goal = await axios.put(`${URL}/goals/${id}`, {data: body})
  return goal.data.data
}
