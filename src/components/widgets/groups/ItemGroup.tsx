import Image from 'next/image'

interface ItemState{
    
}

export const ItemGroup = () => {
    return (
        <div className="w-16 h-16 bg-black my-1 rounded-md overflow-hidden">
            <button className="w-full h-full relative">
                <Image 
                    src="/logotype-example.svg"
                    alt="logo"
                    layout="fill"
                    objectFit="cover"
                    />
            </button>
        </div>
    );
}