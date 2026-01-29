"use client";
import React, { useState, useEffect } from "react";
// import { Drawer } from "../ui/Drawer.jsx";
import "../../globals.css";
import AutoWidthInput from "./autoWidthInput.jsx";

const AddBookFlow = ({ onComplete }) => {

//   const [isDrawerOpen, setDrawerOpen] = useState();
  const [step, setStep] = useState(0);
  const [substep, setSubstep] = useState(false);
  const [mode, setMode] = useState("manual");
  const [authors, setAuthors] = useState([]);
  const [authorInput, setAuthorInput] = useState("");
  const [extraFields, setExtraFields] = useState([{ key: "", value: "" }]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const addAuthor = (value) => {
    const name = value.trim();
    if (!name) return;

    if (authors.includes(name)) {
      setIsDuplicate(true);
      setTimeout(() => setIsDuplicate(false), 500); // Reset shake state
      return;
    }

    setAuthors((prev) => [...prev, name]);
    setIsDuplicate(false);
  };

  const updateExtraField = (index, field, value) => {
    const updated = [...extraFields];
    updated[index][field] = value;
    setExtraFields(updated);
    // Sync to formData
    const extrasObject = {};
    updated.forEach(({ key, value }) => {
      if (key && value) extrasObject[key] = value;
    });
    setFormData((prev) => ({ ...prev, extras: extrasObject }));
  };

  const addExtraField = () => {
    setExtraFields((prev) => [...prev, { key: "", value: "" }]);
  };

  const removeExtraField = (index) => {
    const updated = extraFields.filter((_, i) => i !== index);
    setExtraFields(updated);
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, authors }));
  }, [authors]);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    authors: [],
    isbn: "",
    languages: [],
    originalLanguage: "",
    extras: {}, // 👈 for step 4
  });

  //   const addAuthor = (value) => {
  //     const name = value.trim();
  //     if (!name) return;
  //     if (authors.includes(name)) return;

  //     setAuthors((prev) => [...prev, name]);
  //   };

  const removeAuthor = (name) => {
    setAuthors((prev) => prev.filter((a) => a !== name));
  };

  const handleAuthorChange = (e) => {
    const value = e.target.value;

    if (value.includes(",")) {
      value.split(",").slice(0, -1).forEach(addAuthor);

      setAuthorInput(value.split(",").slice(-1)[0]);
    } else {
      setAuthorInput(value);
    }
  };

  const handleAuthorKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addAuthor(authorInput);
      setAuthorInput("");
    }

    if (e.key === "Backspace" && authorInput === "") {
      setAuthors((prev) => prev.slice(0, -1));
    }
  };

// Inside AddBookFlow.jsx

