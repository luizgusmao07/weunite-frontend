import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { ImageUp, Pencil } from 'lucide-react';
import { useAuthStore } from "@/stores/useAuthStore";


export default function HeaderProfile() {

    const { user } = useAuthStore();

    return (
        <div className=" h-full flex-col w-full justify-center items-start">

            <div className="h-35 relative bg-[url('/BannerLinkedin.png')] ">
                <img className="h-full w-full" src="/BannerLinkedin.png" alt="" />
                <ImageUp className="absolute right-4 text-white mb-20  top-27 " />
            </div>

            <div className='flex ml-5 relative w-full '>

                <div className='flex w-full'>
                    <div className='relative flex'>
                    <Avatar className='w-24 h-24 rounded-full border-5 border-background mt-[-50px] bg-background'>
                        <AvatarImage
                            src="/cori.jpeg"
                            alt="Foto de perfil"
                            className='w-full h-full rounded-full object-cover'
                        />
                        <AvatarFallback className='w-full h-full flex items-center border-1 rounded-full justify-center text-primary text-5xl '>
                            CN
                        </AvatarFallback>

                        <div className="absolute bottom-2 right-0 bg-[#a1a1a1] rounded-full p-1 border border-gray-200 shadow-sm">
                            <Pencil className='h-4 w-4 text-black cursor-pointer rotate-90' />
                        </div>  
                    </Avatar>
                    </div>

                    <div className='flex flex-col ml-1 '>
                        <p className='text-primary text-sm '>{user?.username}</p>
                        <p className='text-[#a1a1a1] text-xs '>{user?.name}</p>
                    </div>
                </div>

                <div className='flex w-full ml-5 mt-1 gap-10 text-primary text-xs justify-center '>
                    <div className='flex flex-col items-center gap-1'>
                        <p>Seguindo</p>
                        <p>0</p>
                    </div>

                    <div className='flex flex-col items-center gap-1'>
                        <p>Seguidores</p>
                        <p>0</p>
                    </div>

                </div>
            </div>

        </div>
    );
}