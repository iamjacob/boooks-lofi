
// components/AddBook/steps/FileLinkStep.jsx
export const FileLinkStep = ({ formData, updateData }) => {
  return (
    <div className="space-y-6 text-white">
      <fieldset>
        <legend><label>Import from URL</label></legend>
        <input 
          placeholder="Paste Amazon, Goodreads or PDF link..."
          value={formData.importUrl || ""}
          onChange={(e) => updateData({ importUrl: e.target.value })}
        />
      </fieldset>
      
      <div className="relative border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center hover:border-slate-400 transition-colors">
        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
        <p className="text-sm font-medium text-slate-500">Upload PDF or eBook file</p>
      </div>
    </div>
  );
};