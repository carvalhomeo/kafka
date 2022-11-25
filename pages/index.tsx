import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIURL,
});

export default function Home() {
  const router = useRouter();

  const [msg, setMsg] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await api.get(`/start/${msg}`);

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
