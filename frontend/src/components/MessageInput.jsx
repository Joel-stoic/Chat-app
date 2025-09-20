import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-6 bg-base-100/80 backdrop-blur-md border-t border-base-300/50">
      {imagePreview && (
        <div className="mb-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-2xl border-2 border-primary/20 shadow-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-error-content
                flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-end gap-3">
        <div className="flex-1 flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              className="w-full input input-bordered rounded-2xl input-lg bg-base-200/50 
                backdrop-blur-sm border-base-300/50 focus:border-primary/50 focus:bg-base-100
                transition-all duration-200 placeholder:text-base-content/50"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`btn btn-circle btn-lg border-2 transition-all duration-200 hover:scale-105 ${
              imagePreview 
                ? "btn-primary shadow-lg" 
                : "btn-ghost hover:btn-primary hover:border-primary/50"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={24} />
          </button>
        </div>
        
        <button
          type="submit"
          className={`btn btn-circle btn-lg transition-all duration-200 hover:scale-105 shadow-lg ${
            (!text.trim() && !imagePreview) 
              ? "btn-disabled opacity-50" 
              : "btn-primary hover:shadow-primary/25"
          }`}
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={24} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;