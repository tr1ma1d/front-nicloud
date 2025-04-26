import { ButtonClose } from "@/components/buttons/ButtonCLose";
import { useForm } from "@/hooks/useForm";
import { Friend } from "@/store/unifinedReducer";
import { FC, useState } from "react";
import Select from 'react-select';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    friendList?: Friend[];
}

export const PopupGroup: FC<PopupProps> = ({ isOpen, onClose, friendList }) => {
    if (!isOpen) return null;

    const [selectedMembers, setSelectedMembers] = useState<Friend[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { formData, handleChange } = useForm({
        group: "",
    })

    const friendOptions = friendList?.map(friend => ({
        value: friend.id,
        label: friend.username,
        ...friend 
    })) || [];

    return (
        <div className="w-full h-full bg-black/75 backdrop-blur-md z-50 fixed top-0 left-0">
            <div className="fixed top-1/2 left-1/2 z-20 w-[900px] h-[500px] bg-slate-50/20 transform -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-600 p-6">
                <div className="w-full flex justify-end">
                    <ButtonClose onClose={onClose} />
                </div>
                <h4 className="text-2xl font-bold text-white mb-6 text-center">
                    Create Group
                </h4>
                <form className="px-10">
                    <div className="mb-6">
                        <input
                            type="text"
                            name="group"
                            placeholder="Group name"
                            value={formData.group}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <Select
                            options={friendOptions}
                            isMulti
                            placeholder="Search friend..."
                            value={selectedMembers}
                            onChange={(selected) => setSelectedMembers(selected as Friend[])}
                            classNamePrefix="react-select"
                            className="text-black"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    backgroundColor: '#374151', 
                                    borderColor: '#4B5563', 
                                    minHeight: '44px'
                                }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: '#374151'
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isFocused ? '#4B5563' : '#374151', // gray-600/gray-700
                                    color: 'white'
                                }),
                                multiValue: (base) => ({
                                    ...base,
                                    backgroundColor: '#1E40AF', 
                                }),
                                multiValueLabel: (base) => ({
                                    ...base,
                                    color: 'white'
                                }),
                                input: (base) => ({
                                    ...base,
                                    color: 'white'
                                })
                            }}
                        />
                    </div>
                    {selectedMembers.length > 0 && (
                        <div className="text-white mb-4">
                            Selected members: {selectedMembers.length}
                        </div>
                    )}
                    {error && (
                        <div className="text-red-500 mb-4">{error}</div>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading || !formData.group || selectedMembers.length === 0}
                        className={`w-full py-3 px-4 rounded-lg font-medium ${isLoading || !formData.group || selectedMembers.length === 0
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                            } text-white transition-colors`}
                    >
                        {isLoading ? 'Creating...' : 'Create Group'}
                    </button>
                </form>
            </div>
        </div>
    );
}