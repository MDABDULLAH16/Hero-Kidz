import Logo from "@/components/buttons/Logo/Logo";
import React from "react";

const loading = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        <Logo></Logo>
      </div>
    </div>
  );
};

export default loading;
