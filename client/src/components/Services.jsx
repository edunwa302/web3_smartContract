import { BsShieldCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({color, titile, icon, subtitile}) => (
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className="ml-5 flex flex-col flex-1">
            <h1 className="mt-2 text-white text-lg">{titile}</h1>
            <p className="mt-2 text-white text-sm md:w-9/12">{subtitile}</p>
        </div>
    </div>
)
 
const Services = () => {
    return (
        <div className="flex justify-center items-center gradient-bg-services">
            <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 flex-col justify-start items-start">
                    <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">Service that we <br/> continue to improve</h1>
                </div>
                <div className="flex flex-1 flex-col justify-end items-start">
                    {/* services */}
                    <div className="flex flex-1 flex-col justify-start items-center">
                        <ServiceCard
                            color="bg-[#2952E3]"
                            titile="Security Quaranteed"
                            icon={<BsShieldCheck fontSize={21} className="text-white"/>}
                            subtitile="Security is Quaranteed, WE always maintain the quality of our products."
                        />
                    </div>
                    <div className="flex flex-1 flex-col justify-start items-center">
                        <ServiceCard
                            color="bg-[#F84550]"
                            titile="Fstest transaction"
                            icon={<RiHeart2Fill fontSize={21} className="text-white"/>}
                            subtitile="Security is Quaranteed, WE always maintain the quality of our products."
                        />
                    </div>
                    <div className="flex flex-1 flex-col justify-start items-center">
                        <ServiceCard
                            color="bg-[#8945F8]"
                            titile="Best exchange rate"
                            icon={<BiSearchAlt fontSize={21} className="text-white"/>}
                            subtitile="Security is Quaranteed, WE always maintain the quality of our products."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services;