const uploadBookData = async () => {
  console.log("Add button clicked. Data:", formData);
  
  try {
    // 1. Execute the close logic immediately
 // ONLY CALL IT ONCE
 onComplete(); 
 
 // 2. Reset the internal form state after the drawer starts sliding
 setTimeout(() => {
   setStep(0);
      setAuthors([]);
      setExtraFields([{ key: "", value: "" }]);
      setFormData({
        title: "",
        subtitle: "",
        authors: [],
        isbn: "",
        languages: [],
        originalLanguage: "",
        extras: {},
      });
    }, 500);
  } catch (err) {
    console.error("Upload failed:", err);
  }
};

  const removeIfEmpty = () => {
    setExtraFields((prev) =>
      prev.filter(
        (f, i) => i === prev.length - 1 || f.key.trim() || f.value.trim()
      )
    );
  };

  const showInfo = ()=>{
    console.log(step, mode)
  }

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && step < 4) setStep((prev) => prev + 1);
    if (isRightSwipe && step > 1) setStep((prev) => prev - 1);
  };

  return (
    <>
    {/* <Drawer
    isOpen={isOpen}
  onRequestClose={() => setIsOpen(false)}
//   isOpen={isDrawerOpen}
//   onRequestClose={() => setDrawerOpen(false)}
> */}

      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="touch-pan-y h-auto max-h-[90vh] overflow-y-auto transition-all duration-300 px-[16px]"
      >

{step === 0 && (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="grid grid-cols-3 gap-6">
        <button 
          onClick={() => { setMode('manual'); setStep(1); }}
          className="flex flex-col items-center gap-3 group"
        >
             <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
             </svg>
          <span className="text-[11px] font-bold uppercase tracking-wider">Manual</span>
        </button>

        <button 
          onClick={() => { setMode('camera'); setStep(1); }}
          className="flex flex-col items-center gap-3 group"
        >
             
<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M7.59843 4.48666C7.86525 3.17678 9.03088 2.25 10.3663 2.25H13.6337C14.9691 2.25 16.1347 3.17678 16.4016 4.48666C16.4632 4.78904 16.7371 5.01086 17.022 5.01086H17.0384L17.0548 5.01157C18.4582 5.07294 19.5362 5.24517 20.4362 5.83558C21.0032 6.20757 21.4909 6.68617 21.871 7.24464C22.3439 7.93947 22.5524 8.73694 22.6524 9.70145C22.75 10.6438 22.75 11.825 22.75 13.3211V13.4062C22.75 14.9023 22.75 16.0835 22.6524 17.0258C22.5524 17.9903 22.3439 18.7878 21.871 19.4826C21.4909 20.0411 21.0032 20.5197 20.4362 20.8917C19.7327 21.3532 18.9262 21.5567 17.948 21.6544C16.9903 21.75 15.789 21.75 14.2634 21.75H9.73657C8.21098 21.75 7.00967 21.75 6.05196 21.6544C5.07379 21.5567 4.26731 21.3532 3.56385 20.8917C2.99682 20.5197 2.50905 20.0411 2.12899 19.4826C1.65612 18.7878 1.44756 17.9903 1.34762 17.0258C1.24998 16.0835 1.24999 14.9023 1.25 13.4062V13.3211C1.24999 11.825 1.24998 10.6438 1.34762 9.70145C1.44756 8.73694 1.65612 7.93947 2.12899 7.24464C2.50905 6.68617 2.99682 6.20757 3.56385 5.83558C4.46383 5.24517 5.5418 5.07294 6.94523 5.01157L6.96161 5.01086H6.978C7.26288 5.01086 7.53683 4.78905 7.59843 4.48666ZM10.3663 3.75C9.72522 3.75 9.18905 4.19299 9.06824 4.78607C8.87258 5.74659 8.021 6.50186 6.99633 6.51078C5.64772 6.57069 4.92536 6.73636 4.38664 7.08978C3.98309 7.35452 3.63752 7.6941 3.36906 8.08857C3.09291 8.49435 2.92696 9.01325 2.83963 9.85604C2.75094 10.7121 2.75 11.8156 2.75 13.3636C2.75 14.9117 2.75094 16.0152 2.83963 16.8712C2.92696 17.714 3.09291 18.2329 3.36906 18.6387C3.63752 19.0332 3.98309 19.3728 4.38664 19.6375C4.80417 19.9114 5.33844 20.0756 6.20104 20.1618C7.07549 20.2491 8.20193 20.25 9.77778 20.25H14.2222C15.7981 20.25 16.9245 20.2491 17.799 20.1618C18.6616 20.0756 19.1958 19.9114 19.6134 19.6375C20.0169 19.3728 20.3625 19.0332 20.6309 18.6387C20.9071 18.2329 21.073 17.714 21.1604 16.8712C21.2491 16.0152 21.25 14.9117 21.25 13.3636C21.25 11.8156 21.2491 10.7121 21.1604 9.85604C21.073 9.01325 20.9071 8.49435 20.6309 8.08857C20.3625 7.6941 20.0169 7.35452 19.6134 7.08978C19.0746 6.73636 18.3523 6.57069 17.0037 6.51078C15.979 6.50186 15.1274 5.74659 14.9318 4.78607C14.8109 4.19299 14.2748 3.75 13.6337 3.75H10.3663ZM12 10.75C10.7574 10.75 9.75 11.7574 9.75 13C9.75 14.2426 10.7574 15.25 12 15.25C13.2426 15.25 14.25 14.2426 14.25 13C14.25 11.7574 13.2426 10.75 12 10.75ZM8.25 13C8.25 10.9289 9.92893 9.25 12 9.25C14.0711 9.25 15.75 10.9289 15.75 13C15.75 15.0711 14.0711 16.75 12 16.75C9.92893 16.75 8.25 15.0711 8.25 13ZM17.25 10C17.25 9.58579 17.5858 9.25 18 9.25H19C19.4142 9.25 19.75 9.58579 19.75 10C19.75 10.4142 19.4142 10.75 19 10.75H18C17.5858 10.75 17.25 10.4142 17.25 10Z" fill="#1C274C"/>
</svg>
          <span className="text-[11px] font-bold uppercase tracking-wider">Camera</span>
        </button>

        <button 
          onClick={() => { setMode('filesLink'); setStep(1); }}
          className="flex flex-col items-center gap-3 group"
        >
             <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 8h.01M7 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path d="M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l2-4h4l2 4h3a2 2 0 0 1 2 2v6z" />
             </svg>
          <span className="text-[11px] font-bold uppercase tracking-wider">files or link</span>
        </button>
      </div>

      <button 
        onClick={onComplete}
        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-[2px] shadow-lg shadow-slate-200 active:scale-95 transition-all"
      >
        Close
      </button>
    </div>
)} 



        {/* Your content here will now push the drawer up/down */}
        <>
          {step === 1 && (
            <>
              <fieldset>
                <legend>
                  <label htmlFor="title">Titel</label>
                </legend>
                <input
                  id="title"
                  placeholder="Skriv bogens titel"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  autoFocus
                />
              </fieldset>
              {step === 1 && substep && (
                <fieldset className="animate-subtitle">
                  <legend>
                    <label htmlFor="undertitle">Undertitel</label>
                  </legend>
                  <input
                    id="undertitle"
                    placeholder="Skriv bogens undertitle"
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, subtitle: e.target.value })
                    }
                    autoFocus
                  />
                </fieldset>
              )}
              <a onClick={() => setSubstep(!substep)}>
                {substep ? "Remove sub title" : "Add sub title"}
              </a>
            </>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="relative group animate-in slide-in-from-left-2">
                <fieldset>
                  <legend>
                    <label>Author{authors.length > 1 && "s"}</label>
                  </legend>
                  <div
                    className={`flex flex-wrap items-center gap-2 px-3 bg-transparent ${
                      isDuplicate ? "animate-shake" : ""
                    }`}
                  >
                    {authors.map((author, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 rounded-md bg-[rgba(255,255,255,0.4)] px-2 py-1 text-sm hover:bg-[rgba(255,255,255,0.6)] transition-colors"
                      >
                        {editingIndex === index ? (
                          <input
                            autoFocus
                            className="bg-transparent outline-none w-20 border-b border-black/20"
                            value={author}
                            onBlur={() => setEditingIndex(null)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && setEditingIndex(null)
                            }
                            onChange={(e) => {
                              const updated = [...authors];
                              updated[index] = e.target.value;
                              setAuthors(updated);
                            }}
                          />
                        ) : (
                          <span
                            onClick={() => setEditingIndex(index)}
                            className="cursor-pointer"
                          >
                            {author}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeAuthor(author)}
                          className="size-5 flex items-center justify-center opacity-50 hover:opacity-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}

                    <input
                      type="text"
                      value={authorInput}
                      onChange={handleAuthorChange}
                      onKeyDown={handleAuthorKeyDown}
                      placeholder={authors.length === 0 ? "Primary Author" : ""}
                      className="flex-1 min-w-[120px] bg-transparent outline-none"
                      autoFocus
                    />
                  </div>
                </fieldset>
                <a>Press enter or comma to add multiple authors</a>
              </div>
            </div>
          )}

          {step === 3 && (
            <>
              <fieldset>
                <legend>
                  <label htmlFor="isbn">
                    ISBN (international serie book number)
                  </label>
                </legend>
                <input
                  id="isbn"
                  placeholder="Skriv bogens isbn"
                  type="text"
                  regex="^[A-Za-zÆØÅæøå\s]+$"
                  value={formData.isbn}
                  onChange={(e) =>
                    setFormData({ ...formData, isbn: e.target.value })
                  }
                  autoFocus
                />
              </fieldset>
            </>
          )}

          {step === 4 && (
            <div className="space-y-4">
              {extraFields.map((field, index) => (
                  <fieldset key={index} className="fade-in-slide">
                    <legend>
                      {/* <label htmlFor={field.key}> */}
                      <AutoWidthInput
                        placeholder="Custom fields (optional)"
                        value={field.key}
                        onChange={(e) =>
                          updateExtraField(index, "key", e.target.value)
                        }
                        minWidth={167}
                      />
                    </legend>

                    <input
                      placeholder="Value"
                      value={field.value}
                      onChange={(e) =>
                        updateExtraField(index, "value", e.target.value)
                      }
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeExtraField(index)}
                      className="opacity-60 hover:opacity-100 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center m-2"
                    >
                      ×
                    </button>
                  </fieldset>
              ))}

              <button
                type="button"
                onClick={addExtraField}
                className="text-sm opacity-70 hover:opacity-100"
              >
                + Add another field
              </button>
            </div>
          )}

          {/* Camera element goes here */}

          {/* <div className="p-6">
        <div className="flex bg-gray-100 p-1 rounded-2xl mb-8">
          {['manual', 'scan'].map(m => (
            <button 
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${mode === m ? 'bg-white shadow-md text-black scale-[1.02]' : 'text-gray-400'}`}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>
*/}
        {step === 1 && mode == 'camera' && (
          <div className="animate-in zoom-in-95 duration-500">
             <div className="w-full aspect-[3/4] bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-200 flex items-center justify-center">
                <span className="text-gray-300 font-bold">Drop Image or Tap</span>
             </div>
          </div>
        )}


            {step !== 0 && (
          <div className="flex justify-between py-2">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="px-4 py-2 bg-gray-100 rounded-3xl font-bold"
            >
              Back
            </button>

            <div className="flex gap-[8px]">
              <button
                onClick={() => {
                  showInfo(step)
                  console.log("jeg er info ift. step: " + step);
                }}
                className="px-4 py-2 bg-gray-100 rounded-3xl font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-info-icon lucide-info"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </button>


              {step === 4 ? (
                <button
                  onClick={uploadBookData} // Just call the function directly
                  className="px-4 py-2 bg-gray-100 rounded-3xl font-bold"
                >
                  Add
                </button>
              ) : (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={step === 4}
                  className="px-4 py-2 bg-gray-100 rounded-3xl font-bold"
                >
                  Next
                </button>
              )}
            </div>
          </div>)}

        </>
      </div>
    </>
    
  );
};

export default AddBookFlow;
