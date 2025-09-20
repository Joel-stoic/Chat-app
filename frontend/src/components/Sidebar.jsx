import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  const onlineCount = Math.max(0, onlineUsers.length - (authUser ? 1 : 0));

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-300/50 flex flex-col transition-all 
      duration-300 bg-base-100/50 backdrop-blur-sm">
      
      <div className="border-b border-base-300/50 w-full p-6 bg-base-100/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
            <Users className="size-6 text-primary" />
          </div>
          <span className="font-semibold text-lg hidden lg:block text-base-content">Contacts</span>
        </div>

        {/* Online filter toggle */}
        <div className="mt-4 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-3 hover:text-primary transition-colors">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-primary checkbox-sm"
            />
            <span className="text-sm font-medium">Show online only</span>
          </label>
          <span className="text-xs text-primary/60 bg-primary/10 px-2 py-1 rounded-full font-medium">
            {onlineCount} online
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-4 space-y-2 scrollbar-thin scrollbar-track-transparent 
        scrollbar-thumb-base-300 px-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-4 flex items-center gap-4 rounded-2xl transition-all duration-200 
                hover:bg-base-200/70 hover:shadow-md hover:scale-[1.02] group animate-in slide-in-from-left 
                ${selectedUser?._id === user._id 
                  ? "bg-primary/10 border-2 border-primary/20 shadow-lg scale-[1.02]" 
                  : "hover:border border-base-300/50"
                }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-14 object-cover rounded-full ring-2 ring-primary/20 
                    group-hover:ring-primary/40 transition-all duration-300 shadow-md"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full 
                    ring-2 ring-base-100 animate-pulse shadow-lg"></span>
                )}
              </div>

              {/* User info */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className={`font-semibold truncate transition-colors ${
                  selectedUser?._id === user._id ? "text-primary" : "text-base-content"
                }`}>
                  {user.fullName}
                </div>
                <div className={`text-sm font-medium transition-colors ${
                  onlineUsers.includes(user._id) 
                    ? "text-green-500" 
                    : "text-base-content/60"
                }`}>
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-base-content/60 py-12 space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-base-200 flex items-center justify-center">
              <Users className="w-8 h-8 text-base-content/40" />
            </div>
            <p className="font-medium">
              {showOnlineOnly ? "No online users" : "No contacts available"}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;