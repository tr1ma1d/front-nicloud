import { Portal } from "@/components/Portal";
import { useForm } from "@/hooks/useForm";
import { RootState } from "@/store/store";
import { FC } from "react";
import { useSelector } from "react-redux";

interface EditPersonProps {
    isOpen: boolean;
    onClose: () => void;
}


export const EditPerson: FC<EditPersonProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const { formData, handleChange } = useForm({
        username: "",
        password: "",
        email: "",
        phone: "",
    });
    const user = useSelector((state: RootState) => state.user)
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

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
                        <input name="phone" className="h-12 w-full px-2 rounded-lg" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                        <button className="h-14 w-1/2 rounded-lg duration-300 text-lg text-white bg-gray-500/50 hover:bg-white/50">Изменить</button>
                    </form>
                </div>
            </div>
        </Portal>
    );
}