import React from "react";

import AutoWidthInput from "../autoWidthInput.jsx";

export const ExtraFieldsStep = ({ formData, setFormData }) => {
  // We keep a local array for the UI, but sync it to formData.extras
  const fields = Object.entries(formData.extras).length > 0 
    ? Object.entries(formData.extras).map(([k, v]) => ({ key: k, value: v }))
    : [{ key: "", value: "" }];

  const updateField = (index, key, value) => {
    const newFields = [...fields];
    newFields[index] = { key, value };
    
    // Sync back to object format
    const newExtras = {};
    newFields.forEach(f => { if(f.key) newExtras[f.key] = f.value });
    setFormData({ ...formData, extras: newExtras });
  };

  return (
    <div className="space-y-4 text-white">
      {fields.map((field, i) => (
        <fieldset key={i} className="flex items-center">
          <legend>
            <AutoWidthInput 
              value={field.key} 
              onChange={(e) => updateField(i, e.target.value, field.value)}
              placeholder="Label (e.g. Publisher)"
            />
          </legend>
          <input 
            className="flex-1"
            value={field.value}
            onChange={(e) => updateField(i, field.key, e.target.value)}
            placeholder="Value"
          />
        </fieldset>
      ))}
      <button 
        className="text-xs opacity-50"
        onClick={() => setFormData({...formData, extras: {...formData.extras, "": ""}})}
      >
        + Add another field
      </button>
    </div>
  );
};