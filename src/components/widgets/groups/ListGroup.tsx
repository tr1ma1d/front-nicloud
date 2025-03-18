import { ItemGroup } from "./ItemGroup";



export const ListGroup = () => {
    return (
        <>  //group-list
            <div className="">
                <div>
                    <span>direct</span>
                    <ItemGroup />
                </div>
                <div>
                    <span>list-group</span>
                    //map
                    <ItemGroup />
                </div>
            </div>
        </>
    );
}