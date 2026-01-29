import { useEffect, useRef, useState } from "react";

export default function FallingLetters() {
  const wordRef = useRef(null);
  const lettersRef = useRef([]);
  const FONT_SIZE = "clamp(14px, 4vw, 20px)";

  const QUOTES = [
  "En læser lever tusind liv, før han dør.|Den mand, der aldrig læser, lever kun ét. — George R.R. Martin",
  "Læsning er en basal kur mod uvidenhed,|en modgift mod fanatisme og en vej til frihed. — Malala Yousafzai",
  "Bøger er et unikt, bærbart magi. — Stephen King",
  "Læsning er for sindet,|hvad motion er for kroppen. — Joseph Addison",
  "Man læser aldrig en bog én gang.|Hvis en bog er værd at læse, er den værd at genlæse. — Oscar Wilde",
  "Verden er en bog, og de, der ikke rejser,|læser kun én side. — Sankt Augustin",
  "Læsning giver os et sted at tage hen,|når vi er nødt til at blive, hvor vi er. — Mason Cooley"
];

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [text, setText] = useState(QUOTES[0]);

  const init = () => {
    const wordEl = wordRef.current;
    if (!wordEl) return;

    wordEl.innerHTML = "";
    wordEl.style.position = "relative";
    lettersRef.current = [];

    const lines = text.split("|");

    const tempContainer = document.createElement("div");
    Object.assign(tempContainer.style, {
      fontSize: FONT_SIZE,
      fontWeight: "normal",
      letterSpacing: "1px",
      visibility: "hidden",
      position: "absolute",
      textAlign: "center",
      whiteSpace: "pre",
    });

    document.body.appendChild(tempContainer);

    lines.forEach((line, lineIndex) => {
      [...line].forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        tempContainer.appendChild(span);
      });
      if (lineIndex < lines.length - 1) {
        tempContainer.appendChild(document.createElement("br"));
      }
    });

    const containerRect = tempContainer.getBoundingClientRect();
    const spans = tempContainer.querySelectorAll("span");

    spans.forEach((tempSpan) => {
      const rect = tempSpan.getBoundingClientRect();
      const span = document.createElement("span");

      span.className = "letter";
      span.textContent = tempSpan.textContent;
      span.style.left = rect.left - containerRect.left + "px";
      span.style.top = rect.top - containerRect.top + "px";

      wordEl.appendChild(span);
      lettersRef.current.push(span);
    });

    wordEl.style.width = containerRect.width + "px";
    wordEl.style.height = containerRect.height + "px";

    document.body.removeChild(tempContainer);
  };

  const dropLetters = () => {
    lettersRef.current.forEach((letter, i) => {
      const randomX = (Math.random() - 0.5) * 30;
      const randomRot = (Math.random() - 0.5) * 180;
      const randomDelay = Math.random() * 0.8;

      letter.style.setProperty("--tx", `${randomX}px`);
      letter.style.setProperty("--rot", `${randomRot}deg`);
      letter.style.animationDelay = `${randomDelay}s`;

      setTimeout(() => {
        letter.classList.add("falling");
      }, i * 8);
    });
  };

  const nextQuote = () => {
    setQuoteIndex((prev) => {
      const next = (prev + 1) % QUOTES.length;
      setText(QUOTES[next]);
      return next;
    });
  };

  useEffect(() => {
    let fallTimer;
    let nextTimer;

    init();

    fallTimer = setTimeout(() => {
      dropLetters();

      nextTimer = setTimeout(() => {
        nextQuote();
      }, 1800);

    }, 4000);

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(fallTimer);
      clearTimeout(nextTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [text]);

  return (
    <>
      <style>{css}</style>
      <div className="container">
        <div ref={wordRef} className="word" />
      </div>
    </>
  );
}

const css = `
body {
  margin: 0;
  padding: 0;
  background: #fff;
  font-family: Arial, sans-serif;
  overflow: hidden;
}

.container {
  width: 100%;
  text-align: center;
}

.word {
  font-size: clamp(14px, 4vw, 20px);
  letter-spacing: 1px;
  display: inline-block;
  position: relative;
  min-height: 100px;
  opacity: 0;
  transform: scale(0.1) translateZ(-1000px);
  animation: flyIn 1.4s ease-out forwards;
}

@keyframes flyIn {
  to {
    opacity: 1;
    transform: scale(0.95) translateZ(0);
  }
}

.letter {
  position: absolute;
  will-change: transform, opacity;
}

.letter.falling {
  animation: fall 1.3s cubic-bezier(0.4, 0, 0.8, 1) forwards;
}

@keyframes fall {
  to {
    transform: translate(var(--tx), 800px) rotate(var(--rot));
    opacity: 0;
  }
}
`;
