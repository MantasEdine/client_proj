import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <Image className="w-28 md:w-32" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm">
            N-Finity est votre boutique en ligne de confiance pour tous vos besoins en électronique et accessoires high-tech. 
            Spécialisés dans la vente en gros et détail, nous proposons des produits authentiques de marques mondiales comme HOCO, Anker et bien d'autres. 
            Basés à Belfort, Harrach, Alger, nous offrons qualité et service exceptionnels.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Navigation</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link className="hover:underline transition hover:text-orange-600" href="/">
                  Accueil
                </Link>
              </li>
              <li>
                <Link className="hover:underline transition hover:text-orange-600" href="/all-products">
                  Boutique
                </Link>
              </li>
              <li>
                <Link className="hover:underline transition hover:text-orange-600" href="/about-us">
                  À Propos
                </Link>
              </li>
              <li>
                <Link className="hover:underline transition hover:text-orange-600" href="/my-orders">
                  Mes Commandes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Contactez-Nous</h2>
            <div className="text-sm space-y-2">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:0550129006" className="hover:text-orange-600 transition">
                  0550 12 90 06
                </a>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:haouasseyacine@gmail.com" className="hover:text-orange-600 transition break-all">
                  haouasseyacine@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-1.953 9.205-2.762 12.208-.343 1.272-.682 1.7-1.12 1.742-.952.087-1.675-.63-2.598-1.234-1.445-.943-2.262-1.531-3.664-2.451-1.62-1.064-.57-1.649.354-2.605.242-.25 4.442-4.073 4.527-4.418.011-.043.02-.203-.076-.288-.095-.085-.236-.056-.337-.033-.143.032-2.423 1.54-6.838 4.521-.647.446-1.233.663-1.758.65-.58-.015-1.695-.328-2.524-.597-.808-.27-1.45-.412-1.394-.87.03-.238.346-.482.95-.733 3.72-1.623 6.2-2.695 7.44-3.215 3.542-1.475 4.279-1.732 4.757-1.74.106-.002.342.024.496.148.13.105.165.246.182.345.017.099.038.325.021.502z"/>
                </svg>
                <a href="https://t.me/mybrandbelfort" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
                  Telegram: @mybrandbelfort
                </a>
              </p>
              <p className="text-xs mt-3 text-gray-400">
                📍 Belfort, Harrach, Alger, Algérie
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-gray-500">
        Copyright 2025 © N-Finity. Tous droits réservés. | Développé par <a href="mailto:rabiayoucef77@gmail.com" className="text-orange-600 hover:underline">R&Y Dev Team</a>
      </p>
    </footer>
  );
};

export default Footer;