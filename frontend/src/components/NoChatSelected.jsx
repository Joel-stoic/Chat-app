import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 
      bg-gradient-to-br from-base-100 via-base-200/30 to-base-100 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 
        opacity-50"></div>
      
      <div className="max-w-md text-center space-y-8 relative z-10">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 
              flex items-center justify-center animate-bounce shadow-2xl border border-primary/10 
              backdrop-blur-sm">
              <MessageSquare className="w-12 h-12 text-primary" />
            </div>
            {/* Floating dots */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary/30 rounded-full animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary/30 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary 
            bg-clip-text text-transparent animate-pulse">
            Welcome to Chatty!
          </h2>
          <p className="text-base-content/70 text-xl leading-relaxed">
            Select a conversation from the sidebar to start chatting and connect with your friends
          </p>
        </div>

        {/* Additional decoration */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.3}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;