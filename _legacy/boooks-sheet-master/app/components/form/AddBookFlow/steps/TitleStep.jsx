import React from "react";

export const TitleStep = ({ formData, setFormData }) => {
  const [hasSubtitle, setHasSubtitle] = React.useState(!!formData.subtitle);

  return (
    <div className="flex flex-col gap-4 animate-in slide-in-from-right-4 text-white">
      <fieldset>
        <legend><label>Titel</label></legend>
        <input
          autoFocus
          placeholder="Skriv bogens titel"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </fieldset>

      {hasSubtitle && (
        <fieldset className="animate-in fade-in slide-in-from-top-2">
          <legend><label>Undertitel</label></legend>
          <input
            autoFocus
            placeholder="Skriv bogens undertitel"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          />
        </fieldset>
      )}

      <button 
        onClick={() => setHasSubtitle(!hasSubtitle)}
        className="text-sm text-left text-slate-500 underline"
      >
        {hasSubtitle ? "- Remove subtitle" : "+ Add subtitle"}
      </button>
    </div>
  );
};