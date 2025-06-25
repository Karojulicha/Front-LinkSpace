import type { UserLinks } from "../types/UserLinks";
import { IoMdMenu } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MenuDrawer.css";
import { useUser } from "../Hooks/useUser";
import { HiMiniLink } from "react-icons/hi2";
import { Header } from "./Header";

export const MenuDrawer = () => {
  const { username } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [links, setLinks] = useState<UserLinks | null>(null);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleBlur = () => {
      setIsOpen(false);
    };
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get<UserLinks>(
        `http://localhost:7520/api/UserLinks/${username}`
      );
      setLinks(res.data);
    } catch {
      alert(`${username} no contienes ningun link asociado.`);
      setLinks(null);
      navigate(`/`);
    }
  };

  useEffect(() => {
    if (isOpen && username) {
      fetchUser();
    }
  }, [isOpen, username]);

  const handleLinkClick = (key: string) => {
    setIsOpen(false);
    navigate(`/page/${key}`);
  };
  const formatUrl = (url: string) =>
    url
      .replace(/^https:\/\/(www\.)?/, "")
      .replace(/\.(com|org|net|co|gov)(\/.*)?$/i, "");

  return (
    <>
      <button
        className="btn position-fixed m-3"
        style={{ zIndex: "2" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoMdMenu size="30" />
      </button>

      {isOpen && (
        <div ref={menuRef} className="menu-drawer p-3 shadow">
          <Header />
          {links && (
            <>
              <div className="d-grid gap-2 pt-4">
                {Object.entries(links.links).map(([key, url]) => (
                  <button
                    key={key}
                    className="bnt menu-item-button"
                    onClick={() => {
                      handleLinkClick(key);
                    }}
                  >
                    <HiMiniLink size={30} /> {formatUrl(url)}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
