import Group from "@/utils/models/group.model";
import axios from "axios";




class GroupService {
    private readonly baseUrl: string;
    constructor(){
        this.baseUrl = process.env.NEXT_PUBLIC_MAIN_API + "/im/chat"
    }
    
    async createGroup(groupData: Group) : Promise<Group>{
        try {
            const response = await axios.post<Group>(`${this.baseUrl}/create`, groupData);
            return response.data;
          } catch (error) {
            if (axios.isAxiosError(error)) {
              throw new Error(`Failed to create group: ${error.message}`);
            }
            throw new Error('Failed to create group due to an unexpected error');
          }
    }
}


export default GroupService;