// import Chatanimation from "./Chatanimation";

// export default function Nochatselected(){
//     return(<div className="justify-center items-center">
//       <div className="flex flex-col h-30">
//       <Chatanimation className=''/>
//       </div>
//       <p className="text-white font-">click chat to start conversation</p> 
//         </div>);
// }

import Chatanimation from "./Chatanimation";

export default function Nochatselected() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="h-35 w-35 mb-4">
                <Chatanimation />
            </div>
            <p className="text-white text-xs md:text-base font-medium">
                Click a chat to start a conversation
            </p>
        </div>
    );
}
