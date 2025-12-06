const Input = ({ value, placeholder, type, id, name, onChange }) => {
  return (
    <input
      value={value}
      className="h-10 w-full border rounded-md p-2 outline-none mt-3"
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
