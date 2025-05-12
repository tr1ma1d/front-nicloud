import AuthApi from "@/api/UserApi";
import { Portal } from "@/components/Portal";
import { useForm } from "@/hooks/useForm";
import { AppDispatch, RootState } from "@/store/store";
import { updateUser } from "@/store/userSlice";
import { UserState } from "@/utils/models/user.model";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface EditPersonProps {
    isOpen: boolean;
    onClose: () => void;
}


export const EditPerson: FC<EditPersonProps> = ({ isOpen, onClose }) => {
    const user = useSelector((state: RootState) => state.user);
    const { formData, handleChange } = useForm({
        username: user?.username,
        password: "",
        email: user?.email,
        phone: user?.phone
    });
    useEffect(() => {
        console.log(user);
    }, [])
    const dispatch: AppDispatch = useDispatch();
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData: UserState = {
            id: user.id,
            username: formData.username,
            password: formData.password,
            email: formData.email,
            phone: formData.phone
        };
        try {
            const updatedUser = await AuthApi.update(userData);
            const userDataForRedux = {
                id: updatedUser.id,
                username: updatedUser.username,
                password: updatedUser.password,
                email: updatedUser.email,
                phone: updatedUser.phone
            };
            dispatch(updateUser(userDataForRedux));
            onClose();
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    }

    if (!isOpen) return null;
    return (
        <Portal>
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/50">
                <div className="bg-gray-700/50 rounded-lg backdrop-blur-lg flex flex-col w-[35vw] h-[25vw] p-5">
                    <span className="flex justify-center">Change Person</span>
                    <span onClick={onClose} className="flex justify-end mb-5">X</span>
                    <form onSubmit={handleUpdate} className="flex flex-col items-center justify-center gap-3 text-black">
                        <input name="username" className="h-12 w-full px-2 rounded-lg" placeholder="Username" value={formData.username} onChange={handleChange} />
                        <input name="password" className="h-12 w-full px-2 rounded-lg" placeholder="Password" value={formData.password} onChange={handleChange} />
                        <input name="email" className="h-12 w-full px-2 rounded-lg" placeholder="Email" value={formData.email} onChange={handleChange} />
                        <input name="phone" type="tel" pattern="\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}" className="h-12 w-full px-2 rounded-lg" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                        <button className="h-14 w-1/2 rounded-lg duration-300 text-lg text-white bg-gray-500/50 hover:bg-white/50">Изменить</button>
                    </form>
                </div>
            </div>
        </Portal>
    );
}