import { RootState } from "@/store/store";
import IGroup from "@/utils/models/group.model";
import axios from "axios";
import { useSelector } from "react-redux";

export default class GroupService {
  private readonly baseUrl: string = process.env.NEXT_PUBLIC_MAIN_API + "/im/chat";
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_MAIN_API + "/im/chat-group"
  }

  public async createGroup(
    groupData: Omit<IGroup, 'id'>,
    currentUserId: string
  ): Promise<IGroup> {
    try {
      const dataToSend = {
        ...groupData,
        membersId: [...groupData.membersId, currentUserId]
      }

      const response = await axios.post<IGroup>(`${this.baseUrl}/create`, dataToSend, {
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data);
        throw new Error(error.response?.data?.message || error.message);
      }
      throw new Error('Failed to create group');
    }
  }
}