type Props = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

export const Button = ({ children, type = "button", ...props }: React.ComponentProps<"button"> & Props) => {
  return (
    <button className="px-5 py-2 bg-blue-200 rounded-md" type={type} {...props}>
      {children}
    </button>
  );
};
