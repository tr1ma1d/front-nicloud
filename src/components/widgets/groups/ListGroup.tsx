import { ButtonAddGroup } from "@/components/buttons/ButtonAddGroup";
import { ItemGroup } from "./ItemGroup";



export const ListGroup = () => {
    return (
        <>
            <div className="bg-white/15 h-[820px] w-[100px] rounded-xl backdrop-blur-sm border-2 border-white flex flex-col items-center box-border py-4">
                <ItemGroup/>
                <div>make map group</div>
                <ItemGroup/>
                <ButtonAddGroup/>
            </div>
        </>
    );
}