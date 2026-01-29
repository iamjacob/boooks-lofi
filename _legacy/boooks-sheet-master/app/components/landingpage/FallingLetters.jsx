import { useEffect, useRef, useState } from "react";

export default function FallingLetters({quote}) {
  const wordRef = useRef(null);
  const inputRef = useRef(null);
  const lettersRef = useRef([]);
  const FONT_SIZE = "clamp(14px, 4vw, 32px)";


  const [text, setText] = useState(
    "A reader lives a thousand lives before he dies...|The man who never reads lives only one.|— A Dance with Dragons"
  );

  useEffect(() => {
  setText(quote);
}, [quote]);

useEffect(() => {
  init();

  const timer = setTimeout(() => {
    dropLetters();
  }, 7700);

  return () => clearTimeout(timer);
}, [text]);


  const init = () => {
    const wordEl = wordRef.current;
    if (!wordEl) return;

    wordEl.innerHTML = "";
    wordEl.style.position = "relative";
    lettersRef.current = [];

    const lines = text.split("|");

    // temp container for measuring
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
      const randomX = (Math.random() - 0.5) * 20;
      const randomRot = (Math.random() - 0.5) * 180;
      const randomDelay = Math.random() * 2;

      letter.style.setProperty("--tx", `${randomX}px`);
      letter.style.setProperty("--rot", `${randomRot}deg`);
      letter.style.animationDelay = `${randomDelay}s`;

      setTimeout(() => {
        letter.classList.add("falling");
      }, i * 10);
    });
  };

  const reset = () => {
    init();
    setTimeout(dropLetters, 10000);
  };

  useEffect(() => {
    init();
    const timer = setTimeout(dropLetters, 11500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{css}</style>

      <div className="container">
        {/* <div className="input-container">
          <input
            ref={inputRef}
            className="text-input hidden"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text (use | for line breaks)"
          />
        </div> */}

        <div ref={wordRef} className="word" />


        <button className="replay-btn hidden" onClick={reset}>
          Drop Letters
        </button>
      </div>
    </>
  );
}

const css = `
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  font-family: Arial, sans-serif;
  overflow: hidden;
}

.container {
  text-align: center;
  width: 100%;
}

.word {
  font-size: clamp(14px, 4vw, 32px);
  letter-spacing: 1px;
  display: inline-block;
  position: relative;
  min-height: 100px;
  opacity: 0;
  transform: scale(0.1) translateZ(-1000px);
  animation: flyInComplete 1.5s ease-out forwards;
}

@keyframes flyInComplete {
  to {
    opacity: 1;
    transform: scale(0.9) translateZ(0);
  }
}

.input-container {
  margin-bottom: 30px;
}

.text-input {
  padding: 12px 20px;
  font-size: 18px;
  width: 400px;
  max-width: 90%;
  border: 2px solid #000;
  border-radius: 8px;
  text-align: center;
}

.letter {
  position: absolute;
}

.letter.falling {
  animation: fall 1.2s cubic-bezier(0.4, 0, 0.8, 1) forwards;
}

@keyframes fall {
  to {
    transform: translate(var(--tx), 800px) rotate(var(--rot));
    opacity: 0;
  }
}

.replay-btn {
  margin-top: 40px;
  padding: 12px 30px;
  font-size: 18px;
  border-radius: 50px;
  border: 2px solid #000;
  background: #fff;
  cursor: pointer;
}

.replay-btn:hover {
  background: #f0f0f0;
  transform: scale(1.05);
}
`;
