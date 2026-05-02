

import Chatanimation from "./Chatanimation";

export default function Nochatselected() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <div className="h-30 w-30 mb-4">
                <Chatanimation />
            </div>
            <p className="text-white text-xs md:text-sm ">
                Click a chat to start a conversation
            </p>
        </div>
    );
}
