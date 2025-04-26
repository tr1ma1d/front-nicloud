import IGroup from "@/utils/models/group.model";
import axios from "axios";

export default class GroupService {
  private readonly baseUrl: string = process.env.NEXT_PUBLIC_MAIN_API + "/im/chat";
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_MAIN_API + "/im/chat"
  }

  public async createGroup(groupData: Omit<IGroup, 'id'>): Promise<IGroup> {
    try {
      const response = await axios.post<IGroup>(`${this.baseUrl}/create`, groupData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to create group: ${error.message}`);
      }
      throw new Error('Failed to create group due to an unexpected error');
    }
  }
}