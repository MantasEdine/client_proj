"use client"
import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const subscribe = async () => {
    await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    alert("Merci pour votre inscription !");
    setEmail("");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14">
      <h1 className="md:text-4xl text-2xl font-medium">
        Abonnez-vous à notre newsletter
      </h1>

      <div className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3"
          placeholder="Entrez votre adresse email"
        />
        <button
          onClick={subscribe}
          className="md:px-12 px-8 h-full text-white bg-orange-600 rounded-md rounded-l-none"
        >
          S’abonner
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
