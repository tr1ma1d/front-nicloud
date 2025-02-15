import Image from 'next/image';
import { Editor } from '../widgets/popups/Editor';
import { useState } from 'react';
const ButtonEdit = () => {
    const [isOpenEditor, setIsOpenEditor] = useState(false);
    
    const openEditor = () =>{
        setIsOpenEditor(true);
    }
    const closeEditor = () =>{
        setIsOpenEditor(false);
    }
    return (
        <div className="absolute right-5 bottom-10 z-10">
            <button onClick = {openEditor}className='w-12 h-12 bg-blue-500 rounded-full flex justify-center align-center hover:bg-sky-100 transition-colors'>
                <Image
                    src="/pen-solid.svg"
                    alt="Edit icon"
                    width={20}
                    height={20}
                />
            </button>
            <Editor isOpen={isOpenEditor} onClose={closeEditor}/>
        </div>
    );
}

export default ButtonEdit;