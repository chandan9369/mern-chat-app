// import { X } from "lucide-react";
// import { useAuthStore } from "../store/useAuthStore.js";
// import { useChatStore } from "../store/useChatStore.js";

// const ChatHeader = () => {
//    const { selectedUser, setSelectedUser } = useChatStore();
//    const { onlineUsers } = useAuthStore();

//    return (
//       <div className="p-2.5 border-b border-base-300">
//          <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//                {/* Avatar */}
//                <div className="avatar">
//                   <div className="size-10 rounded-full relative">
//                      <img
//                         src={selectedUser.profilePic || "/avatar.png"}
//                         alt={selectedUser.fullName}
//                      />
//                   </div>
//                </div>

//                {/* User info */}
//                <div>
//                   <h3 className="font-medium">{selectedUser.fullName}</h3>
//                   <p className="text-sm text-base-content/70">{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</p>
//                </div>
//             </div>

//             {/* Close button */}
//             <button onClick={() => setSelectedUser(null)}>
//                <X />
//             </button>
//          </div>
//       </div>
//    );
// };
// export default ChatHeader;

import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";

const ChatHeader = () => {
   const { selectedUser, setSelectedUser } = useChatStore();
   const { onlineUsers } = useAuthStore();

   const isOnline = onlineUsers.includes(selectedUser._id);

   return (
      <div className="p-4 border-b border-base-300 bg-base-200/60 backdrop-blur-sm">
         <div className="flex items-center justify-between">
            {/* Left side: avatar + info */}
            <div className="flex items-center gap-3">
               {/* Avatar with online indicator */}
               <div className="relative">
                  <img
                     src={selectedUser.profilePic || "/avatar.png"}
                     alt={selectedUser.fullName}
                     className="size-12 rounded-full object-cover border"
                  />
                  {isOnline && <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-200" />}
               </div>

               {/* User info */}
               <div>
                  <h3 className="font-semibold text-base-content truncate max-w-[140px] sm:max-w-xs">{selectedUser.fullName}</h3>
                  <p className={`text-sm ${isOnline ? "text-green-600" : "text-base-content/70"}`}>{isOnline ? "Online" : "Offline"}</p>
               </div>
            </div>

            {/* Close button */}
            <button
               onClick={() => setSelectedUser(null)}
               className="p-2 rounded-full hover:bg-base-300 transition-colors"
               aria-label="Close chat">
               <X className="w-5 h-5" />
            </button>
         </div>
      </div>
   );
};

export default ChatHeader;
