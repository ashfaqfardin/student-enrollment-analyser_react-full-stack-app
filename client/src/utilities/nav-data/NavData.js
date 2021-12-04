import { SiGoogleclassroom } from 'react-icons/si';
import { BsGrid1X2 } from 'react-icons/bs';
import { GiMining } from 'react-icons/gi';
import { AiOutlineFileSearch } from 'react-icons/ai';


const NavData = [
    {
        index: 0,
        path: "/classroom-requirements",
        icon: SiGoogleclassroom ,
        refName: "Classroom requirements"
    },
    {
        index: 1,
        path: "/class-size-distributions",
        icon: BsGrid1X2 ,
        refName: "Class-size distributions"
    },
    {
        index: 2,
        path: "/resource-summaries",
        icon: GiMining,
        refName: "Resource summaries"
    },
    {
        index: 3,
        path: "/resource-utilization",
        icon: AiOutlineFileSearch,
        refName: "Resource utilization"
    }
]

export default NavData;