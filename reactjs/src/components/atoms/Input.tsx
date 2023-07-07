type Props = {
  label: string;
};

export const Input = ({ label, ...props }: React.ComponentProps<"input"> & Props) => {
  return (
    <label htmlFor={props.id} className="space-y-2">
      <div>{label}</div>
      <input {...props} className="w-full px-3 py-1 border rounded-md" />
    </label>
  );
};
