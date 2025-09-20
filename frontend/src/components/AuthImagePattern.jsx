const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/5 via-base-200 to-secondary/5 p-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
      
      <div className="max-w-md text-center relative z-10">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 
                backdrop-blur-sm border border-primary/10 shadow-lg
                ${i % 2 === 0 ? "animate-pulse" : "animate-bounce"}
                hover:scale-105 transition-all duration-500
                ${i === 4 ? "scale-110 bg-gradient-to-br from-primary/30 to-secondary/20" : ""}
              `}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: i % 2 === 0 ? "2s" : "3s"
              }}
            />
          ))}
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-base-content/70 text-lg leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;