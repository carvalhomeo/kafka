import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [msg, setMsg] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    fetch(`http://localhost:3002/start/${msg}`, { method: "GET" });
    router.push(`route/${msg}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="message"
          onChange={(evt) => setMsg(evt.target.value)}
        ></input>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
