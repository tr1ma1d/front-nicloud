import { ItemGroup } from "./ItemGroup";



export const ListGroup = () => {
    return (
        <>  //group-list
            <div className="bg-white/15 h-[820px] w-[100px] rounded-xl backdrop-blur-sm border-2 border-white flex flex-col items-center box-border py-4">
                <ItemGroup/>
                <div></div>
                <ItemGroup/>
            </div>
        </>
    );
}