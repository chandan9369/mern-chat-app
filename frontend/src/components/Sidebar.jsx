import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
import { Users } from "lucide-react";

const Sidebar = () => {
   const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
   const { onlineUsers } = useAuthStore();

   const [showOnlineOnly, setShowOnlineOnly] = useState(false);
   const [width, setWidth] = useState(280); // default sidebar width
   const startX = useRef(0);
   const startWidth = useRef(280);
   const isResizing = useRef(false);

   useEffect(() => {
      getUsers();
   }, [getUsers]);

   const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users;

   const handleMouseDown = (e) => {
      isResizing.current = true;
      startX.current = e.clientX;
      startWidth.current = width;

      // disable text selection
      document.body.style.userSelect = "none";
      document.body.style.cursor = "col-resize";
   };

   const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      const delta = e.clientX - startX.current;
      const newWidth = Math.min(Math.max(startWidth.current + delta, 200), 500);
      setWidth(newWidth);
   };

   const handleMouseUp = () => {
      if (!isResizing.current) return;
      isResizing.current = false;

      // restore normal behavior
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
   };

   useEffect(() => {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
         window.removeEventListener("mousemove", handleMouseMove);
         window.removeEventListener("mouseup", handleMouseUp);
      };
   });

   if (isUsersLoading) return <SidebarSkeleton />;

   return (
      <aside
         style={{ width: `${width}px` }}
         className="h-full border-r border-base-300 flex flex-col bg-base-100 relative">
         {/* Header */}
         <div className="border-b border-base-300 w-full p-4">
            <div className="flex items-center gap-2">
               <Users className="size-6 text-primary" />
               <span className="font-semibold hidden lg:block">Contacts</span>
            </div>

            {/* Online filter */}
            <div className="mt-3 hidden lg:flex items-center justify-between text-sm">
               <label className="cursor-pointer flex items-center gap-2">
                  <input
                     type="checkbox"
                     checked={showOnlineOnly}
                     onChange={(e) => setShowOnlineOnly(e.target.checked)}
                     className="checkbox checkbox-sm"
                  />
                  <span>Show online only</span>
               </label>
               <span className="text-xs text-zinc-500">({Math.max(onlineUsers.length - 1, 0)} online)</span>
            </div>
         </div>

         {/* User list */}
         <div className="overflow-y-auto w-full py-1 scrollbar-thin">
            {filteredUsers.map((user) => {
               const isOnline = onlineUsers.includes(user._id);
               const isSelected = selectedUser?._id === user._id;

               return (
                  <div
                     key={user._id}
                     onClick={() => setSelectedUser(user)}
                     className={`w-full flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150
                ${isSelected ? "bg-primary text-primary-content" : "hover:bg-base-200"}`}>
                     {/* Avatar */}
                     <div className="relative flex-shrink-0">
                        <img
                           src={user.profilePic || "/avatar.png"}
                           alt={user.fullName}
                           className="size-12 object-cover rounded-full"
                        />
                        {isOnline && <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-success rounded-full ring-2 ring-base-100" />}
                     </div>

                     {/* Info */}
                     <div className="hidden lg:block text-left min-w-0 flex-1">
                        <div className="font-medium truncate max-w-[180px]">{user.fullName}</div>
                        <div className={`text-sm ${isOnline ? "text-success" : "text-zinc-500"}`}>{isOnline ? "Online" : "Offline"}</div>
                     </div>
                  </div>
               );
            })}

            {filteredUsers.length === 0 && <div className="text-center text-zinc-500 py-4">No {showOnlineOnly ? "online" : ""} users</div>}
         </div>

         {/* Drag handle */}
         <div
            onMouseDown={handleMouseDown}
            className="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-primary/20 transition"
         />
      </aside>
   );
};

export default Sidebar;

// import { useEffect, useState } from "react";
// import { useChatStore } from "../store/useChatStore.js";
// import { useAuthStore } from "../store/useAuthStore.js";
// import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
// import { Users } from "lucide-react";

// const Sidebar = () => {
//    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

//    const { onlineUsers } = useAuthStore();
//    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

//    useEffect(() => {
//       getUsers();
//    }, [getUsers]);

//    const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users;

//    if (isUsersLoading) return <SidebarSkeleton />;

//    return (
//       <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
//          <div className="border-b border-base-300 w-full p-5">
//             <div className="flex items-center gap-2">
//                <Users className="size-6" />
//                <span className="font-medium hidden lg:block">Contacts</span>
//             </div>
//             {/* TODO: Online filter toggle */}
//             <div className="mt-3 hidden lg:flex items-center gap-2">
//                <label className="cursor-pointer flex items-center gap-2">
//                   <input
//                      type="checkbox"
//                      checked={showOnlineOnly}
//                      onChange={(e) => setShowOnlineOnly(e.target.checked)}
//                      className="checkbox checkbox-sm"
//                   />
//                   <span className="text-sm">Show online only</span>
//                </label>
//                <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
//             </div>
//          </div>

//          <div className="overflow-y-auto w-full py-3">
//             {filteredUsers.map((user) => (
//                <button
//                   key={user._id}
//                   onClick={() => setSelectedUser(user)}
//                   className={`
//               w-full p-3 flex items-center gap-3
//               hover:bg-base-300 transition-colors
//               ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
//             `}>
//                   <div className="relative mx-auto lg:mx-0">
//                      <img
//                         src={user.profilePic || "/avatar.png"}
//                         alt={user.name}
//                         className="size-12 object-cover rounded-full"
//                      />
//                      {onlineUsers.includes(user._id) && (
//                         <span
//                            className="absolute bottom-0 right-0 size-3 bg-green-500
//                   rounded-full ring-2 ring-zinc-900"
//                         />
//                      )}
//                   </div>

//                   {/* User info - only visible on larger screens */}
//                   <div className="hidden lg:block text-left min-w-0">
//                      <div className="font-medium truncate">{user.fullName}</div>
//                      <div className="text-sm text-zinc-400">{onlineUsers.includes(user._id) ? "Online" : "Offline"}</div>
//                   </div>
//                </button>
//             ))}

//             {filteredUsers.length === 0 && <div className="text-center text-zinc-500 py-4">No online users</div>}
//          </div>
//       </aside>
//    );
// };
// export default Sidebar;
