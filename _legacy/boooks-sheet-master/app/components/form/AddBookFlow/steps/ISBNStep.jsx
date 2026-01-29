export const ISBNStep = ({ formData, setFormData }) => {
  const handleISBNChange = (e) => {
    const value = e.target.value;
    
    // Optional: You can add logic here to strip hyphens if you only want numbers
    // const cleaned = value.replace(/[- ]/g, ""); 

    setFormData({ ...formData, isbn: value });
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-300 text-white">
      <fieldset>
        <legend>
          <label htmlFor="isbn">
            ISBN
          </label>
        </legend>
        <input
          id="isbn"
          autoFocus
          type="text"
          placeholder="f.eks. 978-3-16-148410-0"
          value={formData.isbn}
          onChange={handleISBNChange}
          className="w-full bg-transparent text-lg outline-none py-2"
        />
      </fieldset>
      
      <p className="mt-4 text-[11px] text-slate-400 leading-relaxed">
        ISBN (International Standard Book Number) findes normalt på bagsiden af bogen over stregkoden eller på en af de første sider i bogen.
      </p>
    </div>
  );
};