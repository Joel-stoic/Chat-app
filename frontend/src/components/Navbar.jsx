import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100/80 border-b border-base-300/50 fixed w-full top-0 z-50 
      backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-6 h-18">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group"
            >
              <div className="size-11 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 
                flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300
                border border-primary/10">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary 
                bg-clip-text text-transparent">Chatty</h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={"/settings"}
              className="btn btn-ghost gap-2 hover:btn-primary/10 transition-all duration-200 
                hover:scale-105 rounded-xl"
            >
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link 
                  to={"/profile"} 
                  className="btn btn-ghost gap-2 hover:btn-primary/10 transition-all duration-200 
                    hover:scale-105 rounded-xl"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline font-medium">Profile</span>
                </Link>

                <button 
                  className="btn btn-ghost gap-2 hover:btn-error/10 hover:text-error 
                    transition-all duration-200 hover:scale-105 rounded-xl group"
                  onClick={logout}
                >
                  <LogOut className="size-5 group-hover:rotate-12 transition-transform duration-200" />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;