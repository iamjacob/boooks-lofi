import React from "react";

export const AuthorStep = ({ formData, setFormData }) => {
  const [authorInput, setAuthorInput] = React.useState("");
  const [isDuplicate, setIsDuplicate] = React.useState(false);

  const addAuthor = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (formData.authors.includes(trimmed)) {
      setIsDuplicate(true);
      setTimeout(() => setIsDuplicate(false), 500);
      return;
    }
    setFormData({ ...formData, authors: [...formData.authors, trimmed] });
    setAuthorInput("");
  };

  const removeAuthor = (name) => {
    setFormData({ ...formData, authors: formData.authors.filter(a => a !== name) });
  };

  return (
    <fieldset className={`${isDuplicate ? "animate-shake" : ""} text-white`}>
      <legend><label>Author{formData.authors.length > 1 ? "s" : ""}</label></legend>
      <div className="flex flex-wrap gap-2 p-2">
        {formData.authors.map((author, i) => (
          <span key={i} className="bg-slate-100 px-2 py-1 rounded-md flex items-center gap-1 text-sm">
            {author}
            <button onClick={() => removeAuthor(author)}>×</button>
          </span>
        ))}
        <input
          autoFocus
          className="flex-1 outline-none min-w-[120px]"
          value={authorInput}
          onChange={(e) => setAuthorInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addAuthor(authorInput);
            }
          }}
          placeholder="Add author..."
        />
      </div>
    </fieldset>
  );
};