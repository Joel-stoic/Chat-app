import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-base-300/50 bg-base-100/80 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-12 rounded-full relative ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
              <img 
                src={selectedUser.profilePic || "/avatar.png"} 
                alt={selectedUser.fullName}
                className="rounded-full object-cover" 
              />
              {/* Online indicator */}
              {onlineUsers.includes(selectedUser._id) && (
                <span className="absolute -bottom-0.5 -right-0.5 size-4 bg-green-500 rounded-full 
                  ring-2 ring-base-100 animate-pulse shadow-lg"></span>
              )}
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-lg text-base-content">
              {selectedUser.fullName}
            </h3>
            <p className={`text-sm font-medium transition-colors duration-200 ${
              onlineUsers.includes(selectedUser._id) 
                ? "text-green-500" 
                : "text-base-content/60"
            }`}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="btn btn-ghost btn-circle hover:bg-error/10 hover:text-error transition-all duration-200 group"
        >
          <X className="group-hover:rotate-90 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;