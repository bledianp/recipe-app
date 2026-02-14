import { api } from "../lib/axios"


export const getMyProfile = async () => {
  return await api.get("/profile/me")
}

export const createProfile = async (data: any) => {
  return await api.post("/profile", data)
}

export const updateProfile = async (data: any) => {
  return await api.put("/profile", data)
}

export const deleteProfile = async () => {
  return await api.delete("/profile")
}

export const getProfileById = async (id: string) => {
  return await api.get(`/profile/${id}`)
}